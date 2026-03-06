'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TachyonRoute } from '@/lib/types/tachyon';
import { Zap, Server, Activity, ArrowRight } from 'lucide-react';

interface TachyonPipelinePanelProps {
  routes: TachyonRoute[];
}

export function TachyonPipelinePanel({ routes }: TachyonPipelinePanelProps) {
  return (
    <Card className="bg-white/5 border-white/10 text-foreground">
      <CardHeader>
        <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4 h-4 text-accent" />
          Tachyon Routing Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {routes.map((route) => (
            <div key={route.id} className="p-3 bg-black/40 rounded-lg border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Server className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[11px] font-bold">{route.target_service}</span>
                </div>
                <Badge variant="outline" className={`text-[9px] ${
                  route.status === 'healthy' ? 'border-emerald-500/50 text-emerald-400' :
                  route.status === 'degraded' ? 'border-amber-500/50 text-amber-400' :
                  'border-red-500/50 text-red-400'
                }`}>
                  {route.status.toUpperCase()}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-accent" />
                    <span>{route.latency_ms}ms</span>
                  </div>
                  <div>{route.throughput}</div>
                </div>
                <div className="font-mono opacity-50">{route.endpoint}</div>
              </div>

              <div className="mt-3 flex items-center gap-1">
                <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent animate-pulse" style={{ width: '100%' }}></div>
                </div>
                <ArrowRight className="w-3 h-3 text-accent" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
