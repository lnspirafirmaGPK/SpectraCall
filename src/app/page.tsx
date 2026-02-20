
"use client";

import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { AetherBusStatus } from "@/components/dashboard/aether-bus";
import { ResonanceDriftMonitoring } from "@/components/dashboard/resonance-drift";
import { CrisisSimulation } from "@/components/dashboard/crisis-simulation";
import { AgentOrchestration } from "@/components/dashboard/agent-orchestration";
import { TachyonAnalytics } from "@/components/dashboard/tachyon-analytics";
import { RoleSwitcher, type Role } from "@/components/dashboard/role-switcher";
import { LayoutDashboard, Settings, HelpCircle, LogOut, Bell, Search, Hexagon } from "lucide-react";

export default function SpectraCallDashboard() {
  const [role, setRole] = useState<Role>("CEO");

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-background text-foreground w-full">
        {/* Main Sidebar */}
        <Sidebar className="border-r border-white/5 bg-black/20">
          <SidebarHeader className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Hexagon className="w-6 h-6 text-accent fill-accent" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-headline tracking-tighter">SpectraCall</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Aether Protocol</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Overview">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Main Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Intelligence">
                  <Search className="w-4 h-4" />
                  <span>Network Scan</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Alerts">
                  <Bell className="w-4 h-4" />
                  <span>Alert Center</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-white/5 space-y-2">
            <SidebarMenu>
               <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings className="w-4 h-4" />
                  <span>Core Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Log Out">
                  <LogOut className="w-4 h-4 text-destructive" />
                  <span className="text-destructive">Disconnect</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8 space-y-8">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
            <div className="space-y-1">
              <h2 className="text-3xl font-headline font-bold tracking-tight">System Overview</h2>
              <p className="text-muted-foreground">Monitoring AetherBus throughput and Agent alignment.</p>
            </div>
            <div className="flex items-center gap-4">
              <RoleSwitcher currentRole={role} onRoleChange={setRole} />
              <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 relative">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full animate-ping" />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Top Row Widgets */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AetherBusStatus />
                <ResonanceDriftMonitoring />
              </div>
              <TachyonAnalytics />
            </div>

            {/* Sidebar Widgets */}
            <div className="lg:col-span-4 space-y-6">
               <CrisisSimulation />
               <AgentOrchestration />
            </div>
          </div>

          {/* Footer Status Bar */}
          <footer className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Primary Core Online</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Sync Phase: Alpha-9</span>
              </div>
            </div>
            <div>
              &copy; {new Date().getFullYear()} SpectraCall Orchestration Platform
            </div>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
}
