import React from 'react';
import { SettingsSection, SettingsRow, SettingControl } from '../atoms';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { mockUserProfile } from '@/lib/mock/settings';

export const ProfileTab = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SettingsSection
        title="Profile Information"
        description="Manage your personal identity within the enterprise."
        icon="person"
      >
        <div className="flex flex-col items-center sm:flex-row gap-8 py-4 border-b border-white/5">
          <Avatar className="size-24 border-4 border-primary/20">
            <AvatarImage src={mockUserProfile.avatarUrl} />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-black">SJ</AvatarFallback>
          </Avatar>
          <div className="flex gap-4">
            <Button size="sm" className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4">Upload New Photo</Button>
            <Button size="sm" variant="ghost" className="text-accent-danger text-[10px] font-black uppercase tracking-widest px-4">Remove</Button>
          </div>
        </div>

        <SettingsRow label="Full Name">
          <Input defaultValue={mockUserProfile.name} className="w-[300px] bg-white/5 border-white/10" />
        </SettingsRow>

        <SettingsRow label="Email Address">
          <div className="flex items-center gap-3">
            <Input defaultValue={mockUserProfile.email} disabled className="w-[300px] bg-white/5 border-white/10 opacity-60" />
            <span className="material-symbols-outlined text-secondary text-sm">verified</span>
          </div>
        </SettingsRow>

        <SettingsRow label="Role & Department">
          <p className="text-sm font-bold">{mockUserProfile.title} <span className="text-primary opacity-60 ml-2">({mockUserProfile.role})</span></p>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title="Security & Trust"
        description="Verify your identity and secure your account."
        icon="verified_user"
      >
        <SettingsRow label="Digital Signature" description="Required for authorizing high-value transactions.">
           <Button variant="outline" size="sm" className="border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest px-4">
             Update Signature
           </Button>
        </SettingsRow>

        <SettingsRow label="Two-Factor Authentication (2FA)" description="Adds an extra layer of security to your account.">
           <Switch defaultChecked={mockUserProfile.twoFactorEnabled} />
        </SettingsRow>

        <SettingsRow label="Active Sessions" description="Devices currently logged into your account.">
           <Button variant="ghost" size="sm" className="text-primary text-[10px] font-black uppercase tracking-widest">Manage Devices</Button>
        </SettingsRow>
      </SettingsSection>
    </div>
  );
};
