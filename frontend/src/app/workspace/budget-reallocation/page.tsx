"use client"

import { type ReactNode, useMemo, useState } from "react"
import { Header } from "@/components/layout/Header"
import { Sidebar } from "@/components/layout/Sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ApprovalBar } from "@/components/workspace/budget-reallocation/approval-bar"
import { DecisionProposalCard } from "@/components/workspace/budget-reallocation/decision-proposal-card"
import { EnvelopeInspector } from "@/components/workspace/budget-reallocation/envelope-inspector"
import { EvidenceContextPanel } from "@/components/workspace/budget-reallocation/evidence-context-panel"
import { EvidenceIntakePanel } from "@/components/workspace/budget-reallocation/evidence-intake-panel"
import { LineagePanel } from "@/components/workspace/budget-reallocation/lineage-panel"
import { PolicyEvaluationPanel } from "@/components/workspace/budget-reallocation/policy-evaluation-panel"
import { ReplayPanel } from "@/components/workspace/budget-reallocation/replay-panel"
import { initialEvidence, type ApprovalState, type BudgetProposalView, type EvidenceContextHit, type EvidenceItem, type LineageArtifactView, type PolicyEvaluationView, type ReplayRecordView, type WorkflowState } from "@/lib/workspace/budget-reallocation"

export default function BudgetReallocationPage() {
  const [evidence, setEvidence] = useState<EvidenceItem[]>(initialEvidence)
  const [workflowState, setWorkflowState] = useState<WorkflowState>("idle")
  const [decisionId, setDecisionId] = useState<string | null>(null)
  const [embeddingArtifactRef, setEmbeddingArtifactRef] = useState<string | null>(null)
  const [contextHits, setContextHits] = useState<EvidenceContextHit[]>([])
  const [approval, setApproval] = useState<ApprovalState>({ status: "pending", approver: null, comment: "Waiting for policy evaluation" })
  const [proposal, setProposal] = useState<BudgetProposalView>({
    id: "pending",
    fromCostCenter: "OPEX-GENERAL",
    toCostCenter: "CLOUD-INFRA-APAC",
    proposedAmount: 150000,
    currency: "USD",
    confidence: 0.78,
    rationale: "Awaiting context retrieval and policy evaluation.",
    linkedEvidenceIds: evidence.map((item) => item.id),
    citedContextHitIds: [],
    policyStatus: "review",
    approvalRequired: true,
  })
  const [policyEvaluation, setPolicyEvaluation] = useState<PolicyEvaluationView>({
    status: "review",
    policyScope: "finance.global",
    checks: [{ name: "Pending", status: "review", message: "Policy check has not run yet." }],
  })
  const [lineage, setLineage] = useState<LineageArtifactView>({
    lineageHash: "pending",
    parentHash: "pending",
    traceparent: "pending",
    lineageStatus: "pending",
  })
  const [replay, setReplay] = useState<ReplayRecordView[]>([])

  const classification = evidence.some((item) => item.classification === "restricted") ? "restricted" : "internal"
  const missionMode = workflowState === "degraded mode" ? "degraded" : "nominal"

  const canRunFlow = evidence.length > 0 && workflowState !== "embedding in progress" && workflowState !== "preparing context"

  async function runFlow() {
    setWorkflowState("preparing context")
    setApproval({ status: "pending", approver: null, comment: "Running evidence -> context -> policy pipeline" })
    const traceSuffix = crypto.randomUUID().replace(/-/g, "")
    const traceparent = `00-${traceSuffix.slice(0, 32)}-${traceSuffix.slice(0, 16)}-01`

    const embeddingRes = await fetch("/api/embeddings/propose", {
      method: "POST",
      headers: { "content-type": "application/json", traceparent },
      body: JSON.stringify({
        evidence: evidence.map((item) => `${item.type}:${item.content}`).join("\n"),
        subject: "budget-reallocation-request-mvp",
        classification,
        policy_scope: "finance.global",
        metadata: { evidence_count: evidence.length },
      }),
    })

    setWorkflowState("embedding in progress")
    const embeddingPayload = await embeddingRes.json()
    const isDegraded = Boolean(!embeddingRes.ok || embeddingPayload?.ui?.degraded)
    setEmbeddingArtifactRef(embeddingPayload?.ui?.artifact_ref ?? null)
    if (isDegraded) {
      setWorkflowState("degraded mode")
    }

    const contextRes = await fetch("/api/context/search", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: evidence.map((item) => item.content).join(" "),
        context: evidence.map((item) => item.title),
      }),
    })

    const contextPayload = await contextRes.json()
    const hits = (contextPayload.hits ?? []) as EvidenceContextHit[]
    setContextHits(hits)
    if (!isDegraded) {
      setWorkflowState("context ready")
    }

    const amount = 120000 + evidence.length * 4000
    const envelope = {
      specversion: "1.0",
      type: "asi.budget.reallocation.proposed",
      source: "urn:spectracall:mission-control",
      id: `evt-${Date.now()}`,
      time: new Date().toISOString(),
      subject: "budget-reallocation-request-mvp",
      datacontenttype: "application/json",
      traceparent,
      asi: {
        agent_id: "mission-control.operator",
        policy_scope: "finance.global",
        classification,
        lineage_hash: `sha256:${crypto.randomUUID().replace(/-/g, "")}`,
        parent_hash: `sha256:${crypto.randomUUID().replace(/-/g, "")}`,
        payload_hash: `sha256:${crypto.randomUUID().replace(/-/g, "")}`,
        schema_ref: "/schemas/budget-reallocation-v1.json",
        delivery: "at-least-once",
      },
      data: {
        requestId: `REQ-${Date.now()}`,
        amount,
        currency: "USD",
        fromAccount: "OPEX-GENERAL",
        toAccount: "CLOUD-INFRA-APAC",
        reason: `Context-supported reallocation based on ${hits.length} retrieved hits.`,
        riskScore: hits.length > 0 ? 0.41 : 0.69,
        evidenceRefs: evidence.map((item) => item.id),
      },
    }

    const decisionRes = await fetch("/api/decisions/propose", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(envelope),
    })
    const decisionPayload = await decisionRes.json()
    const nextDecisionId = decisionPayload.decision_id as string
    setDecisionId(nextDecisionId)

    setProposal({
      id: nextDecisionId,
      fromCostCenter: envelope.data.fromAccount,
      toCostCenter: envelope.data.toAccount,
      proposedAmount: envelope.data.amount,
      currency: "USD",
      confidence: hits.length > 0 ? 0.86 : 0.62,
      rationale: `Decision cites ${hits.length} context hits from retrieval output, with embedding artifact used as supporting context only.`,
      linkedEvidenceIds: evidence.map((item) => item.id),
      citedContextHitIds: hits.map((hit) => hit.id),
      policyStatus: "review",
      approvalRequired: true,
    })

    const policyRes = await fetch("/api/policies/evaluate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ decision_id: nextDecisionId }),
    })
    const policyPayload = await policyRes.json()

    const blocked = !policyPayload.passed
    setPolicyEvaluation({
      status: blocked ? "review" : "pass",
      policyScope: "finance.global",
      riskScore: policyPayload.risk_score,
      checks: [
        { name: "Policy engine result", status: blocked ? "review" : "pass", message: policyPayload.policy_check?.reason ?? "Policy check completed." },
        { name: "Lineage + replay requirement", status: "pass", message: "Lineage and replay endpoints are attached for control decision audit." },
      ],
    })
    setProposal((current) => ({ ...current, policyStatus: blocked ? "review" : "pass" }))

    if (blocked) {
      setWorkflowState("policy blocked")
      setApproval({ status: "pending", approver: null, comment: "Policy blocked auto-execution. Human decision required." })
    } else {
      setWorkflowState("awaiting approval")
      setApproval({ status: "pending", approver: null, comment: "Policy passed; human approval gate is open." })
    }

    await refreshAuditArtifacts(nextDecisionId)
  }

  async function refreshAuditArtifacts(id: string) {
    const [lineageRes, replayRes] = await Promise.all([fetch(`/api/lineage/${id}`), fetch(`/api/replay/${id}`)])
    const lineagePayload = await lineageRes.json()
    const replayPayload = await replayRes.json()

    if (lineagePayload?.lineage) {
      setLineage({
        lineageHash: lineagePayload.lineage.root_hash ?? id,
        parentHash: lineagePayload.lineage.nodes?.[0]?.hash ?? "n/a",
        traceparent: `decision:${id}`,
        lineageStatus: approval.status === "approved" ? "sealed" : "pending",
      })
    }

    const timeline = (replayPayload?.timeline ?? []) as Array<{ type: string; status: "ok" | "degraded" | "error"; at: string; message: string }>
    setReplay(timeline.map((event, index) => ({
      id: `${event.type}-${index}`,
      step: event.type,
      status: event.status === "error" ? "pending" : "completed",
      timestamp: event.at,
      detail: event.message,
    })))
  }

  async function reviewDecision(action: "approve" | "reject") {
    if (!decisionId) return
    const res = await fetch(`/api/decisions/${decisionId}/review`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action, approverId: "finance-controller-1", comment: `Operator ${action}ed in Mission Control.` }),
    })
    const payload = await res.json()
    if (!res.ok) return

    if (action === "approve") {
      setApproval({ status: "approved", approver: payload.approval?.approverId ?? "finance-controller-1", comment: payload.approval?.comment ?? "Approved." })
      setWorkflowState("approved")
    } else {
      setApproval({ status: "rejected", approver: payload.approval?.approverId ?? "finance-controller-1", comment: payload.approval?.comment ?? "Rejected." })
      setWorkflowState("rejected")
    }

    await refreshAuditArtifacts(decisionId)
  }

  const stateBadge = useMemo(() => workflowState, [workflowState])

  return (
    <WorkspaceShell>
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-6 lg:p-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-border-subtle dark:bg-background-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Mission Control · Budget Reallocation</p>
              <h1 className="text-3xl font-black tracking-tight">Minimum Viable Slice</h1>
              <p className="text-sm text-muted-foreground mt-1">Flow: evidence intake → context prep/retrieval → policy decision proposal → human gate → replay/audit.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Evidence count: {evidence.length}</Badge>
              <Badge variant="outline">Classification: {classification}</Badge>
              <Badge variant="outline">Workflow: {stateBadge}</Badge>
              <Badge variant="outline">Mode: {missionMode}</Badge>
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={runFlow} disabled={!canRunFlow}>Run decision pipeline</Button>
          </div>
        </section>

        <ApprovalBar approval={approval} onApprove={() => reviewDecision("approve")} onReject={() => reviewDecision("reject")} disabled={!decisionId || workflowState === "embedding in progress"} />

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-4 space-y-6">
            <EvidenceIntakePanel evidence={evidence} onAddEvidence={(item) => setEvidence((prev) => [item, ...prev])} />
            <EnvelopeInspector evidenceCount={evidence.length} classification={classification} policyScope={policyEvaluation.policyScope} />
          </div>
          <div className="xl:col-span-4 space-y-6">
            <EvidenceContextPanel evidence={evidence} hits={contextHits} workflowState={workflowState} embeddingArtifactRef={embeddingArtifactRef} />
            <DecisionProposalCard proposal={proposal} />
            <PolicyEvaluationPanel policy={policyEvaluation} />
          </div>
          <div className="xl:col-span-4 space-y-6">
            <LineagePanel lineage={lineage} />
            <ReplayPanel records={replay} />
          </div>
        </section>
      </div>
    </WorkspaceShell>
  )
}

function WorkspaceShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light font-sans text-slate-900 antialiased dark:bg-background-dark dark:text-slate-100">
      <Sidebar />
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-background-dark/50">{children}</main>
      </div>
    </div>
  )
}
