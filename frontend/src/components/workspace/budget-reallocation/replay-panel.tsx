import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ReplayRecordView } from "@/lib/workspace/budget-reallocation"

export function ReplayPanel({ records }: { records: ReplayRecordView[] }) {
  const available = records.at(-1)?.status === "completed"

  return (
    <Card className="bg-background/40 border-primary/20">
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-wider">Replay / audit timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Badge variant="outline">Replay availability: {available ? "available" : "pending approval"}</Badge>
        {records.map((record) => (
          <div key={record.id} className="rounded-md border border-white/10 p-2 text-xs">
            <p className="font-medium">{record.step}</p>
            <p className="text-muted-foreground">{record.timestamp}</p>
            <p>{record.detail}</p>
            <Badge variant="outline" className="mt-1">{record.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
