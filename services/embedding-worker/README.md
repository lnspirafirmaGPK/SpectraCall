# Embedding Worker (Data Plane)

`embedding-worker` is a standalone FastAPI service for multimodal embedding generation in the **Data Plane**.
It is intentionally separated from the SpectraCall browser/UI surface.

## Why this service exists
- Browser clients must **not** call Gemini directly.
- Control/API layer dispatches embedding jobs to this worker.
- Worker performs payload checks, policy precheck hook, and lineage hashing before provider execution.
- Worker returns artifact-friendly responses and stores artifacts for replay/evidence workflows.

## Endpoints
1. `GET /healthz`
2. `POST /embed`
3. `GET /artifacts/{job_id}`
4. `GET /openapi.json`

## Environment variables
- `GEMINI_API_KEY`: Google GenAI API key. If not set, service runs in mock mode.
- `GEMINI_EMBED_MODEL`: embedding model name (default: `gemini-embedding-2-preview`).
- `EMBEDDING_MAX_BYTES`: max combined image/audio bytes after base64 decode.
- `EMBEDDING_ALLOWED_IMAGE_MIME`: comma-separated allowlist (default: `image/png,image/jpeg`).
- `EMBEDDING_ALLOWED_AUDIO_MIME`: comma-separated allowlist (default: `audio/mpeg,audio/wav`).
- `EMBEDDING_ARTIFACT_DIR`: optional filesystem directory for artifact persistence (otherwise in-memory).

## Run locally
```bash
cd services/embedding-worker
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8090
```

## Sample request
```json
{
  "job_id": "job-123",
  "tenant_id": "tenant-alpha",
  "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01",
  "tracestate": "vendor=value",
  "policy_scope": "budget.reallocation",
  "classification": "internal",
  "inputs": [
    { "kind": "text", "text": "Shift budget from cluster A to cluster B" },
    { "kind": "image", "mime_type": "image/png", "bytes_base64": "aW1hZ2UtYnl0ZXM=" },
    { "kind": "audio", "mime_type": "audio/mpeg", "bytes_base64": "YXVkaW8tYnl0ZXM=" }
  ]
}
```

## Sample response
```json
{
  "job_id": "job-123",
  "model": "gemini-embedding-2-preview:mock",
  "status": "completed",
  "artifacts": { "artifact_uri": "/artifacts/job-123" },
  "embeddings": { "vector_count": 3, "dimensions": 8 },
  "vector_count": 3,
  "dimensions": 8,
  "payload_hash": "...",
  "lineage_hash": "...",
  "parent_hash": null,
  "traceparent": "00-...-...-01",
  "policy_scope": "budget.reallocation",
  "classification": "internal",
  "warnings": ["Running in mock mode because GEMINI_API_KEY is not set"]
}
```

## Mock fallback behavior
If `GEMINI_API_KEY` is missing:
- service still accepts valid requests,
- deterministic pseudo-vectors are generated per input,
- `model` is suffixed with `:mock`,
- warning explains mock mode in response/artifact.

## Current limitations
- Policy precheck is a placeholder hook, not full Governance Plane integration.
- Artifact backend supports in-memory or simple JSON files only.
- No async queue in this worker yet; control/API layer should orchestrate job dispatch/retries.
- No distributed tracing exporter yet (trace fields are preserved in artifacts/response).

## Fit in SpectraCall architecture
- **Control Plane/API** receives user/operator actions and submits embedding jobs.
- **Data Plane (this worker)** validates input + MIME + size, computes payload/lineage hashes, runs provider adapter.
- **Trust/Governance/Observability Planes** can consume stored artifact metadata for verification, policy evidence, and trace correlation.
