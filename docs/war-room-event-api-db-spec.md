# War Room Flow Contract: Events, APIs, and DB (Alerts → Replay → Gems → Approvals)

เอกสารนี้กำหนดสเปกขั้นต่ำที่ “ทดสอบได้” และรองรับ auditability สำหรับ flow หลัก:

1. War Room Alert
2. Replay / Trace Review
3. Gem Draft + Submit
4. Approval Gate + Finalization
5. Knowledge Indexing Hooks

---

## 1) Event Schemas (JSON)

### 1.1 Common Event Envelope (ใช้ร่วมกันทุก event)

```json
{
  "event_id": "EVT-01J1QZ0G5Q4K6N7F7D4E2A8H9B",
  "event_type": "alert.raised",
  "event_version": "1.0",
  "occurred_at": "2026-03-03T05:12:34.567Z",
  "env": "prod",
  "correlation_id": "COR-01J1QZ0G11111111111111111",
  "causation_id": "EVT-01J1QZ0G00000000000000000",
  "actor": {
    "actor_type": "system",
    "actor_id": "drift-detector",
    "actor_role": "SYSTEM"
  },
  "aggregate": {
    "aggregate_type": "alert",
    "aggregate_id": "ALR-20260303-00A7"
  },
  "payload": {},
  "schema_ref": "inspectra://events/alert.raised@1.0",
  "signature": null
}
```

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "inspectra://schemas/event-envelope@1.0",
  "type": "object",
  "required": [
    "event_id",
    "event_type",
    "event_version",
    "occurred_at",
    "env",
    "correlation_id",
    "actor",
    "aggregate",
    "payload",
    "schema_ref"
  ],
  "properties": {
    "event_id": { "type": "string", "minLength": 10 },
    "event_type": { "type": "string" },
    "event_version": { "type": "string", "pattern": "^[0-9]+\\.[0-9]+$" },
    "occurred_at": { "type": "string", "format": "date-time" },
    "env": { "type": "string", "enum": ["prod", "staging", "dev"] },
    "correlation_id": { "type": "string" },
    "causation_id": { "type": ["string", "null"] },
    "actor": {
      "type": "object",
      "required": ["actor_type", "actor_id", "actor_role"],
      "properties": {
        "actor_type": { "type": "string", "enum": ["user", "system", "service"] },
        "actor_id": { "type": "string" },
        "actor_role": { "type": "string" },
        "ip": { "type": ["string", "null"] },
        "user_agent": { "type": ["string", "null"] }
      },
      "additionalProperties": false
    },
    "aggregate": {
      "type": "object",
      "required": ["aggregate_type", "aggregate_id"],
      "properties": {
        "aggregate_type": { "type": "string" },
        "aggregate_id": { "type": "string" }
      },
      "additionalProperties": false
    },
    "payload": { "type": "object" },
    "schema_ref": { "type": "string" },
    "signature": { "type": ["string", "null"] }
  },
  "additionalProperties": false
}
```

### 1.2 Shared Enums

```json
{
  "AlertType": ["DRIFT", "CONTRACT_VIOLATION", "SLA_BREACH", "COST_SPIKE", "REGRESSION_DETECTED"],
  "Severity": ["YELLOW", "ORANGE", "RED"],
  "AlertStatus": ["RAISED", "ACKNOWLEDGED", "RESOLVED", "SUPPRESSED"],
  "GemDraftStatus": ["DRAFT", "PENDING_REVIEW", "PENDING_DUAL_APPROVAL", "REJECTED_CHANGES_REQUESTED"],
  "GemStatus": ["APPROVED", "APPROVED_CONDITIONAL", "REJECTED", "VERIFIED"],
  "ApprovalStatus": ["PENDING_REVIEW", "PENDING_DUAL_APPROVAL", "APPROVED", "APPROVED_CONDITIONAL", "REJECTED"],
  "Scope": ["AGENT", "DEPT", "ORG"],
  "ApprovalDecision": ["APPROVE", "CONDITIONAL", "REJECT"],
  "TraceCoverage": ["COMPLETE", "INCOMPLETE"]
}
```

### 1.3 Core Event Payload Schemas (ตาม flow)

#### (A) `alert.raised@1.0`

```json
{
  "$id": "inspectra://events/alert.raised@1.0",
  "type": "object",
  "required": ["alert_id", "type", "severity", "status", "dept_id", "reason_short", "top_decisions", "resonance"],
  "properties": {
    "alert_id": { "type": "string" },
    "type": { "type": "string" },
    "severity": { "type": "string" },
    "status": { "type": "string" },
    "dept_id": { "type": "string" },
    "agent_id": { "type": ["string", "null"] },
    "reason_short": { "type": "string", "maxLength": 200 },
    "summary": { "type": "object" },
    "top_decisions": { "type": "array", "items": { "type": "string" }, "minItems": 1, "maxItems": 20 },
    "resonance": {
      "type": "object",
      "required": ["score", "delta"],
      "properties": {
        "score": { "type": "number", "minimum": 0, "maximum": 100 },
        "delta": { "type": "number", "minimum": -100, "maximum": 100 }
      },
      "additionalProperties": false
    },
    "time_window": {
      "type": "object",
      "required": ["from", "to"],
      "properties": {
        "from": { "type": "string", "format": "date-time" },
        "to": { "type": "string", "format": "date-time" }
      }
    }
  },
  "additionalProperties": false
}
```

#### (B) `alert.viewed@1.0` (audit)

```json
{
  "$id": "inspectra://events/alert.viewed@1.0",
  "type": "object",
  "required": ["alert_id", "viewer_id", "viewer_role"],
  "properties": {
    "alert_id": { "type": "string" },
    "viewer_id": { "type": "string" },
    "viewer_role": { "type": "string" },
    "view_context": {
      "type": "object",
      "properties": {
        "from_page": { "type": "string" },
        "ui_component": { "type": "string" }
      },
      "additionalProperties": false
    }
  },
  "additionalProperties": false
}
```

#### (C) `replay.viewed@1.0` (audit)

```json
{
  "$id": "inspectra://events/replay.viewed@1.0",
  "type": "object",
  "required": ["decision_id", "trace_id", "viewer_id", "viewer_role", "coverage"],
  "properties": {
    "decision_id": { "type": "string" },
    "trace_id": { "type": "string" },
    "viewer_id": { "type": "string" },
    "viewer_role": { "type": "string" },
    "coverage": { "type": "string", "enum": ["COMPLETE", "INCOMPLETE"] },
    "steps_present": { "type": "array", "items": { "type": "string" }, "minItems": 1 },
    "source": {
      "type": "object",
      "properties": {
        "alert_id": { "type": ["string", "null"] },
        "incident_id": { "type": ["string", "null"] }
      },
      "additionalProperties": false
    }
  },
  "additionalProperties": false
}
```

#### (D) `trace.reviewed@1.0` (compliance)

```json
{
  "$id": "inspectra://events/trace.reviewed@1.0",
  "type": "object",
  "required": ["trace_id", "reviewer_id", "reviewer_role", "steps_viewed"],
  "properties": {
    "trace_id": { "type": "string" },
    "reviewer_id": { "type": "string" },
    "reviewer_role": { "type": "string" },
    "steps_viewed": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": ["CONTEXT", "OPTIONS", "SCORING", "ACTION", "CONTRACTS", "OUTCOME"]
      },
      "minItems": 1,
      "uniqueItems": true
    },
    "annotations_added": { "type": "integer", "minimum": 0 }
  },
  "additionalProperties": false
}
```

#### (E) `gem.draft_created@1.0`

```json
{
  "$id": "inspectra://events/gem.draft_created@1.0",
  "type": "object",
  "required": ["gem_draft_id", "decision_id", "trace_id", "status", "scope"],
  "properties": {
    "gem_draft_id": { "type": "string" },
    "decision_id": { "type": "string" },
    "trace_id": { "type": "string" },
    "alert_id": { "type": ["string", "null"] },
    "incident_id": { "type": ["string", "null"] },
    "status": { "type": "string", "enum": ["DRAFT"] },
    "scope": { "type": "string", "enum": ["AGENT", "DEPT", "ORG"] },
    "dept_id": { "type": ["string", "null"] },
    "title_suggestion": { "type": "string" },
    "root_cause_candidates": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 0,
      "maxItems": 10
    },
    "suggested_patch_types": {
      "type": "array",
      "items": { "type": "string", "enum": ["CONTRACT_PATCH", "SCHEMA_HEAL", "TOOL_RESTRICTION", "POLICY_CLARIFICATION"] }
    },
    "evidence_refs": { "type": "object" }
  },
  "additionalProperties": false
}
```

#### (F) `gem.submitted@1.0`

```json
{
  "$id": "inspectra://events/gem.submitted@1.0",
  "type": "object",
  "required": ["gem_draft_id", "approval_id", "status", "approval_mode", "scope"],
  "properties": {
    "gem_draft_id": { "type": "string" },
    "approval_id": { "type": "string" },
    "status": { "type": "string", "enum": ["PENDING_REVIEW", "PENDING_DUAL_APPROVAL"] },
    "approval_mode": { "type": "string", "enum": ["SINGLE", "DUAL"] },
    "scope": { "type": "string", "enum": ["AGENT", "DEPT", "ORG"] },
    "required_roles": { "type": "array", "items": { "type": "string" }, "minItems": 1 },
    "snapshot": {
      "type": "object",
      "required": ["trace_id", "contract_versions", "patch_hash"],
      "properties": {
        "trace_id": { "type": "string" },
        "contract_versions": { "type": "array", "items": { "type": "string" } },
        "patch_hash": { "type": "string" }
      }
    }
  },
  "additionalProperties": false
}
```

#### (G) `approval.decision@1.0`

```json
{
  "$id": "inspectra://events/approval.decision@1.0",
  "type": "object",
  "required": ["approval_id", "subject_type", "subject_id", "decision", "decider_id", "decider_role"],
  "properties": {
    "approval_id": { "type": "string" },
    "subject_type": { "type": "string", "enum": ["GEM_DRAFT"] },
    "subject_id": { "type": "string" },
    "decision": { "type": "string", "enum": ["APPROVE", "CONDITIONAL", "REJECT"] },
    "decider_id": { "type": "string" },
    "decider_role": { "type": "string" },
    "conditions": { "type": ["array", "null"], "items": { "type": "string" } },
    "reason": { "type": ["string", "null"], "maxLength": 2000 }
  },
  "additionalProperties": false
}
```

#### (H) `gem.finalized@1.0`

```json
{
  "$id": "inspectra://events/gem.finalized@1.0",
  "type": "object",
  "required": ["gem_id", "gem_draft_id", "status", "scope"],
  "properties": {
    "gem_id": { "type": "string" },
    "gem_draft_id": { "type": "string" },
    "status": { "type": "string", "enum": ["APPROVED", "APPROVED_CONDITIONAL"] },
    "scope": { "type": "string", "enum": ["AGENT", "DEPT", "ORG"] },
    "dept_id": { "type": ["string", "null"] },
    "conditions": { "type": ["array", "null"], "items": { "type": "string" } },
    "links": {
      "type": "object",
      "required": ["decision_id", "trace_id"],
      "properties": {
        "decision_id": { "type": "string" },
        "trace_id": { "type": "string" },
        "alert_id": { "type": ["string", "null"] },
        "incident_id": { "type": ["string", "null"] }
      }
    }
  },
  "additionalProperties": false
}
```

#### (I) `memory.indexed@1.0`

```json
{
  "$id": "inspectra://events/memory.indexed@1.0",
  "type": "object",
  "required": ["gem_id", "indexed_at", "tags", "index_refs", "linked"],
  "properties": {
    "gem_id": { "type": "string" },
    "indexed_at": { "type": "string", "format": "date-time" },
    "tags": { "type": "array", "items": { "type": "string" } },
    "index_refs": { "type": "object" },
    "linked": {
      "type": "object",
      "required": ["intent_ids", "contract_versions", "decision_id", "trace_id"],
      "properties": {
        "intent_ids": { "type": "array", "items": { "type": "string" } },
        "contract_versions": { "type": "array", "items": { "type": "string" } },
        "decision_id": { "type": "string" },
        "trace_id": { "type": "string" }
      }
    }
  },
  "additionalProperties": false
}
```

---

## 2) API Endpoints (Minimal, Testable)

แนวทางมาตรฐาน:

- REST + JSON
- Pagination ผ่าน `limit`, `cursor`
- Filtering ตามมิติหลัก (status, severity, dept, scope)
- Header `Idempotency-Key` สำหรับ POST ที่มี side effects สำคัญ

### 2.1 Alerts Service

- `GET /v1/alerts`
  - query: `status,type,severity,dept_id,agent_id,from,to,limit,cursor`
- `GET /v1/alerts/{alert_id}`
- `PATCH /v1/alerts/{alert_id}`
  - body: `{ "status": "ACKNOWLEDGED" }` หรือ `{ "status": "RESOLVED" }`
- `POST /v1/alerts/{alert_id}/views`
  - emit `alert.viewed`
- `POST /v1/freeze-actions`
  - ใช้กับ Freeze Light ใน War Room

ตัวอย่าง `GET /v1/alerts` response:

```json
{
  "items": [
    {
      "alert_id": "ALR-20260303-00A7",
      "type": "DRIFT",
      "severity": "RED",
      "status": "RAISED",
      "dept_id": "FIN",
      "agent_id": null,
      "reason_short": "Resonance dropped below threshold",
      "resonance": { "score": 42.0, "delta": -18.5 },
      "top_decisions": ["DEC-01J1QZ..."],
      "created_at": "2026-03-03T05:12:34.567Z"
    }
  ],
  "next_cursor": "CUR-..."
}
```

### 2.2 Replay Service

- `GET /v1/replay/decisions/{decision_id}`
- `GET /v1/replay/traces/{trace_id}`
- `POST /v1/replay/views`
  - emit `replay.viewed`
- `POST /v1/replay/traces/{trace_id}/annotations`
- `GET /v1/replay/traces/{trace_id}/export?format=pdf|json`

ตัวอย่าง `GET /v1/replay/decisions/{decision_id}` response:

```json
{
  "decision_id": "DEC-01J1QZ...",
  "trace_id": "TRC-01J1QZ...",
  "coverage": "COMPLETE",
  "steps": [
    { "step": "CONTEXT", "present": true },
    { "step": "OPTIONS", "present": true },
    { "step": "SCORING", "present": true },
    { "step": "ACTION", "present": true },
    { "step": "CONTRACTS", "present": true },
    { "step": "OUTCOME", "present": true }
  ],
  "links": { "export_pdf": "/v1/replay/traces/TRC-.../export?format=pdf" }
}
```

### 2.3 Gems Service

- `POST /v1/gems/drafts`
- `PATCH /v1/gems/drafts/{gem_draft_id}`
- `POST /v1/gems/drafts/{gem_draft_id}/submit`
  - emit `gem.submitted`
- `GET /v1/gems/inbox`
- `GET /v1/gems/{gem_id}`

ตัวอย่าง `POST /v1/gems/drafts` response:

```json
{ "gem_draft_id": "GEMD-01J1R1...", "status": "DRAFT" }
```

### 2.4 Approvals Service

- `GET /v1/approvals`
- `GET /v1/approvals/{approval_id}`
- `POST /v1/approvals/{approval_id}/decisions`
  - บังคับ policy: reviewer ต้องเปิด replay ที่เชื่อมโยงก่อน
  - emit `approval.decision`
  - ถ้าผ่านเงื่อนไขให้ trigger finalize gem ต่อ

ตัวอย่าง decision request:

```json
{
  "decision": "CONDITIONAL",
  "conditions": ["STAGING_SOAK_7D", "CANARY_10PCT"],
  "reason": "Require soak + canary due to financial impact"
}
```

---

## 3) DB Tables Minimal (PostgreSQL)

> ออกแบบให้รองรับ status transitions, audit trail, replay evidence, approval gating และ knowledge indexing

### 3.1 Alerts + Audit + Freeze

```sql
CREATE TABLE alerts (
  alert_id            TEXT PRIMARY KEY,
  type                TEXT NOT NULL,
  severity            TEXT NOT NULL,
  status              TEXT NOT NULL,
  dept_id             TEXT NOT NULL,
  agent_id            TEXT NULL,
  reason_short        TEXT NOT NULL,
  summary             JSONB NOT NULL DEFAULT '{}'::jsonb,
  top_decisions       TEXT[] NOT NULL,
  resonance_score     NUMERIC(5,2) NOT NULL,
  resonance_delta     NUMERIC(6,2) NOT NULL,
  time_from           TIMESTAMPTZ NULL,
  time_to             TIMESTAMPTZ NULL,
  correlation_id      TEXT NOT NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  acknowledged_at     TIMESTAMPTZ NULL,
  resolved_at         TIMESTAMPTZ NULL
);

CREATE INDEX idx_alerts_status_created_at ON alerts (status, created_at DESC);
CREATE INDEX idx_alerts_dept_sev ON alerts (dept_id, severity, created_at DESC);
CREATE INDEX idx_alerts_type ON alerts (type, created_at DESC);

CREATE TABLE alert_views (
  view_id        BIGSERIAL PRIMARY KEY,
  alert_id       TEXT NOT NULL REFERENCES alerts(alert_id) ON DELETE CASCADE,
  viewer_id      TEXT NOT NULL,
  viewer_role    TEXT NOT NULL,
  view_context   JSONB NOT NULL DEFAULT '{}'::jsonb,
  viewed_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_alert_views_alert ON alert_views (alert_id, viewed_at DESC);

CREATE TABLE freeze_actions (
  freeze_id          TEXT PRIMARY KEY,
  alert_id           TEXT NULL REFERENCES alerts(alert_id) ON DELETE SET NULL,
  scope              TEXT NOT NULL,
  target_type        TEXT NOT NULL,
  target_id          TEXT NOT NULL,
  status             TEXT NOT NULL,
  reason             TEXT NOT NULL,
  duration_seconds   INTEGER NULL,
  requested_by       TEXT NOT NULL,
  requested_role     TEXT NOT NULL,
  approved_by        TEXT NULL,
  approved_at        TIMESTAMPTZ NULL,
  applied_at         TIMESTAMPTZ NULL,
  released_at        TIMESTAMPTZ NULL,
  correlation_id     TEXT NOT NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_freeze_target_status ON freeze_actions (target_type, target_id, status, created_at DESC);
```

### 3.2 Replay / Trace Store

```sql
CREATE TABLE traces (
  trace_id        TEXT PRIMARY KEY,
  decision_id     TEXT UNIQUE NOT NULL,
  dept_id         TEXT NULL,
  agent_id        TEXT NULL,
  coverage        TEXT NOT NULL,
  steps_present   TEXT[] NOT NULL,
  summary         JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_traces_decision ON traces (decision_id);
CREATE INDEX idx_traces_agent ON traces (agent_id, created_at DESC);

CREATE TABLE trace_steps (
  trace_id        TEXT NOT NULL REFERENCES traces(trace_id) ON DELETE CASCADE,
  step_no         SMALLINT NOT NULL,
  step_type       TEXT NOT NULL,
  content         JSONB NOT NULL,
  PRIMARY KEY (trace_id, step_no)
);

CREATE TABLE replay_views (
  view_id        BIGSERIAL PRIMARY KEY,
  trace_id       TEXT NOT NULL REFERENCES traces(trace_id) ON DELETE CASCADE,
  decision_id    TEXT NOT NULL,
  viewer_id      TEXT NOT NULL,
  viewer_role    TEXT NOT NULL,
  source         JSONB NOT NULL DEFAULT '{}'::jsonb,
  viewed_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_replay_views_trace ON replay_views (trace_id, viewed_at DESC);

CREATE TABLE trace_annotations (
  annotation_id  TEXT PRIMARY KEY,
  trace_id       TEXT NOT NULL REFERENCES traces(trace_id) ON DELETE CASCADE,
  step_type      TEXT NOT NULL,
  note           TEXT NOT NULL,
  tags           TEXT[] NOT NULL DEFAULT '{}',
  actor_id       TEXT NOT NULL,
  actor_role     TEXT NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_annotations_trace ON trace_annotations (trace_id, created_at DESC);
```

### 3.3 Gems (Draft + Final)

```sql
CREATE TABLE gem_drafts (
  gem_draft_id       TEXT PRIMARY KEY,
  status             TEXT NOT NULL,
  title              TEXT NULL,
  decision_id        TEXT NOT NULL,
  trace_id           TEXT NOT NULL REFERENCES traces(trace_id) ON DELETE RESTRICT,
  alert_id           TEXT NULL REFERENCES alerts(alert_id) ON DELETE SET NULL,
  incident_id        TEXT NULL,
  scope              TEXT NOT NULL,
  dept_id            TEXT NULL,
  root_cause         TEXT NULL,
  patch              JSONB NOT NULL DEFAULT '{}'::jsonb,
  verification_plan  JSONB NOT NULL DEFAULT '{}'::jsonb,
  rollback_plan      JSONB NOT NULL DEFAULT '{}'::jsonb,
  evidence_refs      JSONB NOT NULL DEFAULT '{}'::jsonb,
  snapshot_hash      TEXT NULL,
  created_by         TEXT NOT NULL,
  created_role       TEXT NOT NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  submitted_at       TIMESTAMPTZ NULL
);

CREATE INDEX idx_gem_drafts_status ON gem_drafts (status, updated_at DESC);
CREATE INDEX idx_gem_drafts_scope_dept ON gem_drafts (scope, dept_id, updated_at DESC);

CREATE TABLE gems (
  gem_id             TEXT PRIMARY KEY,
  gem_draft_id       TEXT UNIQUE NOT NULL REFERENCES gem_drafts(gem_draft_id) ON DELETE RESTRICT,
  status             TEXT NOT NULL,
  scope              TEXT NOT NULL,
  dept_id            TEXT NULL,
  final_patch        JSONB NOT NULL,
  conditions         JSONB NOT NULL DEFAULT '[]'::jsonb,
  tags               TEXT[] NOT NULL DEFAULT '{}',
  links              JSONB NOT NULL DEFAULT '{}'::jsonb,
  approved_by        TEXT NOT NULL,
  approved_role      TEXT NOT NULL,
  approved_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  indexed_at         TIMESTAMPTZ NULL,
  index_refs         JSONB NOT NULL DEFAULT '{}'::jsonb,
  immutable          BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX idx_gems_status ON gems (status, approved_at DESC);
CREATE INDEX idx_gems_tags ON gems USING GIN (tags);
```

### 3.4 Approvals

```sql
CREATE TABLE approvals (
  approval_id      TEXT PRIMARY KEY,
  subject_type     TEXT NOT NULL,
  subject_id       TEXT NOT NULL,
  status           TEXT NOT NULL,
  approval_mode    TEXT NOT NULL,
  required_roles   TEXT[] NOT NULL,
  assigned_group   TEXT NOT NULL DEFAULT 'COMPLIANCE',
  snapshot         JSONB NOT NULL,
  created_by       TEXT NOT NULL,
  created_role     TEXT NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_approvals_status ON approvals (status, updated_at DESC);
CREATE INDEX idx_approvals_subject ON approvals (subject_type, subject_id);

CREATE TABLE approval_decisions (
  approval_decision_id  TEXT PRIMARY KEY,
  approval_id           TEXT NOT NULL REFERENCES approvals(approval_id) ON DELETE CASCADE,
  decision              TEXT NOT NULL,
  conditions            JSONB NOT NULL DEFAULT '[]'::jsonb,
  reason                TEXT NULL,
  decider_id            TEXT NOT NULL,
  decider_role          TEXT NOT NULL,
  decided_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_approval_decisions_approval ON approval_decisions (approval_id, decided_at DESC);
```

### 3.5 Event Outbox Pattern (แนะนำ)

```sql
CREATE TABLE event_outbox (
  event_id          TEXT PRIMARY KEY,
  event_type        TEXT NOT NULL,
  event_version     TEXT NOT NULL,
  occurred_at       TIMESTAMPTZ NOT NULL,
  env               TEXT NOT NULL,
  aggregate_type    TEXT NOT NULL,
  aggregate_id      TEXT NOT NULL,
  correlation_id    TEXT NOT NULL,
  causation_id      TEXT NULL,
  actor             JSONB NOT NULL,
  payload           JSONB NOT NULL,
  schema_ref        TEXT NOT NULL,
  published_at      TIMESTAMPTZ NULL,
  publish_attempts  INTEGER NOT NULL DEFAULT 0,
  last_error        TEXT NULL
);

CREATE INDEX idx_outbox_unpublished ON event_outbox (published_at) WHERE published_at IS NULL;
CREATE INDEX idx_outbox_aggregate ON event_outbox (aggregate_type, aggregate_id, occurred_at DESC);
```

---

## 4) QA Mapping Checklist (API ↔ DB ↔ Events)

### 4.1 Alerts

- `POST /v1/alerts/{alert_id}/views`
  - DB: insert `alert_views`
  - Event: enqueue `alert.viewed`
- `PATCH /v1/alerts/{alert_id}`
  - DB: update `alerts.status` + timestamp (`acknowledged_at`/`resolved_at`)

### 4.2 Replay

- `GET /v1/replay/decisions/{decision_id}`
  - DB: join `traces` + `trace_steps`
- `POST /v1/replay/views`
  - DB: insert `replay_views`
  - Event: enqueue `replay.viewed`
- `POST /v1/replay/traces/{trace_id}/annotations`
  - DB: insert `trace_annotations`
  - Event: enqueue `trace.reviewed` (เมื่อตรงเงื่อนไข coverage/review)

### 4.3 Gems

- `POST /v1/gems/drafts`
  - DB: insert `gem_drafts`
  - Event: enqueue `gem.draft_created`
- `PATCH /v1/gems/drafts/{id}`
  - Validate required fields per scope
- `POST /v1/gems/drafts/{id}/submit`
  - DB: create `approvals`, update `gem_drafts.status/submitted_at`
  - Event: enqueue `gem.submitted`

### 4.4 Approvals + Finalization + Knowledge

- `POST /v1/approvals/{id}/decisions`
  - DB: insert `approval_decisions`, update `approvals.status`
  - Event: enqueue `approval.decision`
- Approve path
  - DB: create immutable `gems`
  - Event: enqueue `gem.finalized`
- Memory indexing path
  - DB: update `gems.indexed_at/index_refs`
  - Event: enqueue `memory.indexed`
