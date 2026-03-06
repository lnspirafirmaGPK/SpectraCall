
"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

export default function VoiceResonancePage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-slate-100 font-sans antialiased">
      <Sidebar />
      <div className="flex-1 relative flex flex-col overflow-hidden max-w-4xl mx-auto border-x border-slate-200 dark:border-slate-800 bg-[#101122]">
        <div className="flex flex-col items-center p-6 pt-12 z-10 w-full">
          <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span><span className="text-xs font-semibold tracking-widest text-slate-300 uppercase">Secure Uplink</span></div>
          <span className="text-lg font-light text-slate-400 font-mono">04:23</span>
        </div>
        <div className="absolute top-32 w-full flex justify-center px-4 pointer-events-none z-20">
          <div className="flex flex-wrap justify-center gap-2 opacity-80">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md"><span className="material-symbols-outlined text-[14px] text-primary">data_usage</span><span className="text-xs font-medium text-slate-200">Quantum Fluctuations</span></div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md"><span className="material-symbols-outlined text-[14px] text-primary">location_on</span><span className="text-xs font-medium text-slate-200">Sector 7G</span></div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center relative w-full">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full bg-primary/20 blur-3xl mix-blend-screen animate-pulse duration-1000"></div>
            <div className="absolute w-48 h-48 rounded-full bg-primary/40 blur-2xl mix-blend-screen animate-pulse duration-700"></div>
          </div>
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-blue-300 shadow-[0_0_60px_rgba(35,46,242,0.6)] flex items-center justify-center border border-white/20 z-10">
            <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.8)_0%,transparent_60%)] opacity-50 absolute"></div>
            <div className="w-24 h-24 rounded-full bg-primary/80 blur-sm mix-blend-overlay"></div>
          </div>
        </div>
        <div className="absolute bottom-32 left-0 right-0 h-24 flex items-end justify-center gap-1 opacity-40 px-8 pointer-events-none z-0">
          {[4, 8, 12, 6, 16, 10, 5, 14, 8, 3, 12, 7].map((h, i) => (
            <div key={i} className="w-1.5 bg-primary rounded-t-full animate-bounce" style={{ height: `${h * 4}px`, animationDuration: `${0.5 + Math.random()}s`, animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
        <div className="p-8 pb-12 w-full z-10 flex items-center justify-between gap-4 backdrop-blur-sm bg-gradient-to-t from-[#101122] via-[#101122]/80 to-transparent">
          <button className="flex items-center justify-center size-14 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors shadow-lg border border-slate-700"><span className="material-symbols-outlined text-[28px]">mic_off</span></button>
          <button className="flex items-center justify-center flex-1 h-14 rounded-full bg-red-600 text-white hover:bg-red-500 transition-colors shadow-[0_0_20px_rgba(220,38,38,0.4)] font-medium text-lg tracking-wide uppercase">End Session</button>
          <button className="flex items-center justify-center size-14 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors shadow-lg border border-slate-700"><span className="material-symbols-outlined text-[28px]">volume_up</span></button>
        </div>
        <div className="h-5"></div>
      </div>
    </div>
  );
}
