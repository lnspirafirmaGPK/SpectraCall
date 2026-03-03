# ASCII Wireframes (12-Column Grid)

เอกสารนี้สรุป **ASCII wireframe ระดับ component** สำหรับหน้า:
- War Room
- Council
- Agents
- Replay
- AI Chat (Drawer + Full Page)

---

## 0) Grid System + Spacing Tokens (มาตรฐานเดียวทั้งระบบ)

### 12-Column Grid (Desktop)
- **Container max width:** 1440px
- **Outer margin:** 24px (ซ้าย/ขวา)
- **Gutter (ระหว่างคอลัมน์):** 24px
- **Column width @1440:**

```text
(1440 - 2×24 - 11×24) / 12
= (1440 - 48 - 264) / 12
= 1128 / 12
= 94px
```

- **Row spacing (ระหว่างบล็อกหลัก):** 24px
- **Card padding:** 16–24px
- **Baseline spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48

### Grid Notation ที่ใช้ใน Wireframe
- `c01–c12` = span คอลัมน์
- `R01…` = row segment (เชิงโครงร่าง)
- กล่องใน ASCII ใช้รหัสย่อ (เช่น KPI, EVT) และมี Legend รายละเอียด

---

## 1) WAR ROOM — Executive Dashboard (พร้อม AI Chat Drawer)

### 1.1 War Room (Base Layout)

```text
COLUMNS → |01 |02 |03 |04 |05 |06 |07 |08 |09 |10 |11 |12 |
R01 TOP  |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |
R02 BODY |SB |SB |WRH|WRH|WRH|WRH|WRH|WRH|WRH|WRH|WRH|WRH|
R03 KPI  |SB |SB |KPI|KPI|KPI|KPI|KPI|KPI|KPI|KPI|KPI|KPI|
R04 GRID |SB |SB |DSP|DSP|DSP|DSP|DSP|DSP|EVT|EVT|EVT|EVT|
R05 GRID |SB |SB |DSP|DSP|DSP|DSP|DSP|DSP|EVT|EVT|EVT|EVT|
R06 GRID |SB |SB |DRF|DRF|DRF|DRF|DRF|DRF|HLT|HLT|HLT|HLT|
R07 GRID |SB |SB |DRF|DRF|DRF|DRF|DRF|DRF|HLT|HLT|HLT|HLT|
R08 ACT  |SB |SB |ACT|ACT|ACT|ACT|ACT|ACT|ACT|ACT|ACT|ACT|
```

#### Legend (War Room)
| Code | Span | Component | ภายใน (widgets ย่อยที่ต้องมี) |
|---|---|---|---|
| TB | c01–c12 | Top Bar | Org/Env selector, Global Search, Alerts bell, Live metrics mini (Throughput/p95/Resonance), User menu |
| SB | c01–c02 | Sidebar | War Room/Council/Agents/Replay… + badges (alerts count) |
| WRH | c03–c12 | War Room Header | Breadcrumb “War Room”, time range picker, filters (dept/severity), buttons: Export / Create Incident |
| KPI | c03–c12 | KPI Strip (6 cards) | (1) Resonance Score + sparkline (2) Execution Gap Latency (3) SLA Health (4) Cost today/forecast (5) Risk Score (6) Drift Alerts count |
| DSP | c03–c08 | Decision Spotlight | list top decisions (impact score), per-item actions: Replay / Contract checks / Escalate, filters: impact threshold, dept |
| EVT | c09–c12 | Live Event Feed | stream list (virtualized), controls: pause/resume, filters: dept/agent/type, search-in-feed, click → slide-over payload+contract result |
| DRF | c03–c08 | Drift Radar | dept heatmap + trend (24h/7d), top drift reasons, click dept → Drift Console filtered |
| HLT | c09–c12 | System Health | service tiles (tachyon/cogitator/governance/gem-forge/ui), p95 latency, error rate, integration status |
| ACT | c03–c12 | Sticky Action Bar | Declare Intent / Freeze Light / Replay Incident / Export Evidence |

### 1.2 War Room + AI Chat Drawer (เปิด Drawer ทับด้านขวา)

> Drawer แนะนำกว้าง 3 columns (`c10–c12`) และซ้อนทับ content ด้านขวา

```text
COLUMNS → |01 |02 |03 |04 |05 |06 |07 |08 |09 |10 |11 |12 |
R01 TOP  |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |
R02 BODY |SB |SB |WRH|WRH|WRH|WRH|WRH|WRH|WRH|CHD|CHD|CHD|
R03 KPI  |SB |SB |KPI|KPI|KPI|KPI|KPI|KPI|KPI|CHD|CHD|CHD|
R04 GRID |SB |SB |DSP|DSP|DSP|DSP|DSP|DSP|EVT|CHT|CHT|CHT|
R05 GRID |SB |SB |DSP|DSP|DSP|DSP|DSP|DSP|EVT|CHT|CHT|CHT|
R06 GRID |SB |SB |DRF|DRF|DRF|DRF|DRF|DRF|HLT|CHT|CHT|CHT|
R07 GRID |SB |SB |DRF|DRF|DRF|DRF|DRF|DRF|HLT|CHT|CHT|CHT|
R08 ACT  |SB |SB |ACT|ACT|ACT|ACT|ACT|ACT|ACT|CHI|CHI|CHI|
```

#### Legend (Chat Drawer)
| Code | Span | Component | ภายใน (widgets ย่อยที่ต้องมี) |
|---|---|---|---|
| CHD | c10–c12 | Chat Drawer Header | Context pills (WarRoom/Dept/Agent/Decision), Safe Mode toggle, Attach button |
| CHT | c10–c12 | Chat Thread | messages + structured cards (Audit/Gem/Contract patch), quick chips: Explain drift / Draft contract / Summarize |
| CHI | c10–c12 | Chat Input | input box, attachments (Decision/Agent/Contract/Gem), Run button |

---

## 2) COUNCIL — CEO AI Council (Intent Draft / Simulation / Negotiation)

### 2.1 Council (Intent Draft tab)

```text
COLUMNS → |01 |02 |03 |04 |05 |06 |07 |08 |09 |10 |11 |12 |
R01 TOP  |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |
R02 BODY |SB |SB |CDH|CDH|CDH|CDH|CDH|CDH|CDH|CDH|CDH|CDH|
R03 TABS |SB |SB |TAB|TAB|TAB|TAB|TAB|TAB|TAB|TAB|TAB|TAB|
R04 MAIN |SB |SB |IBD|IBD|IBD|IBD|IBD|IBD|CCH|CCH|CCH|CCH|
R05 MAIN |SB |SB |IBD|IBD|IBD|IBD|IBD|IBD|CCH|CCH|CCH|CCH|
R06 MAIN |SB |SB |IBD|IBD|IBD|IBD|IBD|IBD|CCH|CCH|CCH|CCH|
R07 OUT  |SB |SB |OUT|OUT|OUT|OUT|OUT|OUT|OUT|OUT|OUT|OUT|
R08 ACT  |SB |SB |CAX|CAX|CAX|CAX|CAX|CAX|CAX|CAX|CAX|CAX|
```

#### Legend (Council – Intent Draft)
| Code | Span | Component | ภายใน (widgets ย่อยที่ต้องมี) |
|---|---|---|---|
| CDH | c03–c12 | Council Header | Intent ID/version, status badge, owner, time range, buttons: Save/Request Simulation/Send to Directors |
| TAB | c03–c12 | Tabs | Intent Draft / Simulation / Bidding & Negotiation |
| IBD | c03–c08 | Intent Builder | Goal, Constraints tags, Values tags, KPI targets mini-table, horizon, budget cap, affected depts |
| CCH | c09–c12 | Council Chat + Proposals | threaded chat, AI Director proposal cards (Accept/Reject/Request evidence), decision log |
| OUT | c03–c12 | Outcomes & Conflicts | predicted KPI delta cards, conflicts list, safeguards recommended (contract/drift) |
| CAX | c03–c12 | Council Action Bar | Approve Draft / Queue Simulation / Convert to Execution Plan / Export |

### 2.2 Council (Simulation tab)

```text
COLUMNS → |01 |02 |03 |04 |05 |06 |07 |08 |09 |10 |11 |12 |
R01 TOP  |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |
R02 BODY |SB |SB |CDH|CDH|CDH|CDH|CDH|CDH|CDH|CDH|CDH|CDH|
R03 TABS |SB |SB |TAB|TAB|TAB|TAB|TAB|TAB|TAB|TAB|TAB|TAB|
R04 CTRL |SB |SB |SIM|SIM|SIM|SIM|SIM|SIM|SIM|SIM|SIM|SIM|
R05 RES  |SB |SB |SR1|SR1|SR1|SR1|SR1|SR1|SR2|SR2|SR2|SR2|
R06 RES  |SB |SB |SR1|SR1|SR1|SR1|SR1|SR1|SR2|SR2|SR2|SR2|
R07 DIFF |SB |SB |DIF|DIF|DIF|DIF|DIF|DIF|REC|REC|REC|REC|
R08 ACT  |SB |SB |CAX|CAX|CAX|CAX|CAX|CAX|CAX|CAX|CAX|CAX|
```

#### Legend เพิ่มเติม
- `SIM`: Simulation control bar (preset, risk tolerance, run/compare/export)
- `SR1`: KPI delta cards + charts
- `SR2`: Risk breakdown + constraints violations
- `DIF`: “What changed?” policy diff viewer
- `REC`: Recommendations list (tighten contract / throttle tool / phased rollout)

---

## 3) AGENTS — List / Creator Studio / Agent Profile

### 3.1 Agents Landing (List + Preview Panel)

```text
COLUMNS → |01 |02 |03 |04 |05 |06 |07 |08 |09 |10 |11 |12 |
R01 TOP  |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |
R02 HDR  |SB |SB |AGH|AGH|AGH|AGH|AGH|AGH|AGH|AGH|AGH|AGH|
R03 FILT |SB |SB |FLT|FLT|FLT|FLT|FLT|FLT|FLT|FLT|FLT|FLT|
R04 GRID |SB |SB |TBL|TBL|TBL|TBL|TBL|TBL|TBL|PRV|PRV|PRV|
R05 GRID |SB |SB |TBL|TBL|TBL|TBL|TBL|TBL|TBL|PRV|PRV|PRV|
R06 GRID |SB |SB |TBL|TBL|TBL|TBL|TBL|TBL|TBL|PRV|PRV|PRV|
R07 GRID |SB |SB |TBL|TBL|TBL|TBL|TBL|TBL|TBL|PRV|PRV|PRV|
R08 ACT  |SB |SB |BUL|BUL|BUL|BUL|BUL|BUL|BUL|BUL|BUL|BUL|
```

#### Legend (Agents Landing)
| Code | Span | Component | ภายใน (widgets ย่อยที่ต้องมี) |
|---|---|---|---|
| AGH | c03–c12 | Agents Header | “Agents”, Create Agent button, env selector (staging/prod), import/export |
| FLT | c03–c12 | Filters Row | dept, status, risk, contract version, drift level + search |
| TBL | c03–c09 | Agents Table | columns: Agent ID/Role/Dept/Env/Status/Resonance/Last Decision/Risk; bulk select |
| PRV | c10–c12 | Quick Preview Panel | profile summary, contracts list, last drift flags, buttons: Open / Replay / Disable |
| BUL | c03–c12 | Bulk Actions | apply contract pack, move dept, disable, request compliance review |

### 3.2 Creator Studio (6-step Wizard + Live Validator)

```text
COLUMNS → |01 |02 |03 |04 |05 |06 |07 |08 |09 |10 |11 |12 |
R01 TOP  |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |
R02 HDR  |SB |SB |CSH|CSH|CSH|CSH|CSH|CSH|CSH|CSH|CSH|CSH|
R03 STEP |SB |SB |STP|STP|STP|STP|STP|STP|STP|STP|STP|STP|
R04 MAIN |SB |SB |FRM|FRM|FRM|FRM|FRM|FRM|VAL|VAL|VAL|VAL|
R05 MAIN |SB |SB |FRM|FRM|FRM|FRM|FRM|FRM|VAL|VAL|VAL|VAL|
R06 MAIN |SB |SB |FRM|FRM|FRM|FRM|FRM|FRM|VAL|VAL|VAL|VAL|
R07 MAIN |SB |SB |FRM|FRM|FRM|FRM|FRM|FRM|VAL|VAL|VAL|VAL|
R08 NAV  |SB |SB |NAV|NAV|NAV|NAV|NAV|NAV|NAV|NAV|NAV|NAV|
```

#### Legend (Creator Studio)
| Code | Span | Component | ภายใน (widgets ย่อยที่ต้องมี) |
|---|---|---|---|
| CSH | c03–c12 | Creator Studio Header | agent name/id, owner, env target, save draft |
| STP | c03–c12 | Stepper | 1 Role / 2 Scope / 3 Skills / 4 Intents / 5 Contracts / 6 Deploy |
| FRM | c03–c08 | Form Panel | fields ตาม step + inline help + examples + required markers |
| VAL | c09–c12 | Live Validator | errors/warnings, least-privilege analyzer, tool risk meter, contract completeness, readiness score |
| NAV | c03–c12 | Wizard Nav Bar | Back / Save Draft / Submit for Compliance / Next (ตาม RBAC) |

### 3.3 Agent Profile (Trace/Reasoning/Governance/Gems)

> ตัวอย่างด้านล่างคือ **Trace Log tab** (แท็บอื่นใช้โครงเดียวกันโดยสลับ content ใน CNT/DTL)

```text
COLUMNS → |01 |02 |03 |04 |05 |06 |07 |08 |09 |10 |11 |12 |
R01 TOP  |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |
R02 SUM  |SB |SB |SUM|SUM|SUM|SUM|SUM|SUM|SUM|SUM|SUM|SUM|
R03 TABS |SB |SB |TAB|TAB|TAB|TAB|TAB|TAB|TAB|TAB|TAB|TAB|
R04 CNT  |SB |SB |TLN|TLN|TLN|TLN|TLN|TLN|DTL|DTL|DTL|DTL|
R05 CNT  |SB |SB |TLN|TLN|TLN|TLN|TLN|TLN|DTL|DTL|DTL|DTL|
R06 CNT  |SB |SB |TLN|TLN|TLN|TLN|TLN|TLN|DTL|DTL|DTL|DTL|
R07 CNT  |SB |SB |TLN|TLN|TLN|TLN|TLN|TLN|DTL|DTL|DTL|DTL|
R08 ACT  |SB |SB |AAP|AAP|AAP|AAP|AAP|AAP|AAP|AAP|AAP|AAP|
```

#### Legend (Agent Profile)
| Code | Span | Component | ภายใน (widgets ย่อยที่ต้องมี) |
|---|---|---|---|
| SUM | c03–c12 | Agent Summary Bar | Agent ID/role/dept/env, status toggle, resonance trend, risk badge, contracts versions, buttons: Replay / Open Drift / Create Gem |
| TAB | c03–c12 | Tabs | Overview / Trace Log / Reasoning / Governance / Gems Applied |
| TLN | c03–c08 | Trace Timeline | filters (time/tool/contract result), list items (decision_id, action, pass/deny/heal), click → open replay |
| DTL | c09–c12 | Trace Detail Panel | selected trace details, payload summary, contract checks snapshot, quick actions: Replay / Escalate |
| AAP | c03–c12 | Actions / Notes | add annotation, export trace bundle, request compliance review |

---

## 4) REPLAY — Reasoning Trace + Audit (6-step)

### 4.1 Replay Page Layout (Timeline + Viewer + Evidence)

```text
COLUMNS → |01 |02 |03 |04 |05 |06 |07 |08 |09 |10 |11 |12 |
R01 TOP  |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |
R02 HDR  |SB |SB |RPH|RPH|RPH|RPH|RPH|RPH|RPH|RPH|RPH|RPH|
R03 MAIN |SB |SB |STP|STP|SVW|SVW|SVW|SVW|SVW|SVW|EVD|EVD|
R04 MAIN |SB |SB |STP|STP|SVW|SVW|SVW|SVW|SVW|SVW|EVD|EVD|
R05 MAIN |SB |SB |STP|STP|SVW|SVW|SVW|SVW|SVW|SVW|EVD|EVD|
R06 MAIN |SB |SB |STP|STP|SVW|SVW|SVW|SVW|SVW|SVW|EVD|EVD|
R07 MAIN |SB |SB |STP|STP|SVW|SVW|SVW|SVW|SVW|SVW|EVD|EVD|
R08 ACT  |SB |SB |---|---|RPA|RPA|RPA|RPA|RPA|RPA|RPA|RPA|
```

#### Legend (Replay)
| Code | Span | Component | ภายใน (widgets ย่อยที่ต้องมี) |
|---|---|---|---|
| RPH | c03–c12 | Replay Header | Decision ID / Incident ID, time range, export bundle, create gem, create incident |
| STP | c03–c04 | 6-Step Timeline | 1 Context / 2 Options / 3 Scoring / 4 Action / 5 Contracts / 6 Outcome (click to jump) |
| SVW | c05–c10 | Step Viewer Canvas | panel ตาม step; มี tree viz (step2), scoring table (step3), schema diff (step5), outcome delta (step6) |
| EVD | c11–c12 | Evidence & Actions | evidence links, annotations, contract versions, redaction status, quick buttons: Attach to incident / Export |
| RPA | c05–c12 | Replay Action Bar | Annotate / Compare / Create Gem Draft / Open Incident / Export PDF/JSON |

---

## 5) AI CHAT — Full Page (Operations Console)

### 5.1 AI Console (Full Page)

```text
COLUMNS → |01 |02 |03 |04 |05 |06 |07 |08 |09 |10 |11 |12 |
R01 TOP  |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |TB |
R02 HDR  |ACH|ACH|ACH|ACH|ACH|ACH|ACH|ACH|ACH|ACH|ACH|ACH|
R03 MAIN |MAC|MAC|MAC|CHT|CHT|CHT|CHT|CHT|CHT|OUT|OUT|OUT|
R04 MAIN |MAC|MAC|MAC|CHT|CHT|CHT|CHT|CHT|CHT|OUT|OUT|OUT|
R05 MAIN |MAC|MAC|MAC|CHT|CHT|CHT|CHT|CHT|CHT|OUT|OUT|OUT|
R06 MAIN |MAC|MAC|MAC|CHT|CHT|CHT|CHT|CHT|CHT|OUT|OUT|OUT|
R07 MAIN |MAC|MAC|MAC|CHT|CHT|CHT|CHT|CHT|CHT|OUT|OUT|OUT|
R08 INPT |---|---|---|INP|INP|INP|INP|INP|INP|---|---|---|
```

#### Legend (AI Console)
| Code | Span | Component | ภายใน (widgets ย่อยที่ต้องมี) |
|---|---|---|---|
| ACH | c01–c12 | AI Console Header | Mode selector (Operator/Compliance), Safe Mode, context pills manager, export |
| MAC | c01–c03 | Macros + Context Library | recent decisions/incidents, pinned agents/depts, macro buttons (draft contract/audit/gem) |
| CHT | c04–c09 | Chat Thread | messages + structured cards (Contract Patch / Audit Summary / Gem Draft) + inline citations (links to evidence) |
| OUT | c10–c12 | Artifacts Panel | generated artifacts + actions: Submit for approval / Apply to staging / Attach to incident |
| INP | c04–c09 | Input Bar | attach Decision/Agent/Contract/Gem, run macro, send |

---

## 6) Component Density + Spacing (Design Guardrails)

- ระหว่างบล็อกใหญ่ในหน้า (เช่น KPI → Grid): **24px**
- ระหว่าง card ใน row เดียวกัน: **16px**
- Padding ภายในการ์ด: **16–24px**
- Table row height: **44–52px**
- Sticky action bar height: **56–64px**
- Drawer width: **3 cols (c10–c12)** หรือ **360–420px** (ตาม breakpoint)

---

## 7) Deep-Dive Sub-Components (ละเอียดเพิ่มอีกระดับ)

> ทุกส่วนยังยึด 12-column grid และระบุ pane/column + table columns + states/interactions สำคัญ

### 7.1 War Room Deep-Dive

#### 7.1.1 KPI Strip (6 cards on c03–c12)

- แนววางแนะนำ: **6 cards × 2 columns/card = 12 columns**
- Card spacing: ใช้ **gutter มาตรฐาน 24px**

```text
KPI (c03–c12) internal grid → |01|02|03|04|05|06|07|08|09|10|11|12|
Row KPI-1                        [RSC][RSC][EGI][EGI][SLA][SLA][CST][CST][RSK][RSK][DRT][DRT]
```

Legend:
- RSC = Resonance Score Card
- EGI = Execution Gap Index Card
- SLA = SLA Health Card
- CST = Cost & Billing Card
- RSK = Risk Score Card
- DRT = Drift Alerts Card

KPI Card template:

```text
┌──────────────────────────────┐
│ Title (icon)        (i)      │
│ Big Value + Unit             │
│ Δ vs prev (↑/↓) + sparkline  │
│ Footer: CTA link             │
└──────────────────────────────┘
```

KPI card required details:
- **RSC**: Big `92/100` + badge (Green/Yellow/Orange/Red), mini `Top drift dept: FIN (−8)`, CTA `Open Drift Console`.
- **EGI**: Big `median intent→action 320ms / p95 2.1s`, mini `Most delay: Approval Gate`, CTA `Open Intent Timeline`.
- **SLA**: Big `% On-time + breach count`, CTA `Open SLA Details`.
- **CST**: Big `Today spend + Forecast`, CTA `Billing`.
- **RSK**: Big `composite score + top drivers`, CTA `Risk Breakdown`.
- **DRT**: Big `active drift alerts count`, CTA `Filter Drift: Orange+`.

#### 7.1.2 Decision Spotlight (DSP c03–c08)

```text
DSP internal grid → |01|02|03|04|05|06|
Row 1               [HDR][HDR][HDR][HDR][HDR][HDR]
Row 2               [FLT][FLT][FLT][FLT][FLT][FLT]
Row 3–8             [TBL][TBL][TBL][TBL][TBL][TBL]
Row 9               [PAG][PAG][PAG][PAG][PAG][PAG]
```

- **DSP-HDR**: `Decision Spotlight` + `Export`, subtitle `High-impact decisions (Top 5/10)`
- **DSP-FLT**: time range (inherit global), impact threshold slider, dept dropdown, status (Executed/Blocked/Healed/Escalated), search by Decision ID
- **DSP-TBL columns**: `Time | Decision ID | Agent | Dept | Impact | Status | Actions`
- **Row actions**: `[Replay] [Contracts] [Escalate]`
- **States**:
  - Empty: `No high-impact decisions in this window.`
  - Loading: skeleton rows
  - Permission-limited: redact Agent/Dept as `Restricted`

#### 7.1.3 Live Event Feed (EVT c09–c12)

```text
EVT internal grid → |01|02|03|04|
Row 1               [HDR][HDR][HDR][HDR]
Row 2               [CTL][CTL][CTL][CTL]
Row 3–9             [LST][LST][LST][LST]
Row 10              [INL][INL][INL][INL]
```

- **EVT-HDR**: `Tachyon Event Feed`, right actions `Pause/Resume`, live dot, rate (evt/s)
- **EVT-CTL**: filters (Dept/Agent/Event Type/Severity), search-in-feed, toggle `Show only contract denies/heals`
- **EVT-LST row template**:
  - `[12:01:03.221] TYPE:billing.invoice.created Dept:FIN Agent:FIN-... Sev:2`
  - `Summary: invoice_id=... amount=... Contract: PASS`
  - Click row → slide-over detail

Slide-over detail:

```text
┌─────────────────────────────────────┐
│ Event Detail (right slide-over)     │
├─────────────────────────────────────┤
│ Header: event_id, timestamp, source │
│ Payload Summary (schema view)       │
│ Contract Checks: pass/deny/heal     │
│ Links: Replay decision | Open agent │
│ Buttons: Create incident | Export   │
└─────────────────────────────────────┘
```

#### 7.1.4 Drift Radar (DRF c03–c08)

```text
DRF internal grid → |01|02|03|04|05|06|
Row 1               [HDR][HDR][HDR][HDR][HDR][HDR]
Row 2–5             [HMP][HMP][HMP][HMP][RSN][RSN]
Row 6–7             [TRN][TRN][TRN][TRN][RSN][RSN]
Row 8               [ACT][ACT][ACT][ACT][ACT][ACT]
```

- **HMP**: heatmap (dept rows × time buckets 1h/6h/24h)
- **RSN**: top reasons + counts (Value misalignment, Tool misuse, Schema drift)
- **TRN**: resonance avg line chart + threshold bands
- **ACT**: `Open Drift Console (filtered)` + `Freeze Light` (RBAC-gated)

#### 7.1.5 System Health (HLT c09–c12)

```text
HLT internal grid → |01|02|03|04|
Row 1               [HDR][HDR][HDR][HDR]
Row 2–4             [SV1][SV1][SV2][SV2]
Row 5–6             [SV3][SV3][SV4][SV4]
Row 7–8             [INT][INT][INT][INT]
```

- **SV tiles**: tachyon-core / cogitator-x / governance / gem-forge / ui
- Tile data: status dot (UP/DOWN/DEGRADED), p95 latency, error rate, queue depth
- CTA: `Open Service Logs`
- **INT**: integrations (CRM/ERP/Email/Docs) + last sync time

#### 7.1.6 Sticky Action Bar (ACT c03–c12)

```text
ACT internal grid → |01|02|03|04|05|06|07|08|09|10|11|12|
Row 1               [INT][INT][FRZ][FRZ][RPL][RPL][EXP][EXP][   ][   ][   ][   ]
```

- **INT** `Declare Intent`: opens modal → Council
- **FRZ** `Freeze Light`: modal with `scope (workflow/dept/org)`, `reason`, `duration`, `approval gate`
- **RPL** `Replay`: jump to Replay page (by decision/incident)
- **EXP** `Export`: dashboard snapshot / evidence bundle list

### 7.2 Council Deep-Dive

#### 7.2.1 Council Header (CDH c03–c12)

```text
CDH internal grid → |01|02|03|04|05|06|07|08|09|10|11|12|
Row 1               [TTL][TTL][TTL][TTL][ID ][ID ][ST ][ST ][OWN][OWN][BTN][BTN]
Row 2               [MET][MET][MET][MET][MET][MET][MET][MET][   ][   ][   ][   ]
```

- **TTL** `CEO AI Council`
- **ID** intent ID + version
- **ST** status (Draft/Simulating/Negotiating/Approved)
- **OWN** owner + last edit
- **BTN** Save / Request Simulation / Send to Directors
- **MET** quick outcome chips (predicted +risk)

#### 7.2.2 Intent Builder (IBD c03–c08)

```text
IBD internal grid → |01|02|03|04|05|06|
Row 1               [GOA][GOA][GOA][GOA][VAL][VAL]
Row 2               [CON][CON][CON][CON][VAL][VAL]
Row 3–4             [KPI][KPI][KPI][KPI][HZN][HZN]
Row 5               [DEP][DEP][DEP][DEP][BUD][BUD]
Row 6               [NOT][NOT][NOT][NOT][NOT][NOT]
```

- GOA: goal editor (rich text)
- CON: constraints tag editor + templates
- VAL: values tags (customer_first, compliance_strict)
- KPI: mini-table `metric/baseline/target/tolerance`
- HZN: horizon + success window
- DEP: affected depts multi-select + impact notes
- BUD: budget cap + compute cap
- NOT: notes + attachments (policy/contract links)

#### 7.2.3 Council Chat + Proposals (CCH c09–c12)

```text
CCH internal grid → |01|02|03|04|
Row 1               [HDR][HDR][HDR][HDR]
Row 2               [PIL][PIL][PIL][PIL]
Row 3–7             [THR][THR][THR][THR]
Row 8–9             [PRP][PRP][PRP][PRP]
Row 10              [INP][INP][INP][INP]
```

- THR: threaded chat (CEO/CFO/CTO/AI Directors)
- PRP cards: ROI, risk, resource ask + buttons `Request Evidence / Accept / Reject`
- INP: message input + attach evidence

#### 7.2.4 Simulation tab (SR1/SR2/DIF/REC)

- **SR1 (c03–c08)**: KPI delta cards + chart grid
- **SR2 (c09–c12)**: risk breakdown + constraint violations
- **DIF (c03–c08)**: policy diff viewer (before/after)
- **REC (c09–c12)**: ranked recommendations + `Apply safeguards`

#### 7.2.5 Negotiation tab (3 panes)

```text
NEG internal grid (c03–c12) → |01|02|03|04|05|06|07|08|09|10|11|12|
Row 1                             [HDR][HDR][HDR][HDR][HDR][HDR][HDR][HDR][HDR][HDR][HDR][HDR]
Row 2–7                           [REQ][REQ][REQ][REQ][TIM][TIM][TIM][TIM][CTL][CTL][CTL][CTL]
Row 8                             [ACT][ACT][ACT][ACT][ACT][ACT][ACT][ACT][ACT][ACT][ACT][ACT]
```

- REQ: resource requests table
- TIM: negotiation timeline (offers/counteroffers)
- CTL: CEO controls (caps/force constraints/approve)
- ACT: convert to execution plan + export

### 7.3 Creator Studio Deep-Dive (Wizard + Validator)

#### 7.3.1 Stepper (STP c03–c12)

```text
[1 Role]—[2 Scope]—[3 Skills]—[4 Intents]—[5 Contracts]—[6 Deploy]
```

States: `DONE ✓ | CURRENT ● | LOCKED 🔒` (lock if required fields incomplete)

#### 7.3.2 Form Panel (FRM c03–c08) by step

Step 1 — Role:

```text
FRM Role → |01|02|03|04|05|06|
Row 1       [TMP][TMP][TMP][NME][NME][NME]
Row 2       [OWN][OWN][OWN][TAG][TAG][TAG]
Row 3       [DSC][DSC][DSC][DSC][DSC][DSC]
```

- TMP role templates, NME naming + id generator, OWN owner/team, TAG risk classification, DSC description (purpose + boundaries)

Step 2 — Scope & Permissions:

```text
FRM Scope → |01|02|03|04|05|06|
Row 1        [DAM][DAM][DAM][PRM][PRM][PRM]
Row 2–5      [DAM][DAM][DAM][PRM][PRM][PRM]
Row 6        [EXC][EXC][EXC][EXC][EXC][EXC]
```

- DAM data access map (tree)
- PRM permission matrix (read/write/execute/approve)
- EXC exceptions + justification

Step 3 — Skills (Tools):

```text
FRM Skills → |01|02|03|04|05|06|
Row 1         [ALW][ALW][ALW][CFG][CFG][CFG]
Row 2–5       [ALW][ALW][ALW][CFG][CFG][CFG]
Row 6         [LMT][LMT][LMT][LMT][LMT][LMT]
```

- ALW allowlist cards
- CFG tool config (endpoints/scopes)
- LMT rate limit + tool budget

Step 4 — Intents:

```text
FRM Intents → |01|02|03|04|05|06|
Row 1          [MAP][MAP][MAP][KPI][KPI][KPI]
Row 2–4        [MAP][MAP][MAP][KPI][KPI][KPI]
Row 5          [CNS][CNS][CNS][CNS][CNS][CNS]
```

- MAP link org intents + scope mapping
- KPI local KPI targets
- CNS constraints tags (SLA/cost/ethics)

Step 5 — Contracts:

```text
FRM Contracts → |01|02|03|04|05|06|
Row 1            [PKS][PKS][PKS][DIF][DIF][DIF]
Row 2–4          [PKS][PKS][PKS][SCH][SCH][SCH]
Row 5            [TST][TST][TST][TST][TST][TST]
```

- PKS contract pack selector (Data/Action/Ethics/Budget)
- DIF diff viewer for overrides
- SCH schema preview + sample validator
- TST run contract tests (dry-run)

Step 6 — Deploy:

```text
FRM Deploy → |01|02|03|04|05|06|
Row 1         [ENV][ENV][ROL][ROL][APP][APP]
Row 2–3       [CHK][CHK][CHK][CHK][CHK][CHK]
Row 4–5       [CAN][CAN][CAN][PHZ][PHZ][PHZ]
Row 6         [BTN][BTN][BTN][BTN][BTN][BTN]
```

- ENV staging/production
- ROL rollout mode (full/canary/phased)
- APP approval gate status
- CHK evidence checklist
- CAN canary settings
- PHZ phased rollout per dept
- BTN deploy actions

#### 7.3.3 Live Validator (VAL c09–c12)

```text
VAL → |01|02|03|04|
Row 1  [HDR][HDR][HDR][HDR]
Row 2  [ERR][ERR][ERR][ERR]
Row 3  [WRN][WRN][WRN][WRN]
Row 4  [LPV][LPV][TRM][TRM]
Row 5  [CTR][CTR][CTR][CTR]
Row 6  [RDY][RDY][RDY][RDY]
```

- ERR: blocking errors
- WRN: warnings (acknowledge to continue)
- LPV: least-privilege analyzer
- TRM: tool risk meter
- CTR: contract completeness (4/4) + versions
- RDY: readiness score + `Submit for Compliance` gate

### 7.4 Replay Deep-Dive

#### 7.4.1 Step Viewer (SVW c05–c10)

```text
SVW → |01|02|03|04|05|06|
Row 1 [HDR][HDR][HDR][HDR][HDR][HDR]
Row 2 [TOP][TOP][TOP][TOP][TOP][TOP]
Row 3–8 [CNT][CNT][CNT][CNT][CNT][CNT]
Row 9 [BOT][BOT][BOT][BOT][BOT][BOT]
```

#### 7.4.2 Step 1: Input Context (2-column split)

```text
Step1 CNT → |01|02|03|04|05|06|
Row 1–4      [SRC][SRC][SCH][SCH][SCH][SCH]
Row 5–8      [SRC][SRC][KEY][KEY][KEY][KEY]
```

- SRC: sources list + quality flags
- SCH: schema view
- KEY: key fields snapshot + redaction indicator

#### 7.4.3 Step 2: Options Explored (Tree Viz)

```text
Step2 CNT → |01|02|03|04|05|06|
Row 1        [CTL][CTL][CTL][CTL][CTL][CTL]
Row 2–7      [TRE][TRE][TRE][BRD][BRD][BRD]
Row 8        [NOD][NOD][NOD][NOD][NOD][NOD]
```

- CTL: depth slider, show-pruned toggle, top-N options, search node
- TRE: expandable tree (score preview)
- BRD: branch detail cards (predicted impact / risks / constraint violations / evidence links)
- NOD: selected node summary + `Compare with chosen`

Tree node row template:

```text
◉ Node A (depth 3)  score: 0.82  risk: low   [View]
  ├─ Node A1 score 0.79 (pruned)
  └─ Node A2 score 0.81
```

#### 7.4.4 Step 3: Scoring / PRM

```text
Step3 CNT → |01|02|03|04|05|06|
Row 1–5      [TBL][TBL][TBL][WHY][WHY][WHY]
Row 6–8      [TBL][TBL][TBL][WHY][WHY][WHY]
```

- TBL columns: `option | PRM score | constraint hits | cost | confidence`
- WHY: rationale viewer + linked policies/values

#### 7.4.5 Step 5: Contract Checks

```text
Step5 CNT → |01|02|03|04|05|06|
Row 1–3      [RES][RES][RES][DIF][DIF][DIF]
Row 4–8      [RES][RES][RES][DIF][DIF][DIF]
```

- RES: pass/deny/heal + contract version
- DIF: schema before/after diff + heal patch details

#### 7.4.6 Evidence Panel (EVD c11–c12)

```text
EVD → |01|02|
Row 1 [HDR][HDR]
Row 2 [LNK][LNK]
Row 3 [ANN][ANN]
Row 4 [MET][MET]
Row 5 [BTN][BTN]
```

- LNK evidence links
- ANN annotations
- MET metadata (versions/redaction)
- BTN attach/export

### 7.5 Chat Deep-Dive

#### 7.5.1 Chat Drawer (c10–c12)

```text
Drawer (3 cols) internal → |01|02|03|
Row 1                [HDR][HDR][HDR]
Row 2                [PIL][PIL][PIL]
Row 3                [CHP][CHP][CHP]
Row 4–9              [THR][THR][THR]
Row 10               [ATT][ATT][ATT]
Row 11               [INP][INP][INP]
```

- PIL context pills: WarRoom/Dept/Agent/Decision/Contract/Gem
- CHP quick chips: Explain drift / Draft contract patch / Summarize / Generate audit note
- ATT attach picker + permissions note
- INP input + Run + Safe Mode

#### 7.5.2 AI Console Full Page — sub-components

##### (a) Macros + Context Library (MAC c01–c03)

```text
MAC → |01|02|03|
Row 1 [HDR][HDR][HDR]
Row 2 [SEC][SEC][SEC]
Row 3 [PIN][PIN][PIN]
Row 4 [MAC][MAC][MAC]
Row 5 [FIL][FIL][FIL]
```

- Recent, pinned entities, macro buttons (Operator/Compliance), filters

##### (b) Chat Thread (CHT c04–c09)

```text
CHT → |01|02|03|04|05|06|
Row 1 [HDR][HDR][HDR][HDR][HDR][HDR]
Row 2–7 [MSG][MSG][MSG][MSG][MSG][MSG]
Row 8 [CRD][CRD][CRD][CRD][CRD][CRD]
Row 9 [INL][INL][INL][INL][INL][INL]
```

Structured card template (Contract Patch Card):

```text
┌───────────────────────────────────────────────┐
│ Contract Patch: governance.contract.billing.v2│
│ Diff Summary: +2 rules, tighten schema        │
│ Risk: Medium | Scope: FIN dept | Rollback: yes│
│ Buttons: [Submit Approval] [Apply Staging]    │
└───────────────────────────────────────────────┘
```

##### (c) Artifacts Panel (OUT c10–c12)

```text
OUT → |01|02|03|
Row 1 [HDR][HDR][HDR]
Row 2 [LST][LST][LST]
Row 3 [DTL][DTL][DTL]
Row 4 [BTN][BTN][BTN]
```

One-click actions: submit approval / attach to incident / export bundle

### 7.6 Breakpoints (สั้น ๆ แต่ใช้ได้จริง)

- `<1200px`: KPI cards → 3 ต่อแถว (`4 cols/card`)
- EVT/HLT (`c09–c12`) → สลับเป็น tab stack ใต้ DSP/DRF
- Replay Step2 tree → TRE เต็มแถว + BRD เป็น drawer
