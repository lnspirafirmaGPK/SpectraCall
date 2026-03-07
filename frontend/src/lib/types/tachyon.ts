export type TachyonRouteStatus = 'healthy' | 'degraded' | 'unavailable';

export interface TachyonRoute {
  id: string;
  target_service: string;
  endpoint: string;
  latency_ms: number;
  retry_count: number;
  status: TachyonRouteStatus;
  throughput: string;
}

export interface TachyonPipelineStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  timestamp: string;
  details?: string;
}
