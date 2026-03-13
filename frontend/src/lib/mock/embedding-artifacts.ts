import { EmbeddingArtifact, EvidenceBundle } from '../types/embeddings';

export const mockEmbeddingArtifacts: EmbeddingArtifact[] = [
  {
    artifact_id: 'emb-artifact-501',
    source_event_id: 'evt-budget-501',
    modality: 'text',
    embedding_model: 'gemini-embedding-001',
    vector_ref: 'vec://finance/budget/501',
    dimensions: 3072,
    classification: 'internal',
    policy_scope: 'finance.budget.reallocation',
    lineage_hash: 'sha256:lineage-budget-501',
    created_at: new Date().toISOString(),
    retention_until: '2030-01-01T00:00:00.000Z'
  }
];

export const mockEvidenceBundles: EvidenceBundle[] = [
  {
    bundle_id: 'evidence-bundle-501',
    artifact_ids: ['emb-artifact-501'],
    summary: 'Historic allocation patterns and anomaly context for APAC scale-out.',
    confidence: 0.81,
    generated_by: 'embedding-worker'
  }
];
