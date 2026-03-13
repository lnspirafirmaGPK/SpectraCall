import { randomBytes } from 'crypto';

function randomHex(bytes: number) {
  return randomBytes(bytes).toString('hex');
}

export function ensureTraceparent(value?: string | null): string {
  if (value && /^00-[a-f0-9]{32}-[a-f0-9]{16}-0[0-3]$/i.test(value)) {
    return value.toLowerCase();
  }

  return `00-${randomHex(16)}-${randomHex(8)}-01`;
}

export function traceIdFromTraceparent(traceparent: string): string {
  const parts = traceparent.split('-');
  return parts[1] ?? traceparent;
}
