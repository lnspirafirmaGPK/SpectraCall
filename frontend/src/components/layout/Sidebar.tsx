"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { appRoutes } from "@/lib/navigation"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col justify-between border-r border-white/5 bg-[#101122] z-20">
      <div className="flex flex-col gap-6 p-4">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 ring-2 ring-primary/30">
            <span className="material-symbols-outlined text-primary">orbital</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-bold tracking-wide text-white">SpectraCall</h1>
            <p className="text-xs font-medium uppercase tracking-wider text-primary">Mission Control</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {appRoutes.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-all",
                  isActive
                    ? "border border-primary/20 bg-primary/10 text-primary"
                    : "text-[#94a3b8] hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn("material-symbols-outlined transition-transform", isActive && "group-hover:scale-110")}>{item.icon}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {item.badge ? (
                  <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-tighter text-primary ring-1 ring-primary/30">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4">
        <Link
          href="/workspace"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold tracking-wide text-white shadow-lg shadow-primary/20 transition-colors hover:bg-blue-600"
        >
          <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
          <span>Open Mission Control</span>
        </Link>
      </div>
    </aside>
  )
}
