import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { EvidenceContextHit, EvidenceItem } from "@/lib/mock/budget-reallocation"

export function EvidenceContextPanel({
  evidence,
  hits,
}: {
  evidence: EvidenceItem[]
  hits: EvidenceContextHit[]
}) {
  const classification = evidence.some((item) => item.classification === "restricted") ? "restricted" : "internal"

  return (
    <Card className="bg-background/40 border-primary/20">
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-wider">Context preparation + retrieval</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground">
          Embedding is used as a context indexing / retrieval support layer, not a standalone AI product feature.
        </p>
        <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-xs">
          Embedding artifact placeholder: <span className="font-mono">emb://budget-reallocation-evidence-v1</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline">Classification: {classification}</Badge>
          <Badge variant="outline">Context hits: {hits.length}</Badge>
        </div>
        <div className="space-y-2">
          {hits.map((hit) => (
            <div key={hit.id} className="rounded-md border border-white/10 p-2">
              <p className="text-sm font-medium">{hit.title}</p>
              <p className="text-xs text-muted-foreground">{hit.source} · similarity {(hit.similarity * 100).toFixed(0)}%</p>
              <p className="text-xs mt-1">{hit.excerpt}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
