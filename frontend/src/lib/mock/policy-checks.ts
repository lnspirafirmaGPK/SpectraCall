import { PolicyCheck } from '../types/governance';

export const mockPolicyChecks: PolicyCheck[] = [
  {
    id: 'policy-check-501',
    policy_scope: 'finance.budget.reallocation',
    passed: true,
    risk_score: 0.22,
    hit_rules: ['FIN-BUDGET-LIMITS', 'FIN-DUAL-APPROVAL'],
    reason: 'Amount within delegated threshold with mandatory human approval.',
    evaluated_at: new Date().toISOString(),
    evaluator_id: 'policy-engine-v2',
    obligations: ['human-approval', 'audit-log-retention-7y']
  }
];
