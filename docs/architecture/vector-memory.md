# Vector Memory in ASI

Vector memory is a governed evidence store, not a standalone decision engine.

## Responsibilities
- Persist embeddings with provenance, lineage links, and retention metadata.
- Support semantic retrieval for context enrichment and replay investigations.
- Enforce access controls by classification and policy scope.

## Data Model Anchors
- `artifact_id`
- `embedding_model`
- `vector_ref`
- `lineage_hash`
- `source_event_id`
- `classification`
- `retention_until`

## Replay Integration
Replay tools must be able to reconstruct what evidence was available at decision time by:
- resolving vector references,
- applying retention/legal-hold constraints,
- and returning deterministic metadata snapshots.
