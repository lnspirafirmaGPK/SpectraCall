import { NextRequest, NextResponse } from 'next/server';
import { mockWorkplaceConnectors } from '@/lib/mock/workplace-connectors';

/**
 * GET /api/workplace/connectors
 * Retrieves all ASI workplace connectors.
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    count: mockWorkplaceConnectors.length,
    connectors: mockWorkplaceConnectors,
    types: ["M365", "Google", "Zoho", "WPS"]
  });
}
