/**
 * Core ASI primitives for Mission Control views.
 */

import type { LineageRecord as CanonicalLineageRecord } from './lineage';
import type { PolicyCheck as CanonicalPolicyCheck, HumanApproval as CanonicalHumanApproval } from './governance';
import type { ServiceCatalogEntry as CanonicalServiceCatalogEntry } from './service-catalog';

export type AsiPlane = 'Control' | 'Data' | 'Trust' | 'Governance' | 'Observability';

/**
 * UI-friendly service model kept for backward compatibility with existing pages.
 */
export interface ServiceCatalogEntry {
  id: string;
  name: string;
  description: string;
  owner: string;
  plane: AsiPlane;
  domain: string;
  interfaceRefs: string[];
  publishedEvents: string[];
  consumedEvents: string[];
  stateStorage?: string;
  securityMode: 'OIDC' | 'JWKS' | 'Introspection' | 'mTLS' | 'None';
  lineageParticipation: boolean;
  criticalityTier: 'P0' | 'P1' | 'P2' | 'P3';
  sloTier?: 'gold' | 'silver' | 'bronze';
  status: 'healthy' | 'degraded' | 'unavailable';
  onCall: string;
  canonical?: CanonicalServiceCatalogEntry;
}

export interface PolicyCheck {
  id: string;
  passed: boolean;
  reason?: string;
  riskScore: number;
  hitRules: string[];
  evaluatedAt: string;
  evaluatorId: string;
  obligations?: string[];
  canonical?: CanonicalPolicyCheck;
}

export interface HumanApproval {
  id: string;
  approverId: string;
  approvedAt: string;
  decision: 'approve' | 'reject';
  comment?: string;
  signature?: string;
  canonical?: CanonicalHumanApproval;
}

export interface LineageRecord {
  id: string;
  hash: string;
  parent_hash?: string;
  agent_id: string;
  timestamp: string;
  proof_availability: boolean;
  payload_hash: string;
  canonical?: CanonicalLineageRecord;
}

export interface ExecutionResult {
  id: string;
  status: 'success' | 'failure';
  tachyon_route: string;
  trace_id: string;
  timestamp: string;
  output?: unknown;
  error?: unknown;
  replay_id?: string;
}

export interface DecisionArtifact {
  id: string;
  envelope_id: string;
  status: 'proposed' | 'evaluated' | 'approved' | 'rejected' | 'executed' | 'replayed';
  policy_check?: PolicyCheck;
  human_approval?: HumanApproval;
  execution_result?: ExecutionResult;
  lineage_record: LineageRecord;
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
