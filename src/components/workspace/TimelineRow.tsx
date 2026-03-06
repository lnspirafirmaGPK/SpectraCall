import type { TimelineEvent } from "@/lib/mock/workspace"

export function TimelineRow({ event }: { event: TimelineEvent }) {
  return (
    <div className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-border-subtle dark:bg-background-dark">
      <div className="text-xs font-bold text-primary">{event.time}</div>
      <div>
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{event.title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">{event.description}</p>
      </div>
    </div>
  )
}
