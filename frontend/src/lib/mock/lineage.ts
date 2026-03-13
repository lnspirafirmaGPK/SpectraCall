import { LineageRecord } from '../types/lineage';

export const mockLineageRecords: LineageRecord[] = [
  {
    id: 'lin-evt-budget-501',
    envelope_id: 'evt-budget-501',
    hash: 'sha256:lineage-budget-501',
    payload_hash: 'sha256:payload-budget-501',
    agent_id: 'agent-budget-01',
    plane: 'Data',
    timestamp: new Date().toISOString(),
    proof_available: true,
    replay_ref: 'replay-budget-501'
  },
  {
    id: 'lin-evt-policy-501',
    envelope_id: 'evt-policy-501',
    hash: 'sha256:lineage-policy-501',
    parent_hash: 'sha256:lineage-budget-501',
    payload_hash: 'sha256:payload-policy-501',
    agent_id: 'agent-policy-01',
    plane: 'Governance',
    timestamp: new Date().toISOString(),
    proof_available: true
  }
];
