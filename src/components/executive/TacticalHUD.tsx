
"use client";

import React, { memo } from "react";
import { cn } from "@/lib/utils";

interface TacticalHUDProps {
  className?: string;
  imageUrl?: string;
}

export const TacticalHUD = memo(function TacticalHUD({
  className,
  imageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCvkQ8r5qFq29ksoV_1kCfI9iV7FzjWTj6bpPdTM7sDXdkBvaboK_YkvzA9UxSm0gAIS1pT9NzBZhVoT2x6Gn3UmYz2W4edSz3B7tXEukwAvgjPkIAEQbGHp1d6gjr6DCwPysCndN9SNEUnPEam7gNo4NeeOkYOGVSY8IlbFOJb63DwrkQF5y9hN4bIa3kS3DFCuCBJnS5Cp9i5LKRDjOvY0-xiEkz5pPKM54NX9O4bC90XuLbfqVFy5peYcShtk7ige2usXjiN90o",
}: TacticalHUDProps) {
  return (
    <div className={cn("relative h-full w-full bg-slate-900 overflow-hidden", className)}>
      <style jsx>{`
        .hud-grid {
          background-image:
            linear-gradient(to right, rgba(35, 46, 242, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(35, 46, 242, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .glow-box {
          box-shadow: 0 0 15px rgba(35, 46, 242, 0.5), inset 0 0 15px rgba(35, 46, 242, 0.5);
        }
      `}</style>
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url('${imageUrl}')` }}></div>
      <div className="absolute inset-0 z-10 hud-grid pointer-events-none"></div>
      <div className="absolute inset-4 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary opacity-70"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary opacity-70"></div>
      </div>
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-[30%] left-[20%] w-[35%] h-[25%] border-2 border-primary glow-box flex flex-col justify-start items-start">
          <div className="bg-primary/80 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-2 py-1 tracking-wider border-b border-r border-primary">
            Target Hardware <span className="text-white/70 ml-1">98% Match</span>
          </div>
          <div className="absolute -right-1 -bottom-1 w-2 h-2 bg-primary"></div>
        </div>
        <div className="absolute top-[60%] right-[15%] w-[40%] h-[15%] border-2 border-primary glow-box flex flex-col justify-start items-start">
          <div className="bg-primary/80 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-2 py-1 tracking-wider border-b border-r border-primary">
            Encrypted Doc <span className="text-white/70 ml-1">Scanning...</span>
          </div>
          <div className="absolute -right-1 -bottom-1 w-2 h-2 bg-primary"></div>
        </div>
      </div>
    </div>
  );
});
