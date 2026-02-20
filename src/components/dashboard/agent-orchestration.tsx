
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Network, Search, Loader2, Bot, Clock, ChevronRight } from "lucide-react";
import { automatedAgentOrchestrationProposal, type AutomatedAgentOrchestrationProposalOutput } from "@/ai/flows/automated-agent-orchestration-proposal-flow";
import { Badge } from "@/components/ui/badge";

export function AgentOrchestration() {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<AutomatedAgentOrchestrationProposalOutput | null>(null);

  const handlePropose = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    try {
      const output = await automatedAgentOrchestrationProposal({ highLevelGoal: goal });
      setProposal(output);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-headline flex items-center gap-2">
          <Network className="w-5 h-5 text-accent" />
          AI Agent Orchestration
        </CardTitle>
        <CardDescription>Coordinate multi-agent swarms for organizational goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Enter organizational goal..." 
            className="bg-white/5 border-white/10" 
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <Button 
            className="bg-primary hover:bg-primary/80"
            onClick={handlePropose}
            disabled={loading || !goal.trim()}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </Button>
        </div>

        {proposal && (
          <div className="mt-6 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Bot className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold uppercase tracking-wider">Plan Summary</span>
              </div>
              <div className="flex gap-2 items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Est. {proposal.estimatedCompletionTime}</span>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-sm leading-relaxed whitespace-pre-line italic text-muted-foreground">
              {proposal.orchestrationPlan}
            </div>

            <div className="space-y-2">
               <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-[0.2em]">Required Agents</span>
               <div className="flex flex-wrap gap-2">
                 {proposal.agentsRequired.map((agent, i) => (
                   <Badge key={i} variant="secondary" className="bg-primary/20 text-accent border-primary/30">
                     {agent}
                   </Badge>
                 ))}
               </div>
            </div>
          </div>
        )}

        {!proposal && !loading && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-2 opacity-50">
            <Network className="w-12 h-12 text-muted-foreground" />
            <p className="text-sm max-w-[200px]">Define a goal to see how SpectraCall orchestrates its agent swarm.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
