import type { AsiClassification } from './envelope';

export interface EmbeddingArtifact {
  artifact_id: string;
  source_event_id: string;
  modality: 'text' | 'image' | 'audio' | 'video';
  embedding_model: string;
  vector_ref: string;
  dimensions: number;
  classification: AsiClassification;
  policy_scope: string;
  lineage_hash: string;
  created_at: string;
  retention_until?: string;
}

export interface EvidenceBundle {
  bundle_id: string;
  artifact_ids: string[];
  summary: string;
  confidence: number;
  generated_by: string;
}
