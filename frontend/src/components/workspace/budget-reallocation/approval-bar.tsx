import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ApprovalState } from "@/lib/mock/budget-reallocation"

export function ApprovalBar({
  approval,
  onApprove,
}: {
  approval: ApprovalState
  onApprove: () => void
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-background/40 p-3">
      <div className="space-y-1">
        <p className="text-sm font-semibold">Human approval gate</p>
        <p className="text-xs text-muted-foreground">Approval status: {approval.status}</p>
        <Badge variant="outline">{approval.comment}</Badge>
      </div>
      <Button onClick={onApprove} disabled={approval.status === "approved"}>Approve proposal</Button>
    </div>
  )
}
