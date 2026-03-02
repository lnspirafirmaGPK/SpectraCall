
"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import { gemDraftExample } from "@/lib/schemas/gem-of-wisdom";

export default function OperationsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-slate-100 antialiased flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* Left Sidebar: Context & Macros */}
        <aside className="w-64 bg-white dark:bg-background-card border-r border-slate-200 dark:border-border-subtle flex flex-col shrink-0 overflow-y-auto hidden lg:flex">
          <div className="p-4 border-b border-slate-200 dark:border-border-subtle">
            <h1 className="text-slate-900 dark:text-white text-sm font-semibold mb-1">Context & Macros</h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Sector 7 Governance</p>
          </div>
          <div className="flex flex-col gap-1 p-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-2">Active Sessions</div>
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span className="text-sm font-medium">Current Thread</span>
            </button>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">Quick Actions</div>
            <QuickAction icon="bolt" title="Explain Drift" desc="Analyze sector variance" />
            <QuickAction icon="contract_edit" title="Draft Contract" desc="New governance patch" />
            <QuickAction icon="history" title="Rollback" desc="Revert last commit" />
          </div>
          <div className="mt-auto p-4 border-t border-slate-200 dark:border-border-subtle">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span className="text-sm font-medium">System Settings</span>
            </div>
          </div>
        </aside>

        {/* Center: Chat Interface */}
        <main className="flex-1 flex flex-col bg-background-light dark:bg-background-dark relative">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-border-subtle bg-white/50 dark:bg-background-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400">Operations</span>
              <span className="text-slate-600 dark:text-slate-500">/</span>
              <span className="text-slate-400">Console</span>
              <span className="text-slate-600 dark:text-slate-500">/</span>
              <span className="text-slate-900 dark:text-white font-medium flex items-center gap-2">
                <span className="size-2 rounded-full bg-secondary animate-pulse"></span>
                Thread #4092-Alpha
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge text="System Live" primary />
              <Badge text="v.2.4.0" />
            </div>
          </div>

          {/* Chat Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            <div className="flex items-center justify-center my-2">
              <span className="text-xs text-slate-400 bg-slate-200 dark:bg-background-card px-3 py-1 rounded-full">Today, 10:42 AM</span>
            </div>

            <UserMessage sender="Operator 7" text="Initiate scan on Sector 7. I'm seeing some drift in the governance weightings. Report findings." />

            <AIMessage sender="ASI Core" latency="12ms" text="System drift detected in Sector 7 governance module. Analysis complete. <br/><br/>Two potential patch strategies have been generated based on the 'Gem of Wisdom' protocol. See Structured Message Cards below.">
              <PatchCard title="Contract Patch: Alpha-7" desc="Re-aligns weightings for neural consensus." impact="94% Efficiency" risk="LOW RISK" />
              <GemDraftCard
                title="Gem Draft: Wisdom Protocol"
                desc="Proposed logic update for long-term stability."
                tokens="4,203"
                cost="0.04 ETH"
                gem={gemDraftExample}
              />
            </AIMessage>
          </div>

          {/* Chat Input Area */}
          <div className="p-4 bg-white dark:bg-background-card border-t border-slate-200 dark:border-border-subtle shrink-0">
            <div className="max-w-4xl mx-auto relative">
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <InputBtn icon="add_circle" />
                <InputBtn icon="terminal" />
              </div>
              <textarea className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-subtle rounded-xl pl-24 pr-12 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none overflow-hidden" placeholder="Type a command or message to ASI Core..." rows={1}></textarea>
              <button className="absolute bottom-2 right-2 p-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </div>
            <div className="text-center mt-2">
              <p className="text-[10px] text-slate-400">ASI Core can make mistakes. Verify critical governance patches.</p>
            </div>
          </div>
        </main>

        {/* Right Panel: Generated Artifacts */}
        <aside className="w-80 bg-white dark:bg-background-card border-l border-slate-200 dark:border-border-subtle flex flex-col shrink-0 hidden xl:flex">
          <div className="p-4 border-b border-slate-200 dark:border-border-subtle flex items-center justify-between">
            <div>
              <h1 className="text-slate-900 dark:text-white text-sm font-semibold mb-0.5">Generated Artifacts</h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs">JSON Schema & Logs</p>
            </div>
            <button className="text-slate-400 hover:text-white"><span className="material-symbols-outlined text-[20px]">download</span></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            <div className="rounded-lg border border-slate-200 dark:border-border-subtle bg-background-dark overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-background-card border-b border-white/5">
                <span className="text-[10px] font-mono text-primary uppercase">patch_v7.json</span>
                <div className="flex gap-1.5"><div className="size-2 rounded-full bg-red-500/50"></div><div className="size-2 rounded-full bg-yellow-500/50"></div><div className="size-2 rounded-full bg-secondary/50"></div></div>
              </div>
              <div className="p-3 overflow-x-auto">
                <pre className="text-[10px] font-mono text-slate-300 leading-relaxed"><code>{JSON.stringify({
                  "protocol": "Gem_Wisdom",
                  "version": "4.1.2",
                  "target": "Sector_7",
                  "patches": [
                    {
                      "id": "Alpha-7",
                      "weight": 0.85,
                      "consensus": "neural",
                      "drift_correction": true
                    }
                  ],
                  "checksum": "0x4f9a...2b1"
                }, null, 2)}</code></pre>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-border-subtle bg-background-dark overflow-hidden relative group">
              <div className="flex items-center justify-between px-3 py-2 bg-background-card border-b border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Drift_Analysis.png</span>
                <span className="material-symbols-outlined text-[14px] text-slate-500">image</span>
              </div>
              <div className="aspect-video w-full bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=300')" }}></div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="px-3 py-1 rounded bg-white text-black text-xs font-bold">Expand</button>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-border-subtle bg-slate-50 dark:bg-background-dark p-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">Execution Log</h4>
              <ul className="space-y-2">
                <LogLine time="10:42:01" status="SUCCESS" msg="Scan initiated" />
                <LogLine time="10:42:05" status="WARN" msg="Drift detected > 2%" />
                <LogLine time="10:42:06" status="INFO" msg="Generating patches..." />
              </ul>
            </div>
          </div>
          <div className="p-4 border-t border-slate-200 dark:border-border-subtle">
            <button className="w-full py-2 rounded-lg bg-slate-50 dark:bg-background-card text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-xs font-medium transition-colors border border-slate-200 dark:border-white/5 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              Copy All Artifacts
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function QuickAction({ icon, title, desc }: any) {
  return (
    <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark group transition-colors">
      <span className="material-symbols-outlined text-[20px] group-hover:text-primary">{icon}</span>
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-[10px] text-slate-400">{desc}</span>
      </div>
    </button>
  );
}

function Badge({ text, primary }: any) {
  return (
    <span className={cn("px-2 py-1 rounded text-[10px] font-mono uppercase border",
      primary ? "bg-background-dark text-primary border-primary/20" : "bg-background-dark text-slate-400 border-white/10")}>
      {text}
    </span>
  );
}

function UserMessage({ sender, text }: any) {
  return (
    <div className="flex items-end gap-3 flex-row-reverse group">
      <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
        <span className="material-symbols-outlined text-primary text-[18px]">person</span>
      </div>
      <div className="flex flex-col gap-1 items-end max-w-[80%]">
        <div className="flex items-center gap-2 mb-1"><span className="text-xs text-slate-400">{sender}</span></div>
        <div className="rounded-2xl rounded-tr-sm px-5 py-3 bg-primary text-white shadow-lg shadow-primary/10 text-sm leading-relaxed">
          {text}
        </div>
      </div>
    </div>
  );
}

function AIMessage({ sender, latency, text, children }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="size-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
        <span className="material-symbols-outlined text-indigo-400 text-[18px]">smart_toy</span>
      </div>
      <div className="flex flex-col gap-1 items-start max-w-[85%]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-indigo-400 font-medium">{sender}</span>
          <span className="text-[10px] text-slate-500">Latency: {latency}</span>
        </div>
        <div className="rounded-2xl rounded-tl-sm px-5 py-3 bg-white dark:bg-background-card border border-slate-200 dark:border-border-subtle text-slate-900 dark:text-slate-200 shadow-sm text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: text }}></div>
        {children}
      </div>
    </div>
  );
}

function PatchCard({ title, desc, impact, risk }: any) {
  return (
    <div className="mt-2 w-full max-w-lg rounded-xl overflow-hidden bg-white dark:bg-background-card border border-slate-200 dark:border-border-subtle shadow-md">
      <div className="h-1 bg-gradient-to-r from-primary to-indigo-500"></div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10 text-accent"><span className="material-symbols-outlined text-[20px]">warning</span></div>
            <div><h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3><p className="text-xs text-slate-500">{desc}</p></div>
          </div>
          <span className="px-2 py-1 rounded text-[10px] font-bold bg-secondary/10 text-secondary border border-secondary/20">{risk}</span>
        </div>
        <div className="mt-4 p-3 bg-slate-50 dark:bg-background-dark rounded-lg border border-slate-200 dark:border-border-subtle">
          <div className="flex justify-between text-xs mb-2"><span className="text-slate-500">Impact Analysis</span><span className="text-slate-900 dark:text-white font-mono">{impact}</span></div>
          <div className="w-full bg-slate-200 dark:bg-background-card rounded-full h-1.5"><div className="bg-primary h-1.5 rounded-full" style={{ width: '94%' }}></div></div>
        </div>
        <div className="mt-4 flex gap-3">
          <button className="flex-1 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white text-xs font-medium transition-colors flex items-center justify-center gap-2"><span className="material-symbols-outlined text-[16px]">visibility</span> Review Patch</button>
          <button className="flex-1 py-2 rounded-lg bg-transparent border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-background-dark text-slate-900 dark:text-slate-300 text-xs font-medium transition-colors">Dismiss</button>
        </div>
      </div>
    </div>
  );
}

function GemDraftCard({ title, desc, tokens, cost, gem }: any) {
  return (
    <div className="mt-2 w-full max-w-lg rounded-xl overflow-hidden bg-white dark:bg-background-card border border-slate-200 dark:border-border-subtle shadow-md">
      <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500"><span className="material-symbols-outlined text-[20px]">diamond</span></div>
          <div><h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3><p className="text-xs text-slate-500">{desc}</p></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-slate-50 dark:bg-background-dark rounded border border-slate-200 dark:border-border-subtle"><p className="text-[10px] text-slate-500 uppercase">Tokens</p><p className="text-sm font-mono text-slate-900 dark:text-white">{tokens}</p></div>
          <div className="p-2 bg-slate-50 dark:bg-background-dark rounded border border-slate-200 dark:border-border-subtle"><p className="text-[10px] text-slate-500 uppercase">Est. Cost</p><p className="text-sm font-mono text-slate-900 dark:text-white">{cost}</p></div>
          <div className="p-2 bg-slate-50 dark:bg-background-dark rounded border border-slate-200 dark:border-border-subtle"><p className="text-[10px] text-slate-500 uppercase">Schema</p><p className="text-sm font-mono text-slate-900 dark:text-white">{gem.metadata.version}</p></div>
          <div className="p-2 bg-slate-50 dark:bg-background-dark rounded border border-slate-200 dark:border-border-subtle"><p className="text-[10px] text-slate-500 uppercase">Mode</p><p className="text-sm font-mono text-slate-900 dark:text-white">{gem.crystallization_ritual.mode}</p></div>
        </div>
        <div className="mt-3 px-3 py-2 rounded-lg bg-purple-500/5 border border-purple-500/20 text-[11px] text-slate-600 dark:text-slate-300">
          <span className="font-semibold">Deploy Scope:</span> {gem.patch_payload.rollout_scope} · <span className="font-semibold">Status:</span> {gem.metadata.status}
        </div>
        <div className="mt-4"><button className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium transition-colors flex items-center justify-center gap-2"><span className="material-symbols-outlined text-[16px]">code</span> Inspect Code</button></div>
      </div>
    </div>
  );
}

function InputBtn({ icon }: any) {
  return <button className="p-1.5 text-slate-400 hover:text-primary transition-colors rounded hover:bg-slate-100 dark:hover:bg-background-dark"><span className="material-symbols-outlined text-[20px]">{icon}</span></button>;
}

function LogLine({ time, status, msg }: any) {
  const color = status === "SUCCESS" ? "text-secondary" : status === "WARN" ? "text-accent" : "text-blue-500";
  return (
    <li className="flex gap-2 text-[10px] font-mono"><span className="text-slate-500">{time}</span><span className={color}>{status}</span><span className="text-slate-400">{msg}</span></li>
  );
}
