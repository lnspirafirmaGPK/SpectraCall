
"use client";

import React, { memo } from "react";
import { cn } from "@/lib/utils";

interface BiddingPulseProps {
  className?: string;
  confidence?: number;
  delta?: string;
}

export const BiddingPulse = memo(function BiddingPulse({
  className,
  confidence = 88.4,
  delta = "+2.4% vs Ops AI",
}: BiddingPulseProps) {
  return (
    <section className={cn("relative h-64 w-full rounded-2xl bg-slate-900/30 border border-slate-800/50 overflow-hidden flex flex-col items-center justify-center", className)}>
      <style jsx>{`
        .bidding-pulse-gradient {
          background: radial-gradient(circle at center, rgba(35, 46, 242, 0.15) 0%, rgba(16, 17, 34, 0) 70%);
        }
        .scanline {
          width: 100%;
          height: 2px;
          background: rgba(0, 242, 255, 0.1);
          position: absolute;
          top: 0;
          left: 0;
          animation: scan 4s linear infinite;
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
      <div className="absolute inset-0 bidding-pulse-gradient"></div>
      <div className="scanline"></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <div className="w-48 h-48 border border-primary/30 rounded-full animate-ping"></div>
        <div className="absolute w-32 h-32 border border-[#00f2ff]/40 rounded-full"></div>
        <div className="absolute w-16 h-16 border-2 border-[#ffaa00]/50 rounded-full"></div>
      </div>
      <div className="z-10 text-center space-y-2">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Strategy AI Confidence</p>
        <h3 className="text-4xl font-bold text-white tracking-tighter">{confidence}%</h3>
        <div className="flex items-center gap-2 justify-center text-[#00f2ff]">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          <span className="text-xs font-bold">{delta}</span>
        </div>
      </div>
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="size-2 rounded-full bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]"></div>
        <span className="text-[10px] text-slate-300 font-mono">FINANCE_DEPT</span>
      </div>
      <div className="absolute bottom-6 right-6 flex items-center gap-2">
        <div className="size-2 rounded-full bg-[#ffaa00] shadow-[0_0_8px_#ffaa00]"></div>
        <span className="text-[10px] text-slate-300 font-mono">OPS_CORE</span>
      </div>
    </section>
  );
});
