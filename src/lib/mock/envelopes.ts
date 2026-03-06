import { Envelope } from '../types/aetherbus';

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
  },
  {
    flow_id: 'flow-101',
    task_id: 'task-502',
    parent_id: 'task-501',
    agent_id: 'agent-002',
    intent: 'ADJUST_EXPOSURE',
    payload: { adjustment: -50000 },
    timestamp: new Date().toISOString(),
    signature: 'sig_502_verified',
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
