import { mockEmbeddingArtifacts } from '@/lib/mock/embedding-artifacts';

interface ContextSearchInput {
  query: string;
  context?: string[];
}

const corpus = [
  {
    id: 'ctx-1',
    content: 'APAC traffic surge increased cloud spend and required emergency reallocation.',
    source: 'ops-telemetry:apac-surge',
  },
  {
    id: 'ctx-2',
    content: 'Historical budget transfer from OPEX to cloud-infra showed 18% ROI uplift.',
    source: 'finance-report:q3-roi',
  },
  {
    id: 'ctx-3',
    content: 'Policy allows urgent transfers under 250k with single approver and audit trace.',
    source: 'policy-doc:finance.global',
  },
];

function tokenize(text: string) {
  return text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

function scoreSimilarity(query: string, document: string) {
  const q = new Set(tokenize(query));
  const d = new Set(tokenize(document));
  if (!q.size || !d.size) {
    return 0;
  }

  let overlap = 0;
  for (const token of q) {
    if (d.has(token)) {
      overlap += 1;
    }
  }

  return overlap / Math.sqrt(q.size * d.size);
}

export function searchContext(input: ContextSearchInput) {
  const mergedQuery = [input.query, ...(input.context ?? [])].join(' ').trim();

  const hits = corpus
    .map((doc) => ({ ...doc, score: scoreSimilarity(mergedQuery, doc.content) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .filter((hit) => hit.score > 0)
    .map((hit) => ({
      id: hit.id,
      score: Number(hit.score.toFixed(4)),
      snippet: hit.content,
      provenance: {
        source: hit.source,
        event_type: 'asi.context.indexed',
        artifact_ref: mockEmbeddingArtifacts[0]?.artifact_id ?? 'emb-artifact-mock',
      },
    }));

  return {
    query: input.query,
    count: hits.length,
    hits,
    provider: 'in-memory-similarity',
    vendor_bound: false,
  };
}
