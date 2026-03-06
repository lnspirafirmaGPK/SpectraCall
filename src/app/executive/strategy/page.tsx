
"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

export default function StrategyConfigPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-slate-100 antialiased">
      <Sidebar />
      <div className="flex-1 relative flex h-full w-full flex-col overflow-x-hidden pb-24 border-x border-slate-200 dark:border-slate-800">
        <div className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors"><span className="material-symbols-outlined">arrow_back</span></div>
          <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">Strategy AI Configuration</h2>
          <div className="flex size-10 items-center justify-end"><span className="material-symbols-outlined text-primary">analytics</span></div>
        </div>
        <div className="flex p-4 flex-col gap-4">
          <div className="flex gap-4 items-center">
            <div className="bg-primary/20 rounded-xl min-h-24 w-24 flex items-center justify-center border border-primary/30 relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDnQIr5eo3n55JxRPVJRCwWnffQIkgJmZ-e9JAG6_2aoy7WxG4mZEhmAJnjjX2m1RdIB_Ta0DihzayCdObdQiO_d-DrHm4CAwXWM68BJEC4bBwLHwru9zUV2kLqiEORUx8eOlwtoPe6_8U064tW5wpgMV4SIibMZG_KZ5AKJ4jnho3i3Id-87G0Qs4Sv-t8vQb6t_sBsQe7KU2MQhRl8haFJf_tS0m58GHba7cE9pHoCGPhBPY5OsWcH4omnWkeNLsCCjk6pNDJpWE')" }}><div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div></div>
            <div className="flex flex-col">
              <p className="text-xl font-bold leading-tight tracking-tight">Aetherium Syndicate Inspectra</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Governance Over Management</p>
              <div className="mt-2 flex items-center gap-2"><span className="flex h-2 w-2 rounded-full bg-emerald-500"></span><span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Policy Genome: ACTIVE</span></div>
            </div>
          </div>
        </div>
        <section className="px-4 py-2">
          <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Existential Coding</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-900 transition-colors cursor-pointer group">
              <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-12"><span className="material-symbols-outlined">target</span></div>
              <div className="flex flex-1"><p className="text-base font-semibold">Target Mapping</p><p className="text-slate-500 dark:text-slate-400 text-xs">Alignment of value vectors to core objectives</p></div>
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          </div>
        </section>
        <section className="px-4 py-4">
          <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Causal Policy Lab</h3>
          <div className="bg-primary/5 backdrop-blur-md border border-white/10 p-4 rounded-xl flex flex-col gap-4">
            <div className="flex justify-between items-center"><div><p className="text-sm font-semibold">MCTS & Simulation</p><p className="text-xs text-slate-500 dark:text-slate-400">Running 1.2M iterations/sec</p></div><Toggle checked /></div>
            <div className="space-y-2"><div className="flex justify-between text-xs font-medium"><span>Drift Detection</span><span className="text-primary">0.04% (Stable)</span></div><div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5"><div className="bg-primary h-1.5 rounded-full shadow-[0_0_8px_rgba(35,46,242,0.5)]" style={{ width: "4%" }}></div></div></div>
          </div>
        </section>
        <section className="px-4 py-4">
          <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Bidding & Negotiation</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl"><span className="material-symbols-outlined text-[#00f5ff] mb-2">payments</span><p className="text-sm font-semibold">Resource Auto-Bid</p><p className="text-[10px] text-slate-500 mt-1">AI manages local budget</p><div className="mt-3"><Toggle checked size="sm" /></div></div>
            <div className="p-4 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl"><span className="material-symbols-outlined text-[#bc13fe] mb-2">handshake</span><p className="text-sm font-semibold">Conflict Resolution</p><p className="text-[10px] text-slate-500 mt-1">Autonomous settlement</p><div className="mt-3"><Toggle checked={false} size="sm" /></div></div>
          </div>
        </section>
        <section className="px-4 py-4">
          <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Resonance & Alignment</h3>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-4">
            <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">vibration</span><span className="text-sm font-semibold">Resonance Score</span></div><span className="text-xl font-bold text-primary tracking-tighter">0.982</span></div>
            <div className="space-y-3"><div className="flex flex-col gap-1"><div className="flex justify-between text-[10px] uppercase font-bold tracking-wider text-slate-500"><span>Ethical Envelope Threshold</span><span>85%</span></div><input className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary" type="range" defaultValue={85} /></div></div>
          </div>
        </section>
        <div className="px-4 py-4">
          <a className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-primary/40 shadow-[0_0_15px_rgba(35,46,242,0.15)] group" href="#"><div className="flex items-center gap-3"><div className="size-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(35,46,242,0.5)] group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-white">diamond</span></div><div><p className="text-sm font-bold text-white">Gems of Wisdom</p><p className="text-[10px] text-primary font-bold">Access Memory Vault</p></div></div><span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">open_in_new</span></a>
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, size = "md" }: { checked: boolean; size?: "sm" | "md" }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={checked} readOnly />
      <div className={cn("bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer transition-all peer-checked:bg-primary after:content-[''] after:absolute after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full", size === "md" ? "w-11 h-6 after:top-[2px] after:start-[2px] after:h-5 after:w-5" : "w-9 h-5 after:top-[2px] after:start-[2px] after:h-4 after:w-4")}></div>
    </label>
  );
}
