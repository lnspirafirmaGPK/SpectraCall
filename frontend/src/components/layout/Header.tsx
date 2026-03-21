"use client"

import { usePathname } from "next/navigation"
import { getRouteMeta } from "@/lib/navigation"

export function Header() {
  const pathname = usePathname()
  const route = getRouteMeta(pathname)

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border-subtle bg-background-dark/80 px-6 backdrop-blur-md z-10">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary/80">SpectraCall</p>
          <h2 className="text-xl font-bold tracking-tight text-white">{route?.headerTitle ?? "SpectraCall Mission Control"}</h2>
        </div>
        <span className="rounded border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-green-400">Live</span>
      </div>

      {route?.searchPlaceholder ? (
        <label className="hidden h-10 min-w-40 max-w-80 flex-col md:flex">
          <div className="flex h-full w-full flex-1 items-stretch rounded-lg border border-border-subtle bg-background-card transition-colors focus-within:border-primary">
            <div className="flex items-center justify-center pl-3 text-text-muted">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              className="flex w-full min-w-0 flex-1 border-none bg-transparent px-3 text-sm font-normal text-white placeholder:text-text-muted focus:ring-0"
              placeholder={route.searchPlaceholder}
            />
          </div>
        </label>
      ) : null}

      <div className="flex items-center gap-4">
        <div className="relative">
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
          <button className="p-2 text-text-muted transition-colors hover:text-white">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
        <div className="mx-1 h-8 w-[1px] bg-border-subtle"></div>
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <span className="material-symbols-outlined text-[18px]">dns</span>
          <span>Cluster Alpha-7</span>
        </div>
      </div>
    </header>
  )
}
