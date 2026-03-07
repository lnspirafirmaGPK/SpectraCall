export type StatusColor = "primary" | "secondary" | "accent";

export type FeedColor = "primary" | "green" | "orange" | "blue";

export type FeedOpacity = "40" | "50" | "60" | "80";

export interface KPIItem {
  title: string;
  value: string;
  trend: string;
  icon: string;
  progress?: number;
  color?: StatusColor;
  alert?: boolean;
  subtitle?: string;
}

export interface DecisionItemData {
  icon: string;
  title: string;
  time: string;
  desc: string;
  color: StatusColor;
}

export interface FeedLineData {
  time: string;
  status: string;
  msg: string;
  color: FeedColor;
  opacity?: FeedOpacity;
}

export interface RadarStatData {
  label: string;
  value: string;
  color: StatusColor;
}

export interface HealthNodeData {
  name: string;
  load: string;
  status: StatusColor;
}

export interface ChatMessageData {
  sender: string;
  text: string;
  isUser?: boolean;
  success?: boolean;
}

export const overviewMockData = {
  kpis: [
    { title: "Resonance Score", value: "88%", trend: "+2.1%", icon: "bolt", progress: 88, color: "secondary" },
    { title: "Execution Gap", value: "12ms", trend: "-1.5ms", icon: "speed", color: "secondary" },
    { title: "SLA Health", value: "99.2%", trend: "0%", icon: "health_and_safety" },
    { title: "Cost & Billing", value: "$1.2k", trend: "+$200", icon: "payments", subtitle: "Daily run rate" },
    { title: "Risk Score", value: "Low", trend: "Stable", icon: "shield", color: "secondary" },
    { title: "Drift Alerts", value: "3", trend: "+1", icon: "radar", alert: true, color: "accent" },
  ] as KPIItem[],
  decisions: [
    { icon: "check_circle", title: "Model Version 4.2 Deployment", time: "2m ago", desc: "Approved by Auto-Governance Protocol | Confidence: 99.8%", color: "secondary" },
    { icon: "warning", title: "Latency Spike Detection", time: "14m ago", desc: "Mitigation strategy deployed to cluster Alpha-7. Rerouting traffic.", color: "accent" },
    { icon: "smart_toy", title: "Resource Scaling: Node Group B", time: "1h ago", desc: "Predictive scaling activated based on traffic pattern analysis.", color: "primary" },
    { icon: "verified_user", title: "Compliance Check: GDPR Sector 4", time: "2h ago", desc: "Routine scan completed. 0 violations found. Report generated.", color: "secondary" },
  ] as DecisionItemData[],
  feed: [
    { time: "10:42:01", status: "INFO", msg: "Connection established [Node-224]", color: "blue", opacity: "40" },
    { time: "10:42:05", status: "SUCCESS", msg: "Payload verified (24kb)", color: "green", opacity: "60" },
    { time: "10:42:12", status: "WARN", msg: "Drift detected in subset vector. Correcting...", color: "orange" },
    { time: "10:42:15", status: "INFO", msg: "Re-indexing shard 04...", color: "blue" },
    { time: "10:42:18", status: "EXEC", msg: "Auto-scaling trigger > 80% CPU", color: "primary" },
    { time: "10:42:21", status: "SUCCESS", msg: "New instance provisioned (230ms)", color: "green", opacity: "80" },
    { time: "10:42:24", status: "INFO", msg: "Syncing database replica...", color: "blue", opacity: "50" },
  ] as FeedLineData[],
  radarStats: [
    { label: "High Risk Zone", value: "3.4%", color: "accent" },
    { label: "Safe Zone", value: "94.1%", color: "secondary" },
    { label: "Observation", value: "2.5%", color: "primary" },
  ] as RadarStatData[],
  healthNodes: [
    { name: "Core-A1", load: "42%", status: "secondary" },
    { name: "Core-A2", load: "38%", status: "secondary" },
    { name: "Edge-B1", load: "89%", status: "accent" },
    { name: "Edge-B2", load: "45%", status: "secondary" },
    { name: "Data-S1", load: "IOPS: Good", status: "secondary" },
    { name: "Data-S2", load: "IOPS: Good", status: "secondary" },
    { name: "Auth-G1", load: "Maint.", status: "primary" },
    { name: "Auth-G2", load: "Active", status: "secondary" },
  ] as HealthNodeData[],
  chatMessages: [
    {
      sender: "ASI System",
      text: "Drift alert in Sector 4 confirmed. I suggest re-allocating 20% of inference power to the secondary model.",
    },
    { sender: "User", text: "Execute reallocation.", isUser: true },
    { sender: "ASI System", text: "Reallocation complete. Latency reduced by 14%.", success: true },
  ] as ChatMessageData[],
};
