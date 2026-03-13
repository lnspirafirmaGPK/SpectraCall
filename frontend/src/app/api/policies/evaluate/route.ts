import { NextRequest, NextResponse } from 'next/server';
import { apiState } from '@/lib/api-state';
import { evaluateDecisionPolicy } from '@/lib/server/policy';
import { problemResponse } from '@/lib/server/problem';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { decision_id?: string };
    if (!body.decision_id) {
      return problemResponse(400, 'Missing decision_id', 'A decision_id is required to evaluate policies.');
    }

    const decision = apiState.getDecision(body.decision_id);
    if (!decision) {
      return problemResponse(404, 'Decision not found', `The decision ${body.decision_id} does not exist.`);
    }

    const policy = evaluateDecisionPolicy({
      decision_id: body.decision_id,
      amount: (decision as any).data?.amount,
      currency: (decision as any).data?.currency,
      policy_scope: 'finance.global',
    });

    const uiPolicyCheck = {
      id: policy.policy_check.id,
      passed: policy.policy_check.passed,
      reason: policy.policy_check.reason,
      riskScore: policy.policy_check.risk_score,
      hitRules: policy.policy_check.hit_rules,
      evaluatedAt: policy.policy_check.evaluated_at,
      evaluatorId: policy.policy_check.evaluator_id,
      obligations: policy.policy_check.obligations,
      canonical: policy.policy_check,
    };

    apiState.updateDecision(body.decision_id, {
      status: 'evaluated',
      policy_check: uiPolicyCheck,
    });

    return NextResponse.json({
      success: true,
      decision_id: body.decision_id,
      passed: policy.passed,
      risk_score: policy.policy_check.risk_score,
      policy_check: uiPolicyCheck,
      canonical: policy.policy_check,
      degraded: false,
      links: {
        approve: `/api/decisions/${body.decision_id}/approve`,
      },
    });
  } catch {
    return problemResponse(500, 'Policy evaluation failed', 'Unable to complete policy evaluation.');
  }
}
