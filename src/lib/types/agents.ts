export type AgentStatus = 'online' | 'offline' | 'busy' | 'error';
export type AgentLevel = 'Staff' | 'Expert' | 'Manager' | 'CFO' | 'Human';

export interface AgentCapability {
  name: string;
  description: string;
  permissions: string[];
}

export interface AgentRegistryEntry {
  id: string;
  name: string;
  role: string;
  level?: AgentLevel;
  department?: string;
  capabilities: AgentCapability[];
  public_key: string;
  trust_score: number;
  status: AgentStatus;
  last_active: string;
  experience?: string;
  accuracy?: number;
  tags?: string[];
  avatar_url?: string;
}
