"use client";

import { useState, useEffect } from "react";
import { ServiceCatalogEntry, AsiPlane } from "@/lib/types/asi";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Shield, Activity, Lock, Database, Info, ExternalLink, Globe } from "lucide-react";

export default function ServiceCatalogPage() {
  const [services, setServices] = useState<ServiceCatalogEntry[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [selectedPlane, setSelectedPlane] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const planes: AsiPlane[] = ["Control", "Data", "Trust", "Governance", "Observability"];

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const url = new URL('/api/services/catalog', window.location.origin);
        if (selectedPlane) url.searchParams.append('plane', selectedPlane);
        const res = await fetch(url.toString());
        const data = await res.json();
        setServices(data.services);
      } catch (e) {
        console.error("Failed to fetch services", e);
      }
      setIsLoading(false);
    };
    fetchServices();
  }, [selectedPlane]);

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(filter.toLowerCase()) ||
    s.owner.toLowerCase().includes(filter.toLowerCase()) ||
    s.domain.toLowerCase().includes(filter.toLowerCase())
  );

  const getPlaneIcon = (plane: AsiPlane) => {
    switch(plane) {
      case 'Control': return <Shield className="w-3.5 h-3.5" />;
      case 'Data': return <Activity className="w-3.5 h-3.5" />;
      case 'Trust': return <Lock className="w-3.5 h-3.5" />;
      case 'Governance': return <Globe className="w-3.5 h-3.5" />;
      case 'Observability': return <Database className="w-3.5 h-3.5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'healthy': return 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30';
      case 'degraded': return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      case 'unavailable': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#101122] text-white p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            <Globe className="w-6 h-6 text-primary fill-primary/20" />
            ASI Service Catalog
          </h1>
          <p className="text-sm text-muted-foreground">
            Operating map of enterprise AI services across 5 planes.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="border-primary/50 text-primary px-3 py-1">
            {services.length} SERVICES REGISTERED
          </Badge>
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            EXPORT SPECS
          </Button>
        </div>
      </header>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Filter by name, owner, or domain..."
            className="pl-10 bg-white/5 border-white/10 focus-visible:ring-primary h-11"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedPlane === null ? "secondary" : "outline"}
            size="sm"
            onClick={() => setSelectedPlane(null)}
            className="h-11 px-4"
          >
            All Planes
          </Button>
          {planes.map(plane => (
            <Button
              key={plane}
              variant={selectedPlane === plane ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedPlane(plane)}
              className="h-11 px-4 flex items-center gap-2"
            >
              {getPlaneIcon(plane)}
              {plane}
            </Button>
          ))}
        </div>
      </div>

      <Card className="flex-1 bg-background/40 backdrop-blur-md border-primary/20 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/10 sticky top-0 z-10 backdrop-blur-sm">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[300px] text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Service Identity</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Plane</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Security Mode</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Tier</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">On-Call</TableHead>
                <TableHead className="text-right text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell colSpan={7} className="h-16 bg-white/5 border-b border-white/5"></TableCell>
                  </TableRow>
                ))
              ) : filteredServices.map(service => (
                <TableRow key={service.id} className="hover:bg-white/5 transition-colors border-b border-white/5">
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-bold text-sm">{service.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">{service.domain}</span>
                        <span className="text-[10px] text-muted-foreground">|</span>
                        <span className="text-[10px] text-muted-foreground">{service.owner}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs">
                      {getPlaneIcon(service.plane)}
                      <span className="font-medium">{service.plane}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-[9px] border-primary/30 text-primary">
                      {service.securityMode}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={service.criticalityTier === 'P0' ? 'bg-amber-500/20 text-amber-500' : 'bg-muted/20 text-muted-foreground'}>
                      {service.criticalityTier}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-[10px] font-mono">{service.onCall}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                      <Info className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredServices.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={7} className="h-40 text-center text-muted-foreground italic">
                    No services found matching the criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
