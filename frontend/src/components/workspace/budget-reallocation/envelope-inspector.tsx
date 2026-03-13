import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function EnvelopeInspector({
  evidenceCount,
  classification,
  policyScope,
}: {
  evidenceCount: number
  classification: string
  policyScope: string
}) {
  return (
    <Card className="bg-background/40 border-primary/20">
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-wider">Canonical envelope</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs font-mono">
        <p>type: asi.decision.budget-reallocation.proposed</p>
        <p>source: /workspace/mission-control/budget-reallocation</p>
        <p>evidence_count: {evidenceCount}</p>
        <p>classification: {classification}</p>
        <p>policy_scope: {policyScope}</p>
      </CardContent>
    </Card>
  )
}
