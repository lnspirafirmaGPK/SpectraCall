# Platform Work Plan — SpectraCall Mission Control Upgrade

## Context
- **Initiative:** SpectraCall roadmap completion for mission-critical operations.
- **Scope:** Frontend modules (`infrastructure`, `operations`), API service routes, event-stream protocol shape, ops readiness docs.
- **Drivers:** Reliability, latency visibility, security auditability, and operator developer experience.
- **Current state:** Mission UI exists, but roadmap capabilities were mostly conceptual.
- **Target state:** Production-ready graph visualization + real-time event stream as a baseline for replay and orchestration expansion.
- **Constraints:** p95 UI data refresh ≤ 2s, no additional paid infra, delivery in staged increments.
- **Dependencies:** Control-plane API owners, trust-plane replay storage, on-call SRE workflow updates.

## 1) Workstreams
1. **Architecture** — Add infrastructure graph module and canonical node/edge data model.
2. **Protocol** — Define API contracts for topology snapshot + SSE event stream.
3. **Reliability** — Add health states, latency summaries, event severity taxonomy.
4. **Benchmark** — Track stream cadence (1.5s), render cap (latest 10 events), and page load timing.
5. **Ops** — Add runbook checklist for stream interruption and degraded node response.
6. **Migration** — Roadmap item closure and progressive enablement of next capabilities.

## 2) Backlog (Epic → Story → Task)

### Epic A — Infrastructure Graph Visualization
- **Story A1:** Operator can see live topology with node health and traffic.
  - **Task A1.1:** Implement typed graph schema (`InfrastructureGraph`, `InfrastructureNode`, `InfrastructureEdge`).
    - **AC:** Typecheck passes with no `any` on graph payload paths.
  - **Task A1.2:** Implement `/api/infrastructure/graph` returning canonical topology payload.
    - **AC:** Endpoint responds 200 with ≥5 nodes and ≥4 edges in JSON shape.
  - **Task A1.3:** Render graph dashboard UI module.
    - **AC:** UI shows node cards, link cards, total RPS, and average latency.

### Epic B — Real-time AetherBus Streaming
- **Story B1:** Operator receives continuous event updates from AetherBus-like feed.
  - **Task B1.1:** Implement `/api/infrastructure/events` as SSE endpoint.
    - **AC:** Browser receives new message at least every 2 seconds.
  - **Task B1.2:** Add event severity badges and rolling event window.
    - **AC:** Latest 10 events retained, older events dropped deterministically.

### Epic C — Roadmap Governance & Rollout
- **Story C1:** Delivery status remains source-of-truth in README.
  - **Task C1.1:** Remove completed roadmap items.
    - **AC:** Completed items no longer appear unchecked.
  - **Task C1.2:** Keep pending items ordered by execution priority.
    - **AC:** Remaining list contains only not-yet-delivered capabilities.

## 3) Options, Tradeoffs, Decision
1. **Option 1: Polling every 2s**
   - ✅ Simpler infra, easy retries.
   - ❌ Higher request overhead, less “live” UX.
2. **Option 2: SSE stream (chosen)**
   - ✅ Efficient one-way live updates, native browser support.
   - ❌ Requires connection lifecycle handling.
3. **Option 3: WebSocket bi-directional**
   - ✅ Future-friendly for control actions.
   - ❌ Higher complexity for current read-only stream requirement.

**Chosen:** Option 2 (SSE) for minimum complexity with real-time behavior.

## 4) Risks, Failure Modes, Mitigation
- **Risk:** SSE disconnect during network flap.
  - **Mitigation:** Client auto-reconnect via `EventSource`; runbook to verify endpoint health.
- **Risk:** Event flood impacts UI performance.
  - **Mitigation:** Bounded in-memory list (10 entries) + summarization widgets.
- **Risk:** Inconsistent topology schema across services.
  - **Mitigation:** Shared TypeScript types + contract tests for API payload shape.

## 5) Rollout / Rollback
- **Owner:** Mission UI team (frontend), API gateway owner (routes), SRE on-call (observability checks).
- **Timeline:**
  - Day 1: Ship graph schema + topology endpoint.
  - Day 2: Ship SSE stream + UI event panel.
  - Day 3: Validate with staging synthetic load and update runbook.
- **Rollout plan:** Feature flag route exposure, canary with internal operators, then full release.
- **Rollback plan:** Disable infrastructure nav entry + route feature flag, retain stable overview/workspace paths.

## 6) Production Definition of Done
- **Tests:** lint + typecheck + API smoke checks green.
- **SLO gates:** stream update cadence ≤ 2s; topology fetch success rate ≥ 99.9% in canary.
- **Benchmarking gates:** no frame drops over 60s at 1.5s stream cadence.
- **Observability:** endpoint request counts, stream reconnect rate, client render error logs.
- **Runbooks:** incident response for degraded nodes + disconnected stream.
- **Security checks:** validate response schemas, no sensitive payload fields, headers set for SSE.

## Deduplication Rule
Consolidate repeated roadmap details into one canonical source (this document + live README roadmap section) to maintain a single, complete version of truth.
