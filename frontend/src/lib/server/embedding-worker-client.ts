import { getEmbeddingJob, registerEmbeddingJob, registerLineage, registerReplay } from './lineage';
import { traceIdFromTraceparent } from './trace';
import type { AsiEnvelope } from '@/lib/types/envelope';

const DEFAULT_TIMEOUT_MS = 4000;

export async function submitEmbeddingJob(
  envelope: AsiEnvelope<unknown>,
  timeoutMs = DEFAULT_TIMEOUT_MS
) {
  const workerUrl = process.env.EMBEDDING_WORKER_URL;
  const jobId = `emb-${envelope.id}`;

  if (!workerUrl) {
    const degraded = degradedResult(envelope, 'EMBEDDING_WORKER_URL is not configured.');
    persistArtifacts(jobId, envelope, degraded, true);
    return degraded;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${workerUrl.replace(/\/$/, '')}/embed`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        traceparent: envelope.traceparent,
      },
      body: JSON.stringify(envelope),
      signal: controller.signal,
    });

    if (!response.ok) {
      const degraded = degradedResult(envelope, `embedding-worker returned ${response.status}`);
      persistArtifacts(jobId, envelope, degraded, true);
      return degraded;
    }

    const workerPayload = await response.json();
    const result = {
      success: true,
      degraded: false,
      job_id: workerPayload.job_id ?? jobId,
      status: workerPayload.status ?? 'accepted',
      artifact_ref: workerPayload.artifact_ref ?? `/api/embeddings/${jobId}`,
      trace_id: traceIdFromTraceparent(envelope.traceparent),
      event_type: 'asi.embedding.completed',
      worker_payload: workerPayload,
    };

    persistArtifacts(result.job_id, envelope, result, false);
    return result;
  } catch {
    const degraded = degradedResult(envelope, 'embedding-worker unavailable or timed out');
    persistArtifacts(jobId, envelope, degraded, true);
    return degraded;
  } finally {
    clearTimeout(timer);
  }
}

function degradedResult(envelope: AsiEnvelope<unknown>, reason: string) {
  return {
    success: false,
    degraded: true,
    job_id: `emb-${envelope.id}`,
    status: 'degraded',
    artifact_ref: `/api/embeddings/emb-${envelope.id}`,
    trace_id: traceIdFromTraceparent(envelope.traceparent),
    event_type: 'asi.embedding.failed',
    reason,
    fallback_context: {
      provider: 'control-plane-fallback',
      summary: 'Worker unavailable; proceeding with degraded evidence quality.',
    },
  };
}

function persistArtifacts(jobId: string, envelope: AsiEnvelope<unknown>, result: Record<string, unknown>, degraded: boolean) {
  registerEmbeddingJob(jobId, {
    job_id: jobId,
    request_envelope_id: envelope.id,
    status: result.status,
    degraded,
    traceparent: envelope.traceparent,
    updated_at: new Date().toISOString(),
    result,
  });

  registerLineage(jobId, {
    id: jobId,
    root_hash: envelope.asi.lineage_hash,
    nodes: [
      { id: envelope.id, event_type: 'asi.embedding.requested', plane: 'Control', hash: envelope.asi.lineage_hash },
      { id: jobId, event_type: (result.event_type as string) ?? 'asi.embedding.failed', plane: 'Data', hash: envelope.asi.lineage_hash },
    ],
    edges: [{ from: envelope.id, to: jobId, relation: 'triggered' }],
    degraded,
  });

  registerReplay(jobId, [
    {
      at: envelope.time,
      type: 'asi.embedding.requested',
      message: 'Control plane accepted embedding request.',
      status: 'ok',
    },
    {
      at: new Date().toISOString(),
      type: (result.event_type as string) ?? 'asi.embedding.failed',
      message: degraded ? 'Worker unavailable, fallback engaged.' : 'Worker completed embedding artifact generation.',
      status: degraded ? 'degraded' : 'ok',
    },
  ]);
}

export function readEmbeddingJob(id: string) {
  return getEmbeddingJob(id);
}
