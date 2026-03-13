# Service Catalog Baseline

Each service participating in ASI flows is cataloged with ownership, plane placement, interface contracts, event IO, security mode, and lineage behavior.

## Required Metadata
- `service`
- `owner`
- `plane`
- `domain`
- `interfaces`
- `events_published`
- `events_consumed`
- `storage`
- `security_mode`
- `lineage_participation`
- `slo_tier`
- `criticality_tier`

## Why It Matters
- **Control**: gives operators a trusted map of what can be controlled from Mission Control.
- **Governance**: identifies policy owners and approval boundaries.
- **Trust/Observability**: enables replay, lineage audits, and dependency impact analysis.

## Catalog Governance
- New services must declare envelope schema references and policy scopes before onboarding.
- Services that publish control-impacting events must participate in lineage and replay.
- Security mode must be explicit (`oidc`, `jwks`, `mTLS`, etc.) and auditable.
