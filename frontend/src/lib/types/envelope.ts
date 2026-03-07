/**
 * Canonical ASI Envelope (CloudEvents 1.0 Compatible)
 *
 * This is the fundamental unit of communication for the ASI Protocol.
 * It extends the CloudEvents specification to include trust, governance, and lineage fields.
 */

export type AsiClassification = 'public' | 'internal' | 'restricted';

export interface AsiTrustMetadata {
  agent_id: string;
  policy_scope: string;
  classification: AsiClassification;
  lineage_hash: string;
  parent_hash?: string;
  payload_hash: string;
  signature?: string;
  schema_ref: string;
  delivery: "at-least-once" | "exactly-once";
}

export interface AsiEnvelope<T = unknown> {
  // CloudEvents 1.0 Standard Fields
  specversion: "1.0";
  type: string;        // e.g., "asi.decision.proposed"
  source: string;      // e.g., "/agents/budget-agent-01"
  id: string;          // Unique event ID
  time: string;        // ISO 8601 timestamp
  subject?: string;    // The object the event is about
  datacontenttype: "application/json";

  // Trace Propagation (W3C Trace Context)
  traceparent: string;
  tracestate?: string;

  // ASI Specific Extensions
  asi: AsiTrustMetadata;

  // The Data Payload
  data: T;
}

/**
 * Example Payload for Budget Reallocation
 */
export interface BudgetReallocationDecisionData {
  requestId: string;
  amount: number;
  currency: string;
  fromAccount: string;
  toAccount: string;
  reason: string;
  riskScore: number;
}

/**
 * RFC 7807 - Problem Details for HTTP APIs
 *
 * Used for all API error responses in the ASI Control Plane.
 */
export interface ProblemDetails {
  type: string;        // URI reference that identifies the problem type
  title: string;       // Short, human-readable summary of the problem
  status: number;      // HTTP status code
  detail?: string;     // Human-readable explanation specific to this occurrence
  instance?: string;   // URI reference that identifies the specific occurrence
  [key: string]: any;  // Extensions
}
