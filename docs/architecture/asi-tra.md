# ASI Technical Reference Architecture (TRA) - Source of Truth

This document serves as the repository-local source of truth for the Aetherium-Syndicate-Inspectra (ASI) Protocol Technical Reference Architecture.

## Core Vision
ASI is an **AI-native Enterprise Operating System**. It is designed to provide authority, policy constraints, and proof/audit artifacts within the runtime from the very beginning.

## The 5 Planes of ASI
To manage complexity and ensure governance, the architecture is divided into five functional planes:

1.  **Control Plane**: Manages approvals, authority, safe modes, quarantine, and shutdown paths.
2.  **Data Plane**: Handles agent execution, event-heavy processing, and operations under degraded conditions.
3.  **Trust Plane**: Manages identity, signatures, lineage proofs, and system replays.
4.  **Governance Plane**: Enforces policy-as-code, interventions, and monitors drift/risk.
5.  **Observability Plane**: Provides traces, metrics, logs, audits, and cost management.

## Architectural Principles
- **Contracts over Conventions**: Strict adherence to OpenAPI 3.1, AsyncAPI, and RFC 7807 for error shapes.
- **AI-Native Governance**: Policies are enforced at the runtime level, not just as post-hoc checks.
- **Trace & Lineage**: Every decision and action must propagate trace context (traceparent/tracestate) and maintain a lineage hash chain.
- **CloudEvents Compatibility**: All inter-service communication uses an ASI-extended CloudEvents envelope.

## Key Primitives
- **Envelope**: The canonical message wrapper with trust and governance metadata.
- **DecisionArtifact**: A signed record of an AI or human decision.
- **ExecutionMap**: A DAG or tree representing the workflow execution path.
- **AgentRegistryEntry**: Metadata defining agent capabilities and authority.
- **PolicyCheck**: The result of a policy evaluation against a decision.
- **LineageRecord**: A link in the proof chain for auditability.
