import {
  UserProfile,
  GeneralSettings,
  PersonalAISettings,
  GovernancePolicy,
  AuditLog,
  Integration,
  ApiKey,
  NotificationSettings,
  BillingInfo
} from '../types/settings';
import { AgentRegistryEntry } from '../types/agents';

export const mockUserProfile: UserProfile = {
  id: 'user-1',
  name: 'Somchai Jaidee',
  email: 'somchai@company.com',
  role: 'Admin',
  title: 'Marketing Manager',
  avatarUrl: 'https://i.pravatar.cc/150?u=somchai',
  digitalSignatureRegistered: true,
  twoFactorEnabled: true,
};

export const mockGeneralSettings: GeneralSettings = {
  language: 'th',
  theme: 'dark',
  timezone: '(GMT+7) Bangkok, Jakarta, Hanoi',
  dateFormat: 'DD/MM/YYYY',
  startupPage: 'dashboard',
};

export const mockPersonalAI: PersonalAISettings = {
  defaultAssistantId: 'agent-1',
  assistanceLevel: 'balanced',
  allowedTools: ['web-search', 'google-drive', 'email-send'],
};

export const mockPolicies: GovernancePolicy[] = [
  {
    id: 'pol-1',
    name: 'Data Access Policy',
    version: 'v2.3',
    lastEdited: '2026-03-01',
    status: 'active',
    description: 'Governs how data is accessed across the platform.',
  },
  {
    id: 'pol-2',
    name: 'Approval Policy',
    version: 'v1.1',
    lastEdited: '2026-02-15',
    status: 'active',
    description: 'Defines approval workflows for financial and legal decisions.',
  },
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-03-07T10:30:00Z',
    user: 'Somchai Jaidee',
    action: 'Modified Policy',
    resource: 'Data Access Policy',
    riskLevel: 'medium',
  },
  {
    id: 'log-2',
    timestamp: '2026-03-07T09:15:00Z',
    user: 'AI-Finance-Expert',
    action: 'Approved Transaction',
    resource: 'TX-99234',
    riskLevel: 'high',
  },
];

export const mockIntegrations: Integration[] = [
  {
    id: 'int-1',
    name: 'Microsoft 365',
    type: 'M365',
    status: 'connected',
    connectedAccount: 'somchai@company.com',
    scopes: ['calendar.read', 'mail.read', 'files.read'],
  },
  {
    id: 'int-2',
    name: 'Google Workspace',
    type: 'Google',
    status: 'disconnected',
  },
  {
    id: 'int-3',
    name: 'SAP',
    type: 'SAP',
    status: 'connected',
  },
  {
    id: 'int-4',
    name: 'Salesforce',
    type: 'Salesforce',
    status: 'pending',
  },
];

export const mockApiKeys: ApiKey[] = [
  {
    id: 'key-1',
    name: 'Production API Key',
    prefix: 'asi_live_...',
    scope: 'all',
    expiresAt: '2027-03-07',
  },
];

export const mockNotifications: NotificationSettings = {
  channels: {
    inApp: true,
    email: true,
    line: false,
    telegram: false,
  },
  triggers: {
    aiResponse: true,
    newMeetingMessage: true,
    approvalRequired: true,
    highRiskDecision: true,
    newRelevantAgent: false,
    dailySummary: false,
  },
  quietHours: {
    enabled: true,
    start: '20:00',
    end: '07:00',
  },
};

export const mockBilling: BillingInfo = {
  plan: 'Enterprise Plan',
  expiryDate: '2026-12-31',
  usage: {
    messages: { current: 12450, limit: 50000 },
    files: { current: 234, limit: 1000 },
    rooms: { current: 45, limit: 100 },
    agentCalls: { current: 3200, limit: 10000 },
  },
  estimatedCost: 2500,
  baseCost: 2500,
  overageCost: 0,
  invoices: [
    { id: 'INV-2026-02', date: 'Feb 2026', amount: 2500, url: '#' },
    { id: 'INV-2026-01', date: 'Jan 2026', amount: 2500, url: '#' },
  ],
  paymentMethod: {
    type: 'Visa',
    last4: '1234',
  },
};

export const mockOrganizationAgents: AgentRegistryEntry[] = [
  {
    id: 'agent-fin-1',
    name: 'Finance-Expert',
    role: 'Financial Analyst',
    level: 'Expert',
    department: 'Finance',
    status: 'online',
    last_active: '2026-03-07',
    accuracy: 94.5,
    trust_score: 0.98,
    public_key: '0xabc...',
    capabilities: [
      { name: 'Financial Analysis', description: 'Analyze statements', permissions: [] }
    ],
    avatar_url: 'https://i.pravatar.cc/150?u=fin-expert'
  },
  {
    id: 'agent-leg-1',
    name: 'Legal-Staff',
    role: 'Legal Assistant',
    level: 'Staff',
    department: 'Legal',
    status: 'online',
    last_active: '2026-03-05',
    accuracy: 92.0,
    trust_score: 0.95,
    public_key: '0xdef...',
    capabilities: [
      { name: 'Contract Review', description: 'Review basic contracts', permissions: [] }
    ],
    avatar_url: 'https://i.pravatar.cc/150?u=leg-staff'
  }
];
