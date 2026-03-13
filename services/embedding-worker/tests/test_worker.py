import base64

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def _base_request() -> dict:
    return {
        'job_id': 'job-1',
        'tenant_id': 'tenant-a',
        'traceparent': '00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01',
        'policy_scope': 'budget.reallocation',
        'classification': 'internal',
        'inputs': [{'kind': 'text', 'text': 'hello world'}],
    }


def test_validate_bad_mime() -> None:
    req = _base_request()
    req['inputs'] = [
        {
            'kind': 'image',
            'mime_type': 'image/gif',
            'bytes_base64': base64.b64encode(b'img').decode('utf-8'),
        }
    ]

    resp = client.post('/embed', json=req)
    assert resp.status_code == 400
    body = resp.json()
    assert body['title'] == 'Unsupported MIME'
    assert body['status'] == 400


def test_missing_traceparent() -> None:
    req = _base_request()
    req.pop('traceparent')

    resp = client.post('/embed', json=req)
    assert resp.status_code == 400
    body = resp.json()
    assert body['title'] == 'Invalid Request'
    assert 'errors' in body


def test_success_text_only() -> None:
    req = _base_request()

    resp = client.post('/embed', json=req)
    assert resp.status_code == 200
    body = resp.json()
    assert body['job_id'] == 'job-1'
    assert body['status'] == 'completed'
    assert body['vector_count'] == 1
    assert body['payload_hash']
    assert body['lineage_hash']


def test_success_multimodal_mock_mode() -> None:
    req = _base_request()
    req['job_id'] = 'job-2'
    req['inputs'] = [
        {'kind': 'text', 'text': 'operator note'},
        {'kind': 'image', 'mime_type': 'image/png', 'bytes_base64': base64.b64encode(b'pngdata').decode('utf-8')},
        {'kind': 'audio', 'mime_type': 'audio/mpeg', 'bytes_base64': base64.b64encode(b'mp3data').decode('utf-8')},
    ]

    resp = client.post('/embed', json=req)
    assert resp.status_code == 200
    body = resp.json()
    assert body['vector_count'] == 3
    assert body['warnings']
    assert 'mock mode' in body['warnings'][0].lower()


def test_problem_details_error_shape() -> None:
    resp = client.get('/artifacts/missing-job')
    assert resp.status_code == 404
    assert resp.headers['content-type'].startswith('application/problem+json')
    body = resp.json()
    assert set(['type', 'title', 'status', 'detail']).issubset(body.keys())
