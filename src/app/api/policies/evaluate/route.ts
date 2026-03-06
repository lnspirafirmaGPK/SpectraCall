import { NextRequest, NextResponse } from 'next/server';
import { apiState, createProblemResponse } from '@/lib/api-state';
import { PolicyCheck } from '@/lib/types/asi';

/**
 * POST /api/policies/evaluate
 * Evaluates a proposed decision against the Governance Plane's policies.
 */
export async function POST(request: NextRequest) {
  try {
    const { decision_id } = await request.json();

    if (!decision_id) {
      return createProblemResponse("Missing decision_id", 400, "A decision_id is required to evaluate policies.");
    }

    const decision = apiState.getDecision(decision_id);
    if (!decision) {
      return createProblemResponse("Decision not found", 404, `The decision ${decision_id} does not exist.`);
    }

    // Mock Evaluation Logic (Budget Reallocation context)
    const policyCheck: PolicyCheck = {
      id: `pol-${decision_id}-${Date.now()}`,
      passed: true,
      reason: "Within budget limits and authorized by finance policy-as-code.",
      riskScore: 0.12, // Low risk
      hitRules: ["auth.finance.limit.check", "auth.finance.owner.verify"],
      evaluatedAt: new Date().toISOString(),
      evaluatorId: "svc-policy-01"
    };

    // Update Decision State
    apiState.updateDecision(decision_id, { status: 'evaluated', policy_check: policyCheck });

    return NextResponse.json({
      success: true,
      passed: policyCheck.passed,
      risk_score: policyCheck.riskScore,
      policy_check: policyCheck,
      links: {
        approve: `/api/decisions/${decision_id}/approve`,
        reject: `/api/decisions/${decision_id}/reject`
      }
    });

  } catch (error) {
    return createProblemResponse("Internal Server Error", 500, error instanceof Error ? error.message : "Error during policy evaluation.");
  }
}
