import { NextRequest, NextResponse } from 'next/server';
import { apiState, createProblemResponse } from '@/lib/api-state';
import { HumanApproval, ExecutionResult } from '@/lib/types/asi';

/**
 * POST /api/decisions/[id]/approve
 * Approves a decision (Human-in-the-Loop).
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { approverId, comment, signature } = await request.json();

    if (!approverId) {
      return createProblemResponse("Missing approverId", 400, "An approverId is required for manual approval.");
    }

    const decision = apiState.getDecision(id);
    if (!decision) {
      return createProblemResponse("Decision not found", 404, `Decision ${id} does not exist.`);
    }

    if (decision.status !== 'evaluated') {
      return createProblemResponse("Invalid State", 400, `Decision must be evaluated before approval. Current status: ${decision.status}`);
    }

    // 1. Record Human Approval
    const humanApproval: HumanApproval = {
      id: `app-${id}-${Date.now()}`,
      approverId,
      approvedAt: new Date().toISOString(),
      decision: 'approve',
      comment,
      signature
    };

    // 2. Simulate Execution (Tachyon Route)
    const executionResult: ExecutionResult = {
      id: `exec-${id}-${Date.now()}`,
      status: 'success',
      tachyon_route: `/routes/tachyon-budget-v1/${id}`,
      trace_id: `trc-${id}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      output: {
        transactionId: `tx-${Math.random().toString(36).substr(2, 9)}`,
        finalAmount: 150000,
        currency: "USD"
      }
    };

    // 3. Update Decision State
    apiState.updateDecision(id, {
      status: 'executed',
      human_approval: humanApproval,
      execution_result: executionResult
    });

    return NextResponse.json({
      success: true,
      decision_id: id,
      new_status: 'executed',
      approval: humanApproval,
      execution: executionResult,
      links: {
        replay: `/api/replay/${id}`,
        lineage: `/api/lineage/${id}`
      }
    });

  } catch (error) {
    return createProblemResponse("Internal Server Error", 500, error instanceof Error ? error.message : "Error during approval.");
  }
}
