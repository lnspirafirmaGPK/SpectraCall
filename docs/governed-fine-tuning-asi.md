# Governed Fine-tuning (SFT) ในบริบท ASI

เอกสารนี้อธิบายแนวทางการทำ **Governed Fine-tuning** สำหรับ ASI โดยแยกบทบาทของ **SFT** และ **RAG** ให้ชัดเจน และผูกเข้ากับสถาปัตยกรรม Governance Plane + Trust Plane

## 1) SFT vs RAG: เลือกใช้ให้ตรงเป้าหมาย

### Supervised Fine-tuning (SFT)
ใช้เมื่อองค์กรต้องการปรับ **พฤติกรรมของโมเดล** เช่น
- รูปแบบคำตอบ (format)
- โทนภาษา (tone)
- วิธีสรุป/โครงสร้าง reasoning
- ประสิทธิภาพในงานเฉพาะทาง

SFT คือการฝึกจากตัวอย่าง input-output ที่ผ่านการคัดคุณภาพแล้ว เพื่อให้พฤติกรรมสม่ำเสมอและคาดการณ์ได้มากขึ้น

### Retrieval-Augmented Generation (RAG)
ใช้เมื่อองค์กรต้องการให้คำตอบอ้างอิง **ความรู้ที่เปลี่ยนบ่อย** หรือ **เอกสารภายใน** โดยต้องตรวจสอบแหล่งที่มาได้
- คู่มือ/เอกสารปฏิบัติงาน
- ฐานความรู้ภายใน
- ผลค้นหาแบบอัปเดต

RAG ดึงข้อมูลภายนอกเข้าพรอมป์ขณะรันจริง จึงเหมาะกับบริบทที่ต้องการ freshness + citation

### แนวทางที่แนะนำในองค์กร
ในระบบจริงควรใช้ทั้งสองร่วมกัน:
- ใช้ SFT เพื่อปรับพฤติกรรมหลักของโมเดล
- ใช้ RAG เพื่อเติมข้อมูลจริง ณ เวลารัน

## 2) มุมมอง ASI: AI เป็น Operating Substrate

ใน ASI การ fine-tuning ไม่ใช่งานเฉพาะของทีม data science เท่านั้น แต่เป็น workflow ข้ามโดเมนที่ต้องถูกกำกับโดย:
- **Governance Plane**: นิยามนโยบาย กำกับขอบเขตการฝึก/การใช้งาน
- **Trust Plane**: ยืนยันตัวตน ลงนาม artifact และพิสูจน์ lineage
- **GenesisCore**: ledger สำหรับบันทึก provenance, hash และ trace ที่ตรวจสอบย้อนหลังได้

หลักการสำคัญคือ **identity precedes autonomy**: แม้แต่โมเดลที่ผ่านการฝึกแล้วก็ต้องมี identity, trust scope, และเส้นทางการอนุมัติที่ชัดเจน

## 3) ข้อกำหนด Governed Fine-tuning ใน ASI

### 3.1 Training dataset ทุกชุดต้องมี lineage
ข้อมูลฝึกทุกชิ้นต้องตอบได้ว่า:
- สร้างโดยใคร
- ผ่าน review/approval ใดแล้วบ้าง
- อยู่ในเวอร์ชันใด
- มีการลงนามหรือยัง

ตัวอย่างกรณีใช้ JSONL สำหรับ function calling:
- แต่ละ record ควรมี provenance metadata (domain expert, timestamp, dataset version)
- dataset manifest ต้องชี้ไปยังแหล่งข้อมูลต้นทางและผลการตรวจ compliance

### 3.2 Policy-as-code ต้องครอบคลุมงานฝึก
Governance Engine ควร enforce นโยบายอย่างน้อยต่อไปนี้:
- ห้ามใช้ข้อมูลส่วนบุคคล/ข้อมูลต้องห้ามในการฝึก
- ต้องมี human review ก่อน promote โมเดลสู่ production
- จำกัดขอบเขตความสามารถที่อนุญาตให้ปรับแต่ง (เช่น ห้ามลดทอน behavior ด้าน safety)
- บังคับ authority scope เมื่อโมเดลจะเรียกเครื่องมือ/agent ภายนอก

### 3.3 Fine-tuned model คือ signed artifact
เมื่อฝึกและทดสอบผ่านแล้ว:
- ต้อง sign model artifact ด้วยคีย์องค์กรหรือคีย์ทีมที่ได้รับมอบหมาย
- บันทึก hash + metadata ลง GenesisCore
- ผูก model version กับ deployment manifest เพื่อให้ replay/audit ย้อนหลังได้

## 4) Mapping SFT/RAG เข้ากับสถาปัตยกรรม ASI

### SFT อยู่ฝั่ง Reasoning Domain (Cogitator X)
ใช้สร้างพฤติกรรม reasoning หลักที่สอดคล้องนโยบาย เช่น
- อธิบายเหตุผลแบบโปร่งใส
- ปฏิเสธคำขอผิดกฎหมาย/ผิดจริยธรรม
- สื่อสารผลลัพธ์ในรูปแบบมาตรฐานขององค์กร

### RAG อยู่ฝั่ง Data Platform Domain
รองรับงาน:
- embeddings
- vector search
- knowledge graph
- document ingestion

ทุก retrieval ควรถูกบันทึก lineage เพื่อระบุได้ว่าคำตอบอ้างอิงเอกสารเวอร์ชันใด ณ เวลาใด

## 5) Recommended Governed Fine-tuning Pipeline

1. **Data curation & approval**
   - คัดชุดข้อมูล, ตรวจคุณภาพ, ตรวจ compliance
   - ทำ human review และ sign dataset version
2. **Controlled training job**
   - รันใน environment ที่มี audit logging + policy enforcement
   - บันทึก hyperparameters, base model, dataset snapshot เป็น decision artifact
3. **Evaluation & sign-off**
   - ประเมิน benchmark + safety tests
   - human sign-off ตามระดับความเสี่ยง
4. **Registry publish & signing**
   - publish เข้า model registry พร้อม signature และ hash
5. **GitOps deployment**
   - deploy ผ่าน Argo CD/Flux
   - ตรวจ signature/policy ก่อน rollout
   - ใช้ canary/progressive delivery เพื่อลดความเสี่ยง
6. **Runtime monitoring & replayability**
   - ติดตาม drift, quality, policy violations
   - ต้อง replay ได้จาก trace + lineage + model hash

## 6) Workplace Integration (ตัวอย่าง weather-agent)

กรณีเชื่อม AI agent เข้ากับโปรแกรมสำนักงาน (เช่น Teams/office suite):
- ใช้ OIDC ผูก identity ของผู้ใช้กับ tenant
- แปลงคำขอเป็น event ที่มี trace context
- ให้ agent เฉพาะทาง (เช่น weather-agent) เรียก API ตาม authority scope
- ส่งผลลัพธ์กลับพร้อม lineage และ source metadata

Governance Plane ควรกำหนดสิทธิ์แบบ role/scope เช่น อนุญาตเฉพาะบางแผนกให้เรียก agent หรือข้อมูลบางประเภท

## 7) Checklist สำหรับทีมก่อนขึ้น Production

- [ ] Dataset มี lineage/provenance ครบ
- [ ] Dataset และ model artifact ถูก sign
- [ ] Training run มี audit trail ตรวจสอบได้
- [ ] Policy-as-code ครอบคลุมทั้ง training และ runtime
- [ ] มี evaluation report + human sign-off
- [ ] Deployment เป็น GitOps พร้อม policy gate
- [ ] Runtime มี drift monitoring + replay capability
- [ ] RAG retriever จำกัดสิทธิ์การเข้าถึงข้อมูลตาม scope

---

สรุป: ใน ASI, **SFT ใช้ปรับพฤติกรรมโมเดล** และ **RAG ใช้เติมความรู้ที่ต้องอัปเดตและอ้างอิงได้** โดยทั้งสองต้องอยู่ใต้ governance และ trust controls เดียวกัน เพื่อให้ระบบ AI ในองค์กรทั้งทรงพลังและตรวจสอบได้
