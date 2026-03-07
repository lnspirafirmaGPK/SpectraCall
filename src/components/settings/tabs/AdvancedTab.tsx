import React from 'react';
import { SettingsSection, SettingsRow, SettingControl } from '../atoms';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export const AdvancedTab = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SettingsSection
        title="Developer Mode"
        description="Enable advanced debugging and API management features."
        icon="code"
      >
        <SettingsRow label="Enable Developer Mode" description="Shows system consoles and raw JSON views for artifacts.">
           <Switch />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title="Model Management"
        description="Configure default AI models for different workloads."
        icon="neurology"
      >
        <SettingsRow label="Primary Model" description="Default model for standard chat and general queries.">
          <SettingControl>
            <Select defaultValue="gpt-4o">
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o">GPT-4o (Default)</SelectItem>
                <SelectItem value="claude-3-opus">Claude 3.5 Sonnet</SelectItem>
                <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
              </SelectContent>
            </Select>
          </SettingControl>
        </SettingsRow>

        <SettingsRow label="Fallback Model" description="Used when the primary model is unavailable or errors out.">
          <SettingControl>
            <Select defaultValue="claude-3-opus">
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="claude-3-opus">Claude 3.5 Sonnet</SelectItem>
                <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
              </SelectContent>
            </Select>
          </SettingControl>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title="Internal Service Endpoints"
        description="Direct URLs for core ASI infrastructure components."
        icon="lan"
      >
        <div className="space-y-3">
          {[
            { label: 'AetherBus Endpoint', value: 'nats://aetherbus.internal:4222' },
            { label: 'GenesisCore API', value: 'https://genesis.internal/v1' },
            { label: 'Data Platform', value: 'postgresql://db.asi.internal:5432' },
          ].map(service => (
            <div key={service.label} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">{service.label}</p>
                <code className="text-xs text-primary">{service.value}</code>
              </div>
              <Button variant="outline" size="sm" className="border-white/10 text-[10px] font-bold uppercase">Test</Button>
            </div>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Danger Zone"
        description="Irreversible actions related to your account and data."
        icon="warning"
        className="border-accent-danger/20"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="flex-1 border-accent-danger/20 text-accent-danger hover:bg-accent-danger/10 text-[10px] font-black uppercase tracking-widest">
            Export All Personal Data
          </Button>
          <Button variant="outline" className="flex-1 border-accent-danger/20 text-accent-danger hover:bg-accent-danger/10 text-[10px] font-black uppercase tracking-widest">
            Delete My Account
          </Button>
        </div>
      </SettingsSection>
    </div>
  );
};
