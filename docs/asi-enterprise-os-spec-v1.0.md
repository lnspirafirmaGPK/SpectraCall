# ASI Enterprise OS Spec v1.0

**Document ID:** ASI-EOS-SPEC-1.0  
**Status:** Ready for implementation  
**Primary Audience:** Product, Platform, AI Engineering, Security, Compliance, SRE, Frontend  
**Runtime Stack Alignment:** Next.js 15 (App Router), shadcn/ui, Genkit, Event-driven backend (Tachyon Core/AetherBus)

---

## 1) Purpose and Scope

ASI (Aetherium Syndicate Inspectra) is the Enterprise OS for autonomous organizations. This spec defines the first production-grade contract across:

1. **Domain model** (canonical entities and invariants)
2. **APIs** (control plane + execution plane)
3. **Event schemas** (event-sourced system of record)
4. **Approval workflow state machine** (human + AI governance)
5. **UI component contracts** for Next.js + shadcn/ui + Genkit

> Principle: **Evidence-first autonomy**. Decisions must be reproducible from system evidence, not explanation text alone.

---

## 2) System Context

### 2.1 Logical Planes

- **Cognitive Plane**: AI planning/reasoning, simulation, recommendation
- **Tachyon Bridge**: high-performance orchestration bridge (Rust/PyO3 integration boundary)
- **Silicon Fabric**: low-latency transport/data plane (RDMA/RoCE-compatible architecture)

### 2.2 Control and Data Separation

- **Control Plane**
  - policy definitions
  - approval gates
  - release controls (freeze/throttle)
  - compliance evidence and reports
- **Data Plane**
  - intent execution
  - tool invocations
  - state transitions as events
  - telemetry and outcome traces

---

## 3) Domain Model (Canonical)

All IDs are ULID/UUIDv7-compatible strings. All timestamps are RFC3339 UTC.

## 3.1 Core Aggregates

### Organization

- `orgId`
- `name`
- `environments[]` (`dev|staging|prod`)
- `governanceProfileId`

### Department

- `departmentId`
- `orgId`
- `name`
- `riskTier` (`low|medium|high|critical`)

### Actor (Human or AI)

- `actorId`
- `type` (`human|ai_director|agent`)
- `role` (`operator|compliance_officer|executive|system`)
- `identityRef` (SSO principal or service identity)

### Agent

- `agentId`
- `orgId`
- `departmentId`
- `name`
- `status` (`draft|staging|production|suspended|retired`)
- `capabilityProfile`
- `scopePolicyId`
- `contractPackVersion`
- `driftProfileId`
- `ownerActorId`

### Intent

- `intentId`
- `orgId`
- `departmentId`
- `title`
- `goal`
- `constraints[]`
- `kpis[]`
- `priority`
- `riskClass` (`R1..R4`)
- `requestedBy`
- `executionMode` (`manual|assisted|autopilot`)

### ContractPack

- `contractPackId`
- `version`
- `dataContractRef` (JSON schema bundle)
- `actionPolicyRef` (OPA/Rego package)
- `ethicsPolicyRef`
- `budgetPolicyRef`
- `effectiveFrom`
- `effectiveTo`

### DecisionTrace

- `traceId`
- `intentId`
- `agentId`
- `rootSpanId`
- `steps[6]` (Context, Options, Scoring, Action, Contracts, Outcome)
- `evidenceRefs[]` (event IDs, object hashes, tool outputs)
- `completenessScore` (0..1)

### GemOfWisdom

- `gemId`
- `sourceIncidentId`
- `rootCauseCategory`
- `patchType` (`contract_patch|schema_rule|tool_restriction|test_requirement`)
- `scope` (`agent|department|org`)
- `rolloutPlan`
- `rollbackPlan`
- `verificationMetrics[]`
- `approvalStatus`

### Incident

- `incidentId`
- `severity` (`SEV1..SEV4`)
- `triggerType` (`drift|policy_violation|ops|security|financial`)
- `status` (`open|contained|resolved|postmortem_done`)
- `freezeLevel` (`none|workflow|department|org`)

## 3.2 Invariants

1. Production execution **requires** approved `ContractPack`.
2. Every production decision **must** have a `DecisionTrace` with all 6 canonical steps.
3. `freezeLevel=org` blocks all non-whitelisted writes.
4. Contract evaluation is **fail-closed**: unknown/timeout => deny or escalate.
5. Any `GemOfWisdom` with scope `org` requires compliance + executive approval.

---

## 4) API Specification (v1)

Base path: `/api/v1`  
Auth: JWT/OIDC + RBAC + ABAC context  
Idempotency: `Idempotency-Key` header for mutating endpoints

## 4.1 Control Plane APIs

### 4.1.1 Intents

- `POST /intents`
  - Create intent draft
- `POST /intents/{intentId}/submit`
  - Submit for approval workflow
- `POST /intents/{intentId}/simulate`
  - Trigger simulation
- `POST /intents/{intentId}/approve`
  - Approve gate (role-constrained)
- `POST /intents/{intentId}/reject`

**Create Intent Request**

```json
{
  "title": "Reduce invoice processing time",
  "goal": "Lower p95 invoice cycle by 35%",
  "constraints": ["No customer-visible downtime", "Budget <= 120000"],
  "kpis": [
    { "name": "invoice_p95_hours", "target": "<= 18" },
    { "name": "error_rate", "target": "< 0.5%" }
  ],
  "priority": "high",
  "riskClass": "R3",
  "executionMode": "assisted",
  "departmentId": "dep_finance"
}
```

### 4.1.2 Agents

- `POST /agents`
- `PATCH /agents/{agentId}`
- `POST /agents/{agentId}/deploy`
- `POST /agents/{agentId}/suspend`
- `GET /agents?departmentId=&status=&riskTier=&driftLevel=`

### 4.1.3 Contracts and Policy

- `POST /contracts/packs`
- `POST /contracts/packs/{id}/validate`
- `POST /contracts/packs/{id}/promote`
- `GET /contracts/decisions?intentId=&agentId=&from=&to=`

### 4.1.4 Freeze and Safety

- `POST /safety/freeze`
- `POST /safety/unfreeze`
- `POST /safety/throttle`

**Freeze Request**

```json
{
  "level": "department",
  "departmentId": "dep_finance",
  "reason": "alignment drift exceeded threshold",
  "evidenceRefs": ["evt_01J...", "trc_01J..."]
}
```

### 4.1.5 Gems

- `POST /gems`
- `POST /gems/{gemId}/submit`
- `POST /gems/{gemId}/approve`
- `POST /gems/{gemId}/rollout`
- `POST /gems/{gemId}/rollback`
- `GET /gems?scope=&status=&rootCauseCategory=`

## 4.2 Execution Plane APIs

### 4.2.1 Execute Intent

- `POST /execution/intents/{intentId}/run`
- Response includes `executionId`, `traceId`, `rootSpanId`

### 4.2.2 Tool Invocation Gateway

- `POST /execution/tools/invoke`
- Enforces allowlist + rate limits + budget policy

### 4.2.3 Replay

- `GET /replay/{traceId}`
- `POST /replay/{traceId}/export` (JSON/PDF evidence bundle)

### 4.2.4 Telemetry

- `GET /telemetry/war-room`
- `GET /telemetry/drift`
- `GET /telemetry/aetherbus`

## 4.3 Error Contract

```json
{
  "error": {
    "code": "POLICY_DENY",
    "message": "Action denied by ContractPack v1.3.2",
    "correlationId": "cor_01J...",
    "details": {
      "policyRef": "policy/action/v1.3.2",
      "ruleId": "deny_unscoped_write"
    }
  }
}
```

---

## 5) Event Schemas (Event-Sourced Canonical)

All events include common envelope:

```json
{
  "eventId": "evt_01J...",
  "eventType": "IntentSubmitted",
  "eventVersion": "1.0",
  "occurredAt": "2026-01-20T09:15:31Z",
  "orgId": "org_...",
  "environment": "prod",
  "actor": {
    "actorId": "act_...",
    "type": "human",
    "role": "operator"
  },
  "correlationId": "cor_...",
  "causationId": "evt_...",
  "payload": {}
}
```

## 5.1 Intent Lifecycle Events

- `IntentCreated`
- `IntentSubmitted`
- `IntentSimulationCompleted`
- `IntentApproved`
- `IntentRejected`
- `IntentExecutionStarted`
- `IntentExecutionCompleted`
- `IntentExecutionFailed`

## 5.2 Agent Lifecycle Events

- `AgentDraftCreated`
- `AgentScopeUpdated`
- `AgentContractAttached`
- `AgentDeployedToStaging`
- `AgentPromotedToProduction`
- `AgentSuspended`

## 5.3 Governance Events

- `PolicyDecisionEvaluated` (allow|deny|rewrite|escalate)
- `SchemaValidationFailed`
- `SchemaHealerApplied`
- `BudgetThresholdBreached`
- `FreezeActivated`
- `FreezeReleased`

## 5.4 Drift and Safety Events

- `DriftSignalObserved`
- `DriftSeverityEscalated`
- `ContainmentActionTriggered`

**DriftSignalObserved payload**

```json
{
  "driftType": "concept",
  "entityType": "agent",
  "entityId": "agt_01J...",
  "metric": "alignment_drift_score",
  "value": 0.81,
  "baseline": 0.22,
  "threshold": 0.65,
  "severity": "orange"
}
```

## 5.5 Decision Trace Events

- `TraceContextCaptured`
- `TraceOptionsEnumerated`
- `TraceScoringRecorded`
- `TraceActionSelected`
- `TraceContractChecksRecorded`
- `TraceOutcomeMeasured`
- `TraceFinalized`

## 5.6 Gem Lifecycle Events

- `GemDrafted`
- `GemReviewedByCompliance`
- `GemApproved`
- `GemRolledOut`
- `GemVerificationRecorded`
- `GemRolledBack`

---

## 6) Approval Workflow State Machine

## 6.1 Intent Approval FSM

States:

- `DRAFT`
- `SUBMITTED`
- `SIMULATION_REQUIRED`
- `SIMULATION_PASSED`
- `COMPLIANCE_REVIEW`
- `EXEC_REVIEW` (for R3/R4 or org-wide impact)
- `APPROVED`
- `REJECTED`
- `EXPIRED`

Transitions:

- `DRAFT -> SUBMITTED` (operator)
- `SUBMITTED -> SIMULATION_REQUIRED` (system, based on risk policy)
- `SIMULATION_REQUIRED -> SIMULATION_PASSED` (system)
- `SIMULATION_PASSED -> COMPLIANCE_REVIEW` (system)
- `COMPLIANCE_REVIEW -> EXEC_REVIEW` (if high-impact)
- `COMPLIANCE_REVIEW -> APPROVED` (if low/medium impact)
- `EXEC_REVIEW -> APPROVED`
- `* -> REJECTED` (authorized reviewer)
- `SUBMITTED/REVIEW -> EXPIRED` (SLA timeout)

Guards:

1. Missing contract pack => block.
2. Drift red in affected scope => block and suggest freeze.
3. Open SEV1 in same scope => require executive override.

## 6.2 Gem Approval FSM

States:

- `DRAFT`
- `COMPLIANCE_REVIEW`
- `APPROVED`
- `ROLLED_OUT_CANARY`
- `ROLLED_OUT_FULL`
- `VERIFIED`
- `ROLLED_BACK`

Rules:

- Scope `org` requires executive co-approval.
- Rollout requires explicit rollback plan.
- Verification window defaults to 14 days before `VERIFIED`.

---

## 7) UI Component Contract (Next.js + shadcn/ui + Genkit)

## 7.1 App Router Structure

```text
src/app/
  (shell)/
    war-room/page.tsx
    council/page.tsx
    agents/page.tsx
    agents/[agentId]/page.tsx
    policies/page.tsx
    resonance/page.tsx
    gems/page.tsx
    replay/[traceId]/page.tsx
    settings/page.tsx
```

Shared layout contract:

- `TopBar` with org/env selector, search, alerts, live metrics
- `Sidebar` navigation
- `RightDrawer` AI Chat + quick actions

## 7.2 War Room Components

- `AICommandCenterCard`
  - props: `mode`, `readinessScore`, `pillarProgress`, `onToggleAutopilot`
- `AetherBusStatusCard`
  - props: `throughput`, `p95LatencyByLayer`, `benchmarkRef`
- `ResonanceDriftChart`
  - props: `timeseries`, `onPointSelect`
- `CrisisSimulatorPanel`
  - props: `scenarioInput`, `onSimulate`, `result`
- `ActionBarSticky`
  - actions: `declareIntent`, `freezeLight`, `openReplay`, `exportEvidence`

## 7.3 Council Components

- `IntentDraftForm`
- `SimulationCompareTable`
- `NegotiationBoard`

Contract:

- all submit actions return `correlationId`
- all simulation cards render uncertainty/confidence + assumptions

## 7.4 Agents Components

- `AgentRegistryTable` (filters: dept/status/risk/contract/drift)
- `CreatorStudioWizard` (6 steps)
  1. Role
  2. Scope
  3. Skills
  4. Intents
  5. Contracts
  6. Deploy
- `ValidatorPanel`
  - shows over-permission, missing contract, budget risk, unresolved schema mismatch

## 7.5 Replay Components

- `ReplayTimeline6Step`
- `EvidenceCanvas`
- `ComplianceAssistantPanel` (Genkit-backed)
- `ExportBundleDialog`

Contract:

- Every rendered claim in assistant output must include trace/event citation chips.
- No-citation statements are labeled `UNVERIFIED`.

## 7.6 AI Chat Contract (Genkit)

### Flow names

- `chat.assist`
- `chat.compliance_summary`
- `artifact.contract_patch_draft`
- `artifact.gem_draft`
- `artifact.audit_note`

### Structured output schema (example)

```ts
export type ChatEvidenceResponse = {
  answer: string;
  citations: Array<{
    type: "event" | "trace" | "policy" | "schema";
    ref: string;
    confidence: number;
  }>;
  artifacts?: Array<{
    artifactType: "contract_patch" | "gem_draft" | "audit_note";
    artifactId: string;
  }>;
};
```

Safe mode contract:

- if `safeMode=true` and citations are empty => block final answer, return remediation prompt.

---

## 8) Security, Compliance, and Observability Requirements

1. **RBAC + ABAC** required on all mutating APIs.
2. **Immutable audit log** with retention policy by environment.
3. **OpenTelemetry** trace propagation across UI/API/worker/tool gateway.
4. **PII controls**: redact in UI by default, reveal by permission and reason logging.
5. **Policy Decision Logging**: store input hash, policy version, decision, rule IDs.
6. **Schema Compatibility Checks** must run in CI for contract changes.

---

## 9) Non-Functional Requirements (NFR)

- Availability: 99.95% for control APIs in production
- Replay integrity: deterministic reconstruction for 99.9% of traces
- Evidence completeness: >= 98% decisions with full 6-step trace
- Policy eval p95: <= 50ms (control path)
- Freeze propagation: <= 5s to all in-scope executors

---

## 10) Implementation Checklist (Definition of Done)

- [ ] Domain entities implemented with versioned migrations
- [ ] All mutating endpoints idempotent and audited
- [ ] Event schemas published and validated in registry
- [ ] Intent + Gem FSM enforced server-side
- [ ] Replay page renders 6-step evidence for production traces
- [ ] Genkit flows produce structured outputs with citations
- [ ] Freeze/throttle runbooks implemented and tested
- [ ] SLO dashboards + alerts configured

---

## 11) Appendix A: Suggested TypeScript Contracts

```ts
export type ApprovalState =
  | "DRAFT"
  | "SUBMITTED"
  | "SIMULATION_REQUIRED"
  | "SIMULATION_PASSED"
  | "COMPLIANCE_REVIEW"
  | "EXEC_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "EXPIRED";

export interface PolicyDecision {
  decisionId: string;
  policyRef: string;
  action: "allow" | "deny" | "rewrite" | "escalate";
  ruleIds: string[];
  evaluatedAt: string;
  correlationId: string;
}
```

## 12) Appendix B: Rollout Recommendation

1. Start with one department and one high-value workflow.
2. Enforce contracts in staging first; run shadow policy decisions in production.
3. Enable replay + evidence export before enabling autopilot mode.
4. Gate organization-wide autonomy on KPI thresholds (trace completeness, repeat incidents, drift containment time).

---

**End of Spec — ASI Enterprise OS Spec v1.0**
