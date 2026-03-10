"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import type { InfrastructureGraph, StreamEvent } from "@/lib/types/infrastructure";

const severityStyles: Record<StreamEvent["severity"], string> = {
  info: "text-sky-300 border-sky-400/30 bg-sky-500/10",
  warning: "text-amber-300 border-amber-400/30 bg-amber-500/10",
  critical: "text-rose-300 border-rose-400/30 bg-rose-500/10",
};

export default function InfrastructurePage() {
  const [graph, setGraph] = useState<InfrastructureGraph | null>(null);
  const [events, setEvents] = useState<StreamEvent[]>([]);

  useEffect(() => {
    fetch("/api/infrastructure/graph")
      .then((res) => res.json())
      .then((payload: InfrastructureGraph) => setGraph(payload));
  }, []);

  useEffect(() => {
    const source = new EventSource("/api/infrastructure/events");

    source.onmessage = (event) => {
      const payload = JSON.parse(event.data) as StreamEvent;
      setEvents((prev) => [payload, ...prev].slice(0, 10));
    };

    return () => source.close();
  }, []);

  const totals = useMemo(() => {
    if (!graph) {
      return { rps: 0, avgLatency: 0 };
    }

    const rps = graph.nodes.reduce((sum, node) => sum + node.requestsPerSecond, 0);
    const avgLatency = Math.round(graph.nodes.reduce((sum, node) => sum + node.latencyMs, 0) / graph.nodes.length);
    return { rps, avgLatency };
  }, [graph]);

  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-slate-100 font-sans antialiased flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold">Infrastructure Graph</h1>
              <p className="text-sm text-slate-400">Live topology and AetherBus event stream.</p>
            </div>
            <div className="text-right text-xs text-slate-400">
              <p>Total traffic: <span className="text-primary font-semibold">{totals.rps.toLocaleString()} rps</span></p>
              <p>Average node latency: <span className="text-primary font-semibold">{totals.avgLatency} ms</span></p>
            </div>
          </div>

          <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div className="rounded-xl border border-white/10 bg-[#11172A] p-4">
              <h2 className="font-semibold mb-3">Topology Nodes</h2>
              <div className="space-y-3">
                {graph?.nodes.map((node) => (
                  <div key={node.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{node.label}</p>
                      <span className="text-[11px] uppercase text-slate-300">{node.health}</span>
                    </div>
                    <p className="text-xs text-slate-400">{node.region} · {node.tier} tier</p>
                    <p className="text-xs text-slate-400 mt-1">{node.requestsPerSecond.toLocaleString()} rps · {node.latencyMs} ms</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#11172A] p-4">
              <h2 className="font-semibold mb-3">Active Links</h2>
              <div className="space-y-2">
                {graph?.edges.map((edge, idx) => (
                  <div key={`${edge.source}-${edge.target}-${idx}`} className="rounded-md border border-white/10 bg-white/5 p-3 text-sm">
                    <p className="font-medium">{edge.source} → {edge.target}</p>
                    <p className="text-xs text-slate-400">{edge.protocol.toUpperCase()} · {edge.throughputMbps} Mbps · p95 {edge.p95LatencyMs} ms</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-[#11172A] p-4">
            <h2 className="font-semibold mb-3">Real-time AetherBus Stream</h2>
            <div className="space-y-2">
              {events.length === 0 && <p className="text-xs text-slate-400">Waiting for stream data...</p>}
              {events.map((event) => (
                <div key={event.id} className="rounded-md border border-white/10 bg-white/5 p-3 flex justify-between items-start gap-4">
                  <div>
                    <p className="text-sm">{event.message}</p>
                    <p className="text-xs text-slate-400">{event.component} · {new Date(event.timestamp).toLocaleTimeString()}</p>
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${severityStyles[event.severity]}`}>
                    {event.severity}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
