"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cpu, Zap, Activity, ShieldCheck, Box, Layers, MousePointer2, CpuIcon, Database } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

const TIERS = [
  {
    id: "cognitive",
    name: "The Cognitive Plane",
    desc: "Python + uvloop + Local Caching",
    latencyTarget: "< 1ms",
    currentLatency: "0.82ms",
    color: "hsl(var(--primary))",
  },
  {
    id: "tachyon",
    name: "The Tachyon Bridge",
    desc: "Rust + PyO3 Zero-Copy FFI",
    latencyTarget: "< 50µs",
    currentLatency: "32µs",
    color: "hsl(var(--accent))",
  },
  {
    id: "silicon",
    name: "The Silicon Fabric",
    desc: "RDMA / RoCE v2 Kernel Bypass",
    latencyTarget: "< 5µs",
    currentLatency: "3.1µs",
    color: "hsl(var(--accent))",
  }
];

export function AetherBusStatus() {
  const [throughput, setThroughput] = useState(15.2); // Million msg/s (Tachyon)
  const [pythonThroughput, setPythonThroughput] = useState(582.4); // K msg/s (HFT Optimized)
  const [load, setLoad] = useState(64);

  useEffect(() => {
    const interval = setInterval(() => {
      setThroughput(prev => Math.min(18, Math.max(14, prev + (Math.random() - 0.5) * 0.5)));
      setPythonThroughput(prev => Math.min(650, Math.max(550, prev + (Math.random() - 0.5) * 10)));
      setLoad(prev => Math.min(100, Math.max(40, prev + (Math.random() - 0.5) * 5)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass-card overflow-hidden border-t-2 border-t-accent/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-headline flex items-center gap-2">
              <Cpu className="w-5 h-5 text-accent" />
              AetherBus v4.0 (Speed of Light)
            </CardTitle>
            <CardDescription className="text-xs">HFT-Optimized ASI Core v4.3.1</CardDescription>
          </div>
          <Badge variant="outline" className="font-mono text-[10px] border-accent/30 text-accent animate-pulse">
            SLOT-BASED MEMORY
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Tachyon Throughput</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-mono text-accent">{throughput.toFixed(1)}M</span>
              <span className="text-[10px] text-muted-foreground">msg/s</span>
            </div>
            <Progress value={(throughput / 20) * 100} className="h-1 bg-white/5" />
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Python Dispatch</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-mono text-primary">{pythonThroughput.toFixed(1)}K</span>
              <span className="text-[10px] text-muted-foreground">msg/s</span>
            </div>
            <div className="flex gap-2 mt-1">
               <Badge className="bg-emerald-500/10 text-emerald-400 text-[8px] border-none h-4 px-1">HFT+ 150X</Badge>
            </div>
          </div>
        </div>

        {/* HFT Optimization Specs */}
        <div className="grid grid-cols-3 gap-2">
           <div className="flex flex-col items-center p-2 rounded bg-black/20 border border-white/5 text-center">
              <MousePointer2 className="w-3 h-3 text-accent mb-1" />
              <span className="text-[8px] font-bold uppercase text-muted-foreground">No Dot Lookup</span>
           </div>
           <div className="flex flex-col items-center p-2 rounded bg-black/20 border border-white/5 text-center">
              <Database className="w-3 h-3 text-accent mb-1" />
              <span className="text-[8px] font-bold uppercase text-muted-foreground">__slots__ Only</span>
           </div>
           <div className="flex flex-col items-center p-2 rounded bg-black/20 border border-white/5 text-center">
              <CpuIcon className="w-3 h-3 text-accent mb-1" />
              <span className="text-[8px] font-bold uppercase text-muted-foreground">Atomic ID Gen</span>
           </div>
        </div>

        {/* Tier Visualization */}
        <div className="space-y-3">
           <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
             <Layers className="w-3 h-3" /> Architecture Layers
           </div>
           <div className="space-y-2 relative">
             <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/10" />
             {TIERS.map((tier) => (
               <div key={tier.id} className="relative pl-8 group">
                 <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card border border-white/10 flex items-center justify-center z-10 group-hover:border-accent/50 transition-colors">
                    <Box className="w-3 h-3 text-muted-foreground group-hover:text-accent" />
                 </div>
                 <div className="p-3 rounded-md bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold">{tier.name}</p>
                      <p className="text-[10px] text-muted-foreground">{tier.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-mono text-accent">{tier.currentLatency}</p>
                      <p className="text-[9px] text-muted-foreground uppercase">{tier.latencyTarget}</p>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Low-level details */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[9px] font-mono opacity-60 justify-center border-t border-white/5 pt-4">
           <div className="flex items-center gap-1"><Zap className="w-2 h-2" /> RoCE v2</div>
           <div className="flex items-center gap-1"><Zap className="w-2 h-2" /> Zero-Copy</div>
           <div className="flex items-center gap-1"><Zap className="w-2 h-2" /> Local Cache</div>
           <div className="flex items-center gap-1"><Zap className="w-2 h-2" /> uvloop</div>
           <div className="flex items-center gap-1"><Zap className="w-2 h-2" /> fire-and-forget</div>
        </div>
      </CardContent>
    </Card>
  );
}
