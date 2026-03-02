# Click-by-click Flow: War Room Alert → Replay → Gem → Approval

เอกสารนี้ระบุ flow ระดับคลิกต่อคลิกสำหรับ 2 บทบาทหลัก:
- **Operator** (OPS_ADMIN)
- **Compliance Officer** (AUDITOR + GOV_APPROVER)

โดยแต่ละจุดระบุ **State / Guard / Output** อย่างชัดเจนเพื่อใช้เป็น baseline สำหรับ UX, backend workflow, และ auditability

---

## 0) Preconditions

### Required session context
- ผู้ใช้ต้องล็อกอินแล้ว
- Environment ต้องเป็น `PROD` หรือ `STAGING` (ตามกรณีทดสอบ)

### Required RBAC
- Operator: `OPS_ADMIN`
- Compliance Officer: `AUDITOR` + `GOV_APPROVER`

### Required feature flags / services
- Resonance Drift Detector = enabled
- Audit & Replay (Trace Store) = enabled
- Gems Library + Approval Gate = enabled

**State**
- `SESSION_READY`

**Guards**
- valid session token
- environment allowed
- role binding present
- services healthy

**Outputs**
- หน้า War Room พร้อมใช้งาน
- Alerts drawer โหลดข้อมูลได้

---

## 1) Trigger: War Room Alert (Drift / Compliance)

### 1.1 Open alert from War Room
1. ไปหน้า **War Room**
2. คลิกปุ่ม **🔔 Alerts** (มุมขวาบน)
3. ระบบเปิด **Alerts Drawer** ด้านขวา
4. ผู้ใช้เห็น list ประเภท: `DRIFT`, `CONTRACT_VIOLATION`, `SLA_BREACH`, `COST_SPIKE`
5. คลิก alert card: `DRIFT RED – FIN Dept – Resonance 42`

**State transitions**
- `WAR_ROOM_IDLE` → `ALERTS_DRAWER_OPEN` → `ALERT_SELECTED`

**Guards**
- drawer fetch success
- alert ยัง active หรืออยู่ใน retention window

**Outputs**
- เปิด **Alert Detail Panel** (nested drawer หรือ modal)
- แสดง:
  - Drift summary
  - Top offending decisions (Top 5 IDs)
  - Suggested actions: `Replay`, `Freeze Light`, `Open Drift Console`

---

## 2) Containment (Optional but recommended)

### 2.1 Freeze Light when severity is Red
1. เงื่อนไข: Severity = `Red`
2. ใน Alert Detail คลิก **Freeze Light**
3. เปิด **Freeze Light Modal**
4. เลือก scope: `Workflow` (default) / `Department` / `Org`
5. เลือก target (workflow หรือ FIN)
6. duration default = `Until manual unfreeze`
7. reason auto-fill จาก alert (แก้ไขได้)
8. ตั้งค่า require approval (ตาม policy)
9. Operator คลิก **Confirm Freeze**

**State transitions**
- `ALERT_SELECTED` → `CONTAINMENT_PENDING` → `FREEZE_APPLIED`

**Guards**
- ถ้า Operator ไม่มีสิทธิ์ freeze ระดับ dept/org:
  - block direct freeze
  - เปลี่ยน action เป็น `Request Approval`

**Outputs**
- สร้าง Freeze Action Record
- Live event feed เพิ่ม event: `FREEZE_APPLIED`
- Drift console แสดงสถานะ `Contained`
- ถ้าโดน guard: ส่ง approval task ไป Compliance/Executive queue

---

## 3) Jump to Replay (Alert → Decision Replay)

### 3.1 Open root-cause decision
1. ใน Alert Detail section `Top Offending Decisions`
2. คลิก Decision ID แรก (เช่น `DEC-9F31...`) หรือกดปุ่ม **Replay**

**State transitions**
- `ALERT_SELECTED` → `REPLAY_NAVIGATING` → `REPLAY_LOADED`

**Guards**
- decision trace ต้องหาเจอใน Trace Store
- ผู้ใช้มีสิทธิ์อ่าน evidence ของ dept นั้น

**Outputs**
- navigate ไป `/replay?decision_id=DEC-9F31&from=alert_id=ALR-...`
- auto-load `Replay Timeline (6 steps)`
- ถ้า alert เป็น violation: highlight step `Contracts/Outcome`

---

## 4) Replay Investigation (6-step trace)

### 4.1 Header controls
ผู้ใช้เห็น Replay header:
- Decision ID
- Agent ID
- Dept
- Time window
- Buttons: `Export Bundle`, `Annotate`, `Create Incident`, `Create Gem Draft`

**State**
- `REPLAY_READY`

**Outputs**
- ผู้ใช้เริ่ม review evidence ได้แบบ deterministic

### 4.2 Click-by-click on 6 steps

#### Step 1: Input Context
1. คลิก timeline: `Step 1 - Input Context`
2. ตรวจ data sources, data quality flags, PII redaction
3. ถ้าเจอ anomaly คลิก badge `DATA_QUALITY_WARN`

**Outputs**: tooltip + deep link ไป event

#### Step 2: Options Explored
1. คลิก `Step 2`
2. เปิด Tree Visualization
3. คลิก option card #1 เพื่อดู summary
4. คลิก `Expand branch` 1 ระดับ

**Outputs**: เห็นทางเลือกที่ปลอดภัยกว่า/ไม่ถูกเลือก

#### Step 3: Scoring / PRM
1. คลิก `Step 3`
2. เปิดตารางคะแนน
3. คลิก `Why this score?`
4. คลิก `Mapped Policies` (read-only)

**Outputs**: ความสัมพันธ์ระหว่างคะแนนกับ policy

#### Step 4: Selected Action
1. คลิก `Step 4`
2. ตรวจ action detail (tool call / message / update)
3. คลิก `Tool Invocation`

**Outputs**: endpoint/params (redacted ถ้า sensitive)

#### Step 5: Contract Checks
1. คลิก `Step 5`
2. ตรวจ pass/deny/heal
3. คลิก contract ที่ fail เช่น `FIN_BILLING_SCHEMA_V2`
4. เปิด Schema Diff Viewer (before/after)
5. ถ้าเจอ `HEAL APPLIED` ให้คลิกดู heal rule ID

**Outputs**: หลักฐาน contract mismatch + remediation path

#### Step 6: Outcome
1. คลิก `Step 6`
2. ดู outcome metrics + delta vs expected
3. ดู resonance impact
4. คลิก `Open Drift Context`

**Outputs**: กลับไป drift view แบบ filtered ตาม decision

---

## 5) Create Gem Draft (Replay → Gems)

### 5.1 Open auto-filled draft
1. บน Replay คลิก **Create Gem Draft**
2. ระบบเปิด Create Gem Drawer (ขวา) พร้อม auto-fill:
   - suggested title
   - incident link (ถ้ามี)
   - root-cause candidates (จาก execute_and_audit)
   - patch type checkboxes: `CONTRACT_PATCH`, `SCHEMA_HEAL`, `TOOL_RESTRICTION`, `POLICY_CLARIFICATION`
   - suggested scope: `AGENT` / `DEPT` / `ORG` (default = `DEPT`)
   - evidence attached: replay bundle reference

**State transitions**
- `REPLAY_READY` → `GEM_DRAFT_EDITING`

### 5.2 Operator fills mandatory fields
1. เลือก root cause (1 รายการ)
2. กรอก patch details
3. กรอก scope justification (mandatory ถ้า DEPT/ORG)
4. กรอก rollback plan (mandatory)
5. กรอก verification metrics (mandatory):
   - `repeat rate < 1% in 7d`
   - `resonance +15 within 24h`
6. แนบไฟล์เพิ่มเติม (optional)
7. คลิก **Save Draft**

**Guards**
- required fields ต้องครบ
- evidence link ต้อง valid

**Outputs**
- สร้าง `GEM-DRAFT-####`
- status = `DRAFT`
- แสดงปุ่ม `Submit for Approval`

---

## 6) Submit for Approval (Operator → Compliance Queue)

1. Operator คลิก **Submit for Approval**
2. เปิด modal `Approval Routing`
3. เลือก approver group = Compliance Officers
4. ตั้ง optional `Executive co-approval` (required เมื่อ scope = ORG หรือกระทบ Policy Genome)
5. ใส่ข้อความถึง approver (optional)
6. คลิก **Submit**

**State transitions**
- `DRAFT` → `PENDING_REVIEW`
- หรือ `PENDING_DUAL_APPROVAL` (ORG-wide)

**Guards**
- scope `ORG_WIDE` ต้องมี executive co-approver เสมอ

**Outputs**
- สร้าง task ใน `Compliance Inbox`
- event feed เพิ่ม `GEM_SUBMITTED`

---

## 7) Compliance Review (Approval Gate)

### 7.1 Open pending item
1. Compliance ไปเมนู `Gems of Wisdom → Inbox`
2. กรองรายการตาม dept/severity/scope
3. คลิก `GEM-DRAFT-####`

**Outputs**
- เปิด Gem Review Page (4 panels):
  - Summary
  - Evidence
  - Patch Diff
  - Verification Plan

### 7.2 Mandatory replay verification
1. คลิก `Open Linked Replay` (mandatory)
2. ระบบเปิด replay แบบ tab หรือ side-by-side
3. Compliance ตรวจครบ 6 steps
4. กลับหน้า review

**Guard**
- ถ้าไม่เปิด linked replay จะ disable ปุ่ม final decision

### 7.3 Decision paths

#### Case A: Approve
1. คลิก `Approve`
2. เลือก rollout:
   - `Staging first` (default)
   - `Production immediate` (ต้องมีเหตุผล)
3. เลือก propagation: agent/dept/org
4. คลิก `Confirm`

**Outputs**
- status = `APPROVED`
- generate immutable `GEM-####`
- schedule rollout job
- write to Memory Bank
- event: `GEM_APPROVED`

#### Case B: Approve with Conditions
1. คลิก `Approve with Conditions`
2. ตั้ง conditions เช่น:
   - staging soak ≥ 7 days
   - canary rollout 10%
   - add extra contract check
   - require post-verify report
3. คลิก `Confirm`

**Outputs**
- status = `APPROVED_CONDITIONAL`
- rollout plan + verification tasks ถูกสร้าง
- memory registration = pending activation / limited scope

#### Case C: Reject
1. คลิก `Reject`
2. กรอก mandatory reason + required changes
3. optional note อ้าง replay step เช่น Step 3
4. คลิก `Send Back`

**Outputs**
- status = `REJECTED_CHANGES_REQUESTED`
- notify Operator
- event: `GEM_REJECTED`

---

## 8) Rollout + Verification

### 8.1 Rollout status tracking
1. Operator ไป `Gems → Approved → GEM-####`
2. ดู rollout status: `queued` / `running` / `completed`
3. ดู targets affected + contract version updated

### 8.2 Verification metrics
1. เปิด tab `Verification`
2. ตรวจกราฟ:
   - repeat incident rate
   - resonance delta
   - contract violation rate
3. ถ้าไม่ผ่าน threshold: ใช้ `Rollback` (ตามสิทธิ์) + `Create Follow-up Gem`

**Outputs**
- ผ่านเกณฑ์: status = `VERIFIED`
- ไม่ผ่าน: สร้าง `REGRESSION_DETECTED` alert กลับเข้า War Room

---

## 9) Knowledge Base Registration (Definition of Done)

Gem จะถือว่าเข้าคลังความรู้องค์กรเมื่อครบ 3 เงื่อนไข:
1. status = `APPROVED` หรือ `VERIFIED` (ตาม policy)
2. propagation ถูก apply แล้วอย่างน้อย staging
3. indexing ครบ:
   - tags (domain)
   - linked intents
   - linked contracts + versions
   - linked incidents/decisions

### UI checkpoints
- Gem Review Page → `Knowledge Registration`
  - Indexed ✅
  - Linked ✅
  - Propagation ✅

---

## 10) Required Edge Cases

### 10.1 Trace incomplete
- แสดง banner: `Trace incomplete`
- ปุ่ม `Request Trace Reconstruction` (ส่ง task ให้ observability)
- policy สามารถ block gem submission เมื่อ severity สูงและ trace ไม่ครบ

### 10.2 Permission barrier
- Operator freeze dept ไม่ได้ → เข้า `Request Approval`
- Compliance approve org-wide ไม่ได้ → บังคับ Executive co-approval

### 10.3 Multiple decisions per alert
- Alert Detail มี `Batch Replay`
- เลือกหลาย decisions → incident เดียว + gem draft เดียวพร้อมรวม evidence

---

## 11) Minimal UI Components required for smooth flow

1. Alerts Drawer + Alert Detail Panel
2. Quick actions: Replay / Freeze Light
3. Replay Page (6-step timeline + Export Bundle)
4. Create Gem Draft Drawer (auto-fill + submit)
5. Gems Inbox for Compliance + side-by-side replay
6. Approval modal (approve/conditional/reject) + rollout planning
7. Verification dashboard + rollback actions

---

## Canonical state machine (summary)

`SESSION_READY`
→ `WAR_ROOM_IDLE`
→ `ALERTS_DRAWER_OPEN`
→ `ALERT_SELECTED`
→ (`CONTAINMENT_PENDING` → `FREEZE_APPLIED`)?
→ `REPLAY_NAVIGATING`
→ `REPLAY_LOADED`
→ `GEM_DRAFT_EDITING`
→ `DRAFT`
→ `PENDING_REVIEW | PENDING_DUAL_APPROVAL`
→ `APPROVED | APPROVED_CONDITIONAL | REJECTED_CHANGES_REQUESTED`
→ `ROLLOUT_RUNNING`
→ `VERIFIED | REGRESSION_DETECTED`

