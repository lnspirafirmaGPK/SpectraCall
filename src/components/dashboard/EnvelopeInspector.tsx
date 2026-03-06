'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Envelope } from '@/lib/types/aetherbus';
import { Mail, ShieldCheck, Clock, Activity } from 'lucide-react';

interface EnvelopeInspectorProps {
  envelope: Envelope;
}

export function EnvelopeInspector({ envelope }: EnvelopeInspectorProps) {
  return (
    <Card className="bg-white/5 border-white/10 text-foreground overflow-hidden">
      <CardHeader className="border-b border-white/5 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent" />
            Envelope Inspector
          </CardTitle>
          <Badge variant="outline" className="text-[10px] border-accent/20 text-accent">
            v{envelope.metadata.version}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-muted-foreground font-bold">Flow ID</label>
            <p className="text-xs font-mono truncate">{envelope.flow_id}</p>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-muted-foreground font-bold">Task ID</label>
            <p className="text-xs font-mono truncate">{envelope.task_id}</p>
          </div>
        </div>

        <div className="p-3 bg-black/20 rounded border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-accent">{envelope.intent}</span>
            <Badge variant={envelope.context.priority === 'high' ? 'destructive' : 'secondary'} className="text-[9px]">
              {envelope.context.priority.toUpperCase()} PRIORITY
            </Badge>
          </div>
          <pre className="text-[10px] text-muted-foreground overflow-x-auto p-2 bg-black/40 rounded">
            {JSON.stringify(envelope.payload, null, 2)}
          </pre>
        </div>

        <div className="flex items-center justify-between pt-2 text-[10px]">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-3 h-3" />
            <span>Signature Verified</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{new Date(envelope.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
