"use client";

import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { accountingAgents, mockDecisions } from "@/lib/mock/accounting";
import { DecisionArtifact } from "@/lib/types/accounting";
import { AgentRegistryEntry } from "@/lib/types/agents";

export default function AccountingDashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#101122] text-[#f8fafc] font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgb3BhY2l0eT0iMC4wNSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSIjZmZmIi8+PC9zdmc+')]">
        <Header />

        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          {/* Hero Section */}
          <section className="mb-10">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-3 max-w-2xl">
                <span className="text-[#258cf4] font-bold text-xs tracking-widest uppercase">Intelligent Governance</span>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">AI Accounting Department</h1>
                <p className="text-[#94a3b8] text-lg">
                  Collaborate with specialized AI agents and human teams in a secure, audit-ready environment.
                  Real-time insights, automated reporting, and total compliance.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="flex items-center gap-2 px-6 h-12 bg-[#232ef2] hover:bg-blue-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
                    <span className="material-symbols-outlined">add_circle</span>
                    Create New Meeting
                  </button>
                  <button className="flex items-center gap-2 px-6 h-12 bg-white/10 hover:bg-white/15 text-white rounded-xl font-bold transition-all border border-white/10">
                    <span className="material-symbols-outlined">login</span>
                    Join Active Session
                  </button>
                </div>
              </div>
              <div className="relative w-full md:w-1/3 aspect-video bg-slate-800 rounded-xl overflow-hidden border border-white/10 group shadow-2xl">
                 <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1554224155-1696413575b3?q=80&w=1000&auto=format&fit=crop")' }}></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-[#101122] to-transparent"></div>
                 <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-white text-xs font-bold uppercase tracking-tighter">Live Audit Room 402</span>
                    </div>
                    <span className="text-white/50 text-[10px] font-mono">04:22:11</span>
                 </div>
              </div>
            </div>
          </section>

          {/* Summary Metrics */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <MetricCard title="Total Decisions Logged" value="1,284" trend="+12%" trendUp icon="history_edu" />
            <MetricCard title="Compliance Score" value="99.8%" trend="Audit-Ready" icon="verified_user" color="emerald" />
            <MetricCard title="AI Utilization" value="84%" trend="Optimal" icon="robot_2" color="blue" />
            <MetricCard title="Avg Escalation Time" value="4.2m" trend="-1.5m" trendUp={false} icon="timer" />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            {/* Main Content (Left) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Active Meetings */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#258cf4]">groups</span>
                    Active Meetings Overview
                  </h2>
                  <button className="text-[#258cf4] text-sm font-semibold hover:underline">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MeetingRoomCard
                    title="Q3 Budget Analysis"
                    status="Analyzing Q3 Projections"
                    severity="Critical"
                    participants={4}
                    aiExperts={2}
                  />
                  <MeetingRoomCard
                    title="Tax Strategy Workshop"
                    status="Awaiting CFO Approval"
                    severity="High"
                    participants={3}
                    aiExperts={3}
                  />
                </div>
              </section>

              {/* Critical Recent Decisions */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#258cf4]">gavel</span>
                    Governance & Insights
                  </h2>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-[#94a3b8]">Critical Recent Decisions</h4>
                    <span className="text-[10px] font-bold text-[#258cf4] uppercase">Live Audit Stream</span>
                  </div>
                  <div className="divide-y divide-white/5">
                    {mockDecisions.map(decision => (
                      <DecisionLine key={decision.id} decision={decision} />
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar Content (Right) */}
            <aside className="lg:col-span-4 space-y-8">
              {/* AI Expert Spotlight */}
              <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#258cf4]">robot_2</span>
                    AI Expert Spotlight
                  </h3>
                </div>
                <div className="space-y-4">
                  {accountingAgents.filter(a => a.level === 'Expert' || a.level === 'CFO').map(agent => (
                    <ExpertSpotlightCard key={agent.id} agent={agent} />
                  ))}
                </div>
                <button className="w-full mt-6 py-2 text-sm font-semibold text-[#94a3b8] hover:text-[#258cf4] transition-colors">Open AI Catalog</button>
              </section>

              {/* User Context */}
              <section className="bg-[#232ef2]/5 border border-[#232ef2]/20 rounded-2xl p-6">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="size-14 rounded-full border-2 border-[#232ef2] bg-slate-800 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAIhW5CbPj1JkFjA1cLyrHU4dDNhbYky_1r4x3eUvWRbjKgzoolt288LneACHShDQ8Q2MxF3YwFAahOalX-8RcfGYnXmvLuOQS1sCk-QY8x-wsftyWAsni-VmlnaiMFuyUov9piyP4YiibB0q1vYNImnPNBIEDaG6Y7M1eRg8AXwbb3JKWaYosh0og9kJIqXfgepWbjnnb16RocR4YCKKlP3bAv46VFRDyuSY55n-h9m4ryVrI4QpbTuh2CdaEUUr6V36GmYJ7k-_E8")' }}></div>
                    <div>
                        <h4 className="font-bold">Alex Rivera</h4>
                        <p className="text-xs text-[#258cf4] font-medium">Head of Operations</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-[#94a3b8]">Assigned Rooms</span>
                        <span className="font-bold">12</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-[#94a3b8]">Total Hours Co-Piloted</span>
                        <span className="font-bold">142h</span>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                        <p className="text-[10px] uppercase font-bold text-[#258cf4] mb-3">Current Hierarchy</p>
                        <div className="flex items-center gap-2">
                             <span className="px-2 py-0.5 bg-[#232ef2] text-white text-[9px] font-bold rounded uppercase">Staff</span>
                             <span className="material-symbols-outlined text-xs text-[#94a3b8]">arrow_forward</span>
                             <span className="px-2 py-0.5 bg-white/5 text-[#94a3b8] text-[9px] font-bold rounded uppercase">Expert</span>
                             <span className="material-symbols-outlined text-xs text-[#94a3b8]">arrow_forward</span>
                             <span className="px-2 py-0.5 bg-white/5 text-[#94a3b8] text-[9px] font-bold rounded uppercase">CFO</span>
                        </div>
                    </div>
                 </div>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, trend, icon, color = "blue", trendUp = true }: { title: string; value: string; trend: string; icon: string; color?: string; trendUp?: boolean }) {
  const iconColor = color === "emerald" ? "text-emerald-400" : "text-[#258cf4]";
  const trendColor = color === "emerald" ? "text-emerald-400" : trendUp ? "text-emerald-400" : "text-rose-400";

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <span className={cn("material-symbols-outlined text-2xl opacity-50 group-hover:opacity-100 transition-opacity", iconColor)}>{icon}</span>
        <span className={cn("text-[10px] font-bold uppercase tracking-wider", trendColor)}>{trend}</span>
      </div>
      <p className="text-3xl font-black">{value}</p>
      <p className="text-[#94a3b8] text-xs font-medium uppercase tracking-widest mt-1">{title}</p>
    </div>
  );
}

function MeetingRoomCard({ title, status, severity, participants, aiExperts }: { title: string; status: string; severity: string; participants: number; aiExperts: number }) {
  const severityColor = severity === "Critical" ? "bg-rose-500/10 text-rose-500 border-rose-500/20" : "bg-orange-500/10 text-orange-500 border-orange-500/20";

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#258cf4]/50 transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-[#232ef2]/10 rounded-lg text-[#258cf4]">
          <span className="material-symbols-outlined">analytics</span>
        </div>
        <span className={cn("px-2 py-0.5 text-[10px] font-bold uppercase rounded border", severityColor)}>{severity}</span>
      </div>
      <h3 className="font-bold text-lg mb-1 group-hover:text-[#258cf4] transition-colors">{title}</h3>
      <p className="text-[#94a3b8] text-xs mb-6">Status: <span className="text-[#258cf4] font-medium">{status}</span></p>
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex -space-x-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="size-6 rounded-full border-2 border-[#101122] bg-slate-700 bg-cover bg-center" style={{ backgroundImage: `url(https://i.pravatar.cc/100?u=${i})` }}></div>
          ))}
          <div className="size-6 rounded-full border-2 border-[#101122] bg-[#232ef2] flex items-center justify-center text-[10px] font-bold">AI</div>
        </div>
        <span className="text-[#94a3b8] text-[10px] font-medium uppercase tracking-tighter">{participants} Humans, {aiExperts} AI Experts</span>
      </div>
    </div>
  );
}

function DecisionLine({ decision }: { decision: DecisionArtifact }) {
  return (
    <div className="flex items-center justify-between group p-4 hover:bg-white/5 transition-colors">
      <div className="flex items-start gap-4">
        <span className={cn(
          "px-2 py-0.5 rounded text-[9px] font-black uppercase border mt-1",
          decision.status === 'Approved' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-[#232ef2]/10 text-[#258cf4] border-[#232ef2]/20"
        )}>
          {decision.status}
        </span>
        <div>
          <p className="text-sm font-bold text-white group-hover:text-[#258cf4] transition-colors">{decision.title}</p>
          <p className="text-[10px] text-[#94a3b8] mt-0.5">
            Authorized by {decision.approver_id} • {new Date(decision.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
      <button className="text-[10px] font-bold text-[#258cf4] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 uppercase tracking-tighter">
        View Lineage
        <span className="material-symbols-outlined text-xs">open_in_new</span>
      </button>
    </div>
  );
}

function ExpertSpotlightCard({ agent }: { agent: AgentRegistryEntry }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-[#258cf4]/30 transition-all cursor-pointer group">
      <div className="size-12 rounded-lg bg-[#232ef2]/10 flex items-center justify-center text-[#258cf4] font-black shrink-0 group-hover:scale-110 transition-transform">
        {agent.level === 'CFO' ? 'CFO' : 'EXP'}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold truncate">{agent.name}</h4>
        <p className="text-[10px] text-[#94a3b8] uppercase tracking-widest">{agent.role}</p>
        <div className="flex items-center justify-between mt-2">
           <span className="text-[10px] font-bold text-emerald-400">{agent.accuracy}% Acc</span>
           <span className="text-[10px] text-[#94a3b8]">{agent.experience} Exp</span>
        </div>
      </div>
    </div>
  );
}
