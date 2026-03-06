"use client";

import { useMemo, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";

type Severity = "low" | "medium" | "high" | "critical";
type Status = "healthy" | "warning" | "degraded" | "offline";
type QueueStatus = "pending" | "running" | "blocked" | "completed";
type RoleFilter = "all" | "CEO" | "CTO" | "Ops" | "Risk";

interface MetricCardData {
  id: string;
  label: string;
  value: string;
  delta: string;
  icon: string;
  tone: "primary" | "secondary" | "accent";
  subtext: string;
}

interface SystemNode {
  id: string;
  name: string;
  region: string;
  status: Status;
  latencyMs: number;
  throughput: string;
}

interface ApprovalItem {
  id: string;
  title: string;
  owner: string;
  role: Exclude<RoleFilter, "all">;
  severity: Severity;
  eta: string;
  status: QueueStatus;
}

interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  source: string;
  timestamp: string;
}

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  kind: "deploy" | "ai" | "risk" | "infra";
}

const metrics: MetricCardData[] = [
  {
    id: "m1",
    label: "Autonomy Coverage",
    value: "84%",
    delta: "+6.2%",
    icon: "network_intelligence",
    tone: "primary",
    subtext: "Cross-team orchestration success rate",
  },
  {
    id: "m2",
    label: "Decision SLA",
    value: "11.8ms",
    delta: "-1.1ms",
    icon: "bolt",
    tone: "secondary",
    subtext: "Median approval execution latency",
  },
  {
    id: "m3",
    label: "Risk Pressure",
    value: "Moderate",
    delta: "2 flags",
    icon: "shield",
    tone: "accent",
    subtext: "Requires 1 executive confirmation",
  },
  {
    id: "m4",
    label: "Daily Burn",
    value: "$2.4k",
    delta: "+$180",
    icon: "payments",
    tone: "primary",
    subtext: "Inference + orchestration run rate",
  },
];

const systems: SystemNode[] = [
  { id: "s1", name: "Tachyon Core A1", region: "SGP-1", status: "healthy", latencyMs: 8, throughput: "1.8M evt/min" },
  { id: "s2", name: "Resonance Index B4", region: "FRA-2", status: "warning", latencyMs: 19, throughput: "920k evt/min" },
  { id: "s3", name: "Governance Relay C2", region: "TYO-1", status: "degraded", latencyMs: 31, throughput: "640k evt/min" },
  { id: "s4", name: "Audit Vault D1", region: "IAD-1", status: "healthy", latencyMs: 12, throughput: "1.1M evt/min" },
];

const approvals: ApprovalItem[] = [
  {
    id: "a1",
    title: "Reallocate model traffic to Gemini lane",
    owner: "Strategic AI Runtime",
    role: "CTO",
    severity: "medium",
    eta: "5 min",
    status: "pending",
  },
  {
    id: "a2",
    title: "Freeze non-critical autonomous actions",
    owner: "Crisis Protocol",
    role: "Risk",
    severity: "high",
    eta: "2 min",
    status: "running",
  },
  {
    id: "a3",
    title: "Approve cost guardrail uplift +12%",
    owner: "Budget Sentinel",
    role: "CEO",
    severity: "medium",
    eta: "9 min",
    status: "blocked",
  },
  {
    id: "a4",
    title: "Publish infrastructure compliance digest",
    owner: "Audit Mesh",
    role: "Ops",
    severity: "low",
    eta: "Done",
    status: "completed",
  },
];

const alerts: AlertItem[] = [
  {
    id: "al1",
    title: "Latency variance spike detected",
    description: "Resonance Index B4 exceeded baseline jitter envelope by 18%.",
    severity: "high",
    source: "Diagnostics",
    timestamp: "2m ago",
  },
  {
    id: "al2",
    title: "Cost anomaly watchlist opened",
    description: "Projected daily burn is trending above expected threshold.",
    severity: "medium",
    source: "Finance Runtime",
    timestamp: "11m ago",
  },
  {
    id: "al3",
    title: "Manual sign-off required",
    description: "Governance rule set blocks full autonomy on one action path.",
    severity: "critical",
    source: "Policy Validator",
    timestamp: "18m ago",
  },
];

const timeline: TimelineEvent[] = [
  {
    id: "t1",
    time: "10:42",
    title: "Adaptive reroute executed",
    description: "Traffic moved from Governance Relay C2 to A1 fallback corridor.",
    kind: "infra",
  },
  {
    id: "t2",
    time: "10:37",
    title: "AI recommendation generated",
    description: "ASI suggested throttling non-essential insight jobs for 15 minutes.",
    kind: "ai",
  },
  {
    id: "t3",
    time: "10:31",
    title: "Risk policy escalated",
    description: "One approval now requires executive override due to anomaly density.",
    kind: "risk",
  },
  {
    id: "t4",
    time: "10:18",
    title: "Deploy checkpoint passed",
    description: "App router build verified, typecheck green, release candidate promoted.",
    kind: "deploy",
  },
];

export default function WorkspacePage() {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [severityFilter, setSeverityFilter] = useState<Severity | "all">("all");
  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  const filteredApprovals = useMemo(() => {
    return approvals.filter((item) => {
      const matchRole = roleFilter === "all" ? true : item.role === roleFilter;
      const matchSeverity = severityFilter === "all" ? true : item.severity === severityFilter;
      const matchCompleted = showCompleted ? true : item.status !== "completed";
      return matchRole && matchSeverity && matchCompleted;
    });
  }, [roleFilter, severityFilter, showCompleted]);

  const pendingCount = filteredApprovals.filter((item) => item.status === "pending").length;
  const blockedCount = filteredApprovals.filter((item) => item.status === "blocked").length;
  const criticalCount = alerts.filter((item) => item.severity === "critical").length;

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-slate-100 antialiased">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-6 lg:p-8">
            <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-border-subtle dark:bg-background-card">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                    Executive Workspace
                  </p>
                  <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white lg:text-4xl">
                      SpectraCall Mission Control
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm text-slate-500 dark:text-slate-400 lg:text-base">
                      ศูนย์ควบคุมการตัดสินใจ, ความเสี่ยง, ต้นทุน, และสถานะโครงสร้างพื้นฐาน
                      สำหรับงาน orchestration แบบครบวงจรในหน้าเดียว
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <QuickAction icon="rocket_launch" label="Deploy" />
                  <QuickAction icon="verified_user" label="Approve" />
                  <QuickAction icon="emergency" label="Escalate" />
                  <QuickAction icon="auto_awesome" label="AI Brief" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-4">
                {metrics.map((metric) => (
                  <MetricCard key={metric.id} metric={metric} />
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
              <div className="xl:col-span-8 flex flex-col gap-6">
                <Panel
                  title="Approval Queue"
                  subtitle="งานที่รอการยืนยัน, กำลังรัน, ถูกบล็อก, และปิดแล้ว"
                  icon="fact_check"
                  rightSlot={
                    <div className="flex flex-wrap items-center gap-2">
                      <Chip label={`${pendingCount} pending`} tone="primary" />
                      <Chip label={`${blockedCount} blocked`} tone="accent" />
                      <Chip label={`${criticalCount} critical`} tone="accent" />
                    </div>
                  }
                >
                  <div className="mb-5 grid grid-cols-1 gap-3 lg:grid-cols-4">
                    <FilterSelect<RoleFilter>
                      label="Role"
                      value={roleFilter}
                      onChange={setRoleFilter}
                      options={["all", "CEO", "CTO", "Ops", "Risk"]}
                    />
                    <FilterSelect<Severity | "all">
                      label="Severity"
                      value={severityFilter}
                      onChange={setSeverityFilter}
                      options={["all", "low", "medium", "high", "critical"]}
                    />
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Visibility
                      </span>
                      <button
                        onClick={() => setShowCompleted((prev) => !prev)}
                        className={cn(
                          "flex h-[42px] items-center justify-between rounded-lg border px-4 text-sm font-medium transition-colors",
                          showCompleted
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-slate-200 bg-slate-50 text-slate-700 dark:border-border-subtle dark:bg-background-dark dark:text-slate-300"
                        )}
                      >
                        <span>Show completed</span>
                        <span className="material-symbols-outlined text-[18px]">
                          {showCompleted ? "visibility" : "visibility_off"}
                        </span>
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Summary
                      </span>
                      <div className="flex h-[42px] items-center rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 dark:border-border-subtle dark:bg-background-dark dark:text-slate-300">
                        {filteredApprovals.length} items visible
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredApprovals.map((item) => (
                      <ApprovalRow key={item.id} item={item} />
                    ))}

                    {filteredApprovals.length === 0 && (
                      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        ไม่พบรายการที่ตรงกับ filter ปัจจุบัน
                      </div>
                    )}
                  </div>
                </Panel>

                <Panel
                  title="System Topology"
                  subtitle="สถานะ node สำคัญของ orchestration fabric"
                  icon="lan"
                >
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    {systems.map((node) => (
                      <SystemCard key={node.id} node={node} />
                    ))}
                  </div>
                </Panel>

                <Panel
                  title="Live Event Timeline"
                  subtitle="เหตุการณ์ล่าสุดที่กระทบการตัดสินใจและประสิทธิภาพระบบ"
                  icon="timeline"
                >
                  <div className="space-y-4">
                    {timeline.map((event) => (
                      <TimelineRow key={event.id} event={event} />
                    ))}
                  </div>
                </Panel>
              </div>

              <div className="xl:col-span-4 flex flex-col gap-6">
                <Panel
                  title="AI Recommendations"
                  subtitle="ข้อเสนอเชิงปฏิบัติจาก ASI"
                  icon="auto_awesome"
                >
                  <div className="space-y-3">
                    <RecommendationCard
                      title="Throttle non-essential insight jobs"
                      impact="ลด load ฝั่ง diagnostics ได้ประมาณ 14%"
                      action="Pause analytics workers"
                    />
                    <RecommendationCard
                      title="Approve temporary budget uplift"
                      impact="ป้องกัน queue backlog ในช่วง peak traffic"
                      action="Raise cap for 6 hours"
                    />
                    <RecommendationCard
                      title="Force fallback on degraded relay"
                      impact="ลด jitter และทำให้ approval SLA เสถียรขึ้น"
                      action="Route to A1 corridor"
                    />
                  </div>
                </Panel>

                <Panel
                  title="Active Alerts"
                  subtitle="สัญญาณเตือนที่ต้องจับตา"
                  icon="warning"
                >
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <AlertRow key={alert.id} alert={alert} />
                    ))}
                  </div>
                </Panel>

                <Panel
                  title="Control Summary"
                  subtitle="มุมมองสรุปสำหรับผู้บริหาร"
                  icon="dashboard"
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    <SummaryStat label="Healthy Nodes" value="2 / 4" tone="secondary" />
                    <SummaryStat label="High-Risk Alerts" value="2" tone="accent" />
                    <SummaryStat label="Actions Awaiting Approval" value={`${pendingCount}`} tone="primary" />
                    <SummaryStat label="Blocked Workflows" value={`${blockedCount}`} tone="accent" />
                  </div>

                  <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary">tips_and_updates</span>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          Suggested executive move
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                          อนุมัติ traffic reroute ก่อน แล้วค่อยยก budget cap ชั่วคราว จะช่วยลดทั้ง latency
                          และ backlog พร้อมกัน
                        </p>
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  icon,
  children,
  rightSlot,
}: {
  title: string;
  subtitle: string;
  icon: string;
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-border-subtle dark:bg-background-card">
      <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 dark:border-border-subtle lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <span className="material-symbols-outlined">{icon}</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>
        </div>
        {rightSlot}
      </div>
      {children}
    </section>
  );
}

function MetricCard({ metric }: { metric: MetricCardData }) {
  const toneClass =
    metric.tone === "secondary"
      ? "text-secondary bg-secondary/10"
      : metric.tone === "accent"
      ? "text-accent bg-accent/10"
      : "text-primary bg-primary/10";

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-primary/30 dark:border-border-subtle dark:bg-background-dark">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {metric.label}
          </p>
          <p className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            {metric.value}
          </p>
        </div>
        <div className={cn("rounded-lg p-2", toneClass)}>
          <span className="material-symbols-outlined">{metric.icon}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-primary">{metric.delta}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">{metric.subtext}</span>
      </div>
    </div>
  );
}

function QuickAction({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-border-subtle dark:bg-background-dark dark:text-slate-200">
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function Chip({ label, tone }: { label: string; tone: "primary" | "secondary" | "accent" }) {
  const cls =
    tone === "secondary"
      ? "border-secondary/20 bg-secondary/10 text-secondary"
      : tone === "accent"
      ? "border-accent/20 bg-accent/10 text-accent"
      : "border-primary/20 bg-primary/10 text-primary";

  return <span className={cn("rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider", cls)}>{label}</span>;
}

function FilterSelect<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className="h-[42px] w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition-colors focus:border-primary dark:border-border-subtle dark:bg-background-dark dark:text-slate-200"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined pointer-events-none absolute right-3 top-2.5 text-slate-500">
          arrow_drop_down
        </span>
      </div>
    </div>
  );
}

function ApprovalRow({ item }: { item: ApprovalItem }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-primary/30 dark:border-border-subtle dark:bg-background-dark">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
            <SeverityBadge severity={item.severity} />
            <StatusBadge status={item.status} />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>Owner: {item.owner}</span>
            <span>Role: {item.role}</span>
            <span>ETA: {item.eta}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-border-subtle dark:text-slate-300">
            Inspect
          </button>
          <button className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-600">
            Execute
          </button>
        </div>
      </div>
    </div>
  );
}

function SystemCard({ node }: { node: SystemNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-border-subtle dark:bg-background-dark">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{node.name}</h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{node.region}</p>
        </div>
        <StatusPill status={node.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <MiniStat label="Latency" value={`${node.latencyMs}ms`} />
        <MiniStat label="Throughput" value={node.throughput} />
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-border-subtle dark:bg-background-card">
      <p className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

function RecommendationCard({
  title,
  impact,
  action,
}: {
  title: string;
  impact: string;
  action: string;
}) {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <span className="material-symbols-outlined">auto_awesome</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{impact}</p>
          <button className="mt-3 rounded-lg bg-white px-3 py-2 text-xs font-bold text-primary shadow-sm transition-colors hover:bg-slate-100 dark:bg-background-card">
            {action}
          </button>
        </div>
      </div>
    </div>
  );
}

function AlertRow({ alert }: { alert: AlertItem }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-border-subtle dark:bg-background-dark">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{alert.title}</h3>
            <SeverityBadge severity={alert.severity} />
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            {alert.description}
          </p>
        </div>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">{alert.timestamp}</span>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <span>{alert.source}</span>
        <button className="font-bold text-primary">Open</button>
      </div>
    </div>
  );
}

function TimelineRow({ event }: { event: TimelineEvent }) {
  const icon =
    event.kind === "deploy"
      ? "rocket_launch"
      : event.kind === "ai"
      ? "smart_toy"
      : event.kind === "risk"
      ? "shield"
      : "lan";

  const tone =
    event.kind === "deploy"
      ? "text-primary bg-primary/10"
      : event.kind === "ai"
      ? "text-secondary bg-secondary/10"
      : event.kind === "risk"
      ? "text-accent bg-accent/10"
      : "text-slate-500 bg-slate-200 dark:bg-slate-800";

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={cn("rounded-lg p-2", tone)}>
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </div>
        <div className="mt-2 h-full w-px bg-slate-200 dark:bg-border-subtle" />
      </div>

      <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-border-subtle dark:bg-background-dark">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{event.title}</h3>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">{event.time}</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          {event.description}
        </p>
      </div>
    </div>
  );
}

function SummaryStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "primary" | "secondary" | "accent";
}) {
  const cls =
    tone === "secondary"
      ? "border-secondary/20 bg-secondary/10 text-secondary"
      : tone === "accent"
      ? "border-accent/20 bg-accent/10 text-accent"
      : "border-primary/20 bg-primary/10 text-primary";

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-border-subtle dark:bg-background-dark">
      <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xl font-black tracking-tight text-slate-900 dark:text-white">{value}</p>
        <div className={cn("rounded-lg border px-2 py-1 text-[11px] font-bold uppercase", cls)}>Live</div>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: Severity }) {
  const cls =
    severity === "critical"
      ? "border-red-500/20 bg-red-500/10 text-red-400"
      : severity === "high"
      ? "border-accent/20 bg-accent/10 text-accent"
      : severity === "medium"
      ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
      : "border-secondary/20 bg-secondary/10 text-secondary";

  return (
    <span className={cn("rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wider", cls)}>
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: QueueStatus }) {
  const cls =
    status === "completed"
      ? "border-secondary/20 bg-secondary/10 text-secondary"
      : status === "running"
      ? "border-primary/20 bg-primary/10 text-primary"
      : status === "blocked"
      ? "border-accent/20 bg-accent/10 text-accent"
      : "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";

  return (
    <span className={cn("rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wider", cls)}>
      {status}
    </span>
  );
}

function StatusPill({ status }: { status: Status }) {
  const cls =
    status === "healthy"
      ? "bg-secondary/10 text-secondary border-secondary/20"
      : status === "warning"
      ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      : status === "degraded"
      ? "bg-accent/10 text-accent border-accent/20"
      : "bg-red-500/10 text-red-400 border-red-500/20";

  return (
    <span className={cn("rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider", cls)}>
      {status}
    </span>
  );
}
