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
