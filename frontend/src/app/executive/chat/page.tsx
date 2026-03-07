"use client";

import { useState, useRef, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { AudioWaveform } from "@/components/executive/AudioWaveform";
import { cn } from "@/lib/utils";
import { executiveAssistant } from "@/ai/flows/executive-ai-chat-flow";
import { useToast } from "@/hooks/use-toast";

type MessageRole = 'ai' | 'user';
type MultimediaType = 'audio' | 'video';

interface QuickAction {
  label: string;
  action: string;
}

interface MessageMetadata {
  confidence?: number;
  source?: string;
  encryption?: string;
  latency?: string;
}

interface Message {
  id: string;
  role: MessageRole;
  sender: string;
  text: string;
  type: 'text' | 'multimedia';
  multimedia?: {
    type: MultimediaType;
    url?: string;
    description?: string;
  };
  metadata?: MessageMetadata;
  quickActions?: QuickAction[];
  timestamp: string;
}

export default function ExecutiveChatPage() {
  const [tacticalMode, setTacticalMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      sender: 'Strategic Intelligence',
      text: "Good evening, CEO. System connected and secure. How can I assist you with the syndicate's operations today?",
      type: 'text',
      timestamp: '09:42 UTC',
      metadata: {
        confidence: 0.99,
        source: 'Core Link',
        encryption: 'AES-256',
        latency: '12ms'
      }
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      sender: 'CEO',
      text: input,
      type: 'text',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC'
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    const persona = tacticalMode ? "Tactical Operations" : "Strategic Intelligence";

    // Simulated Tactical Processing
    const statuses = [
      "Establishing secure uplink...",
      "Syncing with Tachyon Core...",
      "Running MCTS simulations...",
      "Analyzing causal links..."
    ];

    for (const status of statuses) {
      setLoadingStatus(status);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    try {
      const result = await executiveAssistant({
        message: currentInput,
        persona: persona as any
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        sender: persona,
        text: result.response,
        type: result.multimedia ? 'multimedia' : 'text',
        multimedia: result.multimedia as any,
        metadata: {
          confidence: result.confidence,
          source: result.source,
          encryption: result.encryption,
          latency: `${Math.floor(Math.random() * 50) + 10}ms`
        },
        quickActions: result.quickActions?.map(label => ({ label, action: label })),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC'
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      toast({
        title: "Link Failure",
        description: "Communication with AI Core interrupted.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setLoadingStatus("");
    }
  };

  const handleAction = (action: string) => {
    toast({
      title: "Command Executed",
      description: `Initiating: ${action}`,
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden border-x border-slate-200 dark:border-slate-800 relative">
        <header className="flex items-center p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800">
          <button className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex-1 flex flex-col items-center">
            <h1 className="text-base font-bold tracking-tight">{tacticalMode ? "Tactical Command" : "Strategic AI Chat"}</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Secure Uplink • {tacticalMode ? "Tactical" : "Strategic"} Mode</span>
            </div>
          </div>
          <button
            onClick={() => setTacticalMode(!tacticalMode)}
            className={cn("p-2 -mr-2 rounded-full transition-colors", tacticalMode ? "bg-primary/10 text-primary" : "text-slate-600 dark:text-slate-300 hover:text-primary")}
            title={tacticalMode ? "Switch to Strategic Mode" : "Switch to Tactical Mode"}
          >
            <span className="material-symbols-outlined">{tacticalMode ? "verified_user" : "shield_with_heart"}</span>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-6 flex flex-col pb-32" ref={scrollRef}>
          <div className="flex justify-center">
            <div className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-medium text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700/50">
              System Connected • Encrypted Channel • {new Date().toLocaleDateString()}
            </div>
          </div>

          {messages.map((msg) => (
            <MessageComponent
              key={msg.id}
              message={msg}
              tacticalMode={tacticalMode}
              onAction={handleAction}
            />
          ))}

          {loading && (
            <div className="flex items-end gap-3">
              <Avatar sender={tacticalMode ? "Tactical Operations" : "Strategic Intelligence"} role="ai" />
              <div className="flex flex-1 flex-col gap-1 items-start">
                <div className="flex flex-col gap-2 max-w-[85%] rounded-2xl rounded-bl-none px-4 py-3 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm border border-primary/20">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span className="text-[10px] font-mono text-primary uppercase animate-pulse tracking-widest">{loadingStatus}</span>
                </div>
              </div>
            </div>
          )}
        </main>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark z-30">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-4xl mx-auto">
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 rounded-full flex-1 p-1 pr-2 shadow-sm border border-slate-300 dark:border-slate-700 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <button type="button" className="flex items-center justify-center p-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors rounded-full"><span className="material-symbols-outlined text-[20px]">add</span></button>
              <input
                className="flex w-full min-w-0 flex-1 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none border-none h-10 placeholder:text-slate-500 px-2 text-sm"
                placeholder={tacticalMode ? "Issue tactical command..." : "Query Strategic Intelligence..."}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <button type="button" className="flex items-center justify-center p-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors rounded-full mr-1"><span className="material-symbols-outlined text-[20px]">mic</span></button>
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex items-center justify-center h-10 w-10 sm:w-auto sm:px-4 bg-primary text-white rounded-full shadow-md shadow-primary/30 hover:bg-primary/90 disabled:opacity-50 disabled:shadow-none transition-colors gap-1"
            >
              <span className="material-symbols-outlined text-[20px] sm:hidden">send</span>
              <span className="text-xs font-semibold tracking-wide uppercase hidden sm:block">Transmit</span>
            </button>
          </form>
          <div className="h-4 sm:hidden"></div>
        </div>
      </div>
    </div>
  );
}

function Avatar({ sender, role }: { sender: string; role: MessageRole }) {
  if (role === 'ai') {
    const isTactical = sender === 'Tactical Operations';
    return (
      <div
        className={cn(
          "w-8 h-8 rounded-full shrink-0 border flex items-center justify-center",
          isTactical ? "bg-accent/10 border-accent/30 text-accent" : "bg-primary/10 border-primary/30 text-primary"
        )}
      >
        <span className="material-symbols-outlined text-[20px]">{isTactical ? "target" : "psychology"}</span>
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 border border-slate-400 dark:border-slate-600 flex-shrink-0 flex items-center justify-center text-primary font-bold text-[10px]">
      CEO
    </div>
  );
}

function MessageComponent({
  message,
  tacticalMode,
  onAction
}: {
  message: Message;
  tacticalMode: boolean;
  onAction: (action: string) => void
}) {
  const isAi = message.role === 'ai';

  return (
    <div className={cn("flex items-end gap-3 max-w-[95%] sm:max-w-[85%]", !isAi && "justify-end self-end")}>
      {isAi && <Avatar sender={message.sender} role="ai" />}
      <div className={cn("flex flex-col gap-1 w-full", isAi ? "items-start" : "items-end")}>
        <div className="flex items-center gap-2 px-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{message.sender}</span>
          {isAi && tacticalMode && message.metadata?.encryption && (
            <span className="flex items-center gap-0.5 text-[8px] font-mono text-green-500 bg-green-500/10 px-1 rounded">
              <span className="material-symbols-outlined text-[10px]">lock</span> {message.metadata.encryption}
            </span>
          )}
        </div>

        <div className={cn(
          "relative text-sm leading-relaxed px-4 py-3 shadow-sm transition-all",
          isAi
            ? "rounded-2xl rounded-bl-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 text-slate-800 dark:text-slate-100"
            : "rounded-2xl rounded-br-none bg-primary text-white shadow-primary/20"
        )}>
          {message.text}

          {message.type === 'multimedia' && message.multimedia && (
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700/50">
              {message.multimedia.type === 'video' ? (
                <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
                  <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1000&auto=format&fit=crop")' }}></div>
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded text-[10px] font-mono text-white backdrop-blur-sm"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> REC</div>
                  <button className="relative z-10 w-10 h-10 rounded-full bg-primary/90 text-white flex items-center justify-center backdrop-blur-md shadow-lg border border-white/20 hover:bg-primary transition-colors"><span className="material-symbols-outlined fill text-xl">play_arrow</span></button>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50">
                  <AudioWaveform />
                </div>
              )}
            </div>
          )}

          {isAi && tacticalMode && message.metadata && (
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/50 grid grid-cols-2 gap-2">
              <MetadataItem icon="analytics" label="Confidence" value={`${Math.round((message.metadata.confidence || 0) * 100)}%`} />
              <MetadataItem icon="sensors" label="Source" value={message.metadata.source || "Unknown"} />
              <MetadataItem icon="speed" label="Latency" value={message.metadata.latency || "N/A"} />
              <MetadataItem icon="verified" label="Status" value="Verified" color="text-green-500" />
            </div>
          )}
        </div>

        {isAi && message.quickActions && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => onAction(action.action)}
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        <span className="text-[9px] text-slate-400 dark:text-slate-500 px-1 mt-0.5">{message.timestamp}</span>
      </div>
      {!isAi && <Avatar sender="CEO" role="user" />}
    </div>
  );
}

function MetadataItem({ icon, label, value, color }: { icon: string; label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="material-symbols-outlined text-[14px] text-slate-400">{icon}</span>
      <div className="flex flex-col">
        <span className="text-[8px] uppercase text-slate-500">{label}</span>
        <span className={cn("text-[10px] font-mono font-bold", color || "text-slate-700 dark:text-slate-300")}>{value}</span>
      </div>
    </div>
  );
}
