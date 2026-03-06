
"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { MCTSVisualizer } from "@/components/executive/MCTSVisualizer";
import { cn } from "@/lib/utils";

export default function PolicyLabPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 relative flex h-screen w-full flex-col overflow-hidden border-x border-slate-200 dark:border-slate-800">
        <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-[#282939]/50">
          <div className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-center"><span className="material-symbols-outlined">menu</span></div>
          <div className="flex flex-col items-center"><h2 className="text-slate-900 dark:text-slate-100 text-[10px] font-bold leading-tight tracking-tight uppercase opacity-60">Strategy AI Department</h2><h1 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">Causal Policy Lab</h1></div>
          <div className="flex w-10 items-center justify-end"><button className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-transparent text-slate-900 dark:text-slate-100 p-0"><span className="material-symbols-outlined">notifications</span></button></div>
        </div>
        <div className="flex-1 overflow-y-auto pb-24 bg-[#0a0b16]">
          <div className="px-4 py-4"><MCTSVisualizer /></div>
          <div className="px-4 pb-4">
            <div className="bg-[#16172d] border border-[#282939] rounded-xl p-5">
              <h3 className="text-slate-100 text-base font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">tune</span>Policy Levers</h3>
              <div className="space-y-6">
                <Slider label="Profit Margin Optimization" value="+18.5%" defaultValue={75} />
                <Slider label="Quality Retention Target" value="92.0" defaultValue={92} />
                <div>
                  <div className="flex justify-between items-center mb-2"><label className="text-slate-300 text-xs font-medium">Market Resonance Latency</label><span className="text-slate-400 text-xs font-bold">Low Stability</span></div>
                  <div className="grid grid-cols-3 gap-2"><button className="py-2 text-[10px] font-bold rounded bg-primary text-white border border-primary">AGGR</button><button className="py-2 text-[10px] font-bold rounded bg-background-dark text-slate-400 border border-[#282939]">BALANCED</button><button className="py-2 text-[10px] font-bold rounded bg-background-dark text-slate-400 border border-[#282939]">SAFE</button></div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="bg-[#16172d] border border-[#282939] rounded-xl p-5">
              <h3 className="text-slate-100 text-base font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-[#f59e0b] text-sm">psychology</span>Reasoning Trace</h3>
              <div className="space-y-4">
                <TraceStep number={1} text="Initialized baseline from Q3 fiscal resonance data." />
                <TraceStep number={2} text="Identified potential bottleneck in market quality retention nodes." />
                <TraceStep number={3} text="Evaluating market quality retention vs. marginal profit gains across simulated branching nodes." active />
                <TraceStep number={4} text="Synthetic forecasting for competitor counter-policy moves." disabled />
              </div>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="bg-[#16172d] border border-[#282939] rounded-xl p-5">
              <div className="flex justify-between items-center mb-4"><h3 className="text-slate-100 text-base font-bold">Forecasted Resonance</h3><div className="flex gap-2"><div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary"></div><span className="text-[10px] text-slate-400 uppercase">Sim A</span></div><div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div><span className="text-[10px] text-slate-400 uppercase">Sim B</span></div></div></div>
              <div className="h-32 w-full relative">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 100"><line className="text-[#282939]/30" stroke="currentColor" strokeWidth="1" x1="0" x2="300" y1="20" y2="20"></line><line className="text-[#282939]/30" stroke="currentColor" strokeWidth="1" x1="0" x2="300" y1="50" y2="50"></line><line className="text-[#282939]/30" stroke="currentColor" strokeWidth="1" x1="0" x2="300" y1="80" y2="80"></line><path className="drop-shadow-sm" d="M0 80 Q 50 70, 100 50 T 200 60 T 300 10" fill="none" stroke="#232ef2" strokeWidth="2"></path><path d="M0 80 Q 50 75, 100 85 T 200 40 T 300 35" fill="none" stroke="#f59e0b" strokeDasharray="4 2" strokeWidth="2"></path></svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1"><span className="text-[9px] text-slate-500 uppercase font-bold">Start</span><span className="text-[9px] text-slate-500 uppercase font-bold">Phase 1</span><span className="text-[9px] text-slate-500 uppercase font-bold">Phase 2</span><span className="text-[9px] text-slate-500 uppercase font-bold">Target</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-50"><div className="flex gap-2 border-t border-[#282939] bg-[#16172d] px-4 pb-8 pt-2"><NavBtn icon="play_circle" label="Simulate" active /><NavBtn icon="hub" label="Reasoning" /><NavBtn icon="insights" label="Forecast" /><NavBtn icon="settings" label="Settings" /></div></div>
      </div>
    </div>
  );
}

interface SliderProps {
  label: string;
  value: string;
  defaultValue: number;
}

function Slider({ label, value, defaultValue }: SliderProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2"><label className="text-slate-300 text-xs font-medium">{label}</label><span className="text-[#f59e0b] text-xs font-bold">{value}</span></div>
      <input className="w-full h-1 bg-[#282939] rounded-lg appearance-none cursor-pointer accent-primary" type="range" defaultValue={defaultValue} />
    </div>
  );
}

interface TraceStepProps {
  number: number;
  text: string;
  active?: boolean;
  disabled?: boolean;
}

function TraceStep({ number, text, active, disabled }: TraceStepProps) {
  return (
    <div className={cn("flex gap-4", disabled && "opacity-40")}>
      <div className="flex flex-col items-center">
        <div className={cn("size-6 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0", active ? "bg-primary text-white border-primary shadow-[0_0_8px_rgba(35,46,242,0.4)]" : "bg-primary/20 border-primary text-primary")}>{number}</div>
        <div className="w-px h-full bg-[#282939]"></div>
      </div>
      <div className="pb-2">
        <p className={cn("text-xs leading-relaxed", active ? "text-slate-100 font-medium" : "text-slate-300")}>{text}</p>
        {active && <div className="mt-2 py-1 px-2 bg-primary/10 rounded border-l-2 border-primary"><span className="text-[10px] text-primary italic">Current Focus: Multi-objective Pareto Frontier Analysis</span></div>}
      </div>
    </div>
  );
}

interface NavBtnProps {
  icon: string;
  label: string;
  active?: boolean;
}

function NavBtn({ icon, label, active }: NavBtnProps) {
  return (
    <a className={cn("flex flex-1 flex-col items-center justify-end gap-1 rounded-full", active ? "text-slate-100" : "text-slate-400")} href="#">
      <div className="flex h-8 items-center justify-center"><span className={cn("material-symbols-outlined", active && "text-primary")} style={{ fontVariationSettings: active ? "'FILL' 1" : "" }}>{icon}</span></div>
      <p className="text-[10px] font-bold leading-normal tracking-[0.015em] uppercase">{label}</p>
    </a>
  );
}
