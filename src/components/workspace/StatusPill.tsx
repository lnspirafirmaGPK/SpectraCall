import type { HealthStatus } from "@/lib/mock/workspace"
import { cn } from "@/lib/utils"

export function StatusPill({ status }: { status: HealthStatus }) {
  const cls =
    status === "healthy"
      ? "bg-emerald-500/10 text-emerald-500"
      : status === "warning"
      ? "bg-yellow-500/10 text-yellow-500"
      : status === "degraded"
      ? "bg-orange-500/10 text-orange-500"
      : "bg-red-500/10 text-red-500"

  return <span className={cn("rounded-full px-2 py-1 text-xs font-bold uppercase", cls)}>{status}</span>
}
