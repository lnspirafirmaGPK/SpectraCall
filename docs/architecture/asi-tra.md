# ASI Technical Reference Architecture (TRA)

SpectraCall remains the **Mission Control UI and control surface** for ASI operations. It is not a model-serving application. All intelligence execution is delegated to backend workers and services.

## Mission and Positioning Constraints
- SpectraCall owns operator experience, approvals, control workflows, and visibility.
- Model execution, embedding generation, and heavy compute run in backend Data Plane services.
- Every new flow must emit an ASI envelope with trace context, lineage metadata, and policy scope.
- Budget Reallocation is the minimum viable vertical slice because it exercises policy, approval, lineage, replay, and audit together.

## 5-Plane ASI Architecture
1. **Control Plane**: Mission Control actions, approvals, interventions, freeze/unfreeze, and safe shutdown paths.
2. **Data Plane**: Task execution workers, embedding/indexing workers, business-domain processors, and event transformation.
3. **Trust Plane**: Identity, signing, verification, lineage chain integrity, replay verification, and non-repudiation.
4. **Governance Plane**: Policy-as-code checks, risk scoring, approvals gates, obligations, and exception workflow.
5. **Observability Plane**: Traces, logs, metrics, audit trails, and replay analytics.

## Baseline Runtime Contract
All inter-plane events use a CloudEvents-compatible `AsiEnvelope<T>` with mandatory:
- W3C trace propagation (`traceparent`, optional `tracestate`)
- ASI trust metadata (`agent_id`, `policy_scope`, classification, lineage + payload hashes)
- Delivery mode fixed to `at-least-once`
- Schema reference for payload validation

## Budget Reallocation MVP Slice
Budget reallocation is the first mandatory flow due to rich governance:
1. Data Plane proposes `asi.budget.reallocation.proposed`.
2. Governance Plane evaluates policy and risk.
3. Control Plane requests and records human approval.
4. Data Plane executes approved change.
5. Trust + Observability planes persist lineage, replay artifact, and audit records.

## Architectural Guardrails
- No Gemini or embedding calls from browser code.
- Embedding artifacts are evidence/context only, never sole authority for execution.
- APIs return RFC 7807 Problem Details for failures.
- Service catalog participation and lineage participation are explicit per service.
