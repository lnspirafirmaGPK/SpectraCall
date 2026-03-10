export type ServiceHealth = "healthy" | "degraded" | "critical";

export interface InfrastructureNode {
  id: string;
  label: string;
  region: string;
  tier: "control" | "data" | "trust" | "edge";
  health: ServiceHealth;
  latencyMs: number;
  requestsPerSecond: number;
}

export interface InfrastructureEdge {
  source: string;
  target: string;
  protocol: "grpc" | "nats" | "http" | "rdma";
  throughputMbps: number;
  p95LatencyMs: number;
}

export interface InfrastructureGraph {
  generatedAt: string;
  nodes: InfrastructureNode[];
  edges: InfrastructureEdge[];
}

export interface StreamEvent {
  id: string;
  timestamp: string;
  severity: "info" | "warning" | "critical";
  message: string;
  component: string;
}
