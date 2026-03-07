# Go API Scaffold (Inspectra Governance API)

## Run

```bash
cd go_api
go run ./cmd/api
```

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

## Caching hardening
- JWT verification uses go-oidc keyset caching/rotation behavior.
- Introspection responses are cached in-process with LRU eviction and configurable TTL/size via env.

## Related docs

- System auth sequence (JWT + introspection fallback): `../docs/oidc-auth-sequence.md`
