"use client";

import { CheckCircle2, Circle, Clock, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExecutionStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  timestamp?: string;
  plane: string;
}

interface ExecutionMapPanelProps {
  steps: ExecutionStep[];
}

export function ExecutionMapPanel({ steps }: ExecutionMapPanelProps) {
  return (
    <div className="space-y-6 relative py-4 px-2">
      {/* Connector Line */}
      <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-border/40" />

      {steps.map((step, idx) => (
        <div key={step.id} className="relative flex items-start gap-6 group">
          {/* Status Icon */}
          <div className="z-10 mt-1">
            {step.status === 'completed' && (
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            )}
            {step.status === 'running' && (
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(35,46,242,0.3)] animate-pulse">
                <RefreshCw className="w-4 h-4 text-primary animate-spin" />
              </div>
            )}
            {step.status === 'pending' && (
              <div className="w-8 h-8 rounded-full bg-muted/20 border border-muted/50 flex items-center justify-center">
                <Circle className="w-3 h-3 text-muted-foreground" />
              </div>
            )}
            {step.status === 'failed' && (
              <div className="w-8 h-8 rounded-full bg-destructive/10 border border-destructive/50 flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                <AlertCircle className="w-4 h-4 text-destructive" />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className={cn(
                "text-sm font-semibold tracking-tight uppercase",
                step.status === 'completed' ? "text-emerald-400" :
                step.status === 'running' ? "text-primary" : "text-muted-foreground"
              )}>
                {step.name}
              </h4>
              {step.timestamp && (
                <span className="text-[10px] font-mono text-muted-foreground">
                  {new Date(step.timestamp).toLocaleTimeString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted/30 border border-muted/50 font-mono text-muted-foreground">
                {step.plane} PLANE
              </span>
              {step.status === 'running' && (
                <span className="text-[10px] text-primary animate-pulse font-medium">
                  PROCESSING...
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
