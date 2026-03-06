import { AgentRegistryEntry } from '../types/agents';

export const mockAgents: AgentRegistryEntry[] = [
  {
    id: 'agent-001',
    name: 'Strategic Intelligence',
    role: 'Risk Analysis',
    capabilities: [
      { name: 'Predictive Modeling', description: 'Forecasts potential system failures.', permissions: ['read:all', 'write:diagnostics'] },
      { name: 'Threat Detection', description: 'Identifies security anomalies.', permissions: ['read:security'] }
    ],
    public_key: '0xabc123...',
    trust_score: 0.98,
    status: 'online',
    last_active: new Date().toISOString()
  },
  {
    id: 'agent-002',
    name: 'Tactical Operations',
    role: 'Automation',
    capabilities: [
      { name: 'Workflow Orchestration', description: 'Executes complex task sequences.', permissions: ['execute:workflow'] },
      { name: 'Resource Scaling', description: 'Manages cloud infrastructure.', permissions: ['write:infra'] }
    ],
    public_key: '0xdef456...',
    trust_score: 0.95,
    status: 'busy',
    last_active: new Date().toISOString()
  },
  {
    id: 'agent-003',
    name: 'Data Summarizer',
    role: 'Reporting',
    capabilities: [
      { name: 'NLP Summarization', description: 'Generates human-readable reports from logs.', permissions: ['read:logs'] }
    ],
    public_key: '0xghi789...',
    trust_score: 0.92,
    status: 'online',
    last_active: new Date().toISOString()
  }
];
