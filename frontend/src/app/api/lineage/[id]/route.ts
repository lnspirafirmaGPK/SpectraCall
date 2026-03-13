import { NextResponse } from 'next/server';
import { getLineage } from '@/lib/server/lineage';
import { problemResponse } from '@/lib/server/problem';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lineage = getLineage(id);

  if (!lineage) {
    return problemResponse(404, 'Lineage not found', `No lineage artifact found for ${id}.`);
  }

  return NextResponse.json({ success: true, lineage });
}
