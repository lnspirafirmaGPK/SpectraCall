from __future__ import annotations

import base64
import time
from typing import Any

from fastapi import FastAPI

from app.config import get_settings
from app.contracts import AudioInput, EmbedRequest, EmbedResponse, ImageInput
from app.hash_utils import compute_payload_hash
from app.lineage import compute_lineage_hash
from app.policy import run_policy_precheck
from app.problem import ProblemException, register_problem_handlers
from app.providers.google_embed import GoogleEmbeddingProvider
from app.storage import FileArtifactStorage, InMemoryArtifactStorage

settings = get_settings()
provider = GoogleEmbeddingProvider(settings)
storage = FileArtifactStorage(settings.embedding_artifact_dir) if settings.embedding_artifact_dir else InMemoryArtifactStorage()

app = FastAPI(title='SpectraCall Embedding Worker', version='0.1.0')
register_problem_handlers(app)


def _decode_and_validate_inputs(request: EmbedRequest) -> None:
    total_bytes = 0
    for item in request.inputs:
        if isinstance(item, ImageInput):
            if item.mime_type not in settings.allowed_image_mime:
                raise ProblemException(
                    title='Unsupported MIME',
                    detail=f'Unsupported image mime_type: {item.mime_type}',
                    status=400,
                    type_='https://spectracall.dev/problems/unsupported-mime',
                )
            try:
                raw = base64.b64decode(item.bytes_base64, validate=True)
            except Exception as exc:  # noqa: BLE001
                raise ProblemException(
                    title='Invalid Base64',
                    detail='image bytes_base64 is not valid base64',
                    status=400,
                    type_='https://spectracall.dev/problems/invalid-base64',
                ) from exc
            total_bytes += len(raw)
        if isinstance(item, AudioInput):
            if item.mime_type not in settings.allowed_audio_mime:
                raise ProblemException(
                    title='Unsupported MIME',
                    detail=f'Unsupported audio mime_type: {item.mime_type}',
                    status=400,
                    type_='https://spectracall.dev/problems/unsupported-mime',
                )
            try:
                raw = base64.b64decode(item.bytes_base64, validate=True)
            except Exception as exc:  # noqa: BLE001
                raise ProblemException(
                    title='Invalid Base64',
                    detail='audio bytes_base64 is not valid base64',
                    status=400,
                    type_='https://spectracall.dev/problems/invalid-base64',
                ) from exc
            total_bytes += len(raw)

    if total_bytes > settings.embedding_max_bytes:
        raise ProblemException(
            title='Payload Too Large',
            detail=f'Total binary payload exceeded EMBEDDING_MAX_BYTES ({settings.embedding_max_bytes})',
            status=413,
            type_='https://spectracall.dev/problems/payload-too-large',
        )


@app.get('/healthz')
def healthz() -> dict[str, str]:
    return {'status': 'ok'}


@app.post('/embed', response_model=EmbedResponse)
def embed(request: EmbedRequest) -> EmbedResponse:
    _decode_and_validate_inputs(request)
    run_policy_precheck(request)

    payload_hash = compute_payload_hash(request)
    parent_hash = None
    lineage_hash = compute_lineage_hash(request, payload_hash=payload_hash, parent_hash=parent_hash)

    result = provider.embed(request)

    artifact: dict[str, Any] = {
        'job_id': request.job_id,
        'tenant_id': request.tenant_id,
        'traceparent': request.traceparent,
        'tracestate': request.tracestate,
        'policy_scope': request.policy_scope,
        'classification': request.classification,
        'created_at': int(time.time()),
        'model': result.model,
        'vector_count': len(result.vectors),
        'dimensions': result.dimensions,
        'payload_hash': payload_hash,
        'lineage_hash': lineage_hash,
        'vectors': result.vectors,
        'warnings': result.warnings,
    }
    storage.save(request.job_id, artifact)

    return EmbedResponse(
        job_id=request.job_id,
        model=result.model,
        status='completed',
        artifacts={'artifact_uri': f'/artifacts/{request.job_id}'},
        embeddings={'vector_count': len(result.vectors), 'dimensions': result.dimensions},
        vector_count=len(result.vectors),
        dimensions=result.dimensions,
        payload_hash=payload_hash,
        lineage_hash=lineage_hash,
        parent_hash=parent_hash,
        traceparent=request.traceparent,
        policy_scope=request.policy_scope,
        classification=request.classification,
        warnings=result.warnings or None,
    )


@app.get('/artifacts/{job_id}')
def get_artifact(job_id: str) -> dict[str, Any]:
    artifact = storage.get(job_id)
    if artifact is None:
        raise ProblemException(
            title='Artifact Not Found',
            detail=f'No artifact found for job_id={job_id}',
            status=404,
            type_='https://spectracall.dev/problems/artifact-not-found',
        )
    return artifact
