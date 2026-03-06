"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { accountingAgents } from "@/lib/mock/accounting";
import { AgentLevel, AgentRegistryEntry } from "@/lib/types/agents";

export default function AgentCatalogPage() {
  const [filterLevel, setFilterLevel] = useState<AgentLevel | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = accountingAgents.filter(agent => {
    const matchesLevel = filterLevel === 'All' || agent.level === filterLevel;
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-[#101122] text-[#f8fafc] font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-8">
            <header className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">AI Agent Catalog</h1>
              <p className="text-[#94a3b8]">Select and invite specialized AI agents to your departmental workspace.</p>
            </header>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="relative w-full md:max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]">search</span>
                <input
                  type="text"
                  placeholder="Search agents by name, role, or expertise..."
                  className="w-full bg-[#1e293b] border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#232ef2] transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mr-2">Filter Level:</span>
                {['All', 'Staff', 'Expert', 'CFO'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setFilterLevel(level as AgentLevel | 'All')}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-bold transition-all border",
                      filterLevel === level
                        ? "bg-[#232ef2] text-white border-[#232ef2] shadow-lg shadow-blue-500/20"
                        : "bg-white/5 text-[#94a3b8] border-white/10 hover:border-white/20"
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>

            {filteredAgents.length === 0 && (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <span className="material-symbols-outlined text-6xl text-white/10 mb-4">robot_2</span>
                <p className="text-[#94a3b8] font-medium">No agents found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Selected Participants Footer (Floating) */}
        <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 p-4 sticky bottom-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-tighter">Selected Participants</span>
                <span className="text-sm font-bold">3 Agents Ready</span>
              </div>
              <div className="flex -space-x-3">
                {accountingAgents.map((a, i) => (
                  <div key={i} className="size-10 rounded-full border-2 border-[#101122] bg-slate-700 bg-cover bg-center ring-1 ring-white/10" style={{ backgroundImage: `url(${a.avatar_url})` }}></div>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
               <button className="px-6 py-2 rounded-xl text-sm font-bold text-[#94a3b8] hover:bg-white/5 transition-colors">Clear All</button>
               <button className="px-8 py-2 bg-[#232ef2] hover:bg-blue-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
                 Confirm & Create Room
                 <span className="material-symbols-outlined text-sm">arrow_forward</span>
               </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function AgentCard({ agent }: { agent: AgentRegistryEntry }) {
  const levelColor =
    agent.level === 'CFO' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
    agent.level === 'Expert' ? "bg-[#232ef2]/10 text-[#258cf4] border-[#232ef2]/20" :
    "bg-slate-500/10 text-[#94a3b8] border-white/10";

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:border-[#232ef2]/50 transition-all group relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className="size-16 rounded-2xl bg-slate-800 bg-cover bg-center border border-white/10" style={{ backgroundImage: `url(${agent.avatar_url})` }}></div>
        <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase border tracking-widest", levelColor)}>
          {agent.level}
        </span>
      </div>

      <div className="space-y-1 mb-4">
        <h3 className="text-xl font-bold group-hover:text-[#258cf4] transition-colors">{agent.name}</h3>
        <p className="text-sm text-[#94a3b8] leading-snug">{agent.role}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {agent.tags?.map((tag: string) => (
          <span key={tag} className="text-[10px] bg-white/5 px-2.5 py-1 rounded-md text-[#94a3b8] font-bold uppercase tracking-tighter border border-white/5">
            {tag}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 mb-6">
        <div>
          <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Experience</p>
          <p className="font-bold">{agent.experience}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Accuracy</p>
          <p className="font-bold text-emerald-400">{agent.accuracy}%</p>
        </div>
      </div>

      <button className="w-full py-3 bg-[#232ef2] hover:bg-blue-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-[0.98]">
        <span className="material-symbols-outlined text-[20px]">person_add</span>
        Invite to Room
      </button>
    </div>
  );
}
