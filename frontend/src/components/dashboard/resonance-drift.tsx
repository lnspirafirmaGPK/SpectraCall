
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import { Radio } from "lucide-react";

const driftData = [
  { time: "00:00", value: 45, drift: 2 },
  { time: "04:00", value: 52, drift: 5 },
  { time: "08:00", value: 48, drift: 3 },
  { time: "12:00", value: 61, drift: 8 },
  { time: "16:00", value: 55, drift: 4 },
  { time: "20:00", value: 58, drift: 6 },
  { time: "23:59", value: 50, drift: 2 },
];

export function ResonanceDriftMonitoring() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-headline flex items-center gap-2">
              <Radio className="w-5 h-5 text-accent animate-pulse" />
              Resonance Drift Monitoring
            </CardTitle>
            <CardDescription>AI Agent stability and alignment tracking</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-sm text-emerald-400 font-mono">Stable</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold">Current State</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ChartContainer config={{
            value: { label: "Resonance", color: "hsl(var(--primary))" },
            drift: { label: "Drift", color: "hsl(var(--accent))" }
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={driftData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDrift" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="drift" 
                  stroke="hsl(var(--accent))" 
                  fillOpacity={1} 
                  fill="url(#colorDrift)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col gap-1">
             <span className="text-[10px] uppercase font-bold text-muted-foreground">Mean Resonance</span>
             <span className="text-lg font-mono text-primary">0.982</span>
          </div>
          <div className="flex flex-col gap-1">
             <span className="text-[10px] uppercase font-bold text-muted-foreground">Alignment Drift</span>
             <span className="text-lg font-mono text-accent">&lt; 0.04%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
