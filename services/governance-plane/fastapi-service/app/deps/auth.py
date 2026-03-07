from __future__ import annotations

import asyncio
import time
from collections import OrderedDict
from dataclasses import dataclass
from email.utils import parsedate_to_datetime
from typing import Any, Callable, Iterable, Optional

import httpx
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt

from app.core.config import settings

bearer = HTTPBearer(auto_error=False)


@dataclass(frozen=True)
class Principal:
    sub: str
    roles: tuple[str, ...]
    token: str
    token_type: str
    claims: dict[str, Any]


@dataclass
class _CachedIntrospection:
    payload: dict[str, Any]
    expires_at: float


class OIDCVerifier:
    def __init__(self) -> None:
        self._algorithms = ["RS256"]
        self._discovery: Optional[dict[str, Any]] = None
        self._discovery_fetched_at = 0.0
        self._discovery_lock = asyncio.Lock()

        self._jwks: Optional[dict[str, Any]] = None
        self._jwks_fetched_at = 0.0
        self._jwks_etag: Optional[str] = None
        self._jwks_max_age_override: Optional[int] = None
        self._jwks_lock = asyncio.Lock()

        self._introspection_cache: OrderedDict[str, _CachedIntrospection] = OrderedDict()
        self._introspection_lock = asyncio.Lock()

    def _issuer(self) -> str:
        return settings.oidc_issuer_url.rstrip("/")

    @staticmethod
    def _is_jwt_like(token: str) -> bool:
        return token.count(".") == 2

    @staticmethod
    def _coerce_roles(value: Any) -> tuple[str, ...]:
        if isinstance(value, str):
            return (value,)
        if isinstance(value, list):
            return tuple(str(x) for x in value if x is not None)
        return tuple()

    @staticmethod
    def _find_key(jwks: dict[str, Any], kid: str) -> Optional[dict[str, Any]]:
        for item in jwks.get("keys", []):
            if item.get("kid") == kid:
                return item
        return None

    @staticmethod
    def _parse_cache_control_max_age(cache_control: str | None) -> Optional[int]:
        if not cache_control:
            return None
        for part in cache_control.split(","):
            item = part.strip().lower()
            if item.startswith("max-age="):
                try:
                    return max(0, int(item.split("=", 1)[1]))
                except ValueError:
                    return None
        return None

    async def _fetch_discovery(self) -> dict[str, Any]:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(f"{self._issuer()}/.well-known/openid-configuration")
            response.raise_for_status()
            return response.json()

    async def _get_discovery(self, force_refresh: bool = False) -> dict[str, Any]:
        now = time.time()
        if not force_refresh and self._discovery and (now - self._discovery_fetched_at) < settings.discovery_cache_seconds:
            return self._discovery

        async with self._discovery_lock:
            now = time.time()
            if not force_refresh and self._discovery and (now - self._discovery_fetched_at) < settings.discovery_cache_seconds:
                return self._discovery
            self._discovery = await self._fetch_discovery()
            self._discovery_fetched_at = time.time()
            return self._discovery

    async def _fetch_jwks(self) -> dict[str, Any]:
        discovery = await self._get_discovery()
        jwks_uri = discovery.get("jwks_uri")
        if not jwks_uri:
            raise HTTPException(status_code=401, detail="OIDC discovery missing jwks_uri")

        headers = {}
        if self._jwks_etag:
            headers["If-None-Match"] = self._jwks_etag

        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(jwks_uri, headers=headers)

        if response.status_code == 304 and self._jwks is not None:
            self._jwks_max_age_override = self._parse_cache_control_max_age(response.headers.get("cache-control"))
            return self._jwks

        response.raise_for_status()
        self._jwks_etag = response.headers.get("etag")
        self._jwks_max_age_override = self._parse_cache_control_max_age(response.headers.get("cache-control"))
        return response.json()

    async def _get_jwks(self, force_refresh: bool = False) -> dict[str, Any]:
        ttl = self._jwks_max_age_override if self._jwks_max_age_override is not None else settings.jwks_cache_seconds
        now = time.time()
        if not force_refresh and self._jwks and (now - self._jwks_fetched_at) < ttl:
            return self._jwks

        async with self._jwks_lock:
            now = time.time()
            if not force_refresh and self._jwks and (now - self._jwks_fetched_at) < ttl:
                return self._jwks
            self._jwks = await self._fetch_jwks()
            self._jwks_fetched_at = time.time()
            return self._jwks

    async def _verify_jwt(self, token: str) -> Principal:
        try:
            header = jwt.get_unverified_header(token)
        except Exception as exc:
            raise HTTPException(status_code=401, detail=f"Malformed JWT header: {exc}") from exc
        kid = header.get("kid")
        if not kid:
            raise HTTPException(status_code=401, detail="Missing kid in token header")

        jwks = await self._get_jwks(False)
        key = self._find_key(jwks, kid)
        if key is None:
            jwks = await self._get_jwks(True)
            key = self._find_key(jwks, kid)
            if key is None:
                raise HTTPException(status_code=401, detail="Unknown kid (after JWKS refresh)")

        def decode(with_key: dict[str, Any]) -> dict[str, Any]:
            return jwt.decode(
                token,
                with_key,
                algorithms=self._algorithms,
                audience=settings.oidc_audience,
                issuer=self._issuer(),
                options={"verify_aud": True, "verify_iss": True},
            )

        try:
            claims = decode(key)
        except Exception:
            jwks = await self._get_jwks(True)
            retry_key = self._find_key(jwks, kid) or key
            try:
                claims = decode(retry_key)
            except Exception as exc:
                raise HTTPException(status_code=401, detail=f"Invalid JWT: {exc}") from exc

        return Principal(
            sub=str(claims.get("sub") or "unknown"),
            roles=self._coerce_roles(claims.get(settings.roles_claim, [])),
            token=token,
            token_type="jwt",
            claims=claims,
        )

    async def _get_introspection_from_cache(self, token: str) -> Optional[dict[str, Any]]:
        async with self._introspection_lock:
            entry = self._introspection_cache.get(token)
            if not entry:
                return None
            if time.time() >= entry.expires_at:
                self._introspection_cache.pop(token, None)
                return None
            self._introspection_cache.move_to_end(token)
            return entry.payload

    async def _cache_introspection(self, token: str, payload: dict[str, Any], headers: httpx.Headers) -> None:
        max_entries = max(1, settings.introspection_cache_max_entries)
        ttl = settings.introspection_cache_ttl_seconds
        cache_control_ttl = self._parse_cache_control_max_age(headers.get("cache-control"))
        if cache_control_ttl is not None:
            ttl = cache_control_ttl
        elif headers.get("expires"):
            try:
                expires = parsedate_to_datetime(headers["expires"]).timestamp()
                ttl = max(0, int(expires - time.time()))
            except Exception:
                pass

        async with self._introspection_lock:
            self._introspection_cache[token] = _CachedIntrospection(payload=payload, expires_at=time.time() + max(0, ttl))
            self._introspection_cache.move_to_end(token)
            while len(self._introspection_cache) > max_entries:
                self._introspection_cache.popitem(last=False)

    async def _introspect(self, token: str) -> dict[str, Any]:
        cached = await self._get_introspection_from_cache(token)
        if cached:
            return cached

        if not settings.oidc_introspection_url:
            raise HTTPException(status_code=401, detail="Opaque token not supported (introspection disabled)")

        auth = None
        if settings.oidc_introspection_client_id and settings.oidc_introspection_client_secret:
            auth = (settings.oidc_introspection_client_id, settings.oidc_introspection_client_secret)

        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.post(
                settings.oidc_introspection_url,
                data={"token": token},
                headers={"Content-Type": "application/x-www-form-urlencoded"},
                auth=auth,
            )

        if response.status_code == 401:
            raise HTTPException(status_code=401, detail="Introspection unauthorized")
        response.raise_for_status()
        payload = response.json()
        if not payload.get("active", False):
            raise HTTPException(status_code=401, detail="Token inactive")

        issuer = payload.get("iss")
        if isinstance(issuer, str) and issuer.rstrip("/") != self._issuer():
            raise HTTPException(status_code=401, detail="Token issuer mismatch")
        aud = payload.get("aud")
        if isinstance(aud, str) and aud != settings.oidc_audience:
            raise HTTPException(status_code=401, detail="Token audience mismatch")
        if isinstance(aud, list) and settings.oidc_audience not in aud:
            raise HTTPException(status_code=401, detail="Token audience mismatch")

        await self._cache_introspection(token, payload, response.headers)
        return payload

    def _roles_from_introspection(self, payload: dict[str, Any]) -> tuple[str, ...]:
        claim_name = settings.oidc_introspection_roles_claim or settings.roles_claim
        roles = list(self._coerce_roles(payload.get(claim_name)))
        if not roles and settings.map_scope_to_roles:
            scope = payload.get("scope")
            if isinstance(scope, str) and scope.strip():
                roles = scope.strip().split()
        return tuple(roles)

    async def verify(self, token: str) -> Principal:
        if not self._is_jwt_like(token):
            payload = await self._introspect(token)
            return Principal(str(payload.get("sub") or "unknown"), self._roles_from_introspection(payload), token, "opaque", payload)

        try:
            return await self._verify_jwt(token)
        except HTTPException:
            if settings.oidc_introspection_url:
                payload = await self._introspect(token)
                return Principal(str(payload.get("sub") or "unknown"), self._roles_from_introspection(payload), token, "opaque", payload)
            raise


verifier = OIDCVerifier()


async def get_principal(creds: HTTPAuthorizationCredentials = Depends(bearer)) -> Principal:
    if creds is None or not creds.credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing bearer token")
    return await verifier.verify(creds.credentials)


def require_roles(required: Iterable[str]) -> Callable[[Principal], Principal]:
    required_set = set(required)

    async def _dep(p: Principal = Depends(get_principal)) -> Principal:
        if required_set and not required_set.intersection(set(p.roles)):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient role")
        return p

    return _dep
