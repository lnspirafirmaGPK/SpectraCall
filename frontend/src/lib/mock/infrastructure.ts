import type { InfrastructureGraph, StreamEvent } from "@/lib/types/infrastructure";

export const infrastructureGraph: InfrastructureGraph = {
  generatedAt: "2026-03-10T08:00:00Z",
  nodes: [
    { id: "edge-gateway", label: "Edge Gateway", region: "global", tier: "edge", health: "healthy", latencyMs: 4, requestsPerSecond: 27000 },
    { id: "aetherbus-core", label: "AetherBus Core", region: "ap-southeast-1", tier: "data", health: "healthy", latencyMs: 2, requestsPerSecond: 125000 },
    { id: "tachyon-bridge", label: "Tachyon Bridge", region: "ap-southeast-1", tier: "control", health: "degraded", latencyMs: 12, requestsPerSecond: 96000 },
    { id: "policy-engine", label: "Policy Engine", region: "eu-west-1", tier: "trust", health: "healthy", latencyMs: 17, requestsPerSecond: 4300 },
    { id: "replay-store", label: "Replay Store", region: "us-east-1", tier: "trust", health: "healthy", latencyMs: 29, requestsPerSecond: 2100 },
  ],
  edges: [
    { source: "edge-gateway", target: "aetherbus-core", protocol: "http", throughputMbps: 820, p95LatencyMs: 9 },
    { source: "aetherbus-core", target: "tachyon-bridge", protocol: "nats", throughputMbps: 1200, p95LatencyMs: 4 },
    { source: "tachyon-bridge", target: "policy-engine", protocol: "grpc", throughputMbps: 640, p95LatencyMs: 14 },
    { source: "policy-engine", target: "replay-store", protocol: "rdma", throughputMbps: 320, p95LatencyMs: 7 },
  ],
};

export const streamSeedEvents: StreamEvent[] = [
  {
    id: "evt-1001",
    timestamp: "2026-03-10T08:00:03Z",
    severity: "info",
    message: "AetherBus partition rebalance completed",
    component: "aetherbus-core",
  },
  {
    id: "evt-1002",
    timestamp: "2026-03-10T08:00:07Z",
    severity: "warning",
    message: "Tachyon Bridge queue depth above dynamic threshold",
    component: "tachyon-bridge",
  },
  {
    id: "evt-1003",
    timestamp: "2026-03-10T08:00:09Z",
    severity: "info",
    message: "Replay snapshot persisted for DEC-9F31",
    component: "replay-store",
  },
];
