# FastAPI Scaffold (Inspectra Governance API)

## Run

```bash
cd fastapi_app
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Test

```bash
cd fastapi_app
pip install -r requirements-dev.txt
pytest -q
```

`pytest.ini` sets `pythonpath = .` so tests can import the `app` package directly.

## Introspection fallback (opaque access tokens)

Set these env vars if your IdP issues opaque access tokens:

```bash
export OIDC_INTROSPECTION_URL="https://auth.inspectra.example.com/oauth2/introspect"
export OIDC_INTROSPECTION_CLIENT_ID="your-client-id"
export OIDC_INTROSPECTION_CLIENT_SECRET="your-client-secret"
# Optional:
export OIDC_INTROSPECTION_ROLES_CLAIM="roles"
export OIDC_MAP_SCOPE_TO_ROLES="true"
```

If `OIDC_INTROSPECTION_URL` is unset/empty, opaque tokens are rejected with 401.

## Caching hardening
- JWKS honors `ETag` / `If-None-Match` and `Cache-Control: max-age` when available.
- Introspection responses are cached in-process with LRU eviction and configurable TTL/size.

## Related docs

- System auth sequence (JWT + introspection fallback): `../docs/oidc-auth-sequence.md`
