import type { Severity } from "@/lib/mock/workspace"
import { cn } from "@/lib/utils"

export function SeverityBadge({ severity }: { severity: Severity }) {
  const cls =
    severity === "critical"
      ? "bg-red-500/10 text-red-500"
      : severity === "high"
      ? "bg-orange-500/10 text-orange-500"
      : severity === "medium"
      ? "bg-yellow-500/10 text-yellow-500"
      : "bg-emerald-500/10 text-emerald-500"

  return <span className={cn("rounded-full px-2 py-1 text-[11px] font-bold uppercase", cls)}>{severity}</span>
}
