export type EvidenceType = 'text' | 'image' | 'audio';

export interface EvidenceItem {
  id: string;
  type: EvidenceType;
  title: string;
  content: string;
  classification: 'internal' | 'restricted';
  createdAt: string;
}

export interface EvidenceContextHit {
  id: string;
  score: number;
  snippet: string;
  provenance: {
    source: string;
    event_type: string;
    artifact_ref: string;
  };
}

export interface BudgetProposalView {
  id: string;
  fromCostCenter: string;
  toCostCenter: string;
  proposedAmount: number;
  currency: 'USD';
  confidence: number;
  rationale: string;
  linkedEvidenceIds: string[];
  citedContextHitIds: string[];
  policyStatus: 'pass' | 'review';
  approvalRequired: boolean;
}

export interface PolicyEvaluationView {
  status: 'pass' | 'review';
  policyScope: string;
  checks: Array<{ name: string; status: 'pass' | 'review'; message: string }>;
  riskScore?: number;
}

export interface LineageArtifactView {
  lineageHash: string;
  parentHash: string;
  traceparent: string;
  lineageStatus: 'sealed' | 'pending';
}

export interface ReplayRecordView {
  id: string;
  step: string;
  status: 'completed' | 'pending';
  timestamp: string;
  detail: string;
}

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface ApprovalState {
  status: ApprovalStatus;
  approver: string | null;
  comment: string;
}

export type WorkflowState =
  | 'idle'
  | 'preparing context'
  | 'embedding in progress'
  | 'context ready'
  | 'policy blocked'
  | 'awaiting approval'
  | 'approved'
  | 'rejected'
  | 'degraded mode';

const now = new Date();

export const initialEvidence: EvidenceItem[] = [
  {
    id: 'e-text-1',
    type: 'text',
    title: 'Ops anomaly note',
    content: 'APAC traffic grew 42% over baseline in the last 2 hours.',
    classification: 'internal',
    createdAt: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'e-image-1',
    type: 'image',
    title: 'Capacity dashboard screenshot',
    content: 'img://capacity-apac-peak.png',
    classification: 'restricted',
    createdAt: new Date(now.getTime() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: 'e-audio-1',
    type: 'audio',
    title: 'Incident bridge summary',
    content: 'aud://incident-bridge-12m.wav',
    classification: 'internal',
    createdAt: new Date(now.getTime() - 1000 * 60 * 10).toISOString(),
  },
];
