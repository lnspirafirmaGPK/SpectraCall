export type EvidenceType = "text" | "image" | "audio"

export interface EvidenceItem {
  id: string
  type: EvidenceType
  title: string
  content: string
  classification: "internal" | "restricted"
  createdAt: string
}

export interface EvidenceContextHit {
  id: string
  title: string
  source: string
  similarity: number
  excerpt: string
}

export interface BudgetReallocationProposal {
  id: string
  fromCostCenter: string
  toCostCenter: string
  proposedAmount: number
  currency: "USD"
  confidence: number
  rationale: string
  linkedEvidenceIds: string[]
  policyStatus: "pass" | "review"
  approvalRequired: boolean
}

export interface PolicyEvaluationResult {
  status: "pass" | "review"
  policyScope: string
  checks: Array<{ name: string; status: "pass" | "review"; message: string }>
}

export interface LineageArtifact {
  lineageHash: string
  parentHash: string
  traceparent: string
  lineageStatus: "sealed" | "pending"
}

export interface ReplayRecord {
  id: string
  step: string
  status: "completed" | "pending"
  timestamp: string
  detail: string
}

export interface ApprovalState {
  status: "pending" | "approved"
  approver: string | null
  comment: string
}

const now = new Date()

export const initialEvidence: EvidenceItem[] = [
  {
    id: "e-text-1",
    type: "text",
    title: "Ops anomaly note",
    content: "APAC traffic grew 42% over baseline in the last 2 hours.",
    classification: "internal",
    createdAt: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "e-image-1",
    type: "image",
    title: "Capacity dashboard screenshot",
    content: "img://capacity-apac-peak.png",
    classification: "restricted",
    createdAt: new Date(now.getTime() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: "e-audio-1",
    type: "audio",
    title: "Incident bridge summary",
    content: "aud://incident-bridge-12m.wav",
    classification: "internal",
    createdAt: new Date(now.getTime() - 1000 * 60 * 10).toISOString(),
  },
]

export function buildBudgetFlow(evidence: EvidenceItem[], approved: boolean) {
  const evidenceCount = evidence.length
  const hasRestricted = evidence.some((item) => item.classification === "restricted")

  const contextHits: EvidenceContextHit[] = [
    {
      id: "hit-1",
      title: "Q4 APAC burst playbook",
      source: "incident-kb-223",
      similarity: 0.91,
      excerpt: "Temporary OPEX to cloud reserve transfer is allowed under burst policy.",
    },
    {
      id: "hit-2",
      title: "Prior reallocation decision REQ-447",
      source: "decision-archive",
      similarity: 0.87,
      excerpt: "Required CFO + Ops approval for reallocation above 100k USD.",
    },
  ]

  const proposal: BudgetReallocationProposal = {
    id: "BRP-2026-042",
    fromCostCenter: "OPEX-GENERAL",
    toCostCenter: "CLOUD-INFRA-APAC",
    proposedAmount: 120000 + evidenceCount * 5000,
    currency: "USD",
    confidence: hasRestricted ? 0.88 : 0.81,
    rationale: "Context retrieval indicates this event matches prior approved burst scenarios.",
    linkedEvidenceIds: evidence.map((item) => item.id),
    policyStatus: hasRestricted ? "review" : "pass",
    approvalRequired: true,
  }

  const policyEvaluation: PolicyEvaluationResult = {
    status: proposal.policyStatus,
    policyScope: "finance.reallocation.apac",
    checks: [
      { name: "Allocation limit <= 200k", status: "pass", message: "Within hard limit" },
      {
        name: "Dual-approval required > 100k",
        status: "review",
        message: "Human approval still required before execution",
      },
      {
        name: "Restricted evidence handling",
        status: hasRestricted ? "review" : "pass",
        message: hasRestricted ? "Restricted evidence found, manual review enabled" : "No restricted evidence",
      },
    ],
  }

  const lineage: LineageArtifact = {
    lineageHash: "sha256:6f0b9de4a11f1e3f42",
    parentHash: "sha256:17a9b3fcde22010c9b",
    traceparent: "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01",
    lineageStatus: approved ? "sealed" : "pending",
  }

  const approval: ApprovalState = approved
    ? { status: "approved", approver: "finance-controller-1", comment: "Approved for APAC burst continuity" }
    : { status: "pending", approver: null, comment: "Waiting for finance + ops sign-off" }

  const replay: ReplayRecord[] = [
    { id: "r1", step: "Evidence intake", status: "completed", timestamp: evidence[0]?.createdAt ?? now.toISOString(), detail: `${evidenceCount} evidence items captured` },
    { id: "r2", step: "Context preparation", status: "completed", timestamp: now.toISOString(), detail: "Embedding index artifact generated for retrieval support" },
    { id: "r3", step: "Policy evaluation", status: "completed", timestamp: now.toISOString(), detail: `Policy scope ${policyEvaluation.policyScope}` },
    { id: "r4", step: "Human approval", status: approved ? "completed" : "pending", timestamp: now.toISOString(), detail: approval.comment },
    { id: "r5", step: "Replay availability", status: approved ? "completed" : "pending", timestamp: now.toISOString(), detail: approved ? "Audit replay ready" : "Replay unlocks after approval" },
  ]

  return { contextHits, proposal, policyEvaluation, lineage, approval, replay }
}
