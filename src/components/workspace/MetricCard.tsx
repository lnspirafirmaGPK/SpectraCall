import type { MetricCardData } from "@/lib/mock/workspace"
import { cn } from "@/lib/utils"

export function MetricCard({ metric }: { metric: MetricCardData }) {
  const toneClass =
    metric.tone === "secondary"
      ? "text-secondary bg-secondary/10"
      : metric.tone === "accent"
      ? "text-accent bg-accent/10"
      : "text-primary bg-primary/10"

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-border-subtle dark:bg-background-dark">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{metric.label}</p>
          <p className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white">{metric.value}</p>
        </div>
        <div className={cn("rounded-lg p-2", toneClass)}>
          <span className="material-symbols-outlined">{metric.icon}</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-primary">{metric.delta}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">{metric.subtext}</span>
      </div>
    </div>
  )
}
