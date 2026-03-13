"use client"

import { type ReactNode, useMemo, useState } from "react"
import { Header } from "@/components/layout/Header"
import { Sidebar } from "@/components/layout/Sidebar"
import { Badge } from "@/components/ui/badge"
import { ApprovalBar } from "@/components/workspace/budget-reallocation/approval-bar"
import { DecisionProposalCard } from "@/components/workspace/budget-reallocation/decision-proposal-card"
import { EnvelopeInspector } from "@/components/workspace/budget-reallocation/envelope-inspector"
import { EvidenceContextPanel } from "@/components/workspace/budget-reallocation/evidence-context-panel"
import { EvidenceIntakePanel } from "@/components/workspace/budget-reallocation/evidence-intake-panel"
import { LineagePanel } from "@/components/workspace/budget-reallocation/lineage-panel"
import { PolicyEvaluationPanel } from "@/components/workspace/budget-reallocation/policy-evaluation-panel"
import { ReplayPanel } from "@/components/workspace/budget-reallocation/replay-panel"
import { buildBudgetFlow, initialEvidence, type EvidenceItem } from "@/lib/mock/budget-reallocation"

export default function BudgetReallocationPage() {
  const [evidence, setEvidence] = useState<EvidenceItem[]>(initialEvidence)
  const [isApproved, setIsApproved] = useState(false)

  const flow = useMemo(() => buildBudgetFlow(evidence, isApproved), [evidence, isApproved])
  const classification = evidence.some((item) => item.classification === "restricted") ? "restricted" : "internal"

  return (
    <WorkspaceShell>
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-6 lg:p-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-border-subtle dark:bg-background-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Mission Control · Budget Reallocation</p>
              <h1 className="text-3xl font-black tracking-tight">Minimum Viable Slice</h1>
              <p className="text-sm text-muted-foreground mt-1">Flow: proposal → policy evaluation → lineage/trust artifact → human approval → replay/audit.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Evidence count: {evidence.length}</Badge>
              <Badge variant="outline">Classification: {classification}</Badge>
              <Badge variant="outline">Approval status: {flow.approval.status}</Badge>
            </div>
          </div>
        </section>

        <ApprovalBar approval={flow.approval} onApprove={() => setIsApproved(true)} />

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-4 space-y-6">
            <EvidenceIntakePanel evidence={evidence} onAddEvidence={(item) => setEvidence((prev) => [item, ...prev])} />
            <EnvelopeInspector evidenceCount={evidence.length} classification={classification} policyScope={flow.policyEvaluation.policyScope} />
          </div>
          <div className="xl:col-span-4 space-y-6">
            <EvidenceContextPanel evidence={evidence} hits={flow.contextHits} />
            <DecisionProposalCard proposal={flow.proposal} />
            <PolicyEvaluationPanel policy={flow.policyEvaluation} />
          </div>
          <div className="xl:col-span-4 space-y-6">
            <LineagePanel lineage={flow.lineage} />
            <ReplayPanel records={flow.replay} />
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
