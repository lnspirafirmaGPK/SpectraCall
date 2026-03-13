/**
 * Canonical ASI Envelope (CloudEvents 1.0 compatible).
 */

export type AsiClassification = 'public' | 'internal' | 'restricted';

export interface AsiTrustMetadata {
  agent_id: string;
  policy_scope: string;
  classification: AsiClassification;
  lineage_hash: string;
  parent_hash?: string;
  payload_hash: string;
  signature?: string;
  schema_ref: string;
  delivery: 'at-least-once';
}

export interface AsiEnvelope<T = unknown> {
  specversion: '1.0';
  type: string;
  source: string;
  id: string;
  time: string;
  subject?: string;
  datacontenttype: 'application/json';
  traceparent: string;
  tracestate?: string;
  asi: AsiTrustMetadata;
  data: T;
}

export interface BudgetReallocationDecisionData {
  requestId: string;
  amount: number;
  currency: string;
  fromAccount: string;
  toAccount: string;
  reason: string;
  riskScore: number;
  evidenceRefs?: string[];
}
