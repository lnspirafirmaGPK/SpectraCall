import { NextRequest, NextResponse } from 'next/server';
import { apiState, createProblemResponse } from '@/lib/api-state';
import { HumanApproval, ExecutionResult } from '@/lib/types/asi';
import { registerReplay, registerLineage } from '@/lib/server/lineage';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const { action, approverId, comment, signature } = (await request.json()) as {
      action?: 'approve' | 'reject';
      approverId?: string;
      comment?: string;
      signature?: string;
    };

    if (!approverId || !action) {
      return createProblemResponse('Missing action/approverId', 400, 'Both action and approverId are required.');
    }

    const decision = apiState.getDecision(id);
    if (!decision) {
      return createProblemResponse('Decision not found', 404, `Decision ${id} does not exist.`);
    }

    if (decision.status !== 'evaluated') {
      return createProblemResponse('Invalid State', 400, `Decision must be evaluated before review. Current status: ${decision.status}`);
    }

    const humanApproval: HumanApproval = {
      id: `app-${id}-${Date.now()}`,
      approverId,
      approvedAt: new Date().toISOString(),
      decision: action,
      comment,
      signature,
    };

    const updatedStatus = action === 'approve' ? 'executed' : 'rejected';
    const executionResult: ExecutionResult | undefined =
      action === 'approve'
        ? {
            id: `exec-${id}-${Date.now()}`,
            status: 'success',
            tachyon_route: `/routes/tachyon-budget-v1/${id}`,
            trace_id: `trc-${id}-${Date.now()}`,
            timestamp: new Date().toISOString(),
            output: {
              transactionId: `tx-${Math.random().toString(36).slice(2, 11)}`,
              decisionId: id,
            },
          }
        : undefined;

    apiState.updateDecision(id, {
      status: updatedStatus,
      human_approval: humanApproval,
      execution_result: executionResult,
    });

    registerLineage(id, {
      id,
      root_hash: decision.lineage_record.hash,
      nodes: [
        { id: decision.envelope_id, event_type: 'asi.decision.proposed', plane: 'Control', hash: decision.lineage_record.hash },
        { id, event_type: action === 'approve' ? 'asi.decision.approved' : 'asi.decision.rejected', plane: 'Control', hash: decision.lineage_record.hash },
      ],
      edges: [{ from: decision.envelope_id, to: id, relation: 'reviewed' }],
      degraded: false,
    });

    registerReplay(id, [
      {
        at: decision.lineage_record.timestamp,
        type: 'asi.decision.proposed',
        message: 'Decision submitted to control plane.',
        status: 'ok',
      },
      {
        at: humanApproval.approvedAt,
        type: action === 'approve' ? 'asi.decision.approved' : 'asi.decision.rejected',
        message: comment ?? `Decision ${action}d by ${approverId}.`,
        status: 'ok',
      },
      {
        at: new Date().toISOString(),
        type: 'asi.replay.snapshot.updated',
        message: `Replay updated after ${action}.`,
        status: 'ok',
      },
    ]);

    return NextResponse.json({
      success: true,
      decision_id: id,
      new_status: updatedStatus,
      approval: humanApproval,
      execution: executionResult,
      links: {
        replay: `/api/replay/${id}`,
        lineage: `/api/lineage/${id}`,
      },
    });
  } catch (error) {
    return createProblemResponse('Internal Server Error', 500, error instanceof Error ? error.message : 'Error during review action.');
  }
}
