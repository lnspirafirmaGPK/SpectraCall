import { NextRequest, NextResponse } from 'next/server';
import { AsiEnvelope, BudgetReallocationDecisionData } from '@/lib/types/envelope';
import { DecisionArtifact } from '@/lib/types/asi';
import { apiState, createProblemResponse } from '@/lib/api-state';

/**
 * POST /api/decisions/propose
 * Propose a new decision artifact via an ASI Envelope.
 */
export async function POST(request: NextRequest) {
  try {
    const envelope = (await request.json()) as AsiEnvelope<BudgetReallocationDecisionData>;

    // 1. Basic Validation (Contract Check)
    if (envelope.specversion !== "1.0" || !envelope.asi || !envelope.data) {
      return createProblemResponse(
        "Invalid ASI Envelope Format",
        400,
        "The provided envelope does not match the ASI canonical contract (CloudEvents 1.0 + ASI Extensions)."
      );
    }

    // 2. State Management (Add to in-memory store)
    apiState.addEnvelope(envelope);

    const decision: DecisionArtifact = {
      id: `dec-${envelope.id}`,
      envelope_id: envelope.id,
      status: 'proposed',
      lineage_record: {
        id: `lin-${envelope.id}`,
        hash: envelope.asi.lineage_hash,
        parent_hash: envelope.asi.parent_hash,
        agent_id: envelope.asi.agent_id,
        timestamp: new Date().toISOString(),
        proof_availability: true,
        payload_hash: envelope.asi.payload_hash,
      }
    };

    apiState.addDecision(decision);

    // 3. Control-Plane Shaped Response
    return NextResponse.json({
      success: true,
      decision_id: decision.id,
      status: decision.status,
      trace_id: envelope.traceparent.split('-')[1],
      lineage_hash: decision.lineage_record.hash,
      links: {
        self: `/api/decisions/${decision.id}`,
        evaluate: `/api/policies/evaluate?decision_id=${decision.id}`,
        approve: `/api/decisions/${decision.id}/approve`,
        reject: `/api/decisions/${decision.id}/reject`
      }
    });

  } catch (error) {
    return createProblemResponse(
      "Internal Server Error",
      500,
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
}
