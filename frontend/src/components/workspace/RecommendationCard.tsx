import type { Recommendation } from "@/lib/mock/workspace"

export function RecommendationCard({
  item,
  onApply,
  disabled,
}: {
  item: Recommendation
  onApply: (id: string) => void
  disabled?: boolean
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-border-subtle dark:bg-background-dark">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{item.impact}</p>
      <button
        onClick={() => onApply(item.id)}
        disabled={disabled}
        className="mt-3 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {item.action}
      </button>
    </div>
  )
}
