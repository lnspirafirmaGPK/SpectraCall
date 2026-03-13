from __future__ import annotations

import hashlib

from app.contracts import EmbedRequest


def compute_lineage_hash(request: EmbedRequest, payload_hash: str, parent_hash: str | None = None) -> str:
    base = '|'.join(
        [
            request.job_id,
            request.tenant_id,
            request.traceparent,
            request.policy_scope,
            request.classification,
            payload_hash,
            parent_hash or '',
        ]
    )
    return hashlib.sha256(base.encode('utf-8')).hexdigest()
