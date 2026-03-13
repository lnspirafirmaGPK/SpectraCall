import { NextResponse } from 'next/server';
import { getReplay } from '@/lib/server/lineage';
import { problemResponse } from '@/lib/server/problem';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const replay = getReplay(id);

  if (!replay) {
    return problemResponse(404, 'Replay timeline not found', `No replay timeline found for ${id}.`);
  }

  return NextResponse.json({
    success: true,
    replay_id: id,
    timeline: replay,
    event_types_supported: [
      'asi.embedding.requested',
      'asi.embedding.completed',
      'asi.embedding.failed',
      'asi.context.indexed',
      'asi.decision.proposed',
      'asi.decision.approved',
      'asi.decision.rejected',
    ],
  });
}
