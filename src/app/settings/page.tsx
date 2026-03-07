"use client";

import React, { useState } from 'react';
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { GeneralTab } from "@/components/settings/tabs/GeneralTab";
import { AIAgentsTab } from "@/components/settings/tabs/AIAgentsTab";
import { GovernanceTab } from "@/components/settings/tabs/GovernanceTab";
import { ProfileTab } from "@/components/settings/tabs/ProfileTab";
import { IntegrationsTab } from "@/components/settings/tabs/IntegrationsTab";
import { NotificationsTab } from "@/components/settings/tabs/NotificationsTab";
import { BillingTab } from "@/components/settings/tabs/BillingTab";
import { AdvancedTab } from "@/components/settings/tabs/AdvancedTab";
import { AIAgentEditor } from "@/components/settings/AIAgentEditor";
import { mockUserProfile } from "@/lib/mock/settings";

export default function SettingsPage() {
  const [isEditingAgent, setIsEditingAgent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isAdmin = mockUserProfile.role === 'Admin' || mockUserProfile.role === 'Owner';
  const isCompliance = mockUserProfile.role === 'Compliance' || isAdmin;

  if (isEditingAgent) {
    return (
      <div className="flex h-screen overflow-hidden bg-background-dark text-text-main font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-10">
            <AIAgentEditor onBack={() => setIsEditingAgent(false)} />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-text-main font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-10 pb-20">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h1 className="text-4xl font-black text-white tracking-tight">System Settings</h1>
              <div className="relative w-full md:w-[400px]">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">search</span>
                <Input
                  placeholder="Search settings (Cmd+K)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-white/5 border-white/10 h-12 rounded-2xl focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <Tabs defaultValue="general" className="w-full">
              <div className="sticky top-0 bg-background-dark/80 backdrop-blur-md z-10 py-4 -mx-4 px-4 overflow-x-auto no-scrollbar">
                <TabsList className="bg-transparent h-auto p-0 gap-2 flex-nowrap justify-start">
                  {[
                    { id: 'general', label: 'General', icon: 'settings', visible: true },
                    { id: 'agents', label: 'AI Agents', icon: 'smart_toy', visible: true },
                    { id: 'governance', label: 'Governance', icon: 'gavel', visible: isCompliance },
                    { id: 'profile', label: 'Profile', icon: 'person', visible: true },
                    { id: 'integrations', label: 'Integrations', icon: 'apps', visible: true },
                    { id: 'notifications', label: 'Notifications', icon: 'notifications', visible: true },
                    { id: 'billing', label: 'Billing', icon: 'payments', visible: isAdmin },
                    { id: 'advanced', label: 'Advanced', icon: 'code', visible: isAdmin },
                  ].filter(t => t.visible).map(tab => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="data-[state=active]:bg-primary data-[state=active]:text-white bg-white/5 text-text-muted border border-white/5 rounded-xl px-6 py-3 text-xs font-black uppercase tracking-widest gap-2 transition-all hover:bg-white/10"
                    >
                      <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="mt-8">
                <TabsContent value="general"><GeneralTab /></TabsContent>
                <TabsContent value="agents"><AIAgentsTab isAdmin={isAdmin} onEditAgent={() => setIsEditingAgent(true)} /></TabsContent>
                <TabsContent value="governance"><GovernanceTab /></TabsContent>
                <TabsContent value="profile"><ProfileTab /></TabsContent>
                <TabsContent value="integrations"><IntegrationsTab /></TabsContent>
                <TabsContent value="notifications"><NotificationsTab /></TabsContent>
                <TabsContent value="billing"><BillingTab /></TabsContent>
                <TabsContent value="advanced"><AdvancedTab /></TabsContent>
              </div>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
