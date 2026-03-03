from fastapi import Depends, FastAPI
from fastapi.testclient import TestClient

from app.core.errors import install_exception_handlers
from app.deps.auth import OIDCVerifier, Principal, require_roles


def test_parse_cache_control_max_age():
    assert OIDCVerifier._parse_cache_control_max_age("public, max-age=120") == 120
    assert OIDCVerifier._parse_cache_control_max_age("no-cache") is None


def test_problem_details_on_unauthorized():
    app = FastAPI()
    install_exception_handlers(app)

    @app.get("/secure")
    async def secure(_p: Principal = Depends(require_roles(["OPS_ADMIN"]))):
        return {"ok": True}

    client = TestClient(app)
    response = client.get("/secure")
    assert response.status_code == 401
    body = response.json()
    assert body["type"] == "about:blank"
    assert body["status"] == 401
    assert "request_id" in body
