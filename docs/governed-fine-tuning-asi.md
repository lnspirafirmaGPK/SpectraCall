# Enterprise Blueprint: Governed Fine-tuning + Governed RAG + Workplace Gateway (ASI)

เอกสารนี้เป็นแบบออกแบบเชิงองค์กร (enterprise blueprint) สำหรับทำให้โมเดล AI “พร้อมใช้งานในองค์กร” อย่างมีหลักประกัน โดยรวม 3 วงจรหลักภายใต้กรอบ ASI เดียวกัน:

1. **Governed Fine-tuning Pipeline (SFT/RLHF-ready)**
2. **Governed RAG Pipeline (Lineage + Policy-gated retrieval)**
3. **Workplace Integration Gateway (Microsoft 365 + Gmail/Google Workspace)**

เป้าหมายคือทำให้ระบบ AI ใช้งานได้จริงในระดับธุรกิจ พร้อมเงื่อนไขที่ CISO / Compliance / Audit ตรวจสอบได้ว่า **ใครอนุมัติอะไร, ใช้ข้อมูลจากไหน, โมเดลเวอร์ชันใด, และผลลัพธ์ย้อนตรวจได้**.

---

## 1) Design Principles (หลักยึดสถาปัตยกรรม)

1. **Identity precedes autonomy**  
   ทุก action ของ AI ต้องผูกกับ identity (user, service, agent, model) และ scope ที่อนุญาตก่อนเสมอ.

2. **Lineage by default**  
   ทุก artifact (dataset, model, index chunk, response) ต้องมี provenance/lineage hash และ trace context.

3. **Policy-as-code everywhere**  
   Policy ต้อง enforce ทั้งตอน train, deploy, retrieve, generate และส่งผลกลับผู้ใช้.

4. **SFT for behavior, RAG for knowledge**  
   ใช้ SFT ปรับพฤติกรรม/format/tool-use; ใช้ RAG เติมความรู้ที่เปลี่ยนตลอด เพื่อลด retrain.

5. **Cryptographic trust + operational observability**  
   artifact สำคัญต้องลงนามและบันทึก ledger; runtime ต้องมี telemetry ที่เชื่อม trace เดียวกัน end-to-end.

---

## 2) ASI Plane Mapping (สิ่งที่แต่ละ Plane รับผิดชอบ)

| ASI Plane | Governed Fine-tuning | Governed RAG | Workplace Integration |
|---|---|---|---|
| **Governance Plane** | อนุมัติ dataset/model promotion, กำหนด training policy | ABAC/RBAC ก่อน retrieval, policy decision point | map policy จาก Purview/Vault/DLP สู่ policy engine กลาง |
| **Trust Plane (GenesisCore)** | sign dataset/model artifact, ledger hash | lineage ต่อ chunk/document citation | ยืนยัน identity federation + ลง hash interaction สำคัญ |
| **Data Platform** | จัดเก็บ raw/clean/train datasets + version | ingestion/chunking/index/vector+keyword | รับเอกสารจาก M365/Gmail เพื่อทำ governed ingestion |
| **Control Plane** | orchestrate training/eval/deploy jobs | control agent execution path | API gateway, rate-limit, secret scope, routing |
| **Observability Plane** | metrics/cost/safety/eval trace | retrieval latency/precision/citation correctness | user activity, tenant usage, policy violations, end-to-end trace |

---

## 3) End-to-end Target Architecture

```mermaid
graph TD
    U[User in Teams/Outlook/Gmail] --> GW[Workplace Integration Gateway]
    GW --> IDP[Entra ID / Google Workspace OIDC]
    GW --> PDP[Policy Engine (Governance Plane)]
    GW --> AB[AetherBus / Event Backbone]

    AB --> AR[Agent Runtime]
    AR --> RX[Reasoning Model (SFT-tuned)]
    AR --> DP[Data Platform Retriever]

    DP --> IDX[Vector + Keyword Index]
    DP --> PDP

    FT[Fine-tuning Orchestrator] --> DS[Dataset Registry + Lineage]
    FT --> EV[Eval + Red Team + HITL]
    EV --> MR[Model Registry]
    MR --> TP[Trust Plane / GenesisCore Ledger]

    RX --> TP
    DP --> TP
    GW --> TP
```

---

## 4) Phase A — Governed Fine-tuning Pipeline (SFT Focus)

> Trigger: **Model Update Request (MUR)** ที่ผ่านการอนุมัติจาก Governance Board แล้ว

### A1. Intake & Decision Artifact
- สร้าง `MUR` เป็น artifact กลาง: business objective, owner, risk tier, allowed data classes, target KPI.
- Governance Plane ประเมินว่าควรเป็น SFT, prompt-only, หรือ RAG-only change เพื่อลด over-tuning.
- บังคับ separation of duties: requester ≠ approver.

### A2. Data Curation & Provenance (Trust + Governance)
**Input sources:** Zendesk, KB, email templates, SOP docs, ticket summaries.

**Workflow:**
1. Ingest ผ่าน event bus โดยใส่ `source_system`, `export_job_id`, `data_owner`, `timestamp`.
2. Data classification + DLP scan: PII/PCI/PHI/secrets.
3. Redaction/Masking ตาม policy.
4. Format เป็น training schema (เช่น JSONL instruction/function-calling).
5. สร้าง `dataset_manifest.yaml` + `lineage_hash` ของทั้งชุด.
6. ลงนาม dataset (org/team key) และ publish เข้า Dataset Registry.

**Policy gates ที่ต้องมี:**
- deny ถ้ามีข้อมูลลูกค้าจริงที่ไม่ผ่าน pseudonymization
- deny ถ้าไม่มี legal basis/consent tag
- deny ถ้าไม่มี owner + retention policy

### A3. Controlled Training Execution (Control Plane)
- Orchestrator สั่ง train บน isolated VPC/subnet (no-open-egress by default).
- ใช้ **LoRA/QLoRA** เป็น default เพื่อลดต้นทุนและลด catastrophic forgetting.
- Log ครบ: base model digest, adapter config, hyperparameters, code commit SHA, container image digest.
- Secret management ผ่าน short-lived token only.
- Mesh/network policy block การเรียกปลายทางที่ไม่อยู่ allowlist.

### A4. Evaluation + Human Sign-off
- Automated eval:
  - task quality (accuracy, structure adherence)
  - policy/safety tests (jailbreak, toxic, leakage)
  - regression against previous prod model
- Risk-based HITL:
  - low risk: auto-promote เมื่อผ่าน threshold
  - medium/high: manual approval board
- สร้าง `Model Evaluation Report` เป็น signed artifact พร้อม scorecard.

### A5. Model Signing, Registry, Promotion
- Artifact ที่ promote ต้องมี:
  - model hash + adapter hash
  - training dataset manifest hash
  - eval report hash
- ลงนามด้วย org private key และบันทึกลง GenesisCore (append-only).
- Publish เข้า Model Registry พร้อม metadata: expiry, owner, approved scopes.

### A6. Deployment Guardrails
- Deploy ด้วย GitOps (signed manifest only).
- Verify signature + policy ก่อน rollout.
- Progressive rollout (shadow/canary) + kill switch.
- Runtime drift monitor + auto-rollback policy.

---

## 5) Phase B — Governed RAG Pipeline (Data Platform + Policy Engine)

### B1. Governed Ingestion from M365/Gmail
- Connectors อ่านเอกสารจาก SharePoint, OneDrive, Exchange mailbox, Gmail, Drive.
- เก็บ metadata ต่อเอกสาร: `tenant_id`, `doc_id`, `version_id`, `classification`, `owner`, `acl_snapshot`.
- Chunk ทุกชิ้นต้องอ้างกลับเอกสารต้นทางได้ (`source_uri`, `version`, `offset/page`).
- ทำ hybrid indexing: vector + keyword + metadata filters.

### B2. Retrieval-time Policy Enforcement
เมื่อ agent ขอ retrieval ต้องส่ง:
- identity token (user-delegated หรือ service principal)
- requested scope/purpose
- tenant context

Data Platform เรียก Policy Engine ทุกครั้งก่อนคืนผล:
- ตรวจ ABAC/RBAC + document classification
- ตรวจ purpose binding (เช่น “summarize for finance close”) ว่าถูกประเภทงาน
- deny-by-default หาก policy service ตอบไม่ได้

ทุก deny/allow บันทึก decision log พร้อม reason code.

### B3. Grounded Generation with Verifiability
- Prompt template บังคับให้ตอบพร้อม citation IDs.
- Model ตอบโดยแนบ source attribution ที่คลิกกลับเอกสารต้นทางได้.
- ถ้า confidence ต่ำ/แหล่งอ้างอิงไม่พอ ให้ตอบแบบ safe fallback (“ต้องการข้อมูลเพิ่ม”).

### B4. RAG Quality/Safety SLO
- Retrieval precision@k, citation validity rate, stale-doc rate
- Policy decision latency P95
- Hallucination with citation mismatch rate
- Incident workflow เมื่อพบเอกสาร sensitivity leak

---

## 6) Phase C — Workplace Integration Gateway (M365 + Gmail)

### C1. Identity Federation (OIDC/OAuth2)
- Gateway เป็น confidential client กับ:
  - Microsoft Entra ID (M365)
  - Google Identity (Workspace/Gmail)
- รองรับ delegated flow (on-behalf-of) เพื่อให้ AI ทำงานในสิทธิผู้ใช้ได้แบบจำกัด scope.
- token exchange เพื่อออก ASI internal identity token (short TTL + audience binding).

### C2. Traceable Event Transformation
- ทุกคำขอจาก Outlook/Teams/Gmail ถูกแปลงเป็น CloudEvents + ASI extensions:
  - `trace_id`, `span_id`, `tenant_id`, `user_id`, `client_app`, `policy_scope`
- ส่งเข้าบัสกลางโดยคง `traceparent` ตลอดเส้นทาง (gateway → agent → retriever → model → response).
- ทำให้ replay และ forensic audit ได้ end-to-end.

### C3. Cross-ecosystem Policy Enforcement
- ดึง/แปล policy metadata จาก Microsoft Purview และ Google Vault/DLP เข้ารูปแบบ policy engine กลาง.
- ตัวอย่าง:
  - หากเอกสารติด `Highly Confidential` และผู้ใช้ไม่มี entitlement
  - Gateway ต้อง block ก่อนถึง model และตอบกลับด้วย policy-safe error message
- เหตุการณ์ policy violation ต้องแจ้ง SOC/SIEM พร้อมหลักฐาน trace.

### C4. Outbound Controls
- ป้องกัน data exfiltration:
  - response content inspection
  - watermark/classification propagation
  - block ส่งออกนอก tenant หรือข้าม jurisdiction ตาม sovereignty rule

---

## 7) Canonical Artifacts ที่ต้องมีเพื่อ Audit/Compliance

1. **Model Update Request (MUR)**
2. **Dataset Manifest + Signature**
3. **Training Run Record (config, image, code SHA)**
4. **Evaluation Report + Approval Record**
5. **Model Card + Deployment Manifest + Signature**
6. **RAG Retrieval Decision Log**
7. **User Interaction Trace Bundle (request→response lineage)**

ทุก artifact ต้อง query ได้จาก audit console โดยใช้ trace ID เดียว.

---

## 8) Reference Policy Pack (ตัวอย่าง policy ที่ควรมี)

### Training Policies
- ห้าม train ด้วยข้อมูลที่มี PII ระบุบุคคลโดยตรง (ถ้าไม่มี lawful basis)
- ห้ามใช้ข้อมูลที่ติด legal hold
- บังคับ minimum eval benchmark ก่อน promotion

### Retrieval Policies
- เอกสารระดับ `Confidential+` ต้องมี user clearance และ purpose ตรง
- ห้าม cross-tenant retrieval
- ห้ามดึงเอกสารที่หมดอายุ retention

### Generation Policies
- บังคับ citation สำหรับคำตอบเชิง factual
- บังคับ refusal template เมื่อ policy deny
- บังคับ redact ข้อมูลอ่อนไหวใน outbound responses

---

## 9) Security & Compliance Controls (CISO Checklist)

- Zero Trust network segmentation สำหรับ train/retrieve/runtime
- Customer-managed keys (CMK) สำหรับข้อมูลและ model artifacts
- Immutable ledger สำหรับ signature + provenance
- Continuous red-team + prompt injection defense for RAG
- Access review ตามรอบ (quarterly entitlement recertification)
- Incident response playbook แยกตาม training leak / retrieval leak / generation misuse

---

## 10) Rollout Plan (90 วัน)

### Wave 1 (Day 0–30): Foundation
- ตั้ง policy engine กลาง + trust ledger
- onboard M365/Gmail connectors แบบ read-only
- สร้าง dataset registry + model registry with signing

### Wave 2 (Day 31–60): Governed Pilot
- pilot 1 domain (เช่น finance operations)
- เปิด SFT แบบ LoRA + governed eval gates
- เปิด RAG พร้อม policy-gated retrieval + citations

### Wave 3 (Day 61–90): Enterprise Scale
- ขยาย multi-domain agents
- เชื่อม SIEM/SOC + executive audit dashboard
- ทำ control testing ร่วมกับ Internal Audit/Compliance

---

## 11) Executive Summary for CTO/CISO

สถาปัตยกรรมนี้ทำให้องค์กรได้ AI ที่:
- **ควบคุมได้** (policy-gated ทั้ง train และ runtime)
- **ตรวจสอบได้** (lineage + signed artifacts + end-to-end trace)
- **ปลอดภัยต่อองค์กร** (identity federation, least privilege, outbound controls)
- **ยืดหยุ่นเชิงธุรกิจ** (SFT ปรับพฤติกรรม, RAG เติมความรู้โดยไม่ retrain บ่อย)

ผลลัพธ์คือการก้าวสู่ AI-native Enterprise แบบไม่ทิ้ง governance, trust และ compliance.
