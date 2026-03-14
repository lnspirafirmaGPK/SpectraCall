import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ApprovalState } from "@/lib/workspace/budget-reallocation"

export function ApprovalBar({
  approval,
  onApprove,
  onReject,
  disabled,
}: {
  approval: ApprovalState
  onApprove: () => void
  onReject: () => void
  disabled?: boolean
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-background/40 p-3 gap-3">
      <div className="space-y-1">
        <p className="text-sm font-semibold">Human approval gate</p>
        <p className="text-xs text-muted-foreground">Approval status: {approval.status}</p>
        <Badge variant="outline">{approval.comment}</Badge>
      </div>
      <div className="flex gap-2">
        <Button onClick={onReject} variant="outline" disabled={disabled || approval.status !== "pending"}>Reject</Button>
        <Button onClick={onApprove} disabled={disabled || approval.status !== "pending"}>Approve proposal</Button>
      </div>
    </div>
  )
}
