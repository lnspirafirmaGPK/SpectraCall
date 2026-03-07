export type Severity = "low" | "medium" | "high" | "critical"
export type HealthStatus = "healthy" | "warning" | "degraded" | "offline"
export type QueueStatus = "pending" | "running" | "blocked" | "completed"
export type Role = "CEO" | "CTO" | "Ops" | "Risk"

export interface MetricCardData {
  id: string
  label: string
  value: string
  delta: string
  icon: string
  tone: "primary" | "secondary" | "accent"
  subtext: string
}

export interface ApprovalItem {
  id: string
  title: string
  owner: string
  role: Role
  severity: Severity
  eta: string
  status: QueueStatus
}

export interface SystemNode {
  id: string
  name: string
  region: string
  status: HealthStatus
  latencyMs: number
  throughput: string
}

export interface Recommendation {
  id: string
  title: string
  impact: string
  action: string
}

export interface AlertItem {
  id: string
  title: string
  description: string
  severity: Severity
  source: string
  timestamp: string
}

export interface TimelineEvent {
  id: string
  time: string
  title: string
  description: string
  kind: "deploy" | "ai" | "risk" | "infra"
}

export interface SummaryStatItem {
  id: string
  label: string
  value: string
}

export interface WorkspaceData {
  metrics: MetricCardData[]
  approvals: ApprovalItem[]
  systems: SystemNode[]
  recommendations: Recommendation[]
  alerts: AlertItem[]
  timeline: TimelineEvent[]
  summaryStats: SummaryStatItem[]
}

export const workspaceMockData: WorkspaceData = {
  metrics: [
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
  ],
  approvals: [
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
  ],
  systems: [
    { id: "s1", name: "Tachyon Core A1", region: "SGP-1", status: "healthy", latencyMs: 8, throughput: "1.8M evt/min" },
    { id: "s2", name: "Resonance Index B4", region: "FRA-2", status: "warning", latencyMs: 19, throughput: "920k evt/min" },
    { id: "s3", name: "Governance Relay C2", region: "TYO-1", status: "degraded", latencyMs: 31, throughput: "640k evt/min" },
    { id: "s4", name: "Audit Vault D1", region: "IAD-1", status: "healthy", latencyMs: 12, throughput: "1.1M evt/min" },
  ],
  recommendations: [
    {
      id: "r1",
      title: "Throttle non-essential insight jobs",
      impact: "ลด load ฝั่ง diagnostics ได้ประมาณ 14%",
      action: "Pause analytics workers",
    },
    {
      id: "r2",
      title: "Approve temporary budget uplift",
      impact: "ป้องกัน queue backlog ในช่วง peak traffic",
      action: "Raise cap for 6 hours",
    },
    {
      id: "r3",
      title: "Force fallback on degraded relay",
      impact: "ลด jitter และเพิ่ม reliability ของ path หลัก",
      action: "Enable fallback route",
    },
  ],
  alerts: [
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
  ],
  timeline: [
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
  ],
  summaryStats: [
    { id: "ss1", label: "Pending approvals", value: "06" },
    { id: "ss2", label: "Critical alerts", value: "01" },
    { id: "ss3", label: "Degraded systems", value: "01" },
  ],
}
