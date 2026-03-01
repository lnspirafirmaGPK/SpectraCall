"use client";

import { useMemo, useState } from "react";
import { BrainCircuit, Cpu, Radar, ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

const pillars = [
  { name: "Autonomous Decisioning", icon: BrainCircuit, progress: 96 },
  { name: "AI Workflow Automation", icon: Cpu, progress: 92 },
  { name: "Real-time Predictive Monitoring", icon: Radar, progress: 94 },
  { name: "AI Governance & Guardrails", icon: ShieldCheck, progress: 89 },
];

export function AICommandCenter() {
  const [autopilotEnabled, setAutopilotEnabled] = useState(true);
  const [humanApprovalEnabled, setHumanApprovalEnabled] = useState(true);

  const readinessScore = useMemo(() => {
    const base = pillars.reduce((sum, p) => sum + p.progress, 0) / pillars.length;
    const modifiers = (autopilotEnabled ? 3 : -5) + (humanApprovalEnabled ? 2 : 0);
    return Math.max(0, Math.min(100, Math.round(base + modifiers)));
  }, [autopilotEnabled, humanApprovalEnabled]);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-headline flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          AI Command Center
        </CardTitle>
        <CardDescription>
          โหมดแพลตฟอร์มขับเคลื่อนด้วย AI ครบวงจร (End-to-End AI-Driven Operations)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Autopilot AI</span>
              <Switch checked={autopilotEnabled} onCheckedChange={setAutopilotEnabled} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Human-in-the-loop</span>
              <Switch checked={humanApprovalEnabled} onCheckedChange={setHumanApprovalEnabled} />
            </div>
            <div className="pt-1 space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Overall AI readiness</span>
                <span>{readinessScore}%</span>
              </div>
              <Progress value={readinessScore} className="h-2" />
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold">Deployment posture</p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30">AI-first</Badge>
              <Badge className="bg-primary/20 text-accent border-primary/30">Multi-agent</Badge>
              <Badge variant="outline" className="border-white/20">24/7 adaptive</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              ระบบพร้อมรันแบบอัตโนมัติทั้งการตัดสินใจ วิเคราะห์ความเสี่ยง วางแผนเชิงกลยุทธ์ และติดตามผลแบบเรียลไทม์.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.name} className="rounded-lg border border-white/10 p-3 bg-black/20">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-accent" />
                    {pillar.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{pillar.progress}%</span>
                </div>
                <Progress value={pillar.progress} className="h-1.5" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
