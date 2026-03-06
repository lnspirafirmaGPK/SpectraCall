
"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { BiddingPulse } from "@/components/executive/BiddingPulse";
import { cn } from "@/lib/utils";

export default function NegotiationHubPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans antialiased">
      <Sidebar />
      <div className="flex-1 relative flex h-screen w-full flex-col overflow-hidden max-w-4xl mx-auto border-x border-slate-800 shadow-2xl bg-[#101122]">
        <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-slate-800 shrink-0">
          <div className="text-slate-100 flex size-10 shrink-0 items-center justify-center"><span className="material-symbols-outlined text-2xl">menu</span></div>
          <h1 className="text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center uppercase">ASI Negotiation Hub</h1>
          <div className="flex w-10 items-center justify-end"><button className="flex items-center justify-center rounded-lg h-10 w-10 bg-primary/20 text-primary border border-primary/30"><span className="material-symbols-outlined text-xl">memory</span></button></div>
        </header>
        <nav className="shrink-0 bg-[#101122]"><div className="flex border-b border-slate-800 px-4 gap-6 overflow-x-auto no-scrollbar"><Tab label="Bidding Pulse" active /><Tab label="Active Tenders" /><Tab label="AI Logic" /></div></nav>
        <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6 bg-[#101122] relative pb-32">
          <div className="grid grid-cols-3 gap-3"><StatCard label="Compute" value="420T" progress={75} color="cyan" /><StatCard label="Budget" value="1.2M" progress={40} color="amber" /><StatCard label="Human" value="12U" progress={60} color="primary" /></div>
          <BiddingPulse />
          <div className="space-y-4">
            <section className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 font-mono">
              <div className="flex justify-between items-center mb-3"><h4 className="text-xs font-bold text-primary uppercase">Negotiation Logic</h4><span className="text-[10px] text-slate-500 font-bold">LIVE STREAM</span></div>
              <div className="space-y-2 text-[11px]"><LogLine time="14:02:11" label="Strategy AI" msg="Analyzing Finance counter-offer..." color="cyan" /><LogLine time="14:02:14" label="Counter-proposal" msg="Proposed 15% compute reduction for 10% faster execution." color="amber" /><LogLine time="14:02:18" label="System" msg="Awaiting Ops AI validation of timeline..." color="cyan" /></div>
            </section>
            <section className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase px-1">Active Tenders</h4>
              <div className="space-y-2"><TenderItem icon="payments" title="Q3 Cloud Allocation" subtitle="Finance vs Strategy" value="42k CR" time="T-minus 04:12" color="primary" /><TenderItem icon="precision_manufacturing" title="GPU Farm Priority" subtitle="Ops vs Strategy" value="High Prio" time="Active" color="amber" /></div>
            </section>
          </div>
        </main>
        <div className="absolute bottom-[72px] left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 z-20">
          <div className="flex gap-3"><button className="flex-1 h-12 rounded-xl bg-slate-800 text-slate-100 font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-700 transition-colors"><span className="material-symbols-outlined text-lg">block</span>Intervene</button><button className="flex-[1.5] h-12 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-blue-600 transition-colors"><span className="material-symbols-outlined text-lg">check_circle</span>Approve Master Plan</button></div>
        </div>
        <footer className="shrink-0 bg-slate-900 border-t border-slate-800 px-4 pb-6 pt-2 z-30"><div className="flex gap-2"><FooterLink icon="analytics" label="Pit" active /><FooterLink icon="target" label="Strategy" /><FooterLink icon="history" label="History" /><FooterLink icon="settings" label="Settings" /></div></footer>
      </div>
    </div>
  );
}

interface TabProps {
  label: string;
  active?: boolean;
}

function Tab({ label, active }: TabProps) {
  return <a className={cn("flex flex-col items-center justify-center border-b-2 pb-3 pt-4 whitespace-nowrap", active ? "border-primary text-primary" : "border-transparent text-slate-400")} href="#"><p className="text-sm font-bold tracking-wide">{label}</p></a>;
}

interface StatCardProps {
  label: string;
  value: string;
  progress: number;
  color: "cyan" | "amber" | "primary";
}

function StatCard({ label, value, progress, color }: StatCardProps) {
  const textColor = color === "cyan" ? "text-[#00f2ff]" : color === "amber" ? "text-[#ffaa00]" : "text-primary";
  const bgColor = color === "cyan" ? "bg-[#00f2ff]" : color === "amber" ? "bg-[#ffaa00]" : "bg-primary";
  return <div className="flex flex-col gap-1 rounded-xl p-3 bg-slate-900/50 border border-slate-800"><p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">{label}</p><p className={cn(textColor, "text-lg font-bold leading-tight")}>{value}</p><div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden"><div className={cn(bgColor, "h-full rounded-full")} style={{ width: `${progress}%` }}></div></div></div>;
}

interface LogLineProps {
  time: string;
  label: string;
  msg: string;
  color: "cyan" | "amber";
}

function LogLine({ time, label, msg, color }: LogLineProps) {
  const textColor = color === "cyan" ? "text-[#00f2ff]" : "text-[#ffaa00]";
  return <div className="flex gap-2 leading-relaxed"><span className={cn(textColor, "shrink-0")}>[{time}]</span><span className="text-slate-300"><span className={cn(textColor, "font-bold")}>{label}:</span> {msg}</span></div>;
}

interface TenderItemProps {
  icon: string;
  title: string;
  subtitle: string;
  value: string;
  time: string;
  color: "primary" | "amber";
}

function TenderItem({ icon, title, subtitle, value, time, color }: TenderItemProps) {
  const iconColor = color === "amber" ? "text-[#ffaa00] bg-[#ffaa00]/20" : "text-primary bg-primary/20";
  const valColor = color === "amber" ? "text-[#ffaa00]" : "text-[#00f2ff]";
  return <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-primary/50 transition-colors group cursor-pointer"><div className={cn("size-10 rounded-lg flex items-center justify-center", iconColor)}><span className="material-symbols-outlined">{icon}</span></div><div className="flex-1"><p className="text-sm font-bold text-slate-100 group-hover:text-primary transition-colors">{title}</p><p className="text-xs text-slate-400">{subtitle}</p></div><div className="text-right"><p className={cn("text-sm font-bold", valColor)}>{value}</p><p className="text-[10px] text-slate-500 font-bold">{time}</p></div></div>;
}

interface FooterLinkProps {
  icon: string;
  label: string;
  active?: boolean;
}

function FooterLink({ icon, label, active }: FooterLinkProps) {
  return <a className={cn("flex flex-1 flex-col items-center justify-center gap-1", active ? "text-primary" : "text-slate-500 hover:text-white transition-colors")} href="#"><span className={cn("material-symbols-outlined", active && "fill-1")}>{icon}</span><p className="text-[10px] font-bold uppercase">{label}</p></a>;
}
