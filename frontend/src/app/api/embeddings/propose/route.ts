import { NextRequest, NextResponse } from 'next/server';
import { buildEmbeddingEnvelope, type EmbeddingEvidenceInput } from '@/lib/server/envelope';
import { policyPrecheck } from '@/lib/server/policy';
import { submitEmbeddingJob } from '@/lib/server/embedding-worker-client';
import { problemResponse } from '@/lib/server/problem';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<EmbeddingEvidenceInput>;

    if (!body?.evidence) {
      return problemResponse(400, 'Missing evidence', 'Field `evidence` is required.');
    }

    const envelope = buildEmbeddingEnvelope(body as EmbeddingEvidenceInput, request.headers.get('traceparent'));
    const precheck = policyPrecheck(envelope);

    if (!precheck.passed) {
      return problemResponse(403, 'Policy precheck failed', precheck.reason, {
        type: 'https://spectracall.dev/problems/policy-precheck-failed',
        extensions: {
          precheck,
          trace_id: envelope.traceparent,
        },
      });
    }

    const workerResult = await submitEmbeddingJob(envelope);

    return NextResponse.json({
      success: true,
      event_type: 'asi.embedding.requested',
      envelope,
      policy_precheck: precheck,
      worker: workerResult,
      ui: {
        job_id: workerResult.job_id,
        status: workerResult.status,
        degraded: workerResult.degraded,
        artifact_ref: workerResult.artifact_ref,
        trace_id: workerResult.trace_id,
      },
    });
  } catch {
    return problemResponse(500, 'Embedding proposal failed', 'Unable to process embedding proposal.');
  }
}
