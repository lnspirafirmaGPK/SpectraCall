import type { SummaryStatItem } from "@/lib/mock/workspace"

export function SummaryStat({ item }: { item: SummaryStatItem }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center dark:border-border-subtle dark:bg-background-dark">
      <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{item.label}</p>
      <p className="mt-1 text-xl font-black text-slate-900 dark:text-white">{item.value}</p>
    </div>
  )
}
