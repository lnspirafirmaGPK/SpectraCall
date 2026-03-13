import { AsiEnvelope, BudgetReallocationDecisionData } from '../types/envelope';
import { mockPolicyChecks } from './policy-checks';
import { mockLineageRecords } from './lineage';

export const mockBudgetReallocationEnvelope: AsiEnvelope<BudgetReallocationDecisionData> = {
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
};

export const mockBudgetReallocationRun = {
  envelope: mockBudgetReallocationEnvelope,
  policyCheck: mockPolicyChecks[0],
  lineage: mockLineageRecords
};
