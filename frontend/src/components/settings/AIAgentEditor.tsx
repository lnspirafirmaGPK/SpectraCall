"use client";

import React from 'react';
import { SettingsSection, SettingsRow, SettingControl } from './atoms';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface AIAgentEditorProps {
  onBack: () => void;
  agentId?: string;
}

export const AIAgentEditor = ({ onBack, agentId }: AIAgentEditorProps) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between sticky top-0 bg-background-dark/80 backdrop-blur-md py-4 z-10 border-b border-white/5">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="material-symbols-outlined text-text-muted hover:text-white">arrow_back</Button>
          <h1 className="text-2xl font-black">{agentId ? 'Edit AI Agent' : 'Create New AI Agent'}</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onBack} className="text-xs font-black uppercase tracking-widest">Cancel</Button>
          <Button className="bg-primary text-white text-xs font-black uppercase tracking-widest px-8">Save Agent</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        <div className="lg:col-span-2 space-y-8">
          <SettingsSection title="Basic Information" icon="info">
            <div className="flex gap-6 items-center py-4 border-b border-white/5">
              <Avatar className="size-20 rounded-2xl border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-black">AI</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="border-white/10 text-[10px] font-black uppercase">Upload Avatar</Button>
            </div>

            <SettingsRow label="Agent Name">
              <Input placeholder="e.g. Finance-Expert v2.1" className="bg-white/5 border-white/10" />
            </SettingsRow>

            <SettingsRow label="Role & Department">
              <div className="flex gap-2 w-[400px]">
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                    <SelectItem value="cfo">CFO</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Select Dept" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </SettingsRow>

            <div className="space-y-2 pt-4">
              <Label className="text-xs font-bold uppercase tracking-widest text-text-muted">Description & Instructions</Label>
              <Textarea
                placeholder="Describe the agent's purpose and specific behavioral instructions..."
                className="bg-white/5 border-white/10 min-h-[120px]"
              />
            </div>
          </SettingsSection>

          <SettingsSection title="Capabilities & Tools" icon="build">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Analyze Statements', 'Tax Advisory', 'TFRS Compliance', 'Strategic Planning', 'M&A Advisory'
              ].map(cap => (
                <div key={cap} className="flex items-center space-x-2 p-3 bg-white/5 rounded-xl border border-white/5">
                  <Checkbox id={`cap-${cap}`} />
                  <Label htmlFor={`cap-${cap}`} className="text-xs font-medium cursor-pointer">{cap}</Label>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="text-primary text-[10px] font-black uppercase tracking-widest">+ Add Custom Capability</Button>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <h3 className="text-xs font-black uppercase text-text-muted">Accessible Tools</h3>
              <div className="space-y-2">
                {[
                  { id: 'tool-rag', label: 'Data Platform (RAG)', icon: 'database' },
                  { id: 'tool-sp', label: 'SharePoint Documents', icon: 'folder_shared' },
                  { id: 'tool-calc', label: 'Financial Calculator', icon: 'calculate' },
                ].map(tool => (
                  <div key={tool.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-sm">{tool.icon}</span>
                      <span className="text-sm font-medium">{tool.label}</span>
                    </div>
                    <Checkbox id={tool.id} />
                  </div>
                ))}
              </div>
            </div>
          </SettingsSection>

          <SettingsSection title="Authority & Escalation" icon="security">
            <SettingsRow label="Approval Authority" description="Maximum financial value this agent can authorize.">
              <div className="flex items-center gap-3">
                <Input type="number" defaultValue="0" className="w-[150px] bg-white/5 border-white/10" />
                <span className="text-xs font-bold text-text-muted">THB</span>
              </div>
            </SettingsRow>

            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black uppercase text-text-muted">Escalation Rules</h3>
                <Button variant="outline" size="sm" className="border-white/10 text-[10px] font-black uppercase">+ Add Rule</Button>
              </div>
              <div className="space-y-2">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm">
                  If <span className="text-primary font-bold">Risk {'>'} 30%</span> then <span className="text-accent font-bold">Notify Compliance</span>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm">
                  If <span className="text-primary font-bold">Amount {'>'} 1M</span> then <span className="text-accent font-bold">Escalate to CFO</span>
                </div>
              </div>
            </div>
          </SettingsSection>
        </div>

        <aside className="space-y-8">
          <SettingsSection title="Model & Training" icon="neurology">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black text-text-muted">Base Model</Label>
                <Select defaultValue="gpt-4o">
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="claude-3-opus">Claude 3.5 Sonnet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl space-y-3">
                <p className="text-[10px] font-black uppercase text-primary">Training Status</p>
                <p className="text-xs text-text-muted leading-relaxed">
                  Last fine-tuned on <span className="text-white font-bold">March 7, 2026</span> using 12,450 expert examples.
                </p>
                <div className="flex justify-between items-end">
                  <p className="text-xs">Accuracy</p>
                  <p className="text-xl font-black text-secondary">94.5%</p>
                </div>
                <Button variant="outline" className="w-full border-primary/20 text-primary text-[10px] font-black uppercase">Retrain Model</Button>
              </div>
            </div>
          </SettingsSection>

          <SettingsSection title="Linked Policies" icon="link">
            <div className="space-y-2">
              {[
                { id: 'pol-1', label: 'FIN-DATA-01' },
                { id: 'pol-2', label: 'FIN-APPR-02' }
              ].map(pol => (
                <div key={pol.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-xs font-bold">{pol.label}</span>
                  <Checkbox defaultChecked />
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full text-primary text-[10px] font-black uppercase tracking-widest">+ Connect Policy</Button>
          </SettingsSection>
        </aside>
      </div>
    </div>
  );
};
