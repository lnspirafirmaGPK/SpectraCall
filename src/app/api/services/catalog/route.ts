import { NextRequest, NextResponse } from 'next/server';
import { mockServiceCatalog } from '@/lib/mock/service-catalog';

/**
 * GET /api/services/catalog
 * Retrieves the full ASI Service Catalog.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const plane = searchParams.get('plane');
  const criticality = searchParams.get('criticality');

  let filteredCatalog = [...mockServiceCatalog];

  if (plane) {
    filteredCatalog = filteredCatalog.filter(s => s.plane.toLowerCase() === plane.toLowerCase());
  }

  if (criticality) {
    filteredCatalog = filteredCatalog.filter(s => s.criticalityTier.toLowerCase() === criticality.toLowerCase());
  }

  return NextResponse.json({
    count: filteredCatalog.length,
    services: filteredCatalog,
    planes: ["Control", "Data", "Trust", "Governance", "Observability"],
    criticalityTiers: ["P0", "P1", "P2", "P3"]
  });
}
