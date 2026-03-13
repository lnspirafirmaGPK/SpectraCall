import { NextRequest, NextResponse } from 'next/server';
import { mockServiceCatalog } from '@/lib/mock/service-catalog';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const plane = searchParams.get('plane');
  const criticality = searchParams.get('criticality');

  let services = [...mockServiceCatalog];

  if (plane) {
    services = services.filter((s) => s.plane.toLowerCase() === plane.toLowerCase());
  }

  if (criticality) {
    services = services.filter((s) => s.criticalityTier.toLowerCase() === criticality.toLowerCase());
  }

  return NextResponse.json({
    count: services.length,
    services,
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
