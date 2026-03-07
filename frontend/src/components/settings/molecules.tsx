import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Integration, GovernancePolicy, AuditLog } from '@/lib/types/settings';
import { AgentRegistryEntry } from '@/lib/types/agents';

export const IntegrationCard = ({ integration }: { integration: Integration }) => {
  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'disconnected': return 'bg-text-muted/10 text-text-muted border-text-muted/20';
      case 'pending': return 'bg-accent/10 text-accent border-accent/20';
      case 'error': return 'bg-accent-danger/10 text-accent-danger border-accent-danger/20';
      default: return '';
    }
  };

  return (
    <div className="flex items-center justify-between p-5 bg-white/[0.05] rounded-2xl border border-white/5 hover:border-primary/50 transition-all">
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">extension</span>
        </div>
        <div>
          <p className="font-bold text-white">{integration.name}</p>
          <p className="text-[10px] text-text-muted uppercase tracking-widest">
            {integration.status === 'connected' ? `Connected: ${integration.connectedAccount}` : `Status: ${integration.status}`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge className={cn("px-2 py-0.5 text-[10px] uppercase font-black", getStatusColor(integration.status))}>
          {integration.status}
        </Badge>
        {integration.status === 'connected' ? (
          <Button variant="ghost" size="sm" className="text-accent-danger hover:text-accent-danger hover:bg-accent-danger/10 text-[10px] font-black uppercase tracking-widest">Disconnect</Button>
        ) : (
          <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10 text-[10px] font-black uppercase tracking-widest">Connect</Button>
        )}
      </div>
    </div>
  );
};

export const PolicyCard = ({ policy }: { policy: GovernancePolicy }) => {
  return (
    <div className="p-5 bg-white/[0.05] rounded-2xl border border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-lg text-white">{policy.name}</p>
          <p className="text-[10px] text-text-muted uppercase tracking-widest">Version: {policy.version} • Last Edited: {policy.lastEdited}</p>
        </div>
        <Badge className={cn(
          "px-2 py-0.5 text-[10px] uppercase font-black",
          policy.status === 'active' ? 'bg-secondary/10 text-secondary border-secondary/20' : 'bg-text-muted/10 text-text-muted border-text-muted/20'
        )}>
          {policy.status}
        </Badge>
      </div>
      <p className="text-sm text-text-muted leading-relaxed">{policy.description}</p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="text-[10px] font-black uppercase tracking-widest h-8 border-white/10 hover:bg-white/5">View Details</Button>
        <Button variant="outline" size="sm" className="text-[10px] font-black uppercase tracking-widest h-8 border-white/10 hover:bg-white/5">Edit</Button>
      </div>
    </div>
  );
};

export const AgentCard = ({ agent }: { agent: AgentRegistryEntry }) => {
  return (
    <div className="p-5 bg-white/[0.05] rounded-2xl border border-white/5 space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="size-12 rounded-xl border border-primary/20">
          <AvatarImage src={agent.avatar_url} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold">{agent.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-bold text-white">{agent.name}</p>
            <Badge className="bg-secondary/10 text-secondary border-secondary/20 text-[10px] uppercase">{agent.status}</Badge>
          </div>
          <p className="text-[10px] text-text-muted uppercase tracking-widest">
            {agent.level} • {agent.department} • Last Active: {agent.last_active}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/5 pt-4">
        <div className="text-center flex-1 border-r border-white/5">
          <p className="text-[10px] text-text-muted uppercase">Accuracy</p>
          <p className="font-bold text-primary">{agent.accuracy}%</p>
        </div>
        <div className="text-center flex-1">
          <p className="text-[10px] text-text-muted uppercase">Trust Score</p>
          <p className="font-bold text-secondary">{(agent.trust_score * 100).toFixed(1)}%</p>
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <Button variant="outline" size="sm" className="flex-1 text-[10px] font-black uppercase tracking-widest h-8 border-white/10 hover:bg-white/5">Edit</Button>
        <Button variant="outline" size="sm" className="flex-1 text-[10px] font-black uppercase tracking-widest h-8 border-white/10 hover:bg-white/5">History</Button>
      </div>
    </div>
  );
};

export const AuditLogEntry = ({ log }: { log: AuditLog }) => {
  const getRiskColor = (risk: AuditLog['riskLevel']) => {
    switch (risk) {
      case 'low': return 'text-secondary';
      case 'medium': return 'text-accent';
      case 'high': return 'text-accent-danger';
    }
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div className="space-y-1">
        <p className="text-sm font-bold text-white">{log.action}: <span className="text-primary">{log.resource}</span></p>
        <p className="text-[10px] text-text-muted uppercase tracking-widest">
          By {log.user} • {new Date(log.timestamp).toLocaleString()}
        </p>
      </div>
      <div className={cn("text-[10px] font-black uppercase tracking-tighter", getRiskColor(log.riskLevel))}>
        {log.riskLevel} Risk
      </div>
    </div>
  );
};
