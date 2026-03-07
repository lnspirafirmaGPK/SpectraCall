
"use client";

import React, { memo } from "react";
import { cn } from "@/lib/utils";

interface AudioWaveformProps {
  className?: string;
  filename?: string;
  duration?: string;
  active?: boolean;
}

export const AudioWaveform = memo(function AudioWaveform({
  className,
  filename = "Intercept_Alpha.wav",
  duration = "0:42",
  active = false,
}: AudioWaveformProps) {
  return (
    <div className={cn("bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-2xl rounded-bl-sm p-3 w-full shadow-sm flex flex-col gap-2", className)}>
      <p className="text-sm text-slate-700 dark:text-slate-200">Audio waveform analysis complete. Confidence: 94%.</p>
      <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/30">
        <button className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
          <span className="material-symbols-outlined fill text-xl">{active ? 'pause' : 'play_arrow'}</span>
        </button>
        <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium truncate text-slate-800 dark:text-slate-200">{filename}</span>
            <span className="text-slate-500 dark:text-slate-400">{duration}</span>
          </div>
          <div className="flex items-center h-4 gap-[2px] w-full">
            {[40, 70, 100, 60, 30, 50, 80, 90, 40, 20, 60, 80, 50, 30, 20, 40, 20].map((height, i) => (
              <div key={i} className={cn("w-1 rounded-full", i < 13 ? "bg-primary" : "bg-slate-300 dark:bg-slate-600")} style={{ height: `${height}%`, opacity: i < 13 ? (i === 12 ? 0.5 : 1) : 1 }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
