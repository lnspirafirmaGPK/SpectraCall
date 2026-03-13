import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PolicyEvaluationResult } from "@/lib/mock/budget-reallocation"

export function PolicyEvaluationPanel({ policy }: { policy: PolicyEvaluationResult }) {
  return (
    <Card className="bg-background/40 border-primary/20">
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-wider">Policy evaluation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline">Policy scope: {policy.policyScope}</Badge>
          <Badge variant="outline">Status: {policy.status}</Badge>
        </div>
        {policy.checks.map((check) => (
          <div key={check.name} className="rounded-md border border-white/10 p-2 text-sm">
            <p className="font-medium">{check.name}</p>
            <p className="text-xs text-muted-foreground">{check.message}</p>
            <Badge variant="outline" className="mt-1">{check.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
