/**
 * Core ASI Primitives
 *
 * These types define the primary building blocks of the ASI Enterprise Operating System.
 */

export type AsiPlane = 'Control' | 'Data' | 'Trust' | 'Governance' | 'Observability';

export interface ServiceCatalogEntry {
  id: string;
  name: string;
  description: string;
  owner: string;
  plane: AsiPlane;
  domain: string;
  interfaceRefs: string[];     // URLs/IDs for OpenAPI/AsyncAPI specs
  publishedEvents: string[];   // List of event types emitted
  consumedEvents: string[];    // List of event types processed
  stateStorage?: string;      // The storage layer used (if any)
  securityMode: 'OIDC' | 'JWKS' | 'Introspection' | 'None';
  lineageParticipation: boolean;
  criticalityTier: 'P0' | 'P1' | 'P2' | 'P3';
  status: 'healthy' | 'degraded' | 'unavailable';
  onCall: string;             // On-call rotation or contact
}

export interface DecisionArtifact {
  id: string;
  envelope_id: string;        // The ID of the AsiEnvelope that proposed this decision
  status: 'proposed' | 'evaluated' | 'approved' | 'rejected' | 'executed' | 'replayed';
  policy_check?: PolicyCheck;
  human_approval?: HumanApproval;
  execution_result?: ExecutionResult;
  lineage_record: LineageRecord;
}

export interface PolicyCheck {
  id: string;
  passed: boolean;
  reason?: string;
  riskScore: number;
  hitRules: string[];
  evaluatedAt: string;
  evaluatorId: string;
}

export interface HumanApproval {
  id: string;
  approverId: string;
  approvedAt: string;
  decision: 'approve' | 'reject';
  comment?: string;
  signature?: string;
}

export interface LineageRecord {
  id: string;
  hash: string;
  parent_hash?: string;
  agent_id: string;
  timestamp: string;
  proof_availability: boolean;
  payload_hash: string;
}

export interface ExecutionResult {
  id: string;
  status: 'success' | 'failure';
  tachyon_route: string;
  trace_id: string;
  timestamp: string;
  output?: any;
  error?: any;
}

export interface WorkplaceConnector {
  id: string;
  name: string;
  type: 'M365' | 'Google' | 'Zoho' | 'WPS';
  status: 'connected' | 'disconnected' | 'error';
  classificationMode: 'automatic' | 'manual';
  redactionEnabled: boolean;
  capabilities: string[];
  lastSync: string;
  tenantId: string;
}
