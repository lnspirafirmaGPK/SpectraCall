import { AsiEnvelope, BudgetReallocationDecisionData } from './types/envelope';
import { DecisionArtifact, PolicyCheck, HumanApproval, ExecutionResult } from './types/asi';

/**
 * In-memory state for the ASI Control Plane prototype.
 * In a real application, this would be a database.
 */
class ApiState {
  private decisions: Map<string, DecisionArtifact> = new Map();
  private envelopes: Map<string, AsiEnvelope<any>> = new Map();

  addDecision(decision: DecisionArtifact) {
    this.decisions.set(decision.id, decision);
  }

  getDecision(id: string) {
    return this.decisions.get(id);
  }

  updateDecision(id: string, updates: Partial<DecisionArtifact>) {
    const decision = this.decisions.get(id);
    if (decision) {
      this.decisions.set(id, { ...decision, ...updates });
    }
  }

  getAllDecisions() {
    return Array.from(this.decisions.values());
  }

  addEnvelope(envelope: AsiEnvelope<any>) {
    this.envelopes.set(envelope.id, envelope);
  }

  getEnvelope(id: string) {
    return this.envelopes.get(id);
  }
}

// Global instance
export const apiState = new ApiState();

// Helper to create a RFC 7807 response
export function createProblemResponse(
  title: string,
  status: number,
  detail?: string,
  type: string = "about:blank"
) {
  return Response.json(
    { type, title, status, detail },
    { status }
  );
}
