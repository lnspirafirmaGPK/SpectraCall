import { TachyonRoute } from '../types/tachyon';

export const mockTachyonRoutes: TachyonRoute[] = [
  {
    id: 'route-001',
    target_service: 'Database-Primary',
    endpoint: 'sql-cluster-a.internal',
    latency_ms: 0.45,
    retry_count: 0,
    status: 'healthy',
    throughput: '850 MB/s'
  },
  {
    id: 'route-002',
    target_service: 'Auth-Gateway',
    endpoint: 'auth.inspectra.io',
    latency_ms: 12.5,
    retry_count: 1,
    status: 'degraded',
    throughput: '12k req/s'
  },
  {
    id: 'route-003',
    target_service: 'LLM-Orchestrator',
    endpoint: 'genai-bus.internal',
    latency_ms: 2.1,
    retry_count: 0,
    status: 'healthy',
    throughput: '450 tokens/s'
  }
];
