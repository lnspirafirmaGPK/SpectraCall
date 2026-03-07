import { AgentRegistryEntry, AgentLevel } from './agents';

export type UserRole = 'Member' | 'Admin' | 'Compliance' | 'Owner';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  avatarUrl: string;
  digitalSignatureRegistered: boolean;
  twoFactorEnabled: boolean;
}

export interface GeneralSettings {
  language: 'th' | 'en';
  theme: 'light' | 'dark' | 'auto';
  timezone: string;
  dateFormat: string;
  startupPage: 'dashboard' | 'chat' | 'meeting';
}

export interface PersonalAISettings {
  defaultAssistantId: string;
  assistanceLevel: 'balanced' | 'proactive' | 'reactive';
  allowedTools: string[];
}

export interface GovernancePolicy {
  id: string;
  name: string;
  version: string;
  lastEdited: string;
  status: 'active' | 'inactive';
  description: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Integration {
  id: string;
  name: string;
  type: 'M365' | 'Google' | 'Zoho' | 'SAP' | 'Salesforce';
  status: 'connected' | 'disconnected' | 'pending' | 'error';
  connectedAccount?: string;
  scopes?: string[];
}

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  scope: string;
  expiresAt: string;
}

export interface NotificationSettings {
  channels: {
    inApp: boolean;
    email: boolean;
    line: boolean;
    telegram: boolean;
  };
  triggers: {
    aiResponse: boolean;
    newMeetingMessage: boolean;
    approvalRequired: boolean;
    highRiskDecision: boolean;
    newRelevantAgent: boolean;
    dailySummary: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export interface BillingInfo {
  plan: string;
  expiryDate: string;
  usage: {
    messages: { current: number; limit: number };
    files: { current: number; limit: number };
    rooms: { current: number; limit: number };
    agentCalls: { current: number; limit: number };
  };
  estimatedCost: number;
  baseCost: number;
  overageCost: number;
  invoices: {
    id: string;
    date: string;
    amount: number;
    url: string;
  }[];
  paymentMethod: {
    type: string;
    last4: string;
  };
}
