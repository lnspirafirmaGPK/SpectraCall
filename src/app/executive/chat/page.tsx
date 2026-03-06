
"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { AudioWaveform } from "@/components/executive/AudioWaveform";
import { cn } from "@/lib/utils";

export default function ExecutiveChatPage() {
  const [tacticalMode, setTacticalMode] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden border-x border-slate-200 dark:border-slate-800">
        <header className="flex items-center p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800">
          <button className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex-1 flex flex-col items-center">
            <h1 className="text-base font-bold tracking-tight">{tacticalMode ? "ASI Tactical Command" : "ASI Chat"}</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Secure Uplink</span>
            </div>
          </div>
          <button onClick={() => setTacticalMode(!tacticalMode)} className={cn("p-2 -mr-2 rounded-full transition-colors", tacticalMode ? "bg-primary/10 text-primary" : "text-slate-600 dark:text-slate-300 hover:text-primary")}>
            <span className="material-symbols-outlined">{tacticalMode ? "screen_share" : "battery_charging_full"}</span>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-6 flex flex-col pb-32">
          <div className="flex justify-center">
            <div className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-medium text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700/50">System Connected • Secure Line • 09:42 UTC</div>
          </div>
          <Message sender="ASI AI" role="ai" text="Good evening, CEO. How can I assist you with the syndicate's operations today?" />
          <Message sender="CEO" role="user" text="Show me the latest intelligence report on the Quantum Sector." />
          <div className="flex items-end gap-3 max-w-[90%]">
            <Avatar role="ai" />
            <div className="flex flex-col gap-1 items-start w-full">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 ml-1">ASI AI</span>
              <div className="bg-white dark:bg-slate-800 border-l-2 border-primary rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 mb-2">Compiling the report now. There has been a significant fluctuation in quantum anomaly readings over the past 4 hours.</p>
                <div className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-900 rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
                  <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                  <span className="text-xs font-medium flex-1 truncate">Quantum_Anomaly_Report_v2.pdf</span>
                  <span className="material-symbols-outlined text-slate-500 text-[16px]">download</span>
                </div>
              </div>
            </div>
          </div>
          {tacticalMode && (
            <>
              <div className="flex items-end gap-3 max-w-[95%]">
                <Avatar role="ai" />
                <div className="flex flex-col gap-1 items-start w-full">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 ml-1">ASI Direct • Veo Stream</span>
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-2xl rounded-bl-sm p-2 w-full shadow-sm">
                    <p className="text-sm px-2 pt-1 pb-2 text-slate-700 dark:text-slate-200">Reviewing visual stream from Veo drone feed over designated coordinates.</p>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                      <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1000&auto=format&fit=crop")' }}></div>
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded text-[10px] font-mono text-white backdrop-blur-sm"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> REC</div>
                      <button className="relative z-10 w-12 h-12 rounded-full bg-primary/90 text-white flex items-center justify-center backdrop-blur-md shadow-lg border border-white/20 hover:bg-primary transition-colors"><span className="material-symbols-outlined fill text-2xl">play_arrow</span></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-3 max-w-[95%]">
                <Avatar role="ai" /><div className="flex flex-col gap-1 items-start w-full"><span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 ml-1">ASI Direct • Lyria Intercept</span><AudioWaveform /></div>
              </div>
            </>
          )}
          <Message sender="CEO" role="user" text="Analyze the source of the fluctuations." />
          <div className="flex items-end gap-3">
            <Avatar role="ai" />
            <div className="flex flex-1 flex-col gap-1 items-start">
              <div className="flex items-center gap-1 max-w-[85%] rounded-2xl rounded-bl-none px-4 py-3 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        </main>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark sticky bottom-0 z-30">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 rounded-full flex-1 p-1 pr-2 shadow-sm border border-slate-300 dark:border-slate-700 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <button className="flex items-center justify-center p-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors rounded-full"><span className="material-symbols-outlined text-[20px]">add</span></button>
              <input className="flex w-full min-w-0 flex-1 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none border-none h-10 placeholder:text-slate-500 px-2 text-sm" placeholder={tacticalMode ? "Issue tactical command..." : "Message ASI AI..."} type="text"/>
              <button className="flex items-center justify-center p-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors rounded-full mr-1"><span className="material-symbols-outlined text-[20px]">mic</span></button>
            </div>
            <button className="flex items-center justify-center h-10 px-4 bg-primary text-white rounded-full shadow-md shadow-primary/30 hover:bg-primary/90 transition-colors gap-1"><span className="w-2 h-2 bg-white rounded-full animate-pulse"></span><span className="text-xs font-semibold tracking-wide uppercase hidden sm:block">Live</span></button>
          </div>
          <div className="h-4 sm:hidden"></div>
        </div>
      </div>
    </div>
  );
}

function Avatar({ role }: { role: 'ai' | 'user' }) {
  if (role === 'ai') {
    return <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-8 h-8 shrink-0 border border-slate-200 dark:border-slate-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwQDEnJTynqDChkyXlZrG-C5-axAY9b_8_lMdJuxF1PxyCCPlecuG3LBTitTjoDewxotQz5OSekNiLv-6V6qmVoC3H9pwQTFBDX9SAPJ48lNe6ELZnBJePC-SbI6jGaqtcd9t22ZgN7p383c_JkKQM2Nwgns5gPZA8_tD6rRhFY9xxiy9mdmY-XIltHuKoQlSWaMytuh_15CJJNc6AD1syLDaSqFaQxrrWYsziN8lsEEZCgjKo7h56YplQa10Q9zTTNACdg2zDXFU")' }}></div>;
  }
  return <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 border border-slate-400 dark:border-slate-600 flex-shrink-0 flex items-center justify-center text-primary font-bold text-xs">CEO</div>;
}

function Message({ sender, role, text }: { sender: string; role: 'ai' | 'user'; text: string }) {
  const isAi = role === 'ai';
  return (
    <div className={cn("flex items-end gap-3 max-w-[90%]", !isAi && "justify-end self-end")}>
      {isAi && <Avatar role="ai" />}
      <div className={cn("flex flex-col gap-1", isAi ? "items-start" : "items-end")}>
        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 ml-1">{sender}</span>
        <div className={cn("text-sm md:text-base font-normal leading-relaxed px-4 py-3 shadow-sm", isAi ? "rounded-2xl rounded-bl-none bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100" : "rounded-2xl rounded-br-none bg-primary text-white shadow-primary/20")}>{text}</div>
      </div>
      {!isAi && <Avatar role="user" />}
    </div>
  );
}
