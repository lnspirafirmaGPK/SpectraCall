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
