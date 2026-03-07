import React from 'react';
import { SettingsSection, SettingsRow, SettingControl } from '../atoms';
import { PolicyCard, AuditLogEntry } from '../molecules';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { mockPolicies, mockAuditLogs } from '@/lib/mock/settings';

export const GovernanceTab = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SettingsSection
        title="Enterprise Policies"
        description="Configure governance rules and data access constraints."
        icon="gavel"
      >
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-xs font-black uppercase text-text-muted tracking-[0.2em]">Active Policies</h3>
           <Button size="sm" variant="outline" className="border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest px-4">
             + New Policy
           </Button>
        </div>
        <div className="space-y-4">
          {mockPolicies.map(policy => (
            <PolicyCard key={policy.id} policy={policy} />
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Audit Logs & Lineage"
        description="Trace system decisions and security events."
        icon="history"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 mb-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="filter-policy" defaultChecked />
              <Label htmlFor="filter-policy" className="text-[10px] uppercase font-bold cursor-pointer">Policy Changes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="filter-risk" />
              <Label htmlFor="filter-risk" className="text-[10px] uppercase font-bold cursor-pointer">High Risk Only</Label>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl border border-white/5 px-6">
            {mockAuditLogs.map(log => (
              <AuditLogEntry key={log.id} log={log} />
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 border-white/10 text-[10px] font-black uppercase">View All Logs</Button>
            <Button variant="outline" size="sm" className="flex-1 border-white/10 text-[10px] font-black uppercase">Export CSV</Button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Lineage Settings"
        description="Define data retention and artifact logging protocols."
        icon="account_tree"
      >
        <SettingsRow label="Data Retention" description="How long to store message and artifact history.">
          <SettingControl>
            <Select defaultValue="1year">
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                <SelectValue placeholder="Select Retention" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="90days">90 Days</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
                <SelectItem value="forever">Forever (Compliance)</SelectItem>
              </SelectContent>
            </Select>
          </SettingControl>
        </SettingsRow>

        <SettingsRow label="Decision Artifacts" description="Log every decision path taken by AI agents.">
           <Checkbox defaultChecked />
        </SettingsRow>
      </SettingsSection>
    </div>
  );
};
