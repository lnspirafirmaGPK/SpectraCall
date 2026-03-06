
"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { TacticalHUD } from "@/components/executive/TacticalHUD";

export default function VisionOverlayPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-black text-white font-sans antialiased">
      <Sidebar />
      <div className="flex-1 relative flex flex-col max-w-4xl mx-auto bg-slate-900 overflow-hidden">
        <TacticalHUD />
        <div className="relative z-30 flex items-center justify-between p-4 pt-8 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
            <span className="text-xs font-bold tracking-widest text-red-500 uppercase">Live Vision</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono text-primary opacity-80">LAT: 34.0522° N</span>
            <span className="text-[10px] font-mono text-primary opacity-80">LONG: 118.2437° W</span>
          </div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
          <button className="size-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-primary/40 hover:border-primary/50 transition-all shadow-lg group"><span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">photo_camera</span></button>
          <button className="size-12 rounded-full bg-primary/20 backdrop-blur-md border border-primary/50 text-white flex items-center justify-center hover:bg-primary/40 transition-all shadow-lg group"><span className="material-symbols-outlined text-[24px] text-primary">view_in_ar</span></button>
          <button className="size-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-primary/40 hover:border-primary/50 transition-all shadow-lg group"><span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">cameraswitch</span></button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center pb-8 pt-12 bg-gradient-to-t from-black via-black/80 to-transparent px-4 gap-4">
          <div className="w-full max-w-sm bg-black/50 backdrop-blur-lg border border-primary/30 rounded-2xl p-4 shadow-[0_0_15px_rgba(35,46,242,0.15)]">
            <div className="flex items-center gap-2 mb-2"><span className="material-symbols-outlined text-[16px] text-primary animate-pulse">graphic_eq</span><span className="text-[10px] font-bold text-primary uppercase tracking-wider">ASI Analysis Real-time</span></div>
            <p className="text-sm font-light text-slate-200 leading-relaxed">"CEO, I have isolated the target hardware. The encryption pattern on the document on the right suggests Quantum-level security. Attempting decryption protocol Alpha now..."</p>
          </div>
          <button className="mt-2 w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] border-2 border-red-400/50 transition-all"><span className="material-symbols-outlined text-[32px]">close</span></button>
        </div>
      </div>
    </div>
  );
}
