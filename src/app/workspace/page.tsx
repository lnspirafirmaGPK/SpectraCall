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

type RoleFilter = "all" | "CEO" | "CTO" | "Ops" | "Risk"

export default function WorkspacePage() {
  const [data, setData] = useState<WorkspaceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all")
  const [severityFilter, setSeverityFilter] = useState<Severity | "all">("all")
  const [showCompleted, setShowCompleted] = useState(true)
  const [actionMessage, setActionMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getWorkspaceData()
        setData(response)
      } catch {
        setError("โหลดข้อมูล Mission Control ไม่สำเร็จ")
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  const filteredApprovals = useMemo(() => {
    if (!data) return []

    return data.approvals.filter((item) => {
      const matchRole = roleFilter === "all" ? true : item.role === roleFilter
      const matchSeverity = severityFilter === "all" ? true : item.severity === severityFilter
      const matchCompleted = showCompleted ? true : item.status !== "completed"
      return matchRole && matchSeverity && matchCompleted
    })
  }, [data, roleFilter, severityFilter, showCompleted])

  const runAction = (callback: () => Promise<{ ok: boolean; message: string }>) => {
    startTransition(() => {
      callback()
        .then((result) => setActionMessage(result.message))
        .catch(() => setActionMessage("ไม่สามารถทำรายการได้ในขณะนี้"))
    })
  }

  if (loading) {
    return <WorkspaceShell><div className="p-6 text-sm text-slate-500">Loading Mission Control...</div></WorkspaceShell>
  }

  if (error) {
    return <WorkspaceShell><div className="p-6 text-sm text-red-500">{error}</div></WorkspaceShell>
  }

  if (!data) {
    return <WorkspaceShell><div className="p-6 text-sm text-slate-500">No data available.</div></WorkspaceShell>
  }

  const pendingCount = filteredApprovals.filter((item) => item.status === "pending").length
  const blockedCount = filteredApprovals.filter((item) => item.status === "blocked").length
  const criticalCount = data.alerts.filter((item) => item.severity === "critical").length

  return (
    <WorkspaceShell>
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-6 lg:p-8">
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-border-subtle dark:bg-background-card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Executive Workspace</p>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white lg:text-4xl">SpectraCall Mission Control</h1>
              <p className="max-w-3xl text-sm text-slate-500 dark:text-slate-400 lg:text-base">ศูนย์ควบคุมการตัดสินใจ, ความเสี่ยง, ต้นทุน, และสถานะโครงสร้างพื้นฐาน</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <QuickAction icon="rocket_launch" label="Deploy" onClick={() => runAction(() => deployAction())} disabled={isPending} />
              <QuickAction icon="verified_user" label="Approve" onClick={() => runAction(() => approveAction())} disabled={isPending} />
              <QuickAction icon="emergency" label="Escalate" onClick={() => runAction(() => escalteAction())} disabled={isPending} />
              <QuickAction icon="auto_awesome" label="AI Brief" onClick={() => runAction(() => briefAction())} disabled={isPending} />
            </div>
          </div>
          {actionMessage && <p className="rounded-lg bg-primary/10 px-3 py-2 text-xs text-primary">{actionMessage}</p>}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {data.metrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8 flex flex-col gap-6">
            <Panel
              title="Approval Queue"
              subtitle="งานที่รอการยืนยันและตรวจสอบ"
              icon="fact_check"
              rightSlot={<div className="flex gap-2"><Chip label={`${pendingCount} pending`} tone="primary" /><Chip label={`${blockedCount} blocked`} tone="accent" /><Chip label={`${criticalCount} critical`} tone="accent" /></div>}
            >
              <div className="mb-5 grid grid-cols-1 gap-3 lg:grid-cols-4">
                <FilterSelect<RoleFilter> label="Role" value={roleFilter} onChange={setRoleFilter} options={["all", "CEO", "CTO", "Ops", "Risk"]} />
                <FilterSelect<Severity | "all"> label="Severity" value={severityFilter} onChange={setSeverityFilter} options={["all", "low", "medium", "high", "critical"]} />
                <button
                  onClick={() => setShowCompleted((prev) => !prev)}
                  className={cn(
                    "h-[42px] rounded-lg border px-4 text-sm font-medium",
                    showCompleted ? "border-primary bg-primary/10 text-primary" : "border-slate-200 bg-slate-50 text-slate-700 dark:border-border-subtle dark:bg-background-dark dark:text-slate-300"
                  )}
                >
                  {showCompleted ? "Hide completed" : "Show completed"}
                </button>
                <div className="flex h-[42px] items-center rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 dark:border-border-subtle dark:bg-background-dark dark:text-slate-300">
                  {filteredApprovals.length} items visible
                </div>
              </div>

              <div className="space-y-3">
                {filteredApprovals.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">ไม่พบรายการที่ตรงกับ filter ปัจจุบัน</div>
                ) : (
                  filteredApprovals.map((item) => (
                    <ApprovalRow
                      key={item.id}
                      item={item}
                      onExecute={(id) => runAction(() => executeApproval(id))}
                      onInspect={(id) => runAction(() => inspectApproval(id))}
                      disabled={isPending}
                    />
                  ))
                )}
              </div>
            </Panel>

            <Panel title="System Topology" subtitle="สถานะ node สำคัญของ orchestration fabric" icon="lan">
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {data.systems.map((node) => (
                  <SystemCard key={node.id} node={node} />
                ))}
              </div>
            </Panel>

            <Panel title="Live Event Timeline" subtitle="เหตุการณ์ล่าสุดที่กระทบระบบ" icon="timeline">
              <div className="space-y-4">
                {data.timeline.map((event) => (
                  <TimelineRow key={event.id} event={event} />
                ))}
              </div>
            </Panel>
          </div>

          <div className="xl:col-span-4 flex flex-col gap-6">
            <Panel title="AI Recommendations" subtitle="ข้อเสนอเชิงปฏิบัติจาก ASI" icon="auto_awesome">
              <div className="space-y-3">
                {data.recommendations.map((item) => (
                  <RecommendationCard key={item.id} item={item} onApply={(id) => runAction(() => applyRecommendation(id))} disabled={isPending} />
                ))}
              </div>
            </Panel>

            <Panel title="Active Alerts" subtitle="รายการแจ้งเตือนที่ต้องติดตาม" icon="warning">
              <div className="space-y-2">
                {data.alerts.map((item) => (
                  <AlertRow key={item.id} item={item} onOpen={(id) => runAction(() => openAlert(id))} disabled={isPending} />
                ))}
              </div>
            </Panel>

            <Panel title="Snapshot" subtitle="สรุปสถานะโดยรวม" icon="query_stats">
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

function WorkspaceShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light font-sans text-slate-900 antialiased dark:bg-background-dark dark:text-slate-100">
      <Sidebar />
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
