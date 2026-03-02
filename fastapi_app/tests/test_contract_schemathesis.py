import schemathesis
from fastapi.testclient import TestClient

from app.main import app


def test_healthz_auth_contract_smoke():
    schema = schemathesis.openapi.from_path("openapi.inspectra.yaml")
    operation = schema["/v1/alerts"]["get"]
    case = operation.Case(headers={"Authorization": "Bearer opaque-token"})

    client = TestClient(app)
    response = client.request(case.method, case.formatted_path, headers=case.headers)

    # Contract smoke for auth edge path: structured auth failure accepted; no 5xx.
    assert response.status_code < 500
    if response.status_code >= 400:
        body = response.json()
        assert {"type", "title", "status", "detail", "request_id"}.issubset(body.keys())
