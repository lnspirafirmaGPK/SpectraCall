import { NextResponse } from 'next/server';
import type { ProblemDetails } from '@/lib/types/problem';

export function createProblem(details: ProblemDetails): ProblemDetails {
  return details;
}

export function problemResponse(
  status: number,
  title: string,
  detail?: string,
  overrides: Partial<ProblemDetails> = {}
) {
  const problem = createProblem({
    type: overrides.type ?? 'about:blank',
    title,
    status,
    detail,
    instance: overrides.instance,
    extensions: overrides.extensions,
  });

  return NextResponse.json(problem, {
    status,
    headers: { 'content-type': 'application/problem+json' },
  });
}
