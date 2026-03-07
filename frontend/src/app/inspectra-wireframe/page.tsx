"use client";

import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

type Section = {
  title: string;
  items: string[];
};

type PageSpec = {
  title: string;
  objective: string;
  sections: Section[];
};

const globalShell: Section[] = [
  {
    title: "A1) Top Bar (คงที่)",
    items: [
      "Inspectra logo/name + Org Selector (dropdown) + Env badge (PROD/STAGING)",
      "Global Search: Agent / Decision / Incident / Contract / Gem",
      "Alerts Bell: Drift / Contract Violation / Cost Spike",
      "User Menu: Role, Switch role, Logout",
      "Live Status: Tachyon throughput, p95 latency, Resonance average",
    ],
  },
  {
    title: "A2) Left Sidebar (คงที่)",
    items: [
      "War Room, Council, Agents, Departments",
      "Policies, Resonance & Safety, Gems, Tachyon Core",
      "Audit & Replay, Settings / Integrations",
    ],
  },
  {
    title: "A3) Right Utility Drawer (เปิด/ปิดได้)",
    items: [
      "AI Command Chat ใช้ได้ทุกหน้า",
      "Quick Actions: Declare Intent, Freeze Light, Create Agent, Replay Decision",
      "รองรับทั้งโหมด Drawer และหน้า Chat แบบ Full Page",
    ],
  },
];

const pages: PageSpec[] = [
  {
    title: "B) War Room (Executive Dashboard)",
    objective: "ศูนย์บัญชาการผู้บริหารแบบ real-time สำหรับ KPI, risk, drift, incident actions",
    sections: [
      {
        title: "B1) Layout",
        items: [
          "KPI Strip 6 cards: Resonance / Exec Gap / SLA / Cost / Risk / Drift",
          "Main Grid: Decision Spotlight + Live Event Feed",
          "Lower Grid: Drift Radar + System Health",
          "Sticky Action Bar: Declare Intent | Freeze Light | Replay Incident | Export",
        ],
      },
      {
        title: "B2) Widget Specs",
        items: [
          "KPI cards: threshold colors, sparkline 24h, click-through ไปหน้ารายละเอียดเฉพาะ context",
          "Decision Spotlight: Top 5 decisions + Replay / Contract Checks / Escalate",
          "Live Event Feed: virtualized stream, pause/resume, filters (dept/agent/type/severity), event detail slide-over",
          "Drift Radar: department heatmap + trend 24h/7d, hover resonance + top violations",
          "System Health: service tiles (status, p95, error rate) + integration status",
        ],
      },
      {
        title: "B3) Critical Actions",
        items: [
          "Declare Intent modal: goal, constraints, values, horizon, budget cap, optional simulation",
          "Freeze Light modal: scope/workflow + reason + duration + RBAC approval gate",
          "Replay Incident: ค้นหา incident/decision และเปิดหน้า Replay พร้อม context",
        ],
      },
    ],
  },
  {
    title: "C) Council (CEO AI Council)",
    objective: "Intent-to-plan workspace สำหรับ drafting, simulation, negotiation, และ governance",
    sections: [
      {
        title: "C1-C2) Intent Draft",
        items: [
          "Intent Builder: goal, constraints, values, KPI table, horizon, budget, affected departments",
          "Council Chat: threaded messages + AI Director proposal cards",
          "Outcomes & Conflicts panel: predicted KPI delta, conflict list, safeguard recommendations",
        ],
      },
      {
        title: "C3) Simulation (Causal Policy Lab)",
        items: [
          "Scenario preset: Conservative / Balanced / Aggressive",
          "Run controls: sample size, time window, risk tolerance + run/compare/export",
          "Results: KPI deltas, risk breakdown, what-changed diff viewer, recommendations",
        ],
      },
      {
        title: "C4) Bidding & Negotiation Hub",
        items: [
          "Resource requests table: dept, ask, justification, ROI, status",
          "Negotiation timeline: offers/counteroffers + decision points",
          "CEO controls: approve budget, set caps, force constraints, convert to execution plan",
        ],
      },
    ],
  },
  {
    title: "D) Agents (Creator Studio + Agent Profile)",
    objective: "บริหาร lifecycle ของเอเจนต์ตั้งแต่ creation, contract, deploy ถึง traceability",
    sections: [
      {
        title: "D1) Agents Landing",
        items: [
          "Agent table filters: dept/status/risk/contract version/drift/search",
          "Quick preview panel: profile summary, contracts, drift flags, replay/disable",
        ],
      },
      {
        title: "D2) Creator Studio (6-step wizard)",
        items: [
          "Step 1 Role: template, naming helper, owner/team",
          "Step 2 Scope: data access map + permission matrix + least privilege analyzer",
          "Step 3 Skills: tool allowlist, endpoint/rate-limit/budget + tool risk meter",
          "Step 4 Intents: org intent mapping + local KPI + constraints",
          "Step 5 Contracts: data/action/ethics/budget pack + contract diff + schema validator",
          "Step 6 Deploy: staging/production + rollout mode + evidence checklist + compliance gate",
        ],
      },
      {
        title: "D3) Agent Profile",
        items: [
          "Top summary: ID/role/dept/env/status + resonance trend + risk badge + contract versions",
          "Tabs: Overview, Trace Log, Reasoning, Governance, Gems Applied",
          "Trace log fields: decision_id, timestamp, input source, action, contract result, outcome",
        ],
      },
    ],
  },
  {
    title: "E) Replay (Audit & Reasoning Trace)",
    objective: "Explainable replay ครบวงจรสำหรับ compliance และ incident forensics",
    sections: [
      {
        title: "E1-E2) 6-Step Replay",
        items: [
          "Step 1 Context: sources, data quality flags, key schema snapshot, PII redaction status",
          "Step 2 Options: top branches + impact/risk + tree visualization (expand/collapse)",
          "Step 3 Scoring/PRM: score table + reasons + constraint violations + explainers",
          "Step 4 Action: selected tool call/update + confidence + idempotency key",
          "Step 5 Contracts: pass/deny/heal + patch details + schema before/after diff",
          "Step 6 Outcome: actual metrics, expected delta, drift impact, follow-up actions",
        ],
      },
      {
        title: "E3) Replay Actions + States",
        items: [
          "Annotate, Create Incident, Create Gem Draft, Export Evidence Bundle (PDF/JSON)",
          "State: Trace incomplete -> show observability link",
          "State: Permission limited -> sensitive sections redacted",
        ],
      },
    ],
  },
  {
    title: "F) AI Command Chat (Drawer + Full Page)",
    objective: "Command center สำหรับ AI operations พร้อม macro workflows และ artifact outputs",
    sections: [
      {
        title: "F1) Drawer Mode",
        items: [
          "Context pills: page/dept/agent/decision + suggested actions chips",
          "Streaming chat thread with citations + attachments (Decision/Agent/Contract/Gem)",
          "Safe Mode toggle (conservative + evidence-required)",
        ],
      },
      {
        title: "F2) Full Page AI Operations Console",
        items: [
          "Left: macros & context (recent decisions, active incidents, selected agent/dept)",
          "Center: chat thread with structured cards (contract patch/audit summary/gem draft/drift plan)",
          "Right: artifact panel + one-click actions (submit approval, apply staging, attach incident)",
        ],
      },
    ],
  },
];

const widgetCatalog = [
  "War Room: KPI Strip, Decision Spotlight, Live Event Feed, Drift Radar, System Health, Action Bar",
  "Council: Intent Builder, Council Chat, Simulation Controls+Results, Negotiation Hub",
  "Agents: Agent Table+Preview, Creator Studio Wizard+Validators, Profile Tabs (Trace/Reasoning/Governance/Gems)",
  "Replay: 6-step timeline, Tree Viz, PRM Scoring Table, Contract Diff, Outcome Delta, Export Bundle",
  "AI Chat: context pills, macros, safe mode, attachments, artifact panel",
];

const responsiveNotes = [
  "Mobile: Sidebar เป็น hamburger, KPI strip แนวนอน, Chat drawer เป็น full-screen overlay",
  "Tablet: Replay tree ยุบเป็น top 5 options + sticky incident actions",
];

export default function InspectraWireframePage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-text-main font-sans">
      <Sidebar />
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 space-y-6 overflow-y-auto bg-[radial-gradient(circle_at_top,#17304a_0%,#0b1219_35%,#0b1219_100%)] p-6">
          <section className="glass-panel rounded-xl border border-primary/30 p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-primary">Inspectra IA + Wireframe Blueprint</p>
            <h1 className="text-2xl font-bold text-white">War Room / Council / Agents / Replay / AI Command Chat</h1>
            <p className="mt-2 text-text-muted">โครงสร้างพร้อม widgets, interactions, states สำหรับ UX/UI และ dev handoff</p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {globalShell.map((section) => (
                <Panel key={section.title} title={section.title} subtitle="Global UI Shell">
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <WireBox key={item} label={item} />
                    ))}
                  </div>
                </Panel>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            {pages.map((page) => (
              <Panel key={page.title} title={page.title} subtitle={page.objective}>
                <div className="space-y-4">
                  {page.sections.map((section) => (
                    <div key={section.title} className="space-y-2">
                      <h3 className="text-sm font-semibold text-primary">{section.title}</h3>
                      {section.items.map((item) => (
                        <WireBox key={item} label={item} />
                      ))}
                    </div>
                  ))}
                </div>
              </Panel>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <Panel title="G) Widget Catalog" subtitle="รายการ widget ที่ต้องมีตามหน้า">
              <div className="space-y-2">
                {widgetCatalog.map((item) => (
                  <WireBox key={item} label={item} />
                ))}
              </div>
            </Panel>

            <Panel title="H) Responsive Notes" subtitle="มือถือ/แท็บเล็ต">
              <div className="space-y-2">
                {responsiveNotes.map((item) => (
                  <WireBox key={item} label={item} />
                ))}
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
    <div className="rounded-lg border border-dashed border-primary/50 bg-background-dark/70 p-3 text-xs text-text-muted">
      <span className="text-primary">▦</span> {label}
    </div>
  );
}
