import React from 'react';
import { SettingsSection, SettingsRow, SettingControl } from '../atoms';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export const GeneralTab = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SettingsSection
        title="Language & Appearance"
        description="Personalize how the ASI Enterprise Operating System looks and feels."
        icon="language"
      >
        <SettingsRow label="System Language" description="Select your preferred language for the interface.">
          <SettingControl>
            <Select defaultValue="th">
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="th">ภาษาไทย (Thai)</SelectItem>
                <SelectItem value="en">English (US)</SelectItem>
              </SelectContent>
            </Select>
          </SettingControl>
        </SettingsRow>

        <SettingsRow label="Visual Theme" description="Choose between light, dark, or system-synced display modes.">
          <SettingControl>
            <RadioGroup defaultValue="dark" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="theme-light" />
                <Label htmlFor="theme-light" className="text-xs uppercase font-bold tracking-widest cursor-pointer">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="theme-dark" />
                <Label htmlFor="theme-dark" className="text-xs uppercase font-bold tracking-widest cursor-pointer">Dark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="auto" id="theme-auto" />
                <Label htmlFor="theme-auto" className="text-xs uppercase font-bold tracking-widest cursor-pointer">Auto</Label>
              </div>
            </RadioGroup>
          </SettingControl>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title="Regional & Startup"
        description="Configure timezone and your default landing page."
        icon="schedule"
      >
        <SettingsRow label="Timezone" description="Affects timestamps for logs and scheduled events.">
          <SettingControl>
            <Select defaultValue="bangkok">
              <SelectTrigger className="w-full bg-white/5 border-white/10">
                <SelectValue placeholder="Select Timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bangkok">(GMT+7) Bangkok, Jakarta, Hanoi</SelectItem>
                <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
              </SelectContent>
            </Select>
          </SettingControl>
        </SettingsRow>

        <SettingsRow label="Startup Page" description="Choose which dashboard you see first after login.">
          <SettingControl>
            <Select defaultValue="overview">
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                <SelectValue placeholder="Select Page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Executive Overview</SelectItem>
                <SelectItem value="chat">Standard AI Chat</SelectItem>
                <SelectItem value="meeting">AI Meeting Room</SelectItem>
              </SelectContent>
            </Select>
          </SettingControl>
        </SettingsRow>
      </SettingsSection>
    </div>
  );
};
