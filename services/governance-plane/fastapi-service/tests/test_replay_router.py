from fastapi.testclient import TestClient

from app.deps.auth import Principal, verifier
from app.main import app


async def _allow_auditor(_token: str) -> Principal:
    return Principal(
        sub="auditor-user",
        roles=("AUDITOR",),
        token="test-token",
        token_type="jwt",
        claims={},
    )


def test_get_replay_by_decision_returns_contract_shape(monkeypatch):
    monkeypatch.setattr(verifier, "verify", _allow_auditor)
    client = TestClient(app)

    response = client.get("/v1/replay/decisions/DEC-STUB", headers={"Authorization": "Bearer test-token"})

    assert response.status_code == 200
    body = response.json()
    assert body["decision_id"] == "DEC-STUB"
    assert body["trace_id"] == "TRC-STUB"
    assert any(step["step"] == "CONTEXT" and step["present"] is True for step in body["steps"])


def test_create_replay_view_rejects_mismatched_decision_and_trace(monkeypatch):
    monkeypatch.setattr(verifier, "verify", _allow_auditor)
    client = TestClient(app)

    response = client.post(
        "/v1/replay/views",
        headers={"Authorization": "Bearer test-token"},
        json={"decision_id": "DEC-OTHER", "trace_id": "TRC-STUB"},
    )

    assert response.status_code == 400


def test_create_annotation_is_idempotent_with_header(monkeypatch):
    monkeypatch.setattr(verifier, "verify", _allow_auditor)
    client = TestClient(app)

    payload = {"step": "ACTION", "note": "Approved with oversight", "tags": ["risk", "ops"]}
    headers = {"Authorization": "Bearer test-token", "Idempotency-Key": "idem-123"}

    first = client.post("/v1/replay/traces/TRC-STUB/annotations", headers=headers, json=payload)
    second = client.post("/v1/replay/traces/TRC-STUB/annotations", headers=headers, json=payload)

    assert first.status_code == 201
    assert second.status_code == 201
    assert first.json()["annotation_id"] == second.json()["annotation_id"]


def test_export_rejects_invalid_format(monkeypatch):
    monkeypatch.setattr(verifier, "verify", _allow_auditor)
    client = TestClient(app)

    response = client.get(
        "/v1/replay/traces/TRC-STUB/export?format=xml",
        headers={"Authorization": "Bearer test-token"},
    )

    assert response.status_code == 422


def test_get_trace_returns_404_for_unknown_trace(monkeypatch):
    monkeypatch.setattr(verifier, "verify", _allow_auditor)
    client = TestClient(app)

    response = client.get("/v1/replay/traces/TRC-MISSING", headers={"Authorization": "Bearer test-token"})

    assert response.status_code == 404
