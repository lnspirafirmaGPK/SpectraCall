
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart3, Sparkles, Loader2, Info, CheckCircle2 } from "lucide-react";
import { generateSmartDataInsight, type SmartDataInsightGenerationOutput } from "@/ai/flows/smart-data-insight-generation-flow";
import { Badge } from "@/components/ui/badge";

export function TachyonAnalytics() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<SmartDataInsightGenerationOutput | null>(null);

  const handleQuery = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const output = await generateSmartDataInsight({ userQuestion: query });
      setInsights(output);
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
          <BarChart3 className="w-5 h-5 text-accent" />
          Tachyon Core Analytics
        </CardTitle>
        <CardDescription>Advanced reasoning on real-time organizational data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Ask anything about processed data..." 
            className="bg-white/5 border-white/10" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
          />
          <Button 
            className="bg-accent hover:bg-accent/80 text-black font-bold"
            onClick={handleQuery}
            disabled={loading || !query.trim()}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          </Button>
        </div>

        {insights && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <h4 className="text-xs font-bold uppercase text-accent mb-2 flex items-center gap-2">
                <Info className="w-3 h-3" /> Executive Summary
              </h4>
              <p className="text-sm text-foreground/90 leading-relaxed">{insights.summary}</p>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-[0.2em]">Prioritized Insights</span>
              {insights.prioritizedInsights.map((item, i) => (
                <div key={i} className="group p-4 bg-white/5 hover:bg-white/10 transition-colors border border-white/5 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={item.priority === 'High' ? 'destructive' : 'secondary'} className="text-[10px]">
                      {item.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{item.insight}</p>
                  {item.actionableRecommendation && (
                    <div className="flex gap-2 items-start text-xs text-muted-foreground mt-2 pt-2 border-t border-white/5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item.actionableRecommendation}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {insights.dataSourcesUsed && (
              <div className="flex items-center gap-2 pt-2">
                <span className="text-[10px] text-muted-foreground uppercase">Sources:</span>
                {insights.dataSourcesUsed.map((source, i) => (
                  <Badge key={i} variant="outline" className="text-[9px] border-white/10 opacity-60">
                    {source}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
