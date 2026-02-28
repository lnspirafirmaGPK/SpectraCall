
"use client";

import { useState, useEffect, useRef } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { AetherBusStatus } from "@/components/dashboard/aether-bus";
import { ResonanceDriftMonitoring } from "@/components/dashboard/resonance-drift";
import { CrisisSimulation } from "@/components/dashboard/crisis-simulation";
import { AgentOrchestration } from "@/components/dashboard/agent-orchestration";
import { TachyonAnalytics } from "@/components/dashboard/tachyon-analytics";
import { RoleSwitcher, type Role } from "@/components/dashboard/role-switcher";
import { AIChat } from "@/components/dashboard/ai-chat";
import { LanguageThemeSwitcher } from "@/components/dashboard/language-theme-switcher";
import { LayoutDashboard, Settings, HelpCircle, LogOut, Bell, Search, Hexagon, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SpectraCallDashboard() {
  const [role, setRole] = useState<Role>("CEO");
  const [logs, setLogs] = useState<{id: number, time: string, msg: string, type: string}[]>([]);
  const logCounter = useRef(0);

  useEffect(() => {
    const logInterval = setInterval(() => {
      logCounter.current += 1;
      const newLog = {
        id: logCounter.current,
        time: new Date().toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 3 }),
        msg: [
          "AetherBus: Zero-Copy Pointer Passing verified",
          "Tachyon SIMD: Batch processing 10,000 units",
          "Cognitive Plane: uvloop dispatching signals",
          "Kernel Bypass: RDMA/RoCE v2 connection stable",
          "Slot-Based Optimization: GC Jitter < 0.01ms",
          "Agent Swarm: Resonance alignment 98.4%",
          "Tachyon Core: Contextual reasoning complete",
          "HFT Engine: Local Variable Cache hit 100%"
        ][Math.floor(Math.random() * 8)],
        type: Math.random() > 0.8 ? "ACCENT" : "DEFAULT"
      };
      setLogs(prev => [newLog, ...prev].slice(0, 10));
    }, 2500);
    return () => clearInterval(logInterval);
  }, [logCounter]);

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
          <SidebarFooter className="p-4 border-t border-white/5 space-y-4">
            <div className="p-3 bg-black/40 rounded-lg border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                 <span className="text-[9px] font-bold text-muted-foreground flex items-center gap-1 uppercase">
                   <Terminal className="w-2.5 h-2.5" /> ASI Live Stream
                 </span>
                 <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              </div>
              <ScrollArea className="h-24">
                <div className="space-y-1.5">
                  {logs.map((log) => (
                    <div key={log.id} className="text-[8px] font-mono leading-tight">
                      <span className="text-muted-foreground">[{log.time}]</span>{" "}
                      <span className={log.type === "ACCENT" ? "text-accent" : "text-white/70"}>{log.msg}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
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
              <p className="text-muted-foreground">Monitoring ASI v4.3.1 for <span className="text-accent font-bold uppercase">{role}</span> profile.</p>
            </div>
            <div className="flex items-center gap-4">
              <RoleSwitcher currentRole={role} onRoleChange={setRole} />
              <LanguageThemeSwitcher />
              <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 relative">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full animate-ping" />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {role === "CEO" && (
              <>
                <div className="lg:col-span-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AetherBusStatus />
                    <ResonanceDriftMonitoring />
                  </div>
                  <TachyonAnalytics />
                </div>
                <div className="lg:col-span-4 space-y-6">
                  <CrisisSimulation />
                  <AgentOrchestration />
                </div>
              </>
            )}

            {role === "CTO" && (
              <>
                <div className="lg:col-span-12">
                   <AetherBusStatus />
                </div>
                <div className="lg:col-span-8">
                   <TachyonAnalytics />
                </div>
                <div className="lg:col-span-4">
                   <AgentOrchestration />
                </div>
              </>
            )}

            {role === "Crisis Manager" && (
              <>
                <div className="lg:col-span-6">
                   <CrisisSimulation />
                </div>
                <div className="lg:col-span-6 space-y-6">
                   <ResonanceDriftMonitoring />
                   <AetherBusStatus />
                </div>
              </>
            )}

            {role === "Data Analyst" && (
              <>
                <div className="lg:col-span-12">
                   <TachyonAnalytics />
                </div>
                <div className="lg:col-span-6">
                   <ResonanceDriftMonitoring />
                </div>
                <div className="lg:col-span-6">
                   <AetherBusStatus />
                </div>
              </>
            )}
          </div>

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
              <Badge variant="outline" className="text-[9px] border-white/10 opacity-50">
                VER: ASI-4.3.1-STABLE
              </Badge>
            </div>
            <div className="hidden sm:block">
              &copy; {new Date().getFullYear()} SpectraCall Orchestration Platform
            </div>
          </footer>
        </main>
        
        {/* Floating AI Chat Assistant */}
        <AIChat currentRole={role} />
      </div>
    </SidebarProvider>
  );
}
