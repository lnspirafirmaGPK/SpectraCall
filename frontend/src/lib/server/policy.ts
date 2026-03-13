import type { AsiEnvelope } from '@/lib/types/envelope';

interface PrecheckResult {
  passed: boolean;
  reason: string;
  risk_score: number;
  hit_rules: string[];
  obligations: string[];
}

export function policyPrecheck(envelope: AsiEnvelope<unknown>): PrecheckResult {
  const risks: string[] = [];
  const obligations: string[] = [];

  if (envelope.asi.classification === 'restricted') {
    risks.push('classification.restricted.review');
    obligations.push('manual-security-review');
  }

  if (!envelope.asi.policy_scope.startsWith('finance.')) {
    risks.push('scope.non-finance');
  }

  const riskScore = Math.min(0.95, 0.1 + risks.length * 0.2);

  return {
    passed: riskScore < 0.8,
    reason: risks.length
      ? 'Policy precheck requires additional controls before full processing.'
      : 'Policy precheck passed for control-plane forwarding.',
    risk_score: riskScore,
    hit_rules: risks.length ? risks : ['policy.baseline.pass'],
    obligations,
  };
}

export function evaluateDecisionPolicy(input: {
  decision_id: string;
  amount?: number;
  currency?: string;
  policy_scope?: string;
}) {
  const amount = input.amount ?? 0;
  const highAmount = amount >= 250000;
  const risk = highAmount ? 0.56 : 0.18;

  return {
    decision_id: input.decision_id,
    passed: risk < 0.7,
    policy_check: {
      id: `pol-${input.decision_id}-${Date.now()}`,
      policy_scope: input.policy_scope ?? 'finance.global',
      passed: risk < 0.7,
      risk_score: risk,
      hit_rules: highAmount
        ? ['finance.amount.threshold', 'finance.owner.approval.required']
        : ['finance.amount.baseline', 'finance.owner.verified'],
      reason: highAmount
        ? 'Large transfer detected; enhanced review required but still admissible.'
        : 'Within normal risk envelope for budget reallocation.',
      evaluated_at: new Date().toISOString(),
      evaluator_id: 'svc-policy-mock-v1',
      obligations: highAmount ? ['second-approver'] : [],
    },
  };
}
