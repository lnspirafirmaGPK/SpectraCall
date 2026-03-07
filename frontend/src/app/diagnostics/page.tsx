
"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";

export default function DiagnosticsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-text-main font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
          {/* Left Sidebar: Decision Trace Timeline */}
          <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col overflow-y-auto shrink-0 z-20">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-background-card/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary ring-1 ring-primary/20">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <div>
                  <h1 className="text-base font-bold leading-tight">Decision Trace</h1>
                  <p className="text-xs text-slate-500 dark:text-text-muted font-mono mt-1">ID: #9X2-B14-MCTS</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary border border-secondary/20">Authorized</span>
                <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">v4.2.0 Model</span>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <TraceStep icon="description" title="Context" desc="Input parameters loaded" />
              <TraceStep icon="alt_route" title="Options" desc="14 candidates generated" />
              <TraceStep icon="account_tree" title="Scoring / PRM" desc="MCTS Simulation Active" active />
              <TraceStep icon="play_circle" title="Action" desc="Execution pending" />
              <TraceStep icon="gavel" title="Contracts" desc="Validation required" />
              <TraceStep icon="check_circle" title="Outcome" desc="Future state" last />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-slate-50 dark:bg-background-dark overflow-hidden relative">
            {/* Header for MCTS Visualization */}
            <div className="px-8 py-6 flex justify-between items-end border-b border-slate-200 dark:border-border-subtle bg-white dark:bg-background-card/50 backdrop-blur-sm z-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  Monte Carlo Tree Search Visualization
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20">Live View</span>
                </h2>
                <p className="text-slate-500 dark:text-text-muted mt-1 max-w-2xl">Visualizing probabilistic reward models across 12 depth layers. Nodes indicate decision forks; color indicates value function estimate.</p>
              </div>
              <div className="flex items-center gap-4">
                <LegendItem color="bg-secondary shadow-[0_0_8px_rgba(11,218,91,0.6)]" label="High Confidence" />
                <LegendItem color="bg-accent shadow-[0_0_8px_rgba(255,77,77,0.6)]" label="Pruned/Risk" />
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-background-card hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors ml-4 border border-border-subtle">
                  <span className="material-symbols-outlined text-lg">tune</span>
                  Configure
                </button>
              </div>
            </div>

            {/* Visualization Canvas */}
            <div className="flex-1 relative overflow-hidden bg-background-dark flex items-center justify-center p-8">
              <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#258cf4 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
              <svg className="w-full h-full max-w-5xl z-10" preserveAspectRatio="xMidYMid meet" viewBox="0 0 800 500">
                <g className="stroke-slate-700" fill="none" strokeWidth="2">
                  <path className="stroke-secondary opacity-50" d="M400,50 C400,100 250,100 250,150" strokeWidth="3"></path>
                  <path className="stroke-slate-700 opacity-30" d="M400,50 C400,100 550,100 550,150"></path>
                  <path className="stroke-slate-700 opacity-30" d="M400,50 C400,100 400,100 400,150"></path>
                  <path className="stroke-slate-700 opacity-30" d="M250,150 C250,200 150,200 150,250"></path>
                  <path className="stroke-secondary opacity-80" d="M250,150 C250,200 300,200 300,250" strokeWidth="3"></path>
                  <path className="stroke-accent opacity-30" d="M550,150 C550,200 500,200 500,250"></path>
                  <path className="stroke-slate-700 opacity-30" d="M550,150 C550,200 650,200 650,250"></path>
                  <path className="stroke-secondary opacity-100" d="M300,250 C300,300 280,300 280,350" strokeWidth="4"></path>
                  <path className="stroke-slate-700 opacity-30" d="M300,250 C300,300 350,300 350,350"></path>
                </g>
                <circle cx="400" cy="50" r="12" stroke="#258cf4" strokeWidth="3" fill="#101922" className="drop-shadow-[0_0_15px_rgba(37,140,244,0.5)]"></circle>
                <text x="400" y="30" textAnchor="middle" fontSize="12" fill="#94a3b8" className="font-sans">Root</text>
                <circle cx="250" cy="150" r="10" fill="#0bda5b" className="drop-shadow-[0_0_15px_rgba(11,218,91,0.8)]"></circle>
                <text x="220" y="155" textAnchor="end" fontSize="10" fill="#0bda5b" className="font-sans">98%</text>
                <circle cx="400" cy="150" r="8" fill="#1b2733" stroke="#475569" strokeWidth="2"></circle>
                <circle cx="550" cy="150" r="8" fill="#1b2733" stroke="#475569" strokeWidth="2"></circle>
                <circle cx="150" cy="250" r="6" fill="#1b2733" stroke="#475569" strokeWidth="2"></circle>
                <circle cx="300" cy="250" r="10" fill="#0bda5b" className="drop-shadow-[0_0_15px_rgba(11,218,91,0.8)] animate-pulse"></circle>
                <text x="325" y="255" textAnchor="start" fontSize="10" fill="#0bda5b" className="font-sans">99.2%</text>
                <circle cx="500" cy="250" r="8" fill="#fa6238" className="drop-shadow-[0_0_15px_rgba(255,77,77,0.5)]"></circle>
                <circle cx="650" cy="250" r="6" fill="#1b2733" stroke="#475569" strokeWidth="2"></circle>
                <circle cx="280" cy="350" r="8" fill="#101922" stroke="#0bda5b" strokeWidth="3" className="drop-shadow-[0_0_10px_rgba(11,218,91,0.6)]"></circle>
                <text x="280" y="375" textAnchor="middle" fontSize="12" fill="#e2e8f0" className="font-sans">Selected Action</text>
                <circle cx="350" cy="350" r="5" fill="#1b2733" stroke="#475569" strokeWidth="2"></circle>
                <g transform="translate(680, 80)">
                  <rect x="0" y="0" width="100" height="60" rx="8" fill="#1b2733" stroke="#334155" strokeWidth="1" opacity="0.8"></rect>
                  <text x="10" y="20" fontSize="10" fill="#94a3b8" className="font-sans">Exploration</text>
                  <text x="10" y="45" fontSize="18" fontWeight="bold" fill="#258cf4" className="font-sans">1.42e-3</text>
                </g>
              </svg>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <ControlBtn icon="add" />
                <ControlBtn icon="remove" />
                <ControlBtn icon="center_focus_strong" />
              </div>
            </div>

            {/* Bottom Panel: Reasoning Logic */}
            <div className="h-64 border-t border-slate-200 dark:border-border-subtle bg-white dark:bg-background-card p-6 overflow-y-auto shrink-0 z-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Selected Path Logic</h3>
                <div className="flex gap-2">
                  <Badge text="Token Usage: 14.2K" />
                  <Badge text="Latency: 240ms" />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 dark:text-text-muted uppercase bg-slate-50 dark:bg-background-dark/50">
                      <tr>
                        <th className="px-4 py-3 rounded-l-lg" scope="col">Node ID</th>
                        <th className="px-4 py-3" scope="col">Hypothesis</th>
                        <th className="px-4 py-3" scope="col">Win Rate</th>
                        <th className="px-4 py-3 rounded-r-lg" scope="col">Reasoning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <TableRow id="N-250-L1" hypo="Optimized Allocation" rate="98.4%" reason="Minimizes resource contention while maintaining SLA." positive />
                      <TableRow id="N-300-L2" hypo="Pre-emptive Scaling" rate="99.2%" reason="Historical data suggests 40% spike in next 10m." positive />
                      <TableRow id="N-500-L2" hypo="Throttle Request" rate="12.1%" reason="Violates core governance principle #4. Pruned." negative opacity="50" />
                    </tbody>
                  </table>
                </div>
                <div className="col-span-1 bg-slate-50 dark:bg-background-dark rounded-xl p-4 border border-slate-200 dark:border-border-subtle">
                  <h4 className="text-xs font-bold uppercase text-slate-500 dark:text-text-muted mb-3">Model Confidence Heatmap</h4>
                  <div className="flex flex-col gap-3">
                    <HeatmapRow label="Safety Check" value="Passed" color="secondary" progress={100} />
                    <HeatmapRow label="Utility Score" value="9.2/10" color="primary" progress={92} />
                    <HeatmapRow label="Cost Efficiency" value="Medium" color="accent" progress={65} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function TraceStep({ icon, title, desc, active, last }: any) {
  return (
    <button className={cn("group flex items-center gap-4 px-4 py-3 rounded-lg transition-all", active ? "bg-primary/10 dark:bg-primary/20 border border-primary/20 shadow-sm relative overflow-hidden" : "hover:bg-slate-50 dark:hover:bg-background-card opacity-60 hover:opacity-100")}>
      {active && <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50"></div>}
      <div className="flex flex-col items-center gap-1 relative z-10">
        <div className={cn("w-0.5 h-2", active ? "bg-primary" : "bg-slate-300 dark:bg-slate-700")}></div>
        <div className={cn("size-8 rounded-full flex items-center justify-center transition-colors",
          active ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-400 group-hover:text-primary")}>
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </div>
        <div className={cn("w-0.5 h-2", last ? "opacity-0" : active ? "bg-primary" : "bg-slate-300 dark:bg-slate-700")}></div>
      </div>
      <div className="text-left relative z-10">
        <p className={cn("text-sm font-medium transition-colors", active ? "font-bold text-primary dark:text-white" : "text-slate-900 dark:text-text-main")}>{title}</p>
        <p className={cn("text-xs", active ? "text-primary/80 dark:text-blue-200" : "text-slate-500 dark:text-text-muted")}>{desc}</p>
      </div>
    </button>
  );
}

function LegendItem({ color, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("w-3 h-3 rounded-full", color)}></span>
      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</span>
    </div>
  );
}

function ControlBtn({ icon }: any) {
  return (
    <button className="p-2 rounded-lg bg-background-card border border-border-subtle text-slate-400 hover:text-white hover:border-primary transition-colors">
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}

function Badge({ text }: any) {
  return <span className="px-2 py-1 rounded bg-slate-100 dark:bg-background-dark text-xs text-slate-500 dark:text-text-muted border border-border-subtle font-mono">{text}</span>;
}

function TableRow({ id, hypo, rate, reason, positive, negative, opacity }: any) {
  const rateColor = positive ? "text-secondary" : negative ? "text-accent" : "text-primary";
  return (
    <tr className={cn("bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 transition-colors", opacity === "50" && "opacity-50")}>
      <td className="px-4 py-3 font-mono text-slate-400 text-xs">{id}</td>
      <td className="px-4 py-3 font-medium text-slate-900 dark:text-text-main">{hypo}</td>
      <td className={cn("px-4 py-3 font-bold", rateColor)}>{rate}</td>
      <td className="px-4 py-3 text-slate-500 dark:text-text-muted">{reason}</td>
    </tr>
  );
}

function HeatmapRow({ label, value, color, progress }: any) {
  const barColor = color === "secondary" ? "bg-secondary" : color === "primary" ? "bg-primary" : "bg-accent";
  const textColor = color === "secondary" ? "text-secondary" : color === "primary" ? "text-primary" : "text-accent";
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-700 dark:text-slate-300">{label}</span>
        <span className={cn("font-bold", textColor)}>{value}</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
        <div className={cn("h-1.5 rounded-full", barColor)} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
