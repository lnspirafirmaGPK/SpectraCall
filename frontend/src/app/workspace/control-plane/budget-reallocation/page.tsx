"use client";

import { useState, useEffect } from "react";
import { AsiEnvelope, BudgetReallocationDecisionData } from "@/lib/types/envelope";
import { DecisionArtifact, PolicyCheck, HumanApproval, ExecutionResult } from "@/lib/types/asi";
import { EnvelopeInspector } from "@/components/control-plane/EnvelopeInspector";
import { ExecutionMapPanel, ExecutionStep } from "@/components/control-plane/ExecutionMapPanel";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Play,
  ShieldCheck,
  UserCheck,
  Zap,
  History,
  AlertTriangle,
  FileText,
  DollarSign,
  Fingerprint,
  Link
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock Envelope
const initialEnvelope: AsiEnvelope<BudgetReallocationDecisionData> = {
  specversion: "1.0",
  type: "asi.decision.proposed",
  source: "/agents/budget-agent-v1",
  id: `evt-${Math.random().toString(36).substr(2, 9)}`,
  time: new Date().toISOString(),
  subject: "budget-reallocation-request-501",
  datacontenttype: "application/json",
  traceparent: "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01",
  asi: {
    agent_id: "agent-budget-01",
    policy_scope: "finance.global",
    classification: "internal",
    lineage_hash: "sha256:d6b2c8a...",
    parent_hash: "sha256:a1b2c3d...",
    payload_hash: "sha256:e3b0c44...",
    signature: "base64:signed-artifact",
    schema_ref: "/schemas/budget-reallocation-v1.json",
    delivery: "at-least-once"
  },
  data: {
    requestId: "REQ-501",
    amount: 150000,
    currency: "USD",
    fromAccount: "OPEX-GENERAL",
    toAccount: "CLOUD-INFRA-EMERGENCY",
    reason: "Sudden traffic surge detected in APAC region requiring immediate scale-out.",
    riskScore: 0.15
  }
};

export default function BudgetReallocationFlow() {
  const { toast } = useToast();
  const [step, setStep] = useState<number>(0);
  const [decisionId, setDecisionId] = useState<string | null>(null);
  const [policyCheck, setPolicyCheck] = useState<PolicyCheck | null>(null);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const workflowSteps: ExecutionStep[] = [
    { id: "1", name: "Propose Decision", status: step >= 1 ? 'completed' : step === 0 ? 'pending' : 'pending', plane: "DATA", timestamp: initialEnvelope.time },
    { id: "2", name: "Policy Evaluation", status: step >= 2 ? 'completed' : step === 1 ? 'running' : 'pending', plane: "GOVERNANCE" },
    { id: "3", name: "Human Approval", status: step >= 3 ? 'completed' : step === 2 ? 'running' : 'pending', plane: "CONTROL" },
    { id: "4", name: "Tachyon Execution", status: step >= 4 ? 'completed' : step === 3 ? 'running' : 'pending', plane: "DATA" },
    { id: "5", name: "Lineage Replay Ready", status: step >= 4 ? 'completed' : 'pending', plane: "TRUST" },
  ];

  const proposeDecision = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/decisions/propose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(initialEnvelope)
      });
      const data = await res.json();
      if (data.success) {
        setDecisionId(data.decision_id);
        setStep(1);
        toast({ title: "Decision Proposed", description: `ID: ${data.decision_id}` });
      }
    } catch (e) {
      toast({ title: "Error", description: "Failed to propose decision", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const evaluatePolicy = async () => {
    if (!decisionId) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/policies/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision_id: decisionId })
      });
      const data = await res.json();
      if (data.success) {
        setPolicyCheck(data.policy_check);
        setStep(2);
        toast({ title: "Policy Evaluated", description: "Passed all automated checks." });
      }
    } catch (e) {
      toast({ title: "Error", description: "Policy evaluation failed", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const approveDecision = async () => {
    if (!decisionId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/decisions/${decisionId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approverId: "human-op-01",
          comment: "Approved based on APAC regional metrics.",
          signature: "sig:human-op-01-hash"
        })
      });
      const data = await res.json();
      if (data.success) {
        setExecutionResult(data.execution);
        setStep(4);
        toast({ title: "Decision Executed", description: "Tachyon route dispatched successfully." });
      }
    } catch (e) {
      toast({ title: "Error", description: "Approval failed", variant: "destructive" });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#101122] text-white p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            <Zap className="w-6 h-6 text-primary fill-primary/20" />
            Budget Reallocation Slice
          </h1>
          <p className="text-sm text-muted-foreground">
            End-to-End ASI Workflow Prototype: 5-Plane Alignment
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="border-primary/50 text-primary px-3 py-1">
            CONTROL PLANE ACTIVE
          </Badge>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <History className="w-4 h-4 mr-2" />
            RESET FLOW
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Left Column: Execution Map */}
        <div className="col-span-3">
          <Card className="h-full bg-background/40 backdrop-blur-md border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
                <Network className="w-4 h-4 text-primary" />
                Execution Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ExecutionMapPanel steps={workflowSteps} />
            </CardContent>
          </Card>
        </div>

        {/* Middle Column: Active Artifact */}
        <div className="col-span-5 flex flex-col space-y-6">
          <Card className="flex-1 min-h-0 bg-background/40 backdrop-blur-md border-primary/20 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  Decision Proposal
                </CardTitle>
                <CardDescription>
                  Review the proposed action before processing.
                </CardDescription>
              </div>
              <Badge variant="outline" className="font-mono text-[10px]">
                {initialEnvelope.subject}
              </Badge>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-[10px] uppercase text-muted-foreground font-semibold mb-1">From Account</p>
                      <p className="text-lg font-bold font-mono text-amber-500">{initialEnvelope.data.fromAccount}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-[10px] uppercase text-muted-foreground font-semibold mb-1">To Account</p>
                      <p className="text-lg font-bold font-mono text-emerald-500">{initialEnvelope.data.toAccount}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                      <DollarSign className="w-16 h-16" />
                    </div>
                    <p className="text-[10px] uppercase text-primary font-bold mb-1">Reallocation Amount</p>
                    <p className="text-3xl font-bold font-mono">
                      ${initialEnvelope.data.amount.toLocaleString()} <span className="text-lg text-muted-foreground">{initialEnvelope.data.currency}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">Strategic Justification</p>
                    <p className="text-sm text-white/80 leading-relaxed italic">
                      "{initialEnvelope.data.reason}"
                    </p>
                  </div>

                  <Separator className="bg-white/5" />

                  {policyCheck && (
                    <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-emerald-500" />
                          <p className="text-sm font-bold text-emerald-400">POLICY EVALUATION PASSED</p>
                        </div>
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/50">
                          RISK: {(policyCheck.riskScore * 100).toFixed(1)}%
                        </Badge>
                      </div>
                      <p className="text-xs text-emerald-500/70">{policyCheck.reason}</p>
                      <div className="flex flex-wrap gap-2">
                        {policyCheck.hitRules.map(rule => (
                          <span key={rule} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                            RULE: {rule}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {executionResult && (
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-3">
                      <div className="flex items-center gap-2">
                        < Zap className="w-5 h-5 text-primary" />
                        <p className="text-sm font-bold text-primary">TACHYON EXECUTION SUCCESSFUL</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] text-muted-foreground uppercase">Tachyon Route</p>
                          <p className="text-[10px] font-mono text-primary">{executionResult.tachyon_route}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] text-muted-foreground uppercase">Trace ID</p>
                          <p className="text-[10px] font-mono">{executionResult.trace_id}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="pt-4 border-t border-white/5 flex gap-3">
              {step === 0 && (
                <Button className="w-full h-12 text-md font-bold" onClick={proposeDecision} disabled={isLoading}>
                  {isLoading ? "Proposing..." : "PROPOSE DECISION"}
                  <Play className="w-4 h-4 ml-2 fill-current" />
                </Button>
              )}
              {step === 1 && (
                <Button className="w-full h-12 text-md font-bold bg-cyan-600 hover:bg-cyan-700" onClick={evaluatePolicy} disabled={isLoading}>
                  {isLoading ? "Evaluating..." : "EVALUATE POLICIES"}
                  <ShieldCheck className="w-4 h-4 ml-2" />
                </Button>
              )}
              {step === 2 && (
                <div className="flex gap-3 w-full">
                  <Button variant="destructive" className="flex-1 h-12 text-md font-bold opacity-50 hover:opacity-100">
                    REJECT
                  </Button>
                  <Button className="flex-[2] h-12 text-md font-bold bg-emerald-600 hover:bg-emerald-700" onClick={approveDecision} disabled={isLoading}>
                    {isLoading ? "Approving..." : "APPROVE & EXECUTE"}
                    <UserCheck className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
              {step === 4 && (
                <Button variant="outline" className="w-full h-12 text-md font-bold border-emerald-500/50 text-emerald-500" disabled>
                  WORKFLOW COMPLETE
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* Right Column: Metadata & Lineage */}
        <div className="col-span-4 space-y-6">
          <EnvelopeInspector envelope={initialEnvelope} />

          <Card className="bg-background/40 backdrop-blur-md border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-primary" />
                Trust & Lineage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Proof Availability</span>
                <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30">AVAILABLE</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Signature Verification</span>
                <Badge className="bg-cyan-500/20 text-cyan-500 border-cyan-500/30">VERIFIED</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Replay Readiness</span>
                <Badge className={step >= 4 ? "bg-emerald-500/20 text-emerald-500" : "bg-muted/20 text-muted-foreground"}>
                  {step >= 4 ? "READY" : "PENDING"}
                </Badge>
              </div>

              <div className="pt-4 border-t border-white/5">
                <Button variant="ghost" size="sm" className="w-full justify-between text-muted-foreground hover:text-white group">
                  <span className="flex items-center gap-2">
                    <Link className="w-3 h-3" />
                    View Hash Chain
                  </span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-amber-500">AUTONOMY ADVISORY</p>
              <p className="text-[10px] text-amber-500/70 leading-relaxed">
                This reallocation exceeds the standard threshold for agent autonomy.
                Human approval is required via Control Plane intervention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing imports in the previous block (Lucide)
import { CheckCircle2, ArrowRight, Network } from "lucide-react";
