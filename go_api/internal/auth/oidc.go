package auth

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/coreos/go-oidc/v3/oidc"
)

type Principal struct {
	Sub       string
	Roles     map[string]bool
	Raw       string
	TokenType string
	Claims    map[string]any
}

type ctxKey int

const principalKey ctxKey = 1

func PrincipalFromContext(ctx context.Context) (*Principal, bool) {
	p, ok := ctx.Value(principalKey).(*Principal)
	return p, ok
}

type OIDCConfig struct {
	IssuerURL  string
	Audience   string
	RolesClaim string

	IntrospectionURL          string
	IntrospectionClientID     string
	IntrospectionClientSecret string
	IntrospectionRolesClaim   string
	MapScopeToRoles           bool
	IntrospectionCacheTTL     time.Duration
	IntrospectionCacheSize    int
}

func LoadOIDCConfig() OIDCConfig {
	issuer := strings.TrimRight(os.Getenv("OIDC_ISSUER_URL"), "/")
	if issuer == "" {
		issuer = "https://auth.inspectra.example.com"
	}
	aud := os.Getenv("OIDC_AUDIENCE")
	if aud == "" {
		aud = "inspectra-api"
	}
	rolesClaim := os.Getenv("OIDC_ROLES_CLAIM")
	if rolesClaim == "" {
		rolesClaim = "roles"
	}
	mapScopeToRoles := true
	if raw := strings.ToLower(strings.TrimSpace(os.Getenv("OIDC_MAP_SCOPE_TO_ROLES"))); raw != "" {
		mapScopeToRoles = raw == "1" || raw == "true" || raw == "yes" || raw == "y"
	}
	cacheTTL := 60 * time.Second
	if raw := strings.TrimSpace(os.Getenv("OIDC_INTROSPECTION_CACHE_TTL_SECONDS")); raw != "" {
		if sec, err := time.ParseDuration(raw + "s"); err == nil {
			cacheTTL = sec
		}
	}
	cacheSize := 1000
	if raw := strings.TrimSpace(os.Getenv("OIDC_INTROSPECTION_CACHE_MAX_ENTRIES")); raw != "" {
		if _, err := fmt.Sscanf(raw, "%d", &cacheSize); err != nil || cacheSize < 1 {
			cacheSize = 1000
		}
	}

	return OIDCConfig{
		IssuerURL:                 issuer,
		Audience:                  aud,
		RolesClaim:                rolesClaim,
		IntrospectionURL:          strings.TrimSpace(os.Getenv("OIDC_INTROSPECTION_URL")),
		IntrospectionClientID:     strings.TrimSpace(os.Getenv("OIDC_INTROSPECTION_CLIENT_ID")),
		IntrospectionClientSecret: strings.TrimSpace(os.Getenv("OIDC_INTROSPECTION_CLIENT_SECRET")),
		IntrospectionRolesClaim:   strings.TrimSpace(os.Getenv("OIDC_INTROSPECTION_ROLES_CLAIM")),
		MapScopeToRoles:           mapScopeToRoles,
		IntrospectionCacheTTL:     cacheTTL,
		IntrospectionCacheSize:    cacheSize,
	}
}

type introspectionEntry struct {
	payload   map[string]any
	expiresAt time.Time
}

type Verifier struct {
	cfg        OIDCConfig
	verifier   *oidc.IDTokenVerifier
	httpClient *http.Client

	cacheMu            sync.Mutex
	introspectionCache map[string]introspectionEntry
	introspectionOrder []string
}

func NewVerifier(ctx context.Context, cfg OIDCConfig) (*Verifier, error) {
	tx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	provider, err := oidc.NewProvider(tx, cfg.IssuerURL)
	if err != nil {
		return nil, err
	}

	return &Verifier{
		cfg:                cfg,
		verifier:           provider.Verifier(&oidc.Config{ClientID: cfg.Audience}),
		httpClient:         &http.Client{Timeout: 10 * time.Second},
		introspectionCache: map[string]introspectionEntry{},
		introspectionOrder: []string{},
	}, nil
}

func isJWTLike(token string) bool { return strings.Count(token, ".") == 2 }

func rolesFromClaim(claimValue any) map[string]bool {
	roles := map[string]bool{}
	switch v := claimValue.(type) {
	case string:
		if v != "" {
			roles[v] = true
		}
	case []string:
		for _, item := range v {
			if item != "" {
				roles[item] = true
			}
		}
	case []any:
		for _, item := range v {
			if role, ok := item.(string); ok && role != "" {
				roles[role] = true
			}
		}
	}
	return roles
}

func (v *Verifier) rolesFromIntrospection(claims map[string]any) map[string]bool {
	rolesClaim := v.cfg.IntrospectionRolesClaim
	if rolesClaim == "" {
		rolesClaim = v.cfg.RolesClaim
	}
	roles := rolesFromClaim(claims[rolesClaim])
	if len(roles) == 0 && v.cfg.MapScopeToRoles {
		if scope, ok := claims["scope"].(string); ok {
			for _, item := range strings.Split(strings.TrimSpace(scope), " ") {
				if item != "" {
					roles[item] = true
				}
			}
		}
	}
	return roles
}

func (v *Verifier) verifyJWT(ctx context.Context, token string) (*Principal, error) {
	idToken, err := v.verifier.Verify(ctx, token)
	if err != nil {
		return nil, err
	}
	claims := map[string]any{}
	if err := idToken.Claims(&claims); err != nil {
		return nil, err
	}
	sub, _ := claims["sub"].(string)
	return &Principal{Sub: sub, Roles: rolesFromClaim(claims[v.cfg.RolesClaim]), Raw: token, TokenType: "jwt", Claims: claims}, nil
}

func (v *Verifier) getFromIntrospectionCache(token string) (map[string]any, bool) {
	v.cacheMu.Lock()
	defer v.cacheMu.Unlock()
	entry, ok := v.introspectionCache[token]
	if !ok || time.Now().After(entry.expiresAt) {
		delete(v.introspectionCache, token)
		return nil, false
	}
	return entry.payload, true
}

func (v *Verifier) storeInIntrospectionCache(token string, payload map[string]any, headers http.Header) {
	ttl := v.cfg.IntrospectionCacheTTL
	if cc := headers.Get("Cache-Control"); strings.Contains(strings.ToLower(cc), "max-age=") {
		parts := strings.Split(cc, ",")
		for _, part := range parts {
			part = strings.TrimSpace(strings.ToLower(part))
			if strings.HasPrefix(part, "max-age=") {
				var sec int
				if _, err := fmt.Sscanf(part, "max-age=%d", &sec); err == nil && sec >= 0 {
					ttl = time.Duration(sec) * time.Second
				}
			}
		}
	}
	v.cacheMu.Lock()
	defer v.cacheMu.Unlock()
	if _, ok := v.introspectionCache[token]; !ok {
		v.introspectionOrder = append(v.introspectionOrder, token)
	}
	v.introspectionCache[token] = introspectionEntry{payload: payload, expiresAt: time.Now().Add(ttl)}
	for len(v.introspectionOrder) > v.cfg.IntrospectionCacheSize {
		drop := v.introspectionOrder[0]
		v.introspectionOrder = v.introspectionOrder[1:]
		delete(v.introspectionCache, drop)
	}
}

func (v *Verifier) introspect(ctx context.Context, token string) (map[string]any, error) {
	if cached, ok := v.getFromIntrospectionCache(token); ok {
		return cached, nil
	}
	if v.cfg.IntrospectionURL == "" {
		return nil, errors.New("introspection disabled")
	}
	form := url.Values{}
	form.Set("token", token)
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, v.cfg.IntrospectionURL, strings.NewReader(form.Encode()))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	if v.cfg.IntrospectionClientID != "" && v.cfg.IntrospectionClientSecret != "" {
		req.SetBasicAuth(v.cfg.IntrospectionClientID, v.cfg.IntrospectionClientSecret)
	}
	resp, err := v.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode == http.StatusUnauthorized {
		return nil, errors.New("introspection unauthorized")
	}
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		body, _ := io.ReadAll(resp.Body)
		return nil, errors.New("introspection failed: " + strings.TrimSpace(string(body)))
	}
	payload := map[string]any{}
	if err := json.NewDecoder(resp.Body).Decode(&payload); err != nil {
		return nil, err
	}
	active, _ := payload["active"].(bool)
	if !active {
		return nil, errors.New("token inactive")
	}
	v.storeInIntrospectionCache(token, payload, resp.Header)
	return payload, nil
}

func (v *Verifier) VerifyBearer(ctx context.Context, token string) (*Principal, error) {
	if isJWTLike(token) {
		p, err := v.verifyJWT(ctx, token)
		if err == nil {
			return p, nil
		}
		if v.cfg.IntrospectionURL != "" {
			if payload, ierr := v.introspect(ctx, token); ierr == nil {
				sub, _ := payload["sub"].(string)
				return &Principal{Sub: sub, Roles: v.rolesFromIntrospection(payload), Raw: token, TokenType: "opaque", Claims: payload}, nil
			}
		}
		return nil, err
	}
	payload, err := v.introspect(ctx, token)
	if err != nil {
		return nil, err
	}
	sub, _ := payload["sub"].(string)
	return &Principal{Sub: sub, Roles: v.rolesFromIntrospection(payload), Raw: token, TokenType: "opaque", Claims: payload}, nil
}

func AuthMiddleware(verifier *Verifier) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authz := r.Header.Get("Authorization")
			if authz == "" || !strings.HasPrefix(authz, "Bearer ") {
				WriteProblem(w, r, http.StatusUnauthorized, "Unauthorized", "Missing bearer token")
				return
			}
			raw := strings.TrimPrefix(authz, "Bearer ")
			principal, err := verifier.VerifyBearer(r.Context(), raw)
			if err != nil {
				WriteProblem(w, r, http.StatusUnauthorized, "Unauthorized", "Invalid token")
				return
			}
			next.ServeHTTP(w, r.WithContext(context.WithValue(r.Context(), principalKey, principal)))
		})
	}
}

func RequireRoles(required ...string) func(http.Handler) http.Handler {
	requiredSet := map[string]bool{}
	for _, role := range required {
		requiredSet[role] = true
	}
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			principal, ok := PrincipalFromContext(r.Context())
			if !ok {
				WriteProblem(w, r, http.StatusUnauthorized, "Unauthorized", "No principal in context")
				return
			}
			if len(requiredSet) > 0 {
				allowed := false
				for role := range requiredSet {
					if principal.Roles[role] {
						allowed = true
						break
					}
				}
				if !allowed {
					WriteProblem(w, r, http.StatusForbidden, "Forbidden", "Insufficient role")
					return
				}
			}
			next.ServeHTTP(w, r)
		})
	}
}

var ErrForbidden = errors.New("forbidden")
