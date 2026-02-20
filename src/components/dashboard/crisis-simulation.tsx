
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ShieldAlert, Send, Loader2, Target, Users, TrendingUp } from "lucide-react";
import { crisisScenarioSimulation, type CrisisScenarioSimulationOutput } from "@/ai/flows/crisis-scenario-simulation";

export function CrisisSimulation() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CrisisScenarioSimulationOutput | null>(null);

  const handleSimulate = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      const output = await crisisScenarioSimulation({ crisisDescription: description });
      setResult(output);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl font-headline flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-accent" />
          Crisis Tournament Simulator
        </CardTitle>
        <CardDescription>Simulate complex crisis events and strategic outcomes</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        {!result ? (
          <div className="space-y-4">
            <Textarea
              placeholder="Describe a potential crisis (e.g., 'Total power grid failure in the northern sector' or 'Massive cyber attack on customer database')..."
              className="min-h-[120px] bg-white/5 border-white/10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button 
              className="w-full bg-primary hover:bg-primary/80 text-white" 
              onClick={handleSimulate}
              disabled={loading || !description.trim()}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
              Initialize Crisis Simulation
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase text-accent tracking-widest flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Progression
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.progression}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase text-accent tracking-widest flex items-center gap-2">
                <Target className="w-4 h-4" /> Impact Analysis
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.impact}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase text-accent tracking-widest flex items-center gap-2">
                <Users className="w-4 h-4" /> Strategic Responses
              </h4>
              <ul className="space-y-2">
                {result.strategicResponses.map((response, i) => (
                  <li key={i} className="text-sm bg-white/5 p-3 rounded border border-white/5 text-muted-foreground italic leading-relaxed">
                    {response}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      {result && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full border-white/10 hover:bg-white/5" 
            onClick={() => { setResult(null); setDescription(""); }}
          >
            New Simulation
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
