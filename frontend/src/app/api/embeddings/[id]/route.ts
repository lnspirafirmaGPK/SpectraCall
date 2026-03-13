import { NextResponse } from 'next/server';
import { readEmbeddingJob } from '@/lib/server/embedding-worker-client';
import { problemResponse } from '@/lib/server/problem';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artifact = readEmbeddingJob(id);

  if (!artifact) {
    return problemResponse(404, 'Embedding artifact not found', `No embedding job/artifact found for id ${id}.`);
  }

  return NextResponse.json({ success: true, artifact });
}
