import type { AlertItem } from "@/lib/mock/workspace"
import { SeverityBadge } from "./SeverityBadge"

export function AlertRow({ item, onOpen, disabled }: { item: AlertItem; onOpen: (id: string) => void; disabled?: boolean }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-border-subtle dark:bg-background-dark">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h4>
            <SeverityBadge severity={item.severity} />
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
          <p className="mt-2 text-[11px] text-slate-400">{item.source} • {item.timestamp}</p>
        </div>
        <button onClick={() => onOpen(item.id)} disabled={disabled} className="text-xs font-bold text-primary disabled:opacity-50">
          Open
        </button>
      </div>
    </div>
  )
}
