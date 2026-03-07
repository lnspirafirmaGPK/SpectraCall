import os

from pydantic import BaseModel


class Settings(BaseModel):
    # OIDC / JWT verification
    oidc_issuer_url: str = os.getenv("OIDC_ISSUER_URL", "https://auth.inspectra.example.com/")
    oidc_audience: str = os.getenv("OIDC_AUDIENCE", "inspectra-api")
    roles_claim: str = os.getenv("OIDC_ROLES_CLAIM", "roles")

    # JWKS/discovery caching
    jwks_cache_seconds: int = int(os.getenv("OIDC_JWKS_CACHE_SECONDS", "300"))
    discovery_cache_seconds: int = int(os.getenv("OIDC_DISCOVERY_CACHE_SECONDS", "300"))

    # RFC7662 introspection fallback (opaque tokens)
    oidc_introspection_url: str = os.getenv("OIDC_INTROSPECTION_URL", "")
    oidc_introspection_client_id: str = os.getenv("OIDC_INTROSPECTION_CLIENT_ID", "")
    oidc_introspection_client_secret: str = os.getenv("OIDC_INTROSPECTION_CLIENT_SECRET", "")
    oidc_introspection_roles_claim: str = os.getenv("OIDC_INTROSPECTION_ROLES_CLAIM", "")
    map_scope_to_roles: bool = os.getenv("OIDC_MAP_SCOPE_TO_ROLES", "true").lower() in (
        "1",
        "true",
        "yes",
        "y",
    )

    introspection_cache_ttl_seconds: int = int(os.getenv("OIDC_INTROSPECTION_CACHE_TTL_SECONDS", "60"))
    introspection_cache_max_entries: int = int(os.getenv("OIDC_INTROSPECTION_CACHE_MAX_ENTRIES", "1000"))


settings = Settings()
