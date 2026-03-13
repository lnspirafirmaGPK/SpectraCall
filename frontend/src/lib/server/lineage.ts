import { apiState } from '@/lib/api-state';

type TimelineEvent = {
  at: string;
  type: string;
  message: string;
  status: 'ok' | 'degraded' | 'error';
};

const embeddingJobs = new Map<string, Record<string, unknown>>();
const lineageArtifacts = new Map<string, Record<string, unknown>>();
const replayTimelines = new Map<string, TimelineEvent[]>();

export function registerEmbeddingJob(jobId: string, artifact: Record<string, unknown>) {
  embeddingJobs.set(jobId, artifact);
}

export function getEmbeddingJob(jobId: string) {
  return embeddingJobs.get(jobId);
}

export function registerLineage(id: string, data: Record<string, unknown>) {
  lineageArtifacts.set(id, data);
}

export function getLineage(id: string) {
  const stored = lineageArtifacts.get(id);
  if (stored) {
    return stored;
  }

  const decision = apiState.getDecision(id);
  if (!decision) {
    return null;
  }

  return {
    id,
    root_hash: decision.lineage_record.hash,
    nodes: [
      {
        id: decision.envelope_id,
        event_type: 'asi.decision.proposed',
        plane: 'Control',
        hash: decision.lineage_record.hash,
      },
    ],
    edges: [],
    generated_at: new Date().toISOString(),
  };
}

export function registerReplay(id: string, timeline: TimelineEvent[]) {
  replayTimelines.set(id, timeline);
}

export function getReplay(id: string) {
  const stored = replayTimelines.get(id);
  if (stored) {
    return stored;
  }

  const decision = apiState.getDecision(id);
  if (!decision) {
    return null;
  }

  return [
    { at: decision.lineage_record.timestamp, type: 'asi.decision.proposed', message: 'Decision submitted to control plane.', status: 'ok' },
    { at: new Date().toISOString(), type: 'asi.decision.approved', message: `Decision currently ${decision.status}.`, status: 'ok' },
  ];
}
