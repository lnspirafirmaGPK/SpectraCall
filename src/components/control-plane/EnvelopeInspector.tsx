"use client";

import { AsiEnvelope } from "@/lib/types/envelope";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Fingerprint, Database, Network } from "lucide-react";

interface EnvelopeInspectorProps {
  envelope: AsiEnvelope<any>;
}

export function EnvelopeInspector({ envelope }: EnvelopeInspectorProps) {
  return (
    <Card className="bg-background/40 backdrop-blur-md border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          Canonical ASI Envelope
        </CardTitle>
        <Badge variant="outline" className="border-primary/30 text-primary uppercase text-[10px]">
          {envelope.asi.classification}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[10px] uppercase text-muted-foreground font-semibold">Type</p>
            <p className="text-xs font-mono truncate">{envelope.type}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase text-muted-foreground font-semibold">Source</p>
            <p className="text-xs font-mono truncate">{envelope.source}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase text-muted-foreground font-semibold">Agent ID</p>
            <p className="text-xs font-mono truncate">{envelope.asi.agent_id}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase text-muted-foreground font-semibold">Policy Scope</p>
            <p className="text-xs font-mono truncate">{envelope.asi.policy_scope}</p>
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 space-y-3">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase text-muted-foreground font-semibold">Lineage Hash</p>
              <p className="text-xs font-mono truncate text-cyan-400">{envelope.asi.lineage_hash}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Network className="w-3.5 h-3.5 text-amber-400" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase text-muted-foreground font-semibold">Traceparent</p>
              <p className="text-xs font-mono truncate text-amber-400">{envelope.traceparent}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase text-muted-foreground font-semibold">Payload Hash</p>
              <p className="text-xs font-mono truncate text-emerald-400">{envelope.asi.payload_hash}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
