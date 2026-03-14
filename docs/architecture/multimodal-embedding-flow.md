# Multimodal Embedding Flow (Data Plane Only)

## Principle
Gemini embedding and related multimodal embedding calls are executed only by Data Plane workers. The browser UI only requests or visualizes resulting artifacts.

## Flow Outline
1. Source artifact arrives (document/image/audio metadata) with ASI envelope.
2. Data Plane worker normalizes content and calls embedding provider.
3. Worker stores vectors and evidence metadata in vector memory.
4. Worker publishes `asi.embedding.artifact.created` envelope containing references, not raw secrets.
5. Control Plane presents evidence cards for operator review in context of a decision.

## Evidence/Context Layer Usage
- Embeddings assist retrieval and explanation.
- Final execution authority still comes from policy + approval + deterministic business checks.
- Embedding confidence alone cannot trigger privileged actions.

## Required Metadata
- `schema_ref` for artifact payload schema
- `policy_scope` of downstream use
- `classification` and retention policy
- `lineage_hash` link to upstream decision/request

## Sample Payloads

### 1) Embedding proposal request (`POST /api/embeddings/propose`)
```json
{
  "evidence": "text:APAC spike\nimage:img://capacity.png\naudio:aud://incident.wav",
  "subject": "budget-reallocation-request-mvp",
  "classification": "restricted",
  "policy_scope": "finance.global",
  "metadata": {
    "evidence_count": 3
  }
}
```

### 2) Context retrieval response (`POST /api/context/search`)
```json
{
  "success": true,
  "event_type": "asi.context.indexed",
  "query": "APAC spike budget transfer",
  "count": 2,
  "hits": [
    {
      "id": "ctx-1",
      "score": 0.88,
      "snippet": "APAC traffic surge increased cloud spend and required emergency reallocation.",
      "provenance": {
        "source": "ops-telemetry:apac-surge",
        "event_type": "asi.context.indexed",
        "artifact_ref": "emb-artifact-mock"
      }
    }
  ],
  "provider": "in-memory-similarity",
  "vendor_bound": false
}
```

### 3) Review action request (`POST /api/decisions/[id]/review`)
```json
{
  "action": "approve",
  "approverId": "finance-controller-1",
  "comment": "Approved for APAC burst continuity"
}
```
