from fastapi.testclient import TestClient

from app.deps.auth import Principal, verifier
from app.main import app


async def _allow_ops_admin(_token: str) -> Principal:
    return Principal(
        sub="test-user",
        roles=("OPS_ADMIN",),
        token="test-token",
        token_type="jwt",
        claims={},
    )


def test_latency_evaluation_accepts_numeric_payload(monkeypatch):
    monkeypatch.setattr(verifier, "verify", _allow_ops_admin)
    client = TestClient(app)

    response = client.post(
        "/v1/internal/latency-evaluation",
        headers={"Authorization": "Bearer test-token"},
        json={"api_gateway": 1.2, "event_bus": 0.9},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["overall_pass"] is True
    assert body["stages"]["api_gateway"]["observed_ms"] == 1.2
    assert body["stages"]["event_bus"]["observed_ms"] == 0.9


def test_latency_evaluation_rejects_non_numeric_values(monkeypatch):
    monkeypatch.setattr(verifier, "verify", _allow_ops_admin)
    client = TestClient(app)

    response = client.post(
        "/v1/internal/latency-evaluation",
        headers={"Authorization": "Bearer test-token"},
        json={"api_gateway": "not-a-number"},
    )

    assert response.status_code == 422


def test_latency_evaluation_rejects_unknown_stage(monkeypatch):
    monkeypatch.setattr(verifier, "verify", _allow_ops_admin)
    client = TestClient(app)

    response = client.post(
        "/v1/internal/latency-evaluation",
        headers={"Authorization": "Bearer test-token"},
        json={"anything": 1.0},
    )

    assert response.status_code == 422
