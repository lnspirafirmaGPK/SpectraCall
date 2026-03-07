"use client";

import { DecisionArtifact } from "@/lib/types/accounting";
import { mockDecisions } from "@/lib/mock/accounting";

/**
 * Simulates retrieving a decision proposal for CFO approval.
 */
export async function getDecisionProposal(artifactId: string): Promise<DecisionArtifact | undefined> {
  // In a real implementation, this would fetch from GenesisCore via the backend
  return mockDecisions.find(d => d.id === artifactId);
}

/**
 * Simulates the escalation scoring logic (Governance Engine).
 */
export function calculateRiskScore(query: string): number {
  let score = 0.1;
  if (query.includes("policy")) score += 0.4;
  if (query.includes("approve")) score += 0.3;
  if (query.includes("TFRS") || query.includes("IFRS")) score += 0.2;
  return Math.min(score, 1.0);
}

/**
 * Simulates triggering an escalation event to AetherBus.
 */
export async function triggerEscalation(from: string, to: string, reason: string) {
  console.log(`[AetherBus] Triggering event: escalation.requested`, { from, to, reason });
  // In a real implementation, this would use a fetch/axios call to the Go backend
  return { success: true, correlation_id: `corr-${Date.now()}` };
}
