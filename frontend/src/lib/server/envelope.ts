import { createHash, randomUUID } from 'crypto';
import type { AsiEnvelope, AsiClassification } from '@/lib/types/envelope';
import { ensureTraceparent } from './trace';

export interface EmbeddingEvidenceInput {
  evidence: string;
  source?: string;
  subject?: string;
  classification?: AsiClassification;
  policy_scope?: string;
  parent_hash?: string;
  metadata?: Record<string, unknown>;
}

export function sha256Hash(data: unknown): string {
  const serialized = typeof data === 'string' ? data : JSON.stringify(data);
  return `sha256:${createHash('sha256').update(serialized).digest('hex')}`;
}

export function buildEmbeddingEnvelope(
  input: EmbeddingEvidenceInput,
  traceparent?: string | null
): AsiEnvelope<EmbeddingEvidenceInput> {
  const payloadHash = sha256Hash(input);
  const lineageHash = sha256Hash({ payloadHash, parentHash: input.parent_hash ?? null });

  return {
    specversion: '1.0',
    type: 'asi.embedding.requested',
    source: input.source ?? '/control-plane/embeddings/propose',
    id: `evt-${randomUUID()}`,
    time: new Date().toISOString(),
    subject: input.subject ?? 'embedding-evidence',
    datacontenttype: 'application/json',
    traceparent: ensureTraceparent(traceparent),
    asi: {
      agent_id: 'control-plane.embedding-router',
      policy_scope: input.policy_scope ?? 'finance.budget.reallocation',
      classification: input.classification ?? 'internal',
      lineage_hash: lineageHash,
      parent_hash: input.parent_hash,
      payload_hash: payloadHash,
      schema_ref: '/schemas/embedding-evidence-v1.json',
      delivery: 'at-least-once',
    },
    data: input,
  };
}
