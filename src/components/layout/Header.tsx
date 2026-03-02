
"use client";

import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const getTitle = () => {
    switch(pathname) {
      case '/overview': return "System Overview";
      case '/council': return "CEO AI Council & Intent Builder";
      case '/creator': return "Agent Creator Studio";
      case '/diagnostics': return "Diagnostics";
      case '/operations': return "Operations";
      default: return "ASI | Inspectra";
    }
  };

  const getSearchPlaceholder = () => {
    switch(pathname) {
      case '/council': return "Search directives...";
      case '/creator': return "Search resources...";
      case '/diagnostics': return "Search trace ID...";
      case '/operations': return "Search operational context...";
      default: return null;
    }
  };

  const searchPlaceholder = getSearchPlaceholder();

  return (
    <header className="h-16 border-b border-border-subtle bg-background-dark/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-white tracking-tight">{getTitle()}</h2>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-widest">Live</span>
      </div>

      {searchPlaceholder && (
        <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-border-subtle bg-background-card focus-within:border-primary transition-colors">
            <div className="text-text-muted flex items-center justify-center pl-3">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              className="flex w-full min-w-0 flex-1 bg-transparent border-none text-white focus:ring-0 placeholder:text-text-muted px-3 text-sm font-normal"
              placeholder={searchPlaceholder}
            />
          </div>
        </label>
      )}

      <div className="flex items-center gap-4">
        <div className="relative">
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <button className="p-2 text-text-muted hover:text-white transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
        <div className="h-8 w-[1px] bg-border-subtle mx-1"></div>
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <span className="material-symbols-outlined text-[18px]">dns</span>
          <span>Cluster Alpha-7</span>
        </div>
      </div>
    </header>
  );
}
