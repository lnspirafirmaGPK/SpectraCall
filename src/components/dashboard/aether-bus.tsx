
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cpu, Zap, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export function AetherBusStatus() {
  const [throughput, setThroughput] = useState(84);
  const [latency, setLatency] = useState(1.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setThroughput(prev => Math.min(100, Math.max(70, prev + (Math.random() - 0.5) * 5)));
      setLatency(prev => Math.max(0.5, prev + (Math.random() - 0.5) * 0.2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass-card overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 data-flow-gradient" />
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl font-headline flex items-center gap-2">
            <Cpu className="w-5 h-5 text-accent" />
            AetherBus Data Processing
          </CardTitle>
          <CardDescription>Real-time Rust-optimized stream engine</CardDescription>
        </div>
        <div className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-mono">
          v2.4.1-stable
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Zap className="w-3 h-3 text-accent" /> Throughput
              </span>
              <span className="font-mono text-accent">{throughput.toFixed(1)} GB/s</span>
            </div>
            <Progress value={throughput} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Activity className="w-3 h-3 text-accent" /> Latency
              </span>
              <span className="font-mono text-accent">{latency.toFixed(2)}ms</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
               <div 
                 className="h-full bg-accent transition-all duration-1000" 
                 style={{ width: `${Math.max(10, 100 - latency * 10)}%` }} 
               />
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-4 text-xs">
          <div className="flex-1 p-2 rounded bg-white/5 border border-white/10">
            <p className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">Active Nodes</p>
            <p className="text-lg font-mono">12</p>
          </div>
          <div className="flex-1 p-2 rounded bg-white/5 border border-white/10">
            <p className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">Queue Size</p>
            <p className="text-lg font-mono">1.2k</p>
          </div>
          <div className="flex-1 p-2 rounded bg-white/5 border border-white/10">
            <p className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">Error Rate</p>
            <p className="text-lg font-mono text-emerald-400">0.001%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
