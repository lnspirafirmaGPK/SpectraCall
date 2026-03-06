"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/overview", icon: "dashboard" },
  { name: "Mission Control", href: "/workspace", icon: "space_dashboard" },
  { name: "ASI Control Plane", href: "/workspace/control-plane/budget-reallocation", icon: "security", isNew: true },
  { name: "Service Catalog", href: "/workspace/control-plane/services", icon: "globe" },
  { name: "Tachyon Core", href: "/council", icon: "memory" },
  { name: "Resonance", href: "/diagnostics", icon: "ssid_chart" },
  { name: "Creator Studio", href: "/creator", icon: "brush" },
  { name: "Accounting Dept", href: "/accounting", icon: "account_balance", isNew: true },
  { name: "Audit Logs", href: "/operations", icon: "description" },
  { name: "Settings", href: "/settings", icon: "settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full flex flex-col justify-between bg-[#101122] border-r border-white/5 z-20 shrink-0">
      <div className="flex flex-col gap-6 p-4">
        {/* User/Org Profile */}
        <div className="flex gap-3 items-center pb-4 border-b border-white/5">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-10 ring-2 ring-primary/30"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAIhW5CbPj1JkFjA1cLyrHU4dDNhbYky_1r4x3eUvWRbjKgzoolt288LneACHShDQ8Q2MxF3YwFAahOalX-8RcfGYnXmvLuOQS1sCk-QY8x-wsftyWAsni-VmlnaiMFuyUov9piyP4YiibB0q1vYNImnPNBIEDaG6Y7M1eRg8AXwbb3JKWaYosh0og9kJIqXfgepWbjnnb16RocR4YCKKlP3bAv46VFRDyuSY55n-h9m4ryVrI4QpbTuh2CdaEUUr6V36GmYJ7k-_E8")' }}
          ></div>
          <div className="flex flex-col">
            <h1 className="text-white text-base font-bold tracking-wide">ASI</h1>
            <p className="text-primary text-xs font-medium tracking-wider uppercase">Exec War Room</p>
          </div>
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all group",
                  isActive
                    ? "bg-primary/10 border border-primary/20 text-primary"
                    : "text-[#94a3b8] hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "material-symbols-outlined transition-transform",
                    isActive && "group-hover:scale-110"
                  )}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {item.isNew && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-bold uppercase tracking-tighter ring-1 ring-primary/30">
                    New
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-wide hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>New Analysis</span>
        </button>
      </div>
    </aside>
  );
}
