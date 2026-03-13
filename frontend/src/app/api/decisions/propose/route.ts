import { NextRequest, NextResponse } from 'next/server';
import { AsiEnvelope, BudgetReallocationDecisionData } from '@/lib/types/envelope';
import { DecisionArtifact } from '@/lib/types/asi';
import { apiState } from '@/lib/api-state';
import { problemResponse } from '@/lib/server/problem';

export async function POST(request: NextRequest) {
  try {
    const envelope = (await request.json()) as AsiEnvelope<BudgetReallocationDecisionData>;

    if (envelope.specversion !== '1.0' || !envelope.asi || !envelope.data) {
      return problemResponse(
        400,
        'Invalid ASI Envelope Format',
        'The provided envelope does not match the ASI canonical contract (CloudEvents 1.0 + ASI Extensions).'
      );
    }

    apiState.addEnvelope(envelope);

    const embeddingResponse = await fetch(new URL('/api/embeddings/propose', request.url), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        traceparent: envelope.traceparent,
      },
      body: JSON.stringify({
        evidence: envelope.data.reason,
        subject: envelope.subject,
        classification: envelope.asi.classification,
        policy_scope: envelope.asi.policy_scope,
        parent_hash: envelope.asi.parent_hash,
        metadata: {
          requestId: envelope.data.requestId,
          amount: envelope.data.amount,
          currency: envelope.data.currency,
        },
      }),
    });

    const embeddingPayload = await embeddingResponse.json();
    const embeddingUi = embeddingPayload.ui ?? null;

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
      },
    };

    apiState.addDecision(decision);

    return NextResponse.json({
      success: true,
      decision_id: decision.id,
      status: decision.status,
      trace_id: envelope.traceparent.split('-')[1],
      lineage_hash: decision.lineage_record.hash,
      embedding: embeddingUi,
      degraded: Boolean(embeddingUi?.degraded),
      links: {
        self: `/api/decisions/${decision.id}`,
        evaluate: `/api/policies/evaluate`,
        approve: `/api/decisions/${decision.id}/approve`,
        embedding: embeddingUi?.artifact_ref,
      },
    });
  } catch {
    return problemResponse(500, 'Internal Server Error', 'An unexpected error occurred.');
  }
}
