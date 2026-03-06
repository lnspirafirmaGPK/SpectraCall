import { useId } from "react"

export function FilterSelect<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: T
  onChange: (value: T) => void
  options: readonly T[]
}) {
  const id = useId()

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className="h-[42px] w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition-colors focus:border-primary dark:border-border-subtle dark:bg-background-dark dark:text-slate-200"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined pointer-events-none absolute right-3 top-2.5 text-slate-500">arrow_drop_down</span>
      </div>
    </div>
  )
}
