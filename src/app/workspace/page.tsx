"use client"

import { type ReactNode, useEffect, useMemo, useState, useTransition } from "react"
import { Header } from "@/components/layout/Header"
import { Sidebar } from "@/components/layout/Sidebar"
import {
  AlertRow,
  ApprovalRow,
  Chip,
  FilterSelect,
  MetricCard,
  Panel,
  QuickAction,
  RecommendationCard,
  SummaryStat,
  SystemCard,
  TimelineRow,
  WorkspaceSkeleton,
} from "@/components/workspace"
import {
  approveAction,
  applyRecommendation,
  briefAction,
  deployAction,
  escalteAction,
  executeApproval,
  getWorkspaceData,
  inspectApproval,
  openAlert,
} from "./actions"
import type { Severity, WorkspaceData } from "@/lib/mock/workspace"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

type RoleFilter = "all" | "CEO" | "CTO" | "Ops" | "Risk"

export default function WorkspacePage() {
  const [data, setData] = useState<WorkspaceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all")
  const [severityFilter, setSeverityFilter] = useState<Severity | "all">("all")
  const [showCompleted, setShowCompleted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getWorkspaceData()
        setData(response)
      } catch (err) {
        const msg = "ไม่สามารถโหลดข้อมูล Mission Control ได้ในขณะนี้"
        setError(msg)
        toast({
          title: "Fetch Error",
          description: msg,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [toast])

  const filteredApprovals = useMemo(() => {
    if (!data) return []

    return data.approvals.filter((item) => {
      const matchRole = roleFilter === "all" ? true : item.role === roleFilter
      const matchSeverity = severityFilter === "all" ? true : item.severity === severityFilter
      const matchCompleted = showCompleted ? true : item.status !== "completed"
      return matchRole && matchSeverity && matchCompleted
    })
  }, [data, roleFilter, severityFilter, showCompleted])

  const runAction = (callback: () => Promise<{ ok: boolean; message: string }>, actionName: string) => {
    startTransition(() => {
      callback()
        .then((result) => {
          if (result.ok) {
            toast({
              title: "Success",
              description: result.message,
            })
          } else {
            toast({
              title: "Action Failed",
              description: result.message,
              variant: "destructive",
            })
          }
        })
        .catch(() => {
          toast({
            title: "Error",
            description: `ไม่สามารถทำรายการ ${actionName} ได้ในขณะนี้`,
            variant: "destructive",
          })
        })
    })
  }

  if (loading) {
    return (
      <WorkspaceShell>
        <WorkspaceSkeleton />
      </WorkspaceShell>
    )
  }

  if (error) {
    return (
      <WorkspaceShell>
        <div className="flex h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
          <div className="rounded-full bg-red-500/10 p-4 text-red-500">
            <span className="material-symbols-outlined text-4xl text-red-500">error</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </WorkspaceShell>
    )
  }

  if (!data) return null

  const pendingCount = data.approvals.filter((item) => item.status === "pending").length
  const blockedCount = data.approvals.filter((item) => item.status === "blocked").length
  const criticalCount = data.alerts.filter((item) => item.severity === "critical").length

  return (
    <WorkspaceShell>
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-6 lg:p-8">
        {/* Main Header / KPI Section */}
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-border-subtle dark:bg-background-card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Executive Workspace</p>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white lg:text-4xl">Mission Control</h1>
              <p className="max-w-3xl text-sm text-slate-500 dark:text-slate-400 lg:text-base">Command center for strategic orchestration, risk management, and system health.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <QuickAction icon="rocket_launch" label="Deploy" onClick={() => runAction(() => deployAction(), "Deploy")} disabled={isPending} />
              <QuickAction icon="verified_user" label="Approve" onClick={() => runAction(() => approveAction(), "Approve All")} disabled={isPending} />
              <QuickAction icon="emergency" label="Escalate" onClick={() => runAction(() => escalteAction(), "Escalate")} disabled={isPending} />
              <QuickAction icon="auto_awesome" label="AI Brief" onClick={() => runAction(() => briefAction(), "AI Brief")} disabled={isPending} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-4 mt-2">
            {data.metrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Main Queue & Systems */}
          <div className="xl:col-span-8 flex flex-col gap-6">
            <Panel
              title="Approval Queue"
              subtitle="Pending strategic confirmations and overrides."
              icon="fact_check"
              rightSlot={
                <div className="flex gap-2">
                  <Chip label={`${pendingCount} pending`} tone="primary" />
                  <Chip label={`${blockedCount} blocked`} tone="accent" />
                </div>
              }
            >
              <div className="mb-5 grid grid-cols-1 gap-3 lg:grid-cols-4">
                <FilterSelect<RoleFilter> label="Role" value={roleFilter} onChange={setRoleFilter} options={["all", "CEO", "CTO", "Ops", "Risk"]} />
                <FilterSelect<Severity | "all"> label="Severity" value={severityFilter} onChange={setSeverityFilter} options={["all", "low", "medium", "high", "critical"]} />
                <button
                  onClick={() => setShowCompleted((prev) => !prev)}
                  className={cn(
                    "h-[42px] rounded-lg border px-4 text-sm font-medium transition-all",
                    showCompleted
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-slate-200 bg-slate-50 text-slate-700 dark:border-border-subtle dark:bg-background-dark dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  {showCompleted ? "Hide completed" : "Show completed"}
                </button>
                <div className="flex h-[42px] items-center rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 dark:border-border-subtle dark:bg-background-dark dark:text-slate-300">
                  {filteredApprovals.length} items visible
                </div>
              </div>

              <div className="space-y-3 min-h-[100px]">
                {filteredApprovals.length === 0 ? (
                  <EmptyState
                    icon="task"
                    title="No approvals found"
                    description="No pending actions match your current filters. Great work!"
                  />
                ) : (
                  filteredApprovals.map((item) => (
                    <ApprovalRow
                      key={item.id}
                      item={item}
                      onExecute={(id) => runAction(() => executeApproval(id), "Execute")}
                      onInspect={(id) => runAction(() => inspectApproval(id), "Inspect")}
                      disabled={isPending}
                    />
                  ))
                )}
              </div>
            </Panel>

            <Panel title="System Topology" subtitle="Orchestration fabric node health and latency." icon="lan">
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {data.systems.length === 0 ? (
                  <div className="lg:col-span-2">
                    <EmptyState icon="cloud_off" title="No active systems" description="Unable to detect any orchestration nodes in this region." />
                  </div>
                ) : (
                  data.systems.map((node) => (
                    <SystemCard key={node.id} node={node} />
                  ))
                )}
              </div>
            </Panel>

            <Panel title="Live Event Timeline" subtitle="Real-time audit log of autonomous decisions." icon="timeline">
              <div className="space-y-4">
                {data.timeline.length === 0 ? (
                  <EmptyState icon="history" title="Timeline empty" description="No system events recorded in the last 24 hours." />
                ) : (
                  data.timeline.map((event) => (
                    <TimelineRow key={event.id} event={event} />
                  ))
                )}
              </div>
            </Panel>
          </div>

          {/* Sidebar Widgets */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            <Panel
              title="AI Recommendations"
              subtitle="Optimization paths suggested by ASI."
              icon="auto_awesome"
            >
              <div className="space-y-3">
                {data.recommendations.length === 0 ? (
                  <EmptyState icon="lightbulb" title="No recommendations" description="AI is currently analyzing system patterns. Check back later." />
                ) : (
                  data.recommendations.map((item) => (
                    <RecommendationCard
                      key={item.id}
                      item={item}
                      onApply={(id) => runAction(() => applyRecommendation(id), "Apply Recommendation")}
                      disabled={isPending}
                    />
                  ))
                )}
              </div>
            </Panel>

            <Panel
              title="Active Alerts"
              subtitle="Critical anomalies requiring attention."
              icon="warning"
              rightSlot={criticalCount > 0 && <Chip label={`${criticalCount} critical`} tone="accent" />}
            >
              <div className="space-y-2">
                {data.alerts.length === 0 ? (
                  <EmptyState icon="check_circle" title="System clear" description="No active alerts detected at this moment." />
                ) : (
                  data.alerts.map((item) => (
                    <AlertRow
                      key={item.id}
                      item={item}
                      onOpen={(id) => runAction(() => openAlert(id), "Open Alert")}
                      disabled={isPending}
                    />
                  ))
                )}
              </div>
            </Panel>

            <Panel title="Executive Snapshot" subtitle="High-level health aggregation." icon="query_stats">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 xl:grid-cols-1">
                {data.summaryStats.map((item) => (
                  <SummaryStat key={item.id} item={item} />
                ))}
              </div>
            </Panel>
          </div>
        </section>
      </div>
    </WorkspaceShell>
  )
}

function EmptyState({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-10 px-6 text-center dark:border-slate-700/50">
      <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400 dark:bg-slate-800/50 dark:text-slate-500">
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  )
}

function WorkspaceShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light font-sans text-slate-900 antialiased dark:bg-background-dark dark:text-slate-100">
      <Sidebar />
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-background-dark/50">
          {children}
        </main>
      </div>
    </div>
  )
}
