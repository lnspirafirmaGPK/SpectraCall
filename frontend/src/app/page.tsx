import Link from "next/link"
import { appRoutes } from "@/lib/navigation"

const platformPlanes = [
  {
    title: "Control Plane",
    description: "Operator approvals, interventions, replay triggers, and mission workflows.",
    accent: "from-cyan-400/30 to-blue-500/10",
  },
  {
    title: "Data Plane",
    description: "Embedding jobs, evidence preparation, and domain execution workers.",
    accent: "from-violet-400/30 to-fuchsia-500/10",
  },
  {
    title: "Trust Plane",
    description: "Identity, signatures, lineage verification, and replay integrity.",
    accent: "from-emerald-400/30 to-green-500/10",
  },
  {
    title: "Governance Plane",
    description: "Policy evaluation, risk scoring, obligations, and exception handling.",
    accent: "from-amber-400/30 to-orange-500/10",
  },
  {
    title: "Observability Plane",
    description: "Metrics, traces, logs, and forensic evidence for high-stakes decisions.",
    accent: "from-pink-400/30 to-rose-500/10",
  },
]

const architectureFlow = [
  "Mission UI receives operator intent and evidence context.",
  "Control-plane workflows enrich requests with envelope, trace, and policy scope.",
  "Data/Governance/Trust services evaluate actions and persist lineage artifacts.",
  "Observability surfaces system state, alerts, and replay-ready history back to operators.",
]

const categories = [
  { key: "mission", title: "Mission Surfaces" },
  { key: "control", title: "Governed Flows" },
  { key: "analysis", title: "Analysis & Builders" },
  { key: "support", title: "Support Systems" },
] as const

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_24%),linear-gradient(180deg,#040816_0%,#09101f_45%,#0c1220_100%)] text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 lg:px-10 lg:py-14">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-10 px-6 py-8 lg:grid-cols-[1.3fr_0.9fr] lg:px-10 lg:py-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-100">
                <span className="size-2 rounded-full bg-cyan-300"></span>
                Unified AI-assisted mission control for the Spectra platform
              </div>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
                  Command the entire platform from one operational launchpad.
                </h1>
                <p className="max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                  The new SpectraCall home page is designed as a system entrypoint: operators can inspect architecture,
                  jump straight into mission-critical workflows, and understand how control, governance, trust, and
                  observability collaborate before executing a decision.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/workspace" className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5">
                  Enter Mission Control
                </Link>
                <Link href="/overview" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-slate-100 transition-colors hover:bg-white/10">
                  Open System Overview
                </Link>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <HeroMetric label="Primary control surface" value="12 routes" detail="Mission, control, analysis, and support domains" />
                <HeroMetric label="Platform coverage" value="5 planes" detail="Control, Data, Trust, Governance, Observability" />
                <HeroMetric label="Core flow" value="Replay-ready" detail="Envelope, policy, lineage, and evidence aware" />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200/80">System architecture</p>
                  <h2 className="mt-2 text-2xl font-bold">Operational request path</h2>
                </div>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                  Live model
                </span>
              </div>
              <div className="space-y-3">
                {architectureFlow.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-sm font-bold text-cyan-200">0{index + 1}</div>
                    <p className="text-sm leading-6 text-slate-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-4 lg:grid-cols-5">
          {platformPlanes.map((plane) => (
            <article key={plane.title} className={`rounded-3xl border border-white/10 bg-gradient-to-br ${plane.accent} p-[1px]`}>
              <div className="h-full rounded-[calc(1.5rem-1px)] bg-slate-950/80 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Platform plane</p>
                <h3 className="mt-3 text-xl font-bold text-white">{plane.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{plane.description}</p>
              </div>
            </article>
          ))}
        </section>

        {categories.map((category) => {
          const routes = appRoutes.filter((route) => route.category === category.key)
          return (
            <section key={category.key} className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200/80">Navigation</p>
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                </div>
                <p className="text-sm text-slate-400">{routes.length} entry points</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-all hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                        <span className="material-symbols-outlined">{route.icon}</span>
                      </div>
                      {route.badge ? (
                        <span className="rounded-full border border-primary/30 bg-primary/15 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                          {route.badge}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-white">{route.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{route.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-cyan-200 transition-transform group-hover:translate-x-1">
                      <span>Open route</span>
                      <span aria-hidden="true">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </section>
    </main>
  )
}

function HeroMetric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
    </div>
  )
}
