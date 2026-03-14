import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BudgetProposalView } from "@/lib/workspace/budget-reallocation"

export function DecisionProposalCard({ proposal }: { proposal: BudgetProposalView }) {
  return (
    <Card className="bg-background/40 border-primary/20">
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-wider">Decision proposal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-2xl font-bold font-mono">${proposal.proposedAmount.toLocaleString()} {proposal.currency}</p>
        <p className="text-xs text-muted-foreground">{proposal.fromCostCenter} → {proposal.toCostCenter}</p>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline">Confidence {(proposal.confidence * 100).toFixed(0)}%</Badge>
          <Badge variant="outline">Policy status: {proposal.policyStatus}</Badge>
          <Badge variant="outline">Approval required: {proposal.approvalRequired ? "yes" : "no"}</Badge>
        </div>
        <p className="text-sm">{proposal.rationale}</p>
        <p className="text-xs text-muted-foreground">Linked evidence: {proposal.linkedEvidenceIds.join(", ")}</p>
        <p className="text-xs text-muted-foreground">Cited context hits: {proposal.citedContextHitIds.join(", ")}</p>
      </CardContent>
    </Card>
  )
}
