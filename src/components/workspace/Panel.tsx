import type { ReactNode } from "react"

export function Panel({
  title,
  subtitle,
  icon,
  rightSlot,
  children,
}: {
  title: string
  subtitle: string
  icon: string
  rightSlot?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-border-subtle dark:bg-background-card">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">{icon}</span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
        {rightSlot}
      </div>
      {children}
    </section>
  )
}
