'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExecutionMap } from '@/lib/types/execution-map';
import { GitBranch, CheckCircle2, Circle, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExecutionMapPanelProps {
  map: ExecutionMap;
}

export function ExecutionMapPanel({ map }: ExecutionMapPanelProps) {
  return (
    <Card className="bg-white/5 border-white/10 text-foreground">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-accent" />
            Execution Map
          </CardTitle>
          <Badge variant="outline" className="text-[10px] border-white/10">
            Flow: {map.flow_id}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
          {map.nodes.map((node, idx) => (
            <div key={node.id} className="relative">
              <div className={cn(
                "absolute -left-[21px] top-1 w-4 h-4 rounded-full border-2 bg-background flex items-center justify-center z-10",
                node.status === 'completed' ? "border-emerald-500 text-emerald-500" :
                node.status === 'running' ? "border-accent text-accent animate-pulse" :
                node.status === 'failed' ? "border-destructive text-destructive" :
                "border-muted text-muted"
              )}>
                {node.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                {node.status === 'running' && <Loader2 className="w-3 h-3 animate-spin" />}
                {node.status === 'failed' && <AlertCircle className="w-3 h-3" />}
                {node.status === 'pending' && <Circle className="w-2 h-2 fill-current" />}
              </div>

              <div className="p-3 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{node.action}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">{node.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-1.5 py-0.5 bg-black/40 rounded text-muted-foreground">
                    Agent: {node.agent_id}
                  </span>
                  {node.output_summary && (
                    <span className="text-[10px] text-emerald-400/80 italic">
                      {node.output_summary}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
