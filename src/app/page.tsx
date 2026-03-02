
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
import { AICommandCenter } from "@/components/dashboard/ai-command-center";
import { LanguageThemeSwitcher } from "@/components/dashboard/language-theme-switcher";
import { LayoutDashboard, Settings, HelpCircle, LogOut, Bell, Search, Hexagon, Terminal } from "lucide-react";
import { redirect } from "next/navigation";

export default function SpectraCallDashboard() {
  redirect("/overview");
}
