import type { ApprovalItem } from "@/lib/mock/workspace"
import { SeverityBadge } from "./SeverityBadge"
import { StatusBadge } from "./StatusBadge"

export function ApprovalRow({
  item,
  onExecute,
  onInspect,
  disabled,
}: {
  item: ApprovalItem
  onExecute: (id: string) => void
  onInspect: (id: string) => void
  disabled?: boolean
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-primary/30 dark:border-border-subtle dark:bg-background-dark">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
            <SeverityBadge severity={item.severity} />
            <StatusBadge status={item.status} />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>Owner: {item.owner}</span>
            <span>Role: {item.role}</span>
            <span>ETA: {item.eta}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onInspect(item.id)}
            disabled={disabled}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary disabled:opacity-50 dark:border-border-subtle dark:text-slate-300"
          >
            Inspect
          </button>
          <button
            onClick={() => onExecute(item.id)}
            disabled={disabled}
            className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
          >
            Execute
          </button>
        </div>
      </div>
    </div>
  )
}
