import { ServiceCatalogEntry } from '../types/asi';

export const mockServiceCatalog: ServiceCatalogEntry[] = [
  {
    id: 'svc-control-mission-ui',
    name: 'SpectraCall Mission Control UI',
    description: 'Operator-facing control surface for approvals, interventions, and workflow oversight.',
    owner: 'Mission Control Team',
    plane: 'Control',
    domain: 'Operations',
    interfaceRefs: ['/contracts/openapi/approvals.yaml', '/contracts/openapi/replay.yaml'],
    publishedEvents: ['asi.control.approval.requested', 'asi.control.approval.recorded'],
    consumedEvents: ['asi.budget.reallocation.proposed', 'asi.policy.evaluated'],
    stateStorage: 'PostgreSQL (control-plane)',
    securityMode: 'OIDC',
    lineageParticipation: true,
    criticalityTier: 'P0',
    sloTier: 'gold',
    status: 'healthy',
    onCall: '@mission-control',
    canonical: {
      service: 'mission-control-ui',
      owner: 'Mission Control Team',
      plane: 'Control',
      domain: 'Operations',
      interfaces: ['/contracts/openapi/approvals.yaml', '/contracts/openapi/replay.yaml'],
      events_published: ['asi.control.approval.requested', 'asi.control.approval.recorded'],
      events_consumed: ['asi.budget.reallocation.proposed', 'asi.policy.evaluated'],
      storage: 'PostgreSQL (control-plane)',
      security_mode: 'oidc',
      lineage_participation: true,
      slo_tier: 'gold',
      criticality_tier: 'P0'
    }
  },
  {
    id: 'svc-data-embedding-worker',
    name: 'Multimodal Embedding Worker',
    description: 'Data Plane worker for Gemini embedding and evidence artifact generation.',
    owner: 'Data Intelligence Team',
    plane: 'Data',
    domain: 'Evidence',
    interfaceRefs: ['/contracts/openapi/gems.yaml'],
    publishedEvents: ['asi.embedding.artifact.created'],
    consumedEvents: ['asi.evidence.ingest.requested'],
    stateStorage: 'Vector DB + Object Storage',
    securityMode: 'JWKS',
    lineageParticipation: true,
    criticalityTier: 'P1',
    sloTier: 'silver',
    status: 'healthy',
    onCall: '@data-intelligence',
    canonical: {
      service: 'embedding-worker',
      owner: 'Data Intelligence Team',
      plane: 'Data',
      domain: 'Evidence',
      interfaces: ['/contracts/openapi/gems.yaml'],
      events_published: ['asi.embedding.artifact.created'],
      events_consumed: ['asi.evidence.ingest.requested'],
      storage: 'Vector DB + Object Storage',
      security_mode: 'jwks',
      lineage_participation: true,
      slo_tier: 'silver',
      criticality_tier: 'P1'
    }
  }
];
