# OIDC/JWT + Introspection Fallback Sequence

เอกสารนี้สรุปลำดับการตรวจสอบสิทธิ์สำหรับ API scaffold ทั้งฝั่ง **FastAPI** และ **Go** ตามการตั้งค่า OIDC verifier ปัจจุบัน
(ตรวจสอบ JWT ก่อน และ fallback ไป introspection เมื่อโทเค็นเป็น opaque หรือยืนยันลายเซ็นไม่ได้หลัง retry ตามนโยบาย)

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant API as API (FastAPI/Go)
    participant OIDC as OIDC Provider
    participant J as JWKS Cache
    participant I as Introspection Cache

    C->>API: Request + Bearer Token
    API->>API: Parse Authorization header
    API->>API: Token looks like JWT?

    alt JWT candidate
        API->>J: Get discovery + JWKS (respect max-age/ETag)
        J-->>API: Cached keys or refreshed keys
        API->>API: Verify iss/aud/exp/nbf/signature

        alt JWT valid
            API->>API: Extract Principal + roles/scopes
            API-->>C: 2xx (authorized)
        else JWT invalid after rotation retry
            API->>I: Check introspection cache (LRU/TTL)
            alt cache hit active=true
                I-->>API: Principal payload
                API-->>C: 2xx (authorized)
            else cache miss/expired
                API->>OIDC: RFC7662 introspection
                OIDC-->>API: active + claims/roles
                API->>I: Store response by TTL
                alt active=true
                    API-->>C: 2xx (authorized)
                else inactive/denied
                    API-->>C: 401 ProblemDetails
                end
            end
        end
    else Opaque token
        API->>I: Check introspection cache
        alt cache hit active=true
            I-->>API: Principal payload
            API-->>C: 2xx (authorized)
        else cache miss
            API->>OIDC: RFC7662 introspection
            OIDC-->>API: active + claims/roles
            API->>I: Cache result with TTL
            alt active=true
                API-->>C: 2xx (authorized)
            else inactive/denied
                API-->>C: 401 ProblemDetails
            end
        end
    end

    API->>API: Apply role guard (RequireRoles)
    alt role missing
        API-->>C: 403 ProblemDetails
    end
```

## หมายเหตุการใช้งาน

- ควรกำหนดเวลาแคชจาก `Cache-Control` ของ discovery/JWKS และรองรับ `ETag` เพื่อลดปริมาณทราฟฟิกไปยัง IdP
- introspection cache ควรใช้ TTL ตาม `exp` ของ token (ถ้ามี) หรือ fallback TTL จาก config
- ควรคืน error ตามรูปแบบ ProblemDetails/RFC7807 ให้สอดคล้องกันทุก service
