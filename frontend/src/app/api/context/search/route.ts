import { NextRequest, NextResponse } from 'next/server';
import { searchContext } from '@/lib/server/context-search';
import { problemResponse } from '@/lib/server/problem';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { query?: string; context?: string[] };

    if (!body?.query) {
      return problemResponse(400, 'Missing query', 'Field `query` is required for context search.');
    }

    const result = searchContext({ query: body.query, context: body.context });

    return NextResponse.json({
      success: true,
      event_type: 'asi.context.indexed',
      ...result,
    });
  } catch {
    return problemResponse(500, 'Context search failed', 'Unable to search context from control plane.');
  }
}
