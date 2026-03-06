import type { QueueStatus } from "@/lib/mock/workspace"
import { cn } from "@/lib/utils"

export function StatusBadge({ status }: { status: QueueStatus }) {
  const cls =
    status === "blocked"
      ? "bg-red-500/10 text-red-400"
      : status === "running"
      ? "bg-blue-500/10 text-blue-400"
      : status === "completed"
      ? "bg-emerald-500/10 text-emerald-400"
      : "bg-yellow-500/10 text-yellow-400"

  return <span className={cn("rounded-full px-2 py-1 text-[11px] font-bold uppercase", cls)}>{status}</span>
}
