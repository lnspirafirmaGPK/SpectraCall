"use client";

import { use } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { accountingAgents } from "@/lib/mock/accounting";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

export default function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const agent = accountingAgents.find(a => a.id === id);

  if (!agent) return notFound();

  return (
    <div className="flex h-screen overflow-hidden bg-[#101122] text-[#f8fafc] font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Profile Header */}
            <section className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <span className="material-symbols-outlined text-[120px]">account_tree</span>
              </div>
              <div className="relative">
                <div className="size-40 rounded-3xl bg-slate-800 bg-cover bg-center border-4 border-[#101122] shadow-2xl" style={{ backgroundImage: `url(${agent.avatar_url})` }}></div>
                <div className="absolute -bottom-2 -right-2 size-6 bg-emerald-500 rounded-full border-4 border-[#101122]" title="Online"></div>
              </div>

              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="space-y-1">
                  <h1 className="text-4xl font-black tracking-tight">{agent.name}</h1>
                  <p className="text-[#258cf4] text-xl font-bold uppercase tracking-tight">{agent.role}</p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                   <span className="px-3 py-1 bg-[#232ef2]/10 text-[#258cf4] text-[10px] font-black rounded-full border border-[#232ef2]/20 uppercase tracking-widest">Level: {agent.level}</span>
                   <span className="px-3 py-1 bg-white/5 text-[#94a3b8] text-[10px] font-black rounded-full border border-white/10 uppercase tracking-widest">Department: {agent.department}</span>
                </div>
                <p className="text-[#94a3b8] leading-relaxed max-w-2xl pt-2">
                  Enterprise-grade AI agent specializing in rigorous financial oversight and audit-ready reporting.
                  Engineered for context-aware analysis of TFRS/IFRS compliance and complex corporate structures.
                </p>
                <div className="flex gap-4 pt-4">
                  <button className="px-6 py-2.5 bg-[#232ef2] hover:bg-blue-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">Invite to Meeting</button>
                  <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10">View Audit Logs</button>
                </div>
              </div>
            </section>

            {/* Performance Metrics */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               <MetricItem title="Meetings Joined" value="156" trend="+12%" trendUp icon="groups" />
               <MetricItem title="Decisions Made" value="1,240" trend="+54%" trendUp icon="task_alt" />
               <MetricItem title="Accuracy Rate" value={`${agent.accuracy}%`} trend="Optimal" trendUp icon="verified" />
               <MetricItem title="Escalation Rate" value="3.6%" trend="-1.1%" trendUp={false} icon="priority_high" />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Core Expertise */}
               <div className="lg:col-span-1 space-y-8">
                  <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                     <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                        <span className="material-symbols-outlined text-[#258cf4]">psychology</span>
                        Core Expertise
                     </h3>
                     <div className="space-y-4">
                        {agent.capabilities.map((cap, i) => (
                           <div key={i} className="p-3 bg-white/5 rounded-xl border-l-4 border-[#232ef2]">
                              <p className="text-sm font-bold">{cap.name}</p>
                              <p className="text-[10px] text-[#94a3b8] mt-1">{cap.description}</p>
                           </div>
                        ))}
                     </div>
                  </section>
               </div>

               {/* History */}
               <div className="lg:col-span-2">
                  <section className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                     <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                           <span className="material-symbols-outlined text-[#258cf4]">history</span>
                           Recent Activity History
                        </h3>
                        <button className="text-[10px] font-bold text-[#258cf4] uppercase hover:underline">View All</button>
                     </div>
                     <div className="divide-y divide-white/5">
                        <HistoryRow date="Oct 24, 2025" name="Q3 Budget Reconciliation" outcome="Approved" />
                        <HistoryRow date="Oct 22, 2025" name="Tax Strategy Workshop" outcome="Strategy Gen" />
                        <HistoryRow date="Oct 18, 2025" name="Compliance Sync" outcome="Verified" />
                     </div>
                     <div className="p-4 bg-white/5 text-center">
                        <p className="text-[9px] text-[#94a3b8] uppercase font-bold tracking-widest">Audit-Ready Transparency: Every decision is recorded on-chain</p>
                     </div>
                  </section>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricItem({ title, value, trend, icon, trendUp }: { title: string; value: string; trend: string; icon: string; trendUp: boolean }) {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl group hover:border-[#232ef2]/50 transition-all">
       <div className="flex justify-between items-start mb-2">
          <p className="text-[#94a3b8] text-[10px] font-bold uppercase tracking-widest">{title}</p>
          <span className="material-symbols-outlined text-[#94a3b8] text-lg group-hover:text-[#258cf4] transition-colors">{icon}</span>
       </div>
       <p className="text-3xl font-black">{value}</p>
       <p className={cn("text-[10px] font-bold mt-1", trendUp ? "text-emerald-400" : "text-rose-400")}>{trend} from baseline</p>
    </div>
  );
}

function HistoryRow({ date, name, outcome }: { date: string; name: string; outcome: string }) {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
       <div className="space-y-1">
          <p className="text-xs text-[#94a3b8]">{date}</p>
          <p className="text-sm font-bold">{name}</p>
       </div>
       <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase rounded border border-emerald-500/20">{outcome}</span>
    </div>
  );
}
