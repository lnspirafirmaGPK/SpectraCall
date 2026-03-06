
"use client";

import React, { memo } from "react";
import { cn } from "@/lib/utils";

interface MCTSVisualizerProps {
  className?: string;
  activeNodes?: number;
  convergenceNode?: number;
  probability?: number;
}

export const MCTSVisualizer = memo(function MCTSVisualizer({
  className,
  activeNodes = 4200,
  convergenceNode = 829,
  probability = 0.94,
}: MCTSVisualizerProps) {
  return (
    <div className={cn("bg-[#16172d] border border-[#282939] rounded-xl p-4 overflow-hidden relative", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[#f59e0b] text-xs font-bold uppercase tracking-widest">MCTS Tree Search</h3>
        <span className="text-[10px] text-slate-400">Simulation Active: {(activeNodes/1000).toFixed(1)}k nodes/sec</span>
      </div>

      <div className="h-40 flex items-center justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <div className="w-1 h-1 bg-[#232ef2] rounded-full absolute top-4 left-1/2"></div>
          <div className="w-[2px] h-8 bg-[#232ef2]/30 absolute top-5 left-1/2 -rotate-12 origin-top"></div>
          <div className="w-[2px] h-8 bg-[#232ef2]/30 absolute top-5 left-1/2 rotate-12 origin-top"></div>
          <div className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full absolute top-12 left-[40%] shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
          <div className="w-1 h-1 bg-[#232ef2] rounded-full absolute top-12 left-[60%]"></div>
          <div className="w-[2px] h-12 bg-[#232ef2]/20 absolute top-14 left-[40%] -rotate-45 origin-top"></div>
          <div className="w-[2px] h-12 bg-[#232ef2]/20 absolute top-14 left-[40%] rotate-12 origin-top"></div>
          <div className="w-1 h-1 bg-[#232ef2] rounded-full absolute top-28 left-[25%]"></div>
          <div className="w-2 h-2 bg-[#f59e0b] rounded-full absolute top-28 left-[45%] shadow-[0_0_12px_rgba(245,158,11,0.8)]"></div>
          <div className="w-full h-full bg-gradient-to-t from-[#16172d] via-transparent to-transparent absolute bottom-0"></div>
        </div>

        <div className="z-10 text-center">
          <p className="text-slate-100 text-sm font-medium">Optimal Policy Path Found</p>
          <p className="text-slate-400 text-xs mt-1">Convergence at node #{convergenceNode} (p={probability})</p>
        </div>
      </div>

      <div className="flex w-full flex-row items-center justify-center gap-3 py-2">
        <div className="h-1.5 w-1.5 rounded-full bg-[#282939]"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-[#282939]"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-slate-100"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-[#282939]"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-[#282939]"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-[#282939]"></div>
      </div>
    </div>
  );
});
