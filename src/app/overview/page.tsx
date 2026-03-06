"use client";

import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  overviewMockData,
  type ChatMessageData,
  type DecisionItemData,
  type FeedLineData,
  type HealthNodeData,
  type KPIItem,
  type RadarStatData,
  type StatusColor,
} from "@/lib/mock/overview";
import { AgentRegistryPanel } from "@/components/dashboard/AgentRegistryPanel";
import { TachyonPipelinePanel } from "@/components/dashboard/TachyonPipelinePanel";
import { mockAgents } from "@/lib/mock/agents";
import { mockTachyonRoutes } from "@/lib/mock/tachyon-routes";

export default function OverviewPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-text-main font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgb3BhY2l0eT0iMC4wNSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSIjZmZmIi8+PC9zdmc+')]">
        <Header />

        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            {overviewMockData.kpis.map((kpi) => (
              <KPICard key={kpi.title} {...kpi} />
            ))}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 min-h-[400px]">
            <div className="lg:col-span-2 bg-background-card border border-border-subtle rounded-xl flex flex-col overflow-hidden">
              <div className="p-5 border-b border-border-subtle flex justify-between items-center">
                <div>
                  <h3 className="text-white text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">tips_and_updates</span>
                    Decision Spotlight
                  </h3>
                  <p className="text-text-muted text-sm mt-1">High-impact autonomous decisions requiring review or recently executed.</p>
                </div>
                <button className="text-primary text-sm hover:text-white transition-colors">View All History</button>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                <div className="flex flex-col gap-2">
                  {overviewMockData.decisions.map((decision) => (
                    <DecisionItem key={`${decision.title}-${decision.time}`} {...decision} />
                  ))}
                </div>
              </div>
            </div>

            <TachyonPipelinePanel routes={mockTachyonRoutes} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-background-card border border-border-subtle rounded-xl p-5">
              <h3 className="text-white text-lg font-bold flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">grain</span>
                Model Drift Radar
              </h3>
              <div className="flex gap-4">
                <div className="flex-1 aspect-video bg-background-dark rounded-lg border border-border-subtle relative overflow-hidden">
                  <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#1e2e3e 1px, transparent 1px)", backgroundSize: "20px 20px", opacity: 0.3 }}></div>
                  <div className="absolute top-[30%] left-[20%] w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-[20%] right-[30%] w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
                  <div className="absolute top-[10%] right-[10%] w-16 h-16 bg-accent/30 rounded-full blur-xl"></div>
                  <div className="absolute top-[34%] left-[22%] w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#258cf4]"></div>
                  <div className="absolute top-[15%] right-[14%] w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_#fa6238]"></div>
                  <div className="absolute bottom-2 left-2 text-[10px] text-text-muted font-mono">X: Feature Variance | Y: Prediction Skew</div>
                </div>
                <div className="w-40 shrink-0 flex flex-col gap-3 justify-center">
                  {overviewMockData.radarStats.map((radarStat) => (
                    <RadarStat key={radarStat.label} {...radarStat} />
                  ))}
                </div>
              </div>
            </div>

            <AgentRegistryPanel agents={mockAgents} />
          </div>

          <div className="bg-background-card border border-border-subtle rounded-xl p-5 mb-6">
            <h3 className="text-white text-lg font-bold flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">hub</span>
              Infrastructure Health
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {overviewMockData.healthNodes.map((healthNode) => (
                <HealthNode key={healthNode.name} {...healthNode} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <aside className="w-16 hover:w-80 transition-all duration-300 h-full bg-background-card border-l border-border-subtle z-20 flex flex-col group shrink-0 shadow-2xl overflow-hidden">
        <div className="h-16 flex items-center justify-center group-hover:justify-start group-hover:px-6 border-b border-border-subtle shrink-0">
          <div className="relative">
            <span className="material-symbols-outlined text-primary">smart_toy</span>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
            </span>
          </div>
          <span className="ml-3 font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">ASI Command</span>
        </div>
        <div className="flex-1 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 overflow-hidden w-80">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {overviewMockData.chatMessages.map((message, index) => (
              <ChatMessage key={`${message.sender}-${index}`} {...message} />
            ))}
          </div>
          <div className="p-4 border-t border-border-subtle bg-background-dark/50">
            <div className="relative">
              <input className="w-full bg-background-dark border border-border-subtle rounded-lg py-2 pl-3 pr-10 text-sm text-white focus:outline-none focus:border-primary placeholder-text-muted" placeholder="Command..." type="text" />
              <button className="absolute right-2 top-2 text-primary hover:text-white">
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 group-hover:hidden flex items-center justify-center pb-8">
          <span className="rotate-180 text-text-muted text-xs tracking-[0.2em] font-mono whitespace-nowrap" style={{ writingMode: "vertical-rl" }}>SYSTEM COMMAND</span>
        </div>
      </aside>
    </div>
  );
}

function toTextClass(color: StatusColor): string {
  if (color === "secondary") return "text-secondary";
  if (color === "accent") return "text-accent";
  return "text-primary";
}

function toBgClass(color: StatusColor): string {
  if (color === "secondary") return "bg-secondary";
  if (color === "accent") return "bg-accent";
  return "bg-primary";
}

function KPICard({ title, value, trend, icon, progress, color = "primary", alert, subtitle }: KPIItem) {
  const colorClass = toTextClass(color);
  const bgProgressClass = toBgClass(color);

  return (
    <div className="bg-background-card border border-border-subtle rounded-xl p-4 relative overflow-hidden group hover:border-primary/50 transition-colors">
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="material-symbols-outlined text-4xl">{icon}</span>
      </div>
      <p className="text-text-muted text-xs font-medium uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline gap-2 mt-2">
        <p className="text-white text-2xl font-bold">{value}</p>
        <span className={`${colorClass} text-xs font-medium flex items-center`}>
          {trend.includes("+") || trend.includes("%") ? <span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span> : null}
          {trend}
        </span>
      </div>
      {typeof progress === "number" && (
        <div className="w-full bg-gray-800 h-1 mt-3 rounded-full overflow-hidden">
          <div className={`${bgProgressClass} h-full shadow-[0_0_10px_rgba(37,140,244,0.5)]`} style={{ width: `${progress}%` }}></div>
        </div>
      )}
      {alert && (
        <div className="flex gap-1 mt-3">
          {[1, 2, 3].map((index) => <div key={index} className="h-1 w-full bg-accent rounded-full"></div>)}
          <div className="h-1 w-full bg-gray-800 rounded-full"></div>
        </div>
      )}
      {subtitle && <p className="text-[10px] text-text-muted mt-1">{subtitle}</p>}
    </div>
  );
}

function DecisionItem({ icon, title, time, desc, color }: DecisionItemData) {
  const colorClass = color === "secondary" ? "bg-green-500/10 text-green-400 hover:border-secondary" : color === "accent" ? "bg-orange-500/10 text-orange-400 hover:border-accent" : "bg-blue-500/10 text-blue-400 hover:border-primary";

  return (
    <div className={`flex items-center gap-4 p-3 hover:bg-border-subtle/50 rounded-lg transition-colors group cursor-pointer border-l-2 border-transparent ${colorClass}`}>
      <div className={`${colorClass.split(" ")[0]} ${colorClass.split(" ")[1]} rounded-lg p-2 shrink-0`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="text-white font-medium text-sm group-hover:text-primary transition-colors">{title}</h4>
          <span className="text-[10px] text-text-muted bg-background-dark px-2 py-1 rounded border border-border-subtle">{time}</span>
        </div>
        <p className="text-text-muted text-sm mt-0.5">{desc}</p>
      </div>
      <span className="material-symbols-outlined text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
    </div>
  );
}

function FeedLine({ time, status, msg, color, opacity }: FeedLineData) {
  const statusColor = color === "green" ? "text-green-400" : color === "orange" ? "text-orange-400" : color === "blue" ? "text-blue-400" : "text-primary";
  const opClass = opacity === "40" ? "opacity-40" : opacity === "60" ? "opacity-60" : opacity === "80" ? "opacity-80" : opacity === "50" ? "opacity-50" : "";

  return (
    <div className={`flex gap-3 ${opClass}`}>
      <span className="text-gray-500">{time}</span>
      <span className={statusColor}>{status}</span>
      <span className={opacity ? "text-gray-300" : "text-white"}>{msg}</span>
    </div>
  );
}

function RadarStat({ label, value, color }: RadarStatData) {
  const textColor = toTextClass(color);
  return (
    <div className="bg-border-subtle/30 p-3 rounded-lg">
      <p className="text-xs text-text-muted">{label}</p>
      <p className={`${textColor} font-bold text-lg`}>{value}</p>
    </div>
  );
}

function HealthNode({ name, load, status }: HealthNodeData) {
  const statusColor = status === "secondary" ? "bg-secondary shadow-[#0bda5b]" : status === "accent" ? "bg-accent shadow-[#fa6238]" : "bg-primary shadow-[#258cf4]";
  return (
    <div className="bg-background-dark border border-border-subtle p-3 rounded-lg flex flex-col gap-2 items-center text-center">
      <div className={`w-2 h-2 rounded-full ${statusColor} shadow-[0_0_5px]`}></div>
      <span className="text-xs text-white font-medium">{name}</span>
      <span className="text-[10px] text-text-muted">Load: {load}</span>
    </div>
  );
}

function ChatMessage({ sender, text, isUser, success }: ChatMessageData) {
  if (isUser) {
    return (
      <div className="flex flex-col gap-1 items-end">
        <div className="bg-primary/20 border border-primary/30 p-3 rounded-lg rounded-tr-none max-w-[90%] text-sm text-white">{text}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 items-start">
      <div className="bg-border-subtle p-3 rounded-lg rounded-tl-none max-w-[90%] text-sm text-text-muted">
        <span className="text-primary font-bold text-xs block mb-1">{sender}</span>
        {success ? (
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-400 text-sm">check</span>
            <span>{text}</span>
          </div>
        ) : text}
      </div>
    </div>
  );
}
