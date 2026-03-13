import { Envelope } from '../types/aetherbus';
import { AsiEnvelope, BudgetReallocationDecisionData } from '../types/envelope';

// Legacy workspace dashboard envelope data.
export const mockEnvelopes: Envelope[] = [
  {
    flow_id: 'flow-101',
    task_id: 'task-501',
    parent_id: null,
    agent_id: 'agent-001',
    intent: 'ANALYZE_MARKET_DRIFT',
    payload: { sector: 'Tech', variance: 0.15 },
    timestamp: new Date().toISOString(),
    signature: 'sig_501_verified',
    context: {
      priority: 'high',
      ttl: 300,
      trace_level: 'verbose'
    },
    metadata: {
      version: '1.0',
      encoding: 'json'
    }
  }
];

// Canonical CloudEvents-compatible ASI envelopes.
export const mockAsiEnvelopes: AsiEnvelope<BudgetReallocationDecisionData>[] = [
  {
    specversion: '1.0',
    type: 'asi.budget.reallocation.proposed',
    source: '/planes/data/workers/budget-worker',
    id: 'evt-budget-501',
    time: new Date().toISOString(),
    subject: 'budget-request-501',
    datacontenttype: 'application/json',
    traceparent: '00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01',
    asi: {
      agent_id: 'agent-budget-01',
      policy_scope: 'finance.budget.reallocation',
      classification: 'internal',
      lineage_hash: 'sha256:lineage-budget-501',
      payload_hash: 'sha256:payload-budget-501',
      schema_ref: 'urn:schema:asi:budget-reallocation:v1',
      delivery: 'at-least-once'
    },
    data: {
      requestId: 'REQ-501',
      amount: 250000,
      currency: 'USD',
      fromAccount: 'OPEX-CORE',
      toAccount: 'CLOUD-BURST',
      reason: 'Traffic burst coverage for APAC expansion',
      riskScore: 0.18,
      evidenceRefs: ['evidence-bundle-501']
    }
  }
];
