'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CassetteMemoryRecord } from '@/lib/types/aetherbus';
import { Database, Search, Tag, History } from 'lucide-react';

interface CassetteMemoryPanelProps {
  records: CassetteMemoryRecord[];
}

export function CassetteMemoryPanel({ records }: CassetteMemoryPanelProps) {
  return (
    <Card className="bg-white/5 border-white/10 text-foreground">
      <CardHeader>
        <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
          <Database className="w-4 h-4 text-accent" />
          Cassette Memory Store
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {records.map((record) => (
            <div key={record.id} className="p-3 bg-white/5 border border-white/5 rounded-lg group hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <History className="w-3 h-3 text-accent" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Snapshot: {record.id}</span>
                </div>
                <span className="text-[9px] text-muted-foreground">{new Date(record.timestamp).toLocaleString()}</span>
              </div>

              <p className="text-xs mb-3 text-foreground/80 line-clamp-2">
                Contextual recall for agent <span className="text-accent">{record.agent_id}</span> during flow <span className="text-accent">{record.flow_id}</span>.
              </p>

              <div className="flex flex-wrap gap-1">
                {record.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[9px] bg-accent/10 text-accent border-none py-0">
                    <Tag className="w-2 h-2 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}

          <button className="w-full py-2 mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-dashed border-white/10 rounded hover:bg-white/5 hover:text-foreground transition-all flex items-center justify-center gap-2">
            <Search className="w-3 h-3" />
            Query Memory Fabric
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
