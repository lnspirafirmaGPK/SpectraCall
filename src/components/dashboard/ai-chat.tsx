"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Bot, User, Loader2, Minimize2, Maximize2 } from "lucide-react";
import { generalAssistant } from "@/ai/flows/general-ai-chat-flow";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

export function AIChat({ currentRole }: { currentRole: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: `Hello ${currentRole}. I am the SpectraCall Assistant. How can I assist with the AetherBus orchestration today?` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isMinimized]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const response = await generalAssistant({ message: currentInput, role: currentRole });
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', content: response.response };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', content: "Error connecting to Tachyon Core. Please check system link." };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (isMinimized) {
    return (
      <Button 
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 z-50 animate-in zoom-in"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
        </span>
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[400px] h-[500px] shadow-2xl glass-card z-50 flex flex-col animate-in slide-in-from-bottom-5 duration-300">
      <CardHeader className="p-4 border-b border-white/5 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Bot className="w-5 h-5 text-accent" />
          </div>
          <div>
            <CardTitle className="text-sm font-headline">ASI Assistant</CardTitle>
            <CardDescription className="text-[10px] uppercase">Active for {currentRole}</CardDescription>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimized(true)}>
          <Minimize2 className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/10",
                  msg.role === 'ai' ? "bg-primary/20" : "bg-accent/20"
                )}>
                  {msg.role === 'ai' ? <Bot className="w-4 h-4 text-accent" /> : <User className="w-4 h-4 text-primary" />}
                </div>
                <div className={cn(
                  "p-3 rounded-lg text-xs max-w-[80%] leading-relaxed",
                  msg.role === 'ai' ? "bg-white/5 border border-white/5" : "bg-primary text-white"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-white/10">
                  <Bot className="w-4 h-4 text-accent animate-pulse" />
                </div>
                <div className="bg-white/5 border border-white/5 p-3 rounded-lg flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin text-accent" />
                  <span className="text-[10px] font-mono opacity-50">SYNCING...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t border-white/5">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full gap-2">
          <Input 
            placeholder="Query the platform..." 
            className="bg-white/5 border-white/10 text-xs h-9"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button size="icon" className="h-9 w-9 bg-accent hover:bg-accent/80 text-black" disabled={loading}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
