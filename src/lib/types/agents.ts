export type AgentStatus = 'online' | 'offline' | 'busy' | 'error';

export interface AgentCapability {
  name: string;
  description: string;
  permissions: string[];
}

export interface AgentRegistryEntry {
  id: string;
  name: string;
  role: string;
  capabilities: AgentCapability[];
  public_key: string;
  trust_score: number;
  status: AgentStatus;
  last_active: string;
}
