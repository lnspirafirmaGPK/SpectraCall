export interface AppRoute {
  name: string
  href: string
  icon: string
  description: string
  badge?: "New"
  headerTitle: string
  searchPlaceholder?: string
  category: "mission" | "control" | "analysis" | "support"
}

export const appRoutes: AppRoute[] = [
  {
    name: "Dashboard",
    href: "/overview",
    icon: "dashboard",
    description: "Global KPIs, decision spotlight, and live infrastructure health.",
    headerTitle: "System Overview",
    category: "mission",
  },
  {
    name: "Mission Control",
    href: "/workspace",
    icon: "space_dashboard",
    description: "Operational queue, approvals, alerts, and executive orchestration.",
    headerTitle: "Mission Control",
    category: "mission",
  },
  {
    name: "Budget Reallocation",
    href: "/workspace/budget-reallocation",
    icon: "account_balance_wallet",
    description: "End-to-end decision workflow with evidence, policy, and replay lineage.",
    badge: "New",
    headerTitle: "Budget Reallocation",
    category: "control",
  },
  {
    name: "ASI Control Plane",
    href: "/workspace/control-plane/budget-reallocation",
    icon: "security",
    description: "Control-plane operator surface for governed budget reallocation flows.",
    badge: "New",
    headerTitle: "ASI Control Plane",
    category: "control",
  },
  {
    name: "Service Catalog",
    href: "/workspace/control-plane/services",
    icon: "globe",
    description: "Cross-plane service inventory, dependencies, and interface contracts.",
    headerTitle: "Service Catalog",
    searchPlaceholder: "Search services, events, owners...",
    category: "control",
  },
  {
    name: "Tachyon Core",
    href: "/council",
    icon: "memory",
    description: "Governance council, intent shaping, and strategic AI decisions.",
    headerTitle: "CEO AI Council & Intent Builder",
    searchPlaceholder: "Search directives...",
    category: "analysis",
  },
  {
    name: "Resonance",
    href: "/diagnostics",
    icon: "ssid_chart",
    description: "Diagnostics, drift monitoring, and system signal analysis.",
    headerTitle: "Diagnostics",
    searchPlaceholder: "Search trace ID...",
    category: "analysis",
  },
  {
    name: "Infrastructure",
    href: "/infrastructure",
    icon: "hub",
    description: "Topology map, transport latency, and node health across the platform.",
    badge: "New",
    headerTitle: "Infrastructure",
    searchPlaceholder: "Search regions, nodes, transports...",
    category: "analysis",
  },
  {
    name: "Creator Studio",
    href: "/creator",
    icon: "brush",
    description: "Composable workflow authoring for autonomous operations.",
    headerTitle: "Agent Creator Studio",
    searchPlaceholder: "Search resources...",
    category: "analysis",
  },
  {
    name: "Accounting Dept",
    href: "/accounting",
    icon: "account_balance",
    description: "Finance workflows, agent collaboration, and accounting evidence tracking.",
    badge: "New",
    headerTitle: "Accounting Department",
    searchPlaceholder: "Search ledgers, agents, decisions...",
    category: "support",
  },
  {
    name: "Audit Logs",
    href: "/operations",
    icon: "description",
    description: "Operational history, replay evidence, and audit trail review.",
    headerTitle: "Operations",
    searchPlaceholder: "Search operational context...",
    category: "support",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "settings",
    description: "System preferences, policies, and AI configuration controls.",
    headerTitle: "Settings",
    category: "support",
  },
]

export function getRouteMeta(pathname: string) {
  return [...appRoutes]
    .sort((a, b) => b.href.length - a.href.length)
    .find((route) => pathname === route.href || (route.href !== "/" && pathname.startsWith(`${route.href}/`)))
}
