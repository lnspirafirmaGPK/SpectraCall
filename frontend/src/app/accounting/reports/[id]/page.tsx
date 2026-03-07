"use client";

import { use } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { mockDecisions } from "@/lib/mock/accounting";
import { cn } from "@/lib/utils";

export default function MeetingReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  // Using DEC-001 as default for now
  const decision = mockDecisions.find(d => d.id === id) || mockDecisions[0];

  return (
    <div className="flex h-screen overflow-hidden bg-[#101122] text-[#f8fafc] font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Report Header */}
            <header className="space-y-6">
               <div className="flex items-center gap-2 text-[#94a3b8] text-xs font-bold uppercase tracking-widest">
                  <span>Reports</span>
                  <span className="material-symbols-outlined text-xs">chevron_right</span>
                  <span className="text-white">Meeting Analysis</span>
               </div>
               <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                  <div className="space-y-2">
                     <h1 className="text-4xl font-black tracking-tight leading-none">Meeting Report: Q3 Budget Planning</h1>
                     <div className="flex items-center gap-4 text-[#94a3b8] text-sm">
                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">calendar_today</span> Oct 24, 2025</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">group</span> User, Finance-Expert, Marketing-Staff</span>
                     </div>
                  </div>
                  <div className="flex gap-3">
                     <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold border border-white/10">
                        <span className="material-symbols-outlined text-sm">share</span> Share
                     </button>
                     <button className="flex items-center gap-2 px-5 py-2.5 bg-[#232ef2] hover:bg-blue-600 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20">
                        <span className="material-symbols-outlined text-sm">picture_as_pdf</span> Export PDF
                     </button>
                  </div>
               </div>
            </header>

            {/* AI Summary */}
            <section className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <span className="material-symbols-outlined text-[100px] text-[#258cf4]">auto_awesome</span>
               </div>
               <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-[#258cf4]">auto_awesome</span>
                  <h2 className="text-2xl font-bold">AI-Generated Executive Summary</h2>
               </div>
               <div className="space-y-6 relative z-10">
                  <SummaryItem
                     title="Approved 10% marketing budget increase"
                     desc="Primary outcome for Q3 growth strategy alignment. Budget reallocated from operations overhead."
                     checked
                  />
                  <SummaryItem
                     title="Expert suggested 5% reduction in operations"
                     desc="Identified redundant SaaS subscriptions and travel expenses amounting to $45k."
                     checked
                  />
                  <SummaryItem
                     title="Revisit Q4 hiring plan in next executive sync"
                     desc="Decision deferred until final Q2 revenue audit is signed off by CFO."
                  />
               </div>
            </section>

            {/* Key Decisions */}
            <section>
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                     <span className="material-symbols-outlined text-[#258cf4]">gavel</span>
                     Key Decisions (Artifacts)
                  </h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockDecisions.map(d => (
                     <div key={d.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6 hover:border-[#258cf4]/30 transition-all">
                        <div className="flex justify-between items-start">
                           <span className="px-2 py-1 bg-[#232ef2]/10 text-[#258cf4] text-[10px] font-black rounded uppercase border border-[#232ef2]/20">{d.id}</span>
                           <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-black rounded-full border border-emerald-500/20 uppercase">Risk: {d.risk_level}</span>
                        </div>
                        <h3 className="text-xl font-bold">{d.title}</h3>
                        <div className="space-y-3 text-sm">
                           <div className="flex justify-between"><span className="text-[#94a3b8]">Proposer</span> <span className="font-bold">{d.proposer_id}</span></div>
                           <div className="flex justify-between"><span className="text-[#94a3b8]">Approver</span> <span className="text-[#258cf4] font-bold">{d.approver_id}</span></div>
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-white/5">
                           <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold uppercase transition-colors">View Lineage</button>
                           <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold uppercase transition-colors">Replay Context</button>
                        </div>
                     </div>
                  ))}
               </div>
            </section>

            {/* Transcript */}
            <section className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
               <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-2">
                     <span className="material-symbols-outlined text-[#258cf4]">chat</span>
                     <h2 className="text-xl font-bold">Full Transcript</h2>
                  </div>
                  <button className="text-[10px] font-bold text-[#258cf4] uppercase hover:underline">Download .TXT</button>
               </div>
               <div className="p-6 h-80 overflow-y-auto space-y-6 bg-black/20">
                  <TranscriptMessage sender="Marketing-Staff" time="10:05 AM" text="I've prepared the Q3 projections. Based on our current growth, I propose a 10% increase in the marketing budget specifically for digital outreach." />
                  <TranscriptMessage sender="Finance-Expert" time="10:06 AM" text="A 10% increase is significant. However, we can offset this by reducing our general operations overhead by 5%." isAi />
                  <TranscriptMessage sender="User (CEO)" time="10:08 AM" text="That sounds like a fair trade-off. Marketing, can you confirm the ROI targets for that 10%?" />
               </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function SummaryItem({ title, desc, checked = false }: { title: string; desc: string; checked?: boolean }) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-white/5">
       <div className={cn("mt-1 size-5 rounded border border-white/20 flex items-center justify-center transition-colors", checked && "bg-[#232ef2] border-[#232ef2]")}>
          {checked && <span className="material-symbols-outlined text-white text-sm">check</span>}
       </div>
       <div>
          <p className="font-bold text-lg leading-snug">{title}</p>
          <p className="text-[#94a3b8] text-sm mt-1">{desc}</p>
       </div>
    </div>
  );
}

function TranscriptMessage({ sender, time, text, isAi = false }: { sender: string; time: string; text: string; isAi?: boolean }) {
  return (
    <div className={cn("flex flex-col gap-1 max-w-[85%]", !isAi && "ml-auto items-end")}>
       <span className="text-[10px] font-bold text-[#94a3b8] px-2">{sender} <span className="font-normal opacity-50 ml-1">{time}</span></span>
       <div className={cn(
          "p-4 rounded-2xl text-sm leading-relaxed",
          isAi ? "bg-[#232ef2] text-white rounded-tl-none" : "bg-white/5 border border-white/10 text-white rounded-tr-none"
       )}>
          {text}
       </div>
    </div>
  );
}
