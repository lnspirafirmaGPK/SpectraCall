"use client";

import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

const globalShell = [
  "Top Bar: Org Selector, Environment Badge, Global Search, Alert Bell, Live Throughput/p95",
  "Left Sidebar: War Room, Council, Agents, Departments, Policies, Resonance & Safety, Gems, Tachyon Core, Audit & Replay",
  "Right Utility Drawer: AI Command Chat + Quick Actions (Declare Intent, Freeze Light, Replay, Create Agent)",
  "Global Safety: Safe Mode toggle + role-based command guardrails",
];

const pages = [
  {
    title: "War Room (Executive Dashboard)",
    objective: "ภาพรวมองค์กรแบบเรียลไทม์ + คำสั่งระดับผู้บริหาร",
    blocks: [
      "KPI Strip: Resonance Score, Execution Gap, SLA, Cost, Risk, Drift Alerts",
      "Decision Spotlight: Top-impact decisions + Replay / Contract Check / Escalate",
      "Live Event Feed: Tachyon stream + filters + pause/resume",
      "Drift Radar Heatmap + System Health tiles (cogitator-x, governance, gem-forge, tachyon-core)",
      "Sticky Action Bar: Declare Intent, Freeze Light, Replay Incident, Export",
    ],
  },
  {
    title: "CEO AI Council",
    objective: "ห้องประชุมมนุษย์ + AI Director สำหรับ intent-to-plan",
    blocks: [
      "Intent Draft: goal, constraints, values, KPI targets, horizon, budget",
      "Simulation Tab (Causal Policy Lab): scenario preset + compare run",
      "Bidding/Negotiation Hub: resource asks, ROI, offer timeline, approval controls",
      "Council Chat: threaded rationale + proposal cards",
      "Outcomes Panel: profit/cost delta, risk map, safeguards",
    ],
  },
  {
    title: "Agents (Creator Studio + Profile)",
    objective: "สร้าง/ควบคุม agent ด้วย least privilege และ governance-first",
    blocks: [
      "Agents Table: status, resonance, risk, contract version, last decision",
      "Creator Studio 6 steps: Role → Scope → Skills → Intents → Contracts → Deploy",
      "Realtime Validators: least privilege analyzer, tool risk meter, contract diff",
      "Agent Profile Tabs: Overview, Trace Log, Reasoning, Governance, Gems Applied",
      "Deploy Gates: staging evidence + compliance approval before production",
    ],
  },
  {
    title: "Audit & Replay",
    objective: "ตรวจสอบเหตุผลย้อนหลังครบ 6 ขั้นแบบ explainable by design",
    blocks: [
      "Timeline: Context → Options → PRM Scoring → Selected Action → Contract Checks → Outcome",
      "Tree Visualization: explored branches + pruned nodes",
      "Schema Before/After Diff for heal actions",
      "Annotate + Incident + Create Gem Draft actions",
      "Export Evidence Bundle (PDF/JSON) สำหรับ compliance",
    ],
  },
  {
    title: "AI Command Chat (Full Page + Drawer)",
    objective: "ศูนย์สั่งงาน AI พร้อม context attachment และ macro workflows",
    blocks: [
      "Context Pills: page/dept/agent/decision/incident",
      "Macro Library: operator macros + compliance macros",
      "Structured Output Cards: Contract Patch, Audit Summary, Gem Draft, Drift Response Plan",
      "One-click Action: submit for approval, apply to staging, attach to incident",
      "Safe Mode: บังคับ response ที่ conservative + ต้องมี evidence",
    ],
  },
];

export default function InspectraWireframePage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-text-main font-sans">
      <Sidebar />
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 space-y-6 overflow-y-auto bg-[radial-gradient(circle_at_top,#17304a_0%,#0b1219_35%,#0b1219_100%)] p-6">
          <section className="glass-panel rounded-xl border border-primary/30 p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-primary">ASI Product Wireframe Blueprint</p>
            <h1 className="text-2xl font-bold text-white">Inspectra: War Room / Council / Agents / Replay / AI Chat</h1>
            <p className="mt-2 text-text-muted">Wireframe หน้าหลักสำหรับ handoff ไปยัง Figma และ implementation บน Next.js + shadcn/ui</p>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {globalShell.map((item) => (
                <WireBox key={item} label={item} />
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            {pages.map((page) => (
              <Panel key={page.title} title={page.title} subtitle={page.objective}>
                <div className="space-y-3">
                  {page.blocks.map((block) => (
                    <WireBox key={block} label={block} />
                  ))}
                </div>
              </Panel>
            ))}
          </section>

          <section className="rounded-xl border border-primary/25 bg-background-card/70 p-5">
            <h2 className="text-lg font-semibold text-white">Responsive Notes</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <WireBox label="Mobile: sidebar → hamburger, KPI strip horizontal scroll, chat drawer เป็น full-screen overlay" />
              <WireBox label="Tablet: Replay tree ยุบเหลือ top 5 options + sticky incident actions" />
            </div>
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
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-primary/25 bg-background-card/70 p-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mb-4 text-xs uppercase tracking-wide text-text-muted">{subtitle}</p>
      {children}
    </section>
  );
}

function WireBox({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-dashed border-primary/50 bg-background-dark/70 p-4 text-xs text-text-muted">
      <span className="text-primary">▦</span> {label}
    </div>
  );
}
