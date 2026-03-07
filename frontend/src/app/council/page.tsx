
"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";

export default function CouncilPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-slate-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden flex flex-col md:flex-row h-full relative">
          {/* Left Panel: Intent Builder */}
          <section className="flex-1 flex flex-col min-w-[320px] max-w-full md:max-w-[55%] border-r border-border-subtle overflow-y-auto bg-background-dark/95">
            <div className="p-6 pb-2 border-b border-border-subtle flex justify-between items-center sticky top-0 bg-background-dark/95 backdrop-blur z-10">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight glow-text">Intent Builder</h1>
                <p className="text-text-muted text-sm">Define strategic directives for Q3 2024</p>
              </div>
              <button className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-3 py-1.5 rounded-lg text-sm font-medium transition-all">
                <span className="material-symbols-outlined text-lg">history</span>
                Load Preset
              </button>
            </div>
            <div className="p-6 space-y-8">
              {/* Strategic Objectives */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Active Directives</h3>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">6 Active</span>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <DirectiveTag label="+ Increase Revenue" icon="trending_up" active />
                  <DirectiveTag label="- Reduce Churn" icon="trending_down" />
                  <DirectiveTag label="+ Market Share" icon="pie_chart" />
                  <DirectiveTag label="Target: Gen Z" icon="ads_click" />
                  <DirectiveTag label="Constraint: Ethics Lvl 4" icon="lock" danger />
                  <button className="flex h-9 items-center justify-center gap-1 rounded-lg border border-dashed border-text-muted/50 text-text-muted hover:text-white hover:border-white px-3 transition-all">
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span className="text-sm font-medium">Add Directive</span>
                  </button>
                </div>
              </div>
              {/* Sliders */}
              <div className="bg-background-card/50 rounded-xl p-5 border border-border-subtle space-y-6">
                <SliderControl label="Risk Tolerance vs. Growth Velocity" value="Aggressive (75%)" progress={75} />
                <SliderControl label="Automation Autonomy Level" value="Supervised (40%)" progress={40} color="accent-cyan" />
              </div>
              {/* Metrics Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetricInput label="Primary KPI Target" value="$4.2M MRR" icon="monetization_on" />
                <MetricInput label="Max Resource Allocation" value="850 Compute Units" icon="memory" />
              </div>
              <div className="pt-4">
                <button className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-400 hover:to-primary text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]">
                  <span className="material-symbols-outlined">rocket_launch</span>
                  Simulate & Propose to Council
                </button>
              </div>
            </div>
          </section>

          {/* Right Panel: Council Chat */}
          <section className="flex-1 flex flex-col bg-[#0d141c] relative">
            <div className="p-4 border-b border-border-subtle flex justify-between items-center bg-background-card">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary animate-pulse">hub</span>
                <h2 className="text-lg font-bold text-white">Council Session: #ASI-994</h2>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="size-8 rounded-full border-2 border-background-card bg-gray-700 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
              <AIChatMessage sender="Director of Strategy (AI)" time="10:42 AM" text='Analyzing the "Aggressive Growth" intent. While increasing revenue is feasible, shifting focus entirely to Gen Z introduces a High Churn Risk among our existing Enterprise Boomer segment.' />
              <HumanChatMessage sender="Alex Mercer (CEO)" time="10:44 AM" text="The board is pushing for market share. Can we mitigate the churn if we maintain legacy support channels but rebrand the frontend?" />
              <AIChatMessage sender="Director of Ops (AI)" time="10:45 AM" text="Affirmative. Running simulation #SIM-882. By bifurcating the interface layers, we can retain 92% of the legacy user base while still capturing the Gen Z demographic." color="emerald" />
            </div>
            {/* Input Area */}
            <div className="p-4 bg-background-dark/95 border-t border-border-subtle">
              <div className="relative">
                <input className="w-full bg-background-card border border-border-subtle rounded-xl py-3 pl-4 pr-12 text-white focus:outline-none focus:border-primary placeholder:text-text-muted" placeholder="Reply to council..." type="text"/>
                <button className="absolute right-2 top-2 p-1 text-primary hover:text-white transition-colors">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Bottom Panel: Simulated Outcomes */}
        <footer className="h-64 flex-none border-t border-border-subtle bg-background-dark overflow-hidden flex flex-col">
          <div className="px-6 py-2 border-b border-border-subtle flex justify-between items-center bg-background-card">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-accent-cyan text-sm">model_training</span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Simulated Outcomes (Current Context)</h3>
            </div>
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <div className="flex items-center gap-1"><span className="size-2 rounded-full bg-primary"></span> Profit</div>
              <div className="flex items-center gap-1"><span className="size-2 rounded-full bg-accent-cyan"></span> Cost</div>
              <div className="flex items-center gap-1"><span className="size-2 rounded-full bg-slate-500"></span> NPS</div>
            </div>
          </div>
          <div className="flex-1 flex overflow-x-auto">
            <div className="w-1/4 min-w-[250px] border-r border-border-subtle p-5 grid grid-cols-2 gap-4">
              <OutcomeCard label="Net Profit Delta" value="+18.4%" trend="+2.1%" color="primary" />
              <OutcomeCard label="Ops Cost" value="+5.2%" trend="+0.8%" color="cyan" danger />
              <OutcomeCard label="NPS Score" value="72" trend="0.0" />
              <OutcomeCard label="Risk Factor" value="High" trend="Lvl 4" danger />
            </div>
            <div className="flex-1 min-w-[400px] border-r border-border-subtle p-5">
               <p className="text-xs text-text-muted mb-3">Projected Trajectory (Q3-Q4)</p>
               <div className="h-32 flex items-end justify-around gap-2">
                 {[40, 55, 65, 80, 85].map((h, i) => (
                   <div key={i} className="flex flex-col items-center gap-1 h-full justify-end w-1/6 group">
                     <div className="w-full bg-background-card rounded-t-sm relative overflow-hidden" style={{ height: `${h}%` }}>
                       <div className="absolute bottom-0 w-full bg-primary/80 h-[80%]"></div>
                       <div className="absolute bottom-0 w-full bg-accent-cyan/60 h-[40%] mix-blend-screen"></div>
                     </div>
                     <span className="text-[10px] text-text-muted">{['Jul', 'Aug', 'Sep', 'Oct', 'Nov'][i]}</span>
                   </div>
                 ))}
               </div>
            </div>
            <div className="w-1/4 min-w-[280px] p-5 overflow-y-auto space-y-3">
              <p className="text-xs text-text-muted mb-3 uppercase tracking-wider font-bold">Detected Conflicts</p>
              <ConflictAlert icon="warning" title="Resource Contention" text="Ops AI and Marketing AI are competing for GPU Cluster 4." danger />
              <ConflictAlert icon="policy" title="Policy Variance" text="Proposed Gen Z targeting strategies border on Ethics Lvl 4 violation." warning />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function DirectiveTag({ label, icon, active, danger }: any) {
  return (
    <div className={cn(
      "group flex h-9 items-center gap-2 rounded-lg bg-background-card border pl-3 pr-2 cursor-pointer transition-colors",
      active ? "border-primary text-white shadow-[0_0_15px_rgba(37,140,244,0.15)]" : "border-border-subtle text-text-muted hover:text-white",
      danger && "border-accent-danger/50 text-accent-danger"
    )}>
      <span className={cn("material-symbols-outlined text-sm", active ? "text-primary" : "")}>{icon}</span>
      <span className="text-sm font-medium">{label}</span>
      <button className="text-text-muted hover:text-white"><span className="material-symbols-outlined text-sm">close</span></button>
    </div>
  );
}

function SliderControl({ label, value, progress, color = "primary" }: any) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-white text-sm font-medium">{label}</label>
        <span className={cn("text-sm font-bold", color === "accent-cyan" ? "text-accent-cyan" : "text-primary")}>{value}</span>
      </div>
      <div className="relative h-2 bg-border-subtle rounded-full">
        <div className={cn("absolute top-0 left-0 h-full rounded-full", color === "accent-cyan" ? "bg-gradient-to-r from-accent-cyan/40 to-accent-cyan" : "bg-gradient-to-r from-primary/40 to-primary")} style={{ width: `${progress}%` }}></div>
        <div className={cn("absolute top-1/2 -translate-y-1/2 size-4 bg-white border-2 rounded-full shadow-lg cursor-pointer", color === "accent-cyan" ? "border-accent-cyan" : "border-primary")} style={{ left: `${progress}%` }}></div>
      </div>
    </div>
  );
}

function MetricInput({ label, value, icon }: any) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-text-muted text-sm font-medium">{label}</span>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-3 text-text-muted">{icon}</span>
        <input className="w-full bg-background-card border border-border-subtle rounded-lg py-2.5 pl-10 pr-3 text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-text-muted/50" type="text" defaultValue={value}/>
      </div>
    </label>
  );
}

function AIChatMessage({ sender, time, text, color }: any) {
  const isEmerald = color === "emerald";
  return (
    <div className="flex gap-4 max-w-[90%]">
      <div className={cn("size-10 rounded-full border flex items-center justify-center shrink-0", isEmerald ? "bg-emerald-900/80 border-emerald-500/30" : "bg-indigo-900/80 border-indigo-500/30")}>
        <span className={cn("material-symbols-outlined text-xl", isEmerald ? "text-emerald-300" : "text-indigo-300")}>{isEmerald ? 'account_balance' : 'psychology'}</span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className={cn("font-mono text-sm font-bold", isEmerald ? "text-emerald-300" : "text-indigo-300")}>{sender}</span>
          <span className="text-text-muted text-xs">{time}</span>
        </div>
        <div className={cn("border rounded-2xl rounded-tl-none p-4 text-slate-200 text-sm leading-relaxed", isEmerald ? "bg-emerald-950/30 border-emerald-500/20" : "bg-indigo-950/30 border-indigo-500/20")}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

function HumanChatMessage({ sender, time, text }: any) {
  return (
    <div className="flex gap-4 max-w-[90%] self-end flex-row-reverse">
      <div className="size-10 rounded-full bg-gray-700 border border-gray-500 flex items-center justify-center shrink-0 overflow-hidden">
        <img src="https://i.pravatar.cc/150?u=ceo" alt="CEO" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-1 items-end">
        <div className="flex items-center gap-2">
          <span className="text-text-muted text-xs">{time}</span>
          <span className="text-white font-bold text-sm">{sender}</span>
        </div>
        <div className="bg-background-card border border-border-subtle rounded-2xl rounded-tr-none p-4 text-slate-200 text-sm leading-relaxed shadow-sm">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

function OutcomeCard({ label, value, trend, danger, color }: any) {
  return (
    <div className="bg-background-card p-3 rounded-lg border border-border-subtle relative overflow-hidden group">
      <p className="text-text-muted text-xs font-medium">{label}</p>
      <div className="flex items-end gap-2 mt-1">
        <span className={cn("text-xl font-bold", danger && color === "cyan" ? "text-white" : danger ? "text-accent-danger" : "text-white")}>{value}</span>
        <span className={cn("text-xs mb-1 flex items-center", danger ? "text-accent-danger" : "text-accent-success")}>
          <span className="material-symbols-outlined text-[12px]">{trend.includes('Lvl') ? 'warning' : 'arrow_upward'}</span> {trend}
        </span>
      </div>
    </div>
  );
}

function ConflictAlert({ icon, title, text, danger, warning }: any) {
  return (
    <div className={cn("flex gap-3 items-start p-3 rounded-lg border",
      danger ? "bg-accent-danger/5 border-accent-danger/20" :
      warning ? "bg-amber-500/5 border-amber-500/20" : "bg-primary/5 border-primary/20")}>
      <span className={cn("material-symbols-outlined text-lg mt-0.5",
        danger ? "text-accent-danger" : warning ? "text-amber-500" : "text-primary")}>{icon}</span>
      <div>
        <p className={cn("text-xs font-bold", danger ? "text-red-200" : warning ? "text-amber-200" : "text-blue-200")}>{title}</p>
        <p className={cn("text-[11px] mt-1 leading-tight", danger ? "text-red-200/70" : warning ? "text-amber-200/70" : "text-blue-200/70")}>{text}</p>
      </div>
    </div>
  );
}
