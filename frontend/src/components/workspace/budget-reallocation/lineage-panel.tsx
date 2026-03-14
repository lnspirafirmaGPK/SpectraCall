import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LineageArtifactView } from "@/lib/workspace/budget-reallocation"

export function LineagePanel({ lineage }: { lineage: LineageArtifactView }) {
  return (
    <Card className="bg-background/40 border-primary/20">
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-wider">Lineage + trace</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <Badge variant="outline">Lineage status: {lineage.lineageStatus}</Badge>
        <p>Lineage hash: <span className="font-mono">{lineage.lineageHash}</span></p>
        <p>Parent hash: <span className="font-mono">{lineage.parentHash}</span></p>
        <p>Trace ID: <span className="font-mono">{lineage.traceparent}</span></p>
      </CardContent>
    </Card>
  )
}
