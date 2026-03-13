"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import type { EvidenceItem } from "@/lib/mock/budget-reallocation"

export function EvidenceIntakePanel({
  evidence,
  onAddEvidence,
}: {
  evidence: EvidenceItem[]
  onAddEvidence: (item: EvidenceItem) => void
}) {
  const [note, setNote] = useState("")

  const addText = () => {
    if (!note.trim()) return
    onAddEvidence({
      id: `e-text-${Date.now()}`,
      type: "text",
      title: "Operator note",
      content: note,
      classification: "internal",
      createdAt: new Date().toISOString(),
    })
    setNote("")
  }

  const addFileEvidence = (type: "image" | "audio", name?: string) => {
    onAddEvidence({
      id: `e-${type}-${Date.now()}`,
      type,
      title: name || `${type} evidence`,
      content: `${type}://${name || "uploaded-file"}`,
      classification: type === "image" ? "restricted" : "internal",
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <Card className="bg-background/40 border-primary/20">
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-wider">Evidence intake</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground">Capture text, image, and audio evidence into one evidence set for decision context.</p>
        <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add text note evidence..." className="min-h-20" />
        <Button size="sm" onClick={addText}>Add text note</Button>
        <div className="grid gap-2 sm:grid-cols-2">
          <Input type="file" accept="image/*" onChange={(e) => addFileEvidence("image", e.target.files?.[0]?.name)} />
          <Input type="file" accept="audio/*" onChange={(e) => addFileEvidence("audio", e.target.files?.[0]?.name)} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Evidence count: {evidence.length}</Badge>
          <Badge variant="outline">Types: text / image / audio</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
