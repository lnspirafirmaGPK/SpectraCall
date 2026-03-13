export interface PolicyCheck {
  id: string;
  policy_scope: string;
  passed: boolean;
  risk_score: number;
  hit_rules: string[];
  reason?: string;
  evaluated_at: string;
  evaluator_id: string;
  obligations?: string[];
}

export interface HumanApproval {
  id: string;
  decision: 'approve' | 'reject';
  approver_id: string;
  approved_at: string;
  comment?: string;
  signature?: string;
}

export interface GovernanceDecision {
  decision_id: string;
  envelope_id: string;
  policy_check: PolicyCheck;
  approval?: HumanApproval;
}
