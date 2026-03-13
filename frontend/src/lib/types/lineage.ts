export interface LineageRecord {
  id: string;
  envelope_id: string;
  hash: string;
  parent_hash?: string;
  payload_hash: string;
  agent_id: string;
  plane: 'Control' | 'Data' | 'Trust' | 'Governance' | 'Observability';
  timestamp: string;
  proof_available: boolean;
  replay_ref?: string;
}

export interface ReplayRequest {
  replay_id: string;
  reason: string;
  requested_by: string;
  from_time: string;
  to_time?: string;
  envelope_ids: string[];
}
