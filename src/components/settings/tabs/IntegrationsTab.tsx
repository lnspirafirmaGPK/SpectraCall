import React from 'react';
import { SettingsSection, SettingsRow, SettingControl } from '../atoms';
import { IntegrationCard } from '../molecules';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockIntegrations } from '@/lib/mock/settings';

export const IntegrationsTab = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SettingsSection
        title="Office Suite Connections"
        description="Connect your workspace tools to enable AI data synchronization."
        icon="apps"
      >
        <div className="grid grid-cols-1 gap-4">
          {mockIntegrations.filter(i => ['M365', 'Google', 'Zoho'].includes(i.type)).map(int => (
            <IntegrationCard key={int.id} integration={int} />
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Enterprise Systems (ERP/CRM)"
        description="Authorized connections to internal business systems."
        icon="account_tree"
      >
        <div className="grid grid-cols-1 gap-4">
          {mockIntegrations.filter(i => ['SAP', 'Salesforce'].includes(i.type)).map(int => (
            <IntegrationCard key={int.id} integration={int} />
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="API Keys & Webhooks"
        description="Manage secure access for custom integrations and developer tools."
        icon="api"
      >
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-xs font-black uppercase text-text-muted tracking-[0.2em]">Active API Keys</h3>
           <Button size="sm" className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4">
             + Generate New Key
           </Button>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
            <div>
              <p className="font-bold">Production API Key</p>
              <code className="text-[10px] text-primary bg-primary/5 px-2 py-0.5 rounded">asi_live_******************3f1a</code>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="material-symbols-outlined text-text-muted hover:text-white">content_copy</Button>
              <Button variant="ghost" size="sm" className="material-symbols-outlined text-accent-danger hover:bg-accent-danger/10">delete</Button>
            </div>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
};
