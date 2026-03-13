from __future__ import annotations

import base64
import hashlib
import json

from app.contracts import AudioInput, EmbedRequest, ImageInput, TextInput


def _canonical_inputs(request: EmbedRequest) -> list[dict]:
    output: list[dict] = []
    for item in request.inputs:
        if isinstance(item, TextInput):
            output.append({'kind': 'text', 'text': item.text})
        elif isinstance(item, ImageInput):
            decoded = base64.b64decode(item.bytes_base64)
            output.append({'kind': 'image', 'mime_type': item.mime_type, 'sha256': hashlib.sha256(decoded).hexdigest()})
        elif isinstance(item, AudioInput):
            decoded = base64.b64decode(item.bytes_base64)
            output.append({'kind': 'audio', 'mime_type': item.mime_type, 'sha256': hashlib.sha256(decoded).hexdigest()})
    return output


def compute_payload_hash(request: EmbedRequest) -> str:
    payload = {
        'tenant_id': request.tenant_id,
        'policy_scope': request.policy_scope,
        'classification': request.classification,
        'inputs': _canonical_inputs(request),
    }
    encoded = json.dumps(payload, sort_keys=True, separators=(',', ':')).encode('utf-8')
    return hashlib.sha256(encoded).hexdigest()
