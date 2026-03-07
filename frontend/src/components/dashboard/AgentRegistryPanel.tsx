'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AgentRegistryEntry } from '@/lib/types/agents';
import { Users, Shield, Cpu } from 'lucide-react';

interface AgentRegistryPanelProps {
  agents: AgentRegistryEntry[];
}

export function AgentRegistryPanel({ agents }: AgentRegistryPanelProps) {
  return (
    <Card className="bg-white/5 border-white/10 text-foreground">
      <CardHeader>
        <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
          <Users className="w-4 h-4 text-accent" />
          Agent Registry
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {agents.map((agent) => (
            <div key={agent.id} className="group p-3 border border-white/5 rounded-lg bg-black/20 hover:border-accent/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-accent/10 rounded text-accent">
                    <Cpu className="w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">{agent.name}</h4>
                    <p className="text-[10px] text-muted-foreground">{agent.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-accent">
                    <Shield className="w-3 h-3" />
                    {(agent.trust_score * 100).toFixed(0)}% Trust
                  </div>
                  <Badge variant="outline" className={`text-[9px] mt-1 ${
                    agent.status === 'online' ? 'border-emerald-500/50 text-emerald-400' :
                    agent.status === 'busy' ? 'border-amber-500/50 text-amber-400' :
                    'border-red-500/50 text-red-400'
                  }`}>
                    {agent.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {agent.capabilities.map((cap) => (
                  <span key={cap.name} className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded border border-white/5 text-muted-foreground">
                    {cap.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
