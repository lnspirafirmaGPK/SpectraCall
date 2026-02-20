
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserCircle, Shield, Briefcase, Database } from "lucide-react";

export type Role = "CEO" | "CTO" | "Crisis Manager" | "Data Analyst";

export function RoleSwitcher({ currentRole, onRoleChange }: { currentRole: Role, onRoleChange: (role: Role) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 gap-2">
          {currentRole === "CEO" && <Shield className="w-4 h-4 text-accent" />}
          {currentRole === "CTO" && <Briefcase className="w-4 h-4 text-accent" />}
          {currentRole === "Crisis Manager" && <UserCircle className="w-4 h-4 text-accent" />}
          {currentRole === "Data Analyst" && <Database className="w-4 h-4 text-accent" />}
          {currentRole}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-popover border-border">
        <DropdownMenuItem onClick={() => onRoleChange("CEO")}>CEO Dashboard</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onRoleChange("CTO")}>CTO Dashboard</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onRoleChange("Crisis Manager")}>Crisis Manager Dashboard</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onRoleChange("Data Analyst")}>Data Analyst Dashboard</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
