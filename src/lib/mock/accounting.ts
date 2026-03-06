import { AgentRegistryEntry } from '../types/agents';
import { DecisionArtifact } from '../types/accounting';

export const accountingAgents: AgentRegistryEntry[] = [
  {
    id: 'staff-001',
    name: 'Accounting-Staff-Agent',
    role: 'Operational Accounting',
    level: 'Staff',
    department: 'Accounting',
    capabilities: [
      { name: 'Basic Query', description: 'ตอบคำถามพื้นฐาน', permissions: ['read:gl', 'read:coa'] },
      { name: 'Data Retrieval', description: 'ค้นหาข้อมูล', permissions: ['read:docs'] },
      { name: 'Journal Entry', description: 'ทำบันทึกรายการเบื้องต้น', permissions: ['write:draft_journal'] }
    ],
    public_key: '0xstaff...',
    trust_score: 0.94,
    status: 'online',
    last_active: new Date().toISOString(),
    experience: '2 Years',
    accuracy: 94.5,
    tags: ['Entry-level', 'Data-entry'],
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFJQ3_adcO4Y6C1F9bg1wM5MR30uyYX5dxtLjtzDzqd2aRq24uXy6hUlbDWJUVw75aqXfRm8zFkY1T2S5JUJ7Awf2kEjtXOCU_waVMjnTYCmGvLgBsL5y1VUWLkCDcRmp_C6iRE7jorNI-AFcsF2AjP73-FHwVsqoHbKY157RjPA25gkcpV2ID1m3EwkmzcwsLE-Pe1bkCL0agLf5jsCwQAiFzf8GcI4kOWMUsfwFUknOya4qwjqTxVRb98oo0vO59eSW8T1HRLKxl'
  },
  {
    id: 'expert-001',
    name: 'Accounting-Expert-Agent',
    role: 'Financial Analysis & Tax',
    level: 'Expert',
    department: 'Accounting',
    capabilities: [
      { name: 'Financial Analysis', description: 'วิเคราะห์งบการเงิน', permissions: ['read:all_financials'] },
      { name: 'Tax Consultancy', description: 'ให้คำปรึกษาด้านภาษีเบื้องต้น', permissions: ['read:tax_policy'] },
      { name: 'TFRS/IFRS Interpretation', description: 'ตีความมาตรฐานการบัญชี', permissions: ['read:compliance'] }
    ],
    public_key: '0xexpert...',
    trust_score: 0.98,
    status: 'online',
    last_active: new Date().toISOString(),
    experience: '3 Years',
    accuracy: 98.4,
    tags: ['TFRS', 'IFRS', 'Audit'],
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABdEytEjubOFvGu7VcCY1_wh46bg5RB1M5JQFLJ6X0XZD4EAL-Z8sTUa66yW1UEYF-UXToOX7-v1fE6K9TSz9f1NVu2fSdRQqVioRlBaHbXhEPm_Ek8jKd2jzRtScsO0bs9juCo-hh5KIIxbQ464sz40x4UvKT61X_sVWOhXdgbAgUOcUt_-6CxntFtRzEhykwPgwi8aMyR145JYJiglbnU_KPq_maRMz5b7w23J_7qBTJjxSsyObgu_pqsTBgg_-Ec4aMfGEBmSK_'
  },
  {
    id: 'cfo-001',
    name: 'CFO-Agent',
    role: 'Strategic Finance & Approval',
    level: 'CFO',
    department: 'Finance',
    capabilities: [
      { name: 'Strategic Planning', description: 'วางแผนภาษีเชิงกลยุทธ์', permissions: ['write:tax_strategy'] },
      { name: 'Final Approval', description: 'อนุมัติการบันทึกบัญชีจริง', permissions: ['write:final_gl'] },
      { name: 'Policy Management', description: 'อนุมัติการเปลี่ยนแปลงนโยบาย', permissions: ['write:policy'] }
    ],
    public_key: '0xcfo...',
    trust_score: 0.99,
    status: 'online',
    last_active: new Date().toISOString(),
    experience: '5 Years',
    accuracy: 99.2,
    tags: ['Strategy', 'Risk Mgmt', 'Forecast'],
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpAIJ3QbpiUE-3mWlFOz26JK8wd4pwp17JpmkbvePzcOVJFYU-iL4o-NBF2bDU0HWlIB3086ZOCL6uzHc5JA9au_L4K_odIg88G9FoDHrb2cQRgudHwKjbsGMH7OQbBmU-P-LTInrcoMc4aC13XKh8xleqmz9ajEAgcwLZTLdHg8Y7HZ8jdVm80gs7GFryhxQGR3Ro-K0Z3LtJGnCyohOR5lg4Nbm_U0TVR3kku8H39JsBMTmtFQxyIPiY_6ny6B6awqQgETM-lhNl'
  }
];

export const mockDecisions: DecisionArtifact[] = [
  {
    id: 'DEC-001',
    type: 'approval',
    title: 'Marketing Budget Approval',
    description: 'Approved 10% marketing budget increase for Q3 digital outreach.',
    timestamp: '2025-10-24T10:15:00Z',
    proposer_id: 'staff-001',
    reviewer_id: 'expert-001',
    approver_id: 'cfo-001',
    risk_level: 'Low',
    status: 'Approved',
    lineage_hashes: ['hash1', 'hash2'],
    policy_reference: 'Procurement Policy v2.3'
  },
  {
    id: 'DEC-002',
    type: 'decision',
    title: 'Vendor Audit Approval',
    description: 'Approved bi-annual audit for 4 Tier-1 SaaS providers.',
    timestamp: '2025-10-24T09:15:00Z',
    proposer_id: 'expert-001',
    approver_id: 'cfo-001',
    risk_level: 'Medium',
    status: 'Verified',
    lineage_hashes: ['hash3', 'hash4']
  }
];
