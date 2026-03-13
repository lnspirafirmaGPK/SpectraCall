import type { AsiPlane } from './asi';

export type ServiceSecurityMode = 'oidc' | 'jwks' | 'introspection' | 'mtls' | 'none';

export interface ServiceCatalogEntry {
  service: string;
  owner: string;
  plane: AsiPlane;
  domain: string;
  interfaces: string[];
  events_published: string[];
  events_consumed: string[];
  storage: string;
  security_mode: ServiceSecurityMode;
  lineage_participation: boolean;
  slo_tier: 'gold' | 'silver' | 'bronze';
  criticality_tier: 'P0' | 'P1' | 'P2' | 'P3';
}
