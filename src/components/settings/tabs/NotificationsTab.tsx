import React from 'react';
import { SettingsSection, SettingsRow, SettingControl } from '../atoms';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export const NotificationsTab = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SettingsSection
        title="Delivery Channels"
        description="Choose how you want to receive system alerts and AI updates."
        icon="notifications"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">notifications_active</span>
              <Label htmlFor="channel-app" className="font-bold cursor-pointer">In-App Notifications</Label>
            </div>
            <Switch id="channel-app" defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">mail</span>
              <Label htmlFor="channel-email" className="font-bold cursor-pointer">Email Alerts</Label>
            </div>
            <Switch id="channel-email" defaultChecked />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Notification Triggers"
        description="Select which events should trigger a notification."
        icon="notification_important"
      >
        <div className="space-y-2">
          {[
            { id: 'trigger-ai', label: 'AI Responses in Chat' },
            { id: 'trigger-meeting', label: 'New Messages in Meeting Rooms' },
            { id: 'trigger-esc', label: 'Escalations Requiring Approval' },
            { id: 'trigger-risk', label: 'High-Risk Decision Alerts' },
            { id: 'trigger-agent', label: 'New Relevant AI Agents' },
          ].map(trigger => (
            <div key={trigger.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <Label htmlFor={trigger.id} className="text-sm font-medium cursor-pointer">{trigger.label}</Label>
              <Checkbox id={trigger.id} defaultChecked />
            </div>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Quiet Hours"
        description="Suppress notifications during specific times."
        icon="do_not_disturb_on"
      >
        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-1">
            <Label className="text-[10px] uppercase font-black text-text-muted">Start Time</Label>
            <Input type="time" defaultValue="20:00" className="bg-white/5 border-white/10" />
          </div>
          <div className="flex-1 space-y-1">
            <Label className="text-[10px] uppercase font-black text-text-muted">End Time</Label>
            <Input type="time" defaultValue="07:00" className="bg-white/5 border-white/10" />
          </div>
          <div className="flex flex-col items-center justify-end h-full pt-6">
            <Switch defaultChecked />
          </div>
        </div>
      </SettingsSection>
    </div>
  );
};
