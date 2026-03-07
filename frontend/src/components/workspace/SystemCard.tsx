import type { SystemNode } from "@/lib/mock/workspace"
import { MiniStat } from "./MiniStat"
import { StatusPill } from "./StatusPill"

export function SystemCard({ node }: { node: SystemNode }) {
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
  )
}
