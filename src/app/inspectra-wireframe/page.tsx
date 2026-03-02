"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const shellCards = [
  "DTP Protocol Status / Resonance Avg / Throughput (msg/s)",
  "Guardian Indicator: JIT GEPPolicyEnforcer",
  'Emergency Controls: "Freeze Light" + Virtual Safety Cover',
  "Left Sidebar: War Room / Agents / Policies / MCTS / Gems",
  "Right Utility Drawer: AI Command Chat (Global Access)",
];

export default function InspectraWireframePage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-text-main font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-[radial-gradient(circle_at_top,#17304a_0%,#0b1219_35%,#0b1219_100%)]">
          <section className="glass-panel rounded-xl p-6 border border-primary/30">
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-2">A) Global UI Shell</p>
            <h1 className="text-2xl font-bold text-white">Aetherium Syndicate Inspectra (ASI) Wireframe</h1>
            <p className="text-text-muted mt-2 mb-5">Cyberpunk dark-mode shell for high-fidelity handoff to Figma / Next.js + shadcn/ui.</p>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {shellCards.map((item) => (
                <div key={item} className="rounded-lg border border-border-subtle bg-background-card/80 p-3 text-sm">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-3">
            <Panel title="B) Command Center" subtitle="Telemetry & Resonance Drift Radar" className="xl:col-span-2">
              <div className="grid gap-4 lg:grid-cols-5">
                <WireBox className="lg:col-span-3 min-h-52" label="Resonance Drift Radar (Polygon Overlay + Delta Tooltip)" />
                <WireBox className="lg:col-span-2 min-h-52" label="AkashicEnvelope Stream Visualizer (Waterfall + JSON Hover)" />
              </div>
              <WireBox className="mt-4 min-h-28" label="Agent Resource Bidder Board (Realtime Heatmap: Compute/Budget)" />
            </Panel>

            <Panel title="C) War Room / Council" subtitle="Split-screen Multi-Agent Orchestration">
              <div className="grid grid-cols-3 gap-3 h-full min-h-80">
                <WireBox className="col-span-1" label="Agent Roster\nContext Window\nAlignment Score" />
                <WireBox className="col-span-1" label="Contemplation Thread\nCard-based Reasoning\nHuman-in-the-loop" />
                <WireBox className="col-span-1" label="Artifact Renderer\nJSON / Policy Code\nProphetic Mode" />
              </div>
            </Panel>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <Panel title="D) MCTS Reasoning Visualizer" subtitle="Glass Box Decision Tree">
              <WireBox className="min-h-60" label="Directed Tree Graph\nSelection / Expansion / Simulation / Backpropagation" />
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <WireBox label="Node Cards\nWin Rate / Visits / Token Usage" />
                <WireBox label='Interactive Overrides\n"Prune" / Add Conditions' />
              </div>
            </Panel>

            <Panel title="E) Audit & Replay" subtitle="Causal Investigation Time Machine">
              <WireBox className="min-h-24" label="Time Scrubber (ms precision)" />
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <WireBox className="min-h-44" label="Ground Truth Timeline" />
                <WireBox className="min-h-44" label="Counterfactual Branching\nWhat-if comparison" />
              </div>
            </Panel>
          </section>

          <section>
            <Panel title="F) Gems of Wisdom & Memory Vault" subtitle="3D Knowledge Space">
              <div className="grid gap-4 lg:grid-cols-3">
                <WireBox className="lg:col-span-2 min-h-48" label="Crystallization Grid\nFloating Gem Cards by weight/frequency" />
                <WireBox className="min-h-48" label="Ritual Verification Panel\nSource JSON + Crystallization Pipeline" />
              </div>
            </Panel>
          </section>
        </main>
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-xl border border-primary/25 bg-background-card/70 p-5 ${className}`}>
      <h2 className="text-lg text-white font-semibold">{title}</h2>
      <p className="text-xs uppercase tracking-wide text-text-muted mb-4">{subtitle}</p>
      {children}
    </section>
  );
}

function WireBox({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`rounded-lg border border-dashed border-primary/50 bg-background-dark/70 p-4 text-xs text-text-muted whitespace-pre-line ${className}`}>
      <span className="text-primary">▦</span> {label}
    </div>
  );
}
