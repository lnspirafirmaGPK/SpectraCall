# ASI 5-Plane Responsibilities

## Control Plane (Mission Control Surface)
- Hosts the SpectraCall UI workflows (`/overview`, `/workspace`).
- Owns approvals, intervention controls, freeze actions, and operator decision capture.
- Emits control events with envelope + trace + lineage references.

## Data Plane (Execution and Context Processing)
- Runs domain workers for finance, operations, and integration workloads.
- Runs multimodal embedding workers (including Gemini embedding) outside the browser.
- Produces evidence bundles and context summaries attached to business events.

## Trust Plane (Proof Layer)
- Validates signatures and identity assertions.
- Maintains lineage chain (`lineage_hash`, `parent_hash`) and payload integrity.
- Stores replay snapshots and verification outcomes.

## Governance Plane (Policy and Risk)
- Evaluates policy scopes before privileged actions.
- Records policy checks, obligations, and exception requests.
- Blocks or routes events needing human approval.

## Observability Plane (Telemetry and Audit)
- Collects traces/metrics/logs and links them to envelope IDs.
- Persists immutable audit artifacts for approvals and execution.
- Supports replay and forensic timelines.

## Cross-Plane Invariants
Every flow must include:
1. CloudEvents-compatible ASI envelope.
2. W3C trace context.
3. Lineage hash links.
4. Policy scope and classification.
5. RFC7807-compliant error contracts for API failures.
