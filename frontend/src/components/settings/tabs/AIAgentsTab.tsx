import React from 'react';
import { SettingsSection, SettingsRow, SettingControl } from '../atoms';
import { AgentCard } from '../molecules';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { mockOrganizationAgents } from '@/lib/mock/settings';

export const AIAgentsTab = ({ isAdmin, onEditAgent }: { isAdmin: boolean, onEditAgent: () => void }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SettingsSection
        title="My AI Preferences"
        description="Customize your personal interaction with ASI agents."
        icon="person_search"
      >
        <SettingsRow label="Default Assistant" description="The primary agent that responds to your general queries.">
          <SettingControl>
            <Select defaultValue="agent-1">
              <SelectTrigger className="w-[200px] bg-white/5 border-white/10">
                <SelectValue placeholder="Select Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agent-1">SmartNote Assistant (General)</SelectItem>
                <SelectItem value="agent-fin">Finance-Expert</SelectItem>
              </SelectContent>
            </Select>
          </SettingControl>
        </SettingsRow>

        <SettingsRow label="Assistance Level" description="Control how proactive your AI assistant is.">
          <SettingControl>
            <RadioGroup defaultValue="balanced" className="flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="balanced" id="level-balanced" />
                <Label htmlFor="level-balanced" className="text-xs uppercase font-bold cursor-pointer">Balanced</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="proactive" id="level-proactive" />
                <Label htmlFor="level-proactive" className="text-xs uppercase font-bold cursor-pointer">Proactive (AI suggests first)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reactive" id="level-reactive" />
                <Label htmlFor="level-reactive" className="text-xs uppercase font-bold cursor-pointer">Reactive (Only on command)</Label>
              </div>
            </RadioGroup>
          </SettingControl>
        </SettingsRow>

        <SettingsRow label="Tool Usage Permissions" description="Allow AI to access external tools on your behalf.">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-xl border border-white/5">
              <Checkbox id="tool-search" defaultChecked />
              <Label htmlFor="tool-search" className="text-[10px] uppercase font-bold cursor-pointer">Web Search</Label>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-xl border border-white/5">
              <Checkbox id="tool-drive" defaultChecked />
              <Label htmlFor="tool-drive" className="text-[10px] uppercase font-bold cursor-pointer">Read Drive/SharePoint</Label>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-xl border border-white/5">
              <Checkbox id="tool-email" />
              <Label htmlFor="tool-email" className="text-[10px] uppercase font-bold cursor-pointer">Send Emails</Label>
            </div>
          </div>
        </SettingsRow>
      </SettingsSection>

      {isAdmin && (
        <SettingsSection
          title="Organization AI Catalog"
          description="Manage and publish AI Agents for the entire enterprise."
          icon="corporate_fare"
        >
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-xs font-black uppercase text-text-muted tracking-[0.2em]">Published Agents</h3>
             <Button
               size="sm"
               className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4"
               onClick={onEditAgent}
             >
               + Create New Agent
             </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockOrganizationAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>

          <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-2xl">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Pending Approvals</p>
            <div className="flex items-center justify-between">
              <p className="text-sm">Marketing-Expert v1.0 (Waiting for CMO approval)</p>
              <Button variant="ghost" size="sm" className="text-accent hover:bg-accent/10 text-[10px] font-bold uppercase">View</Button>
            </div>
          </div>
        </SettingsSection>
      )}
    </div>
  );
};
