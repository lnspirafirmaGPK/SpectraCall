package auth

import (
	"testing"
)

func TestRolesFromClaim(t *testing.T) {
	roles := rolesFromClaim([]any{"OPS_ADMIN", "AUDITOR"})
	if !roles["OPS_ADMIN"] || !roles["AUDITOR"] {
		t.Fatalf("expected roles map to include values")
	}
}

func TestJWTLikeDetector(t *testing.T) {
	if !isJWTLike("a.b.c") {
		t.Fatalf("expected jwt-like token")
	}
	if isJWTLike("opaque") {
		t.Fatalf("expected opaque token detection")
	}
}
