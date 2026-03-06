"use client";

import { useState, useRef, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import { accountingAgents } from "@/lib/mock/accounting";
import { useToast } from "@/hooks/use-toast";

type MessageRole = 'ai' | 'user';
type AttachmentType = 'pdf' | 'image' | 'doc' | 'sheet';

interface Attachment {
  name: string;
  size: string;
  type: AttachmentType;
  url?: string;
}
type AgentLevel = 'Staff' | 'Expert' | 'CFO' | 'Human';

interface Message {
  id: string;
  role: MessageRole;
  sender: string;
  level?: AgentLevel;
  text: string;
  timestamp: string;
  isEscalation?: boolean;
  attachments?: Attachment[];
  metadata?: {
    confidence?: number;
    source?: string;
    policy?: string;
  };
}

export default function AccountingChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      sender: 'Accounting-Staff-Agent',
      level: 'Staff',
      text: "สวัสดีครับ ผม Accounting-Staff-Agent ยินดีให้ความช่วยเหลือครับ คุณต้องการสอบถามข้อมูลในหัวข้อใดเป็นพิเศษครับ? (เช่น การทำบัญชีเบื้องต้น, การปิดงบ, ภาษี หรือการวิเคราะห์ต้นทุน)",
      timestamp: '10:42 UTC'
    }
  ]);
  const [input, setInput] = useState("");
  const [isEscalating, setIsEscalating] = useState(false);
  const [escalationPath, setEscalationPath] = useState<string | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<Attachment[]>([]);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isEscalating]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && pendingAttachments.length === 0) || isEscalating) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      sender: 'User',
      text: input,
      attachments: [...pendingAttachments],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC'
    };

    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setPendingAttachments([]);

    const lowerInput = currentInput.toLowerCase();
    const needsExpert = lowerInput.includes("วิเคราะห์") || lowerInput.includes("tfrs") || lowerInput.includes("ภาษี");
    const needsCfo = lowerInput.includes("อนุมัติ") || lowerInput.includes("นโยบาย");

    if (needsExpert || needsCfo) {
      setIsEscalating(true);
      setEscalationPath("Staff → Expert");

      await new Promise(r => setTimeout(r, 2000));

      const expertMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        sender: 'Accounting-Expert-Agent',
        level: 'Expert',
        text: needsCfo
          ? "ได้รับคำร้องขออนุมัติ/นโยบายจาก Staff-Agent แล้วครับ กำลังเตรียมข้อมูลเพื่อส่งต่อให้ CFO พิจารณา..."
          : `ได้รับข้อมูลจาก Staff-Agent แล้วครับ กำลังวิเคราะห์ข้อมูล${currentInput} ตามมาตรฐาน TFRS...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC',
        metadata: {
          confidence: 0.98,
          source: 'Enterprise Knowledge Base',
          policy: 'TFRS 16'
        }
      };

      setMessages(prev => [...prev, expertMsg]);
      setIsEscalating(false);
      setEscalationPath(null);

      if (needsCfo) {
        await new Promise(r => setTimeout(r, 2500));
        setIsEscalating(true);
        setEscalationPath("Expert → CFO");
        await new Promise(r => setTimeout(r, 1500));

        const cfoMsg: Message = {
            id: (Date.now() + 2).toString(),
            role: 'ai',
            sender: 'CFO-Agent',
            level: 'CFO',
            text: lowerInput.includes("อนุมัติ")
                ? "ผมตรวจสอบข้อเสนอจาก Expert-Agent แล้ว เห็นควรให้อนุมัติตามหลักเกณฑ์ความเสี่ยงต่ำครับ"
                : "นโยบายบัญชีได้รับการสอบทานแล้ว และมีความสอดคล้องกับกลยุทธ์ภาพรวมของบริษัทครับ",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC',
            metadata: {
                confidence: 0.99,
                source: 'Governance Engine',
                policy: 'Financial Authority v1.2'
            }
        };
        setMessages(prev => [...prev, cfoMsg]);
        setIsEscalating(false);
        setEscalationPath(null);
      }
    } else {
      // Basic response
      await new Promise(r => setTimeout(r, 1000));
      const staffMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        sender: 'Accounting-Staff-Agent',
        level: 'Staff',
        text: "รับทราบครับ กำลังค้นหาข้อมูลพื้นฐานให้สักครู่ครับ...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC'
      };
      setMessages(prev => [...prev, staffMsg]);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#101122] text-[#f8fafc] font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden border-x border-white/5 relative">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col pb-40" ref={scrollRef}>
          {messages.map((msg) => (
            <MessageComponent key={msg.id} message={msg} onShare={() => {
                toast({ title: "Shared to Meeting Room", description: "Context has been synced with the active room." });
            }} />
          ))}

          {isEscalating && (
             <div className="flex justify-center">
                <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#232ef2]/10 border border-[#232ef2]/20 shadow-lg shadow-blue-500/5 animate-pulse">
                    <span className="material-symbols-outlined text-[#258cf4] text-sm">upgrade</span>
                    <span className="text-[10px] font-bold text-[#258cf4] uppercase tracking-wider">
                        [{escalationPath}] Analyzing & Escalating Request...
                    </span>
                </div>
             </div>
          )}
        </main>

        {/* Input Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5 bg-[#101122]/80 backdrop-blur-xl z-30">
          <div className="max-w-4xl mx-auto mb-4 flex justify-between items-center px-1">
             <div className="flex gap-2">
                <button onClick={() => toast({ title: "Meeting Room Active", description: "You are currently synced with Room 402" })} className="relative flex items-center gap-2 rounded-lg bg-[#232ef2]/10 px-4 py-2 text-[10px] font-black text-[#258cf4] hover:bg-[#232ef2]/20 border border-[#232ef2]/20 uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">groups</span>
                    AI Meeting Room
                    <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-[8px] font-bold text-white border-2 border-[#101122]">2</span>
                </button>
                <button onClick={() => setIsExportOpen(true)} className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-[10px] font-black text-[#94a3b8] hover:bg-white/10 transition-all border border-white/10 uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">ios_share</span>
                    Export
                </button>
             </div>
             <div className="flex items-center gap-2 text-[10px] text-[#94a3b8] font-bold uppercase tracking-tighter">
                <span className="material-symbols-outlined text-xs">lock</span>
                End-to-End Encrypted
             </div>
          </div>

          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative group">
             {pendingAttachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2 p-2 bg-[#1e293b]/50 rounded-xl border border-white/5">
                    {pendingAttachments.map((at, i) => (
                        <div key={i} className="flex items-center gap-2 bg-[#232ef2]/10 text-[#258cf4] px-2 py-1 rounded-lg text-[10px] font-bold border border-[#232ef2]/20">
                            <span className="material-symbols-outlined text-xs">description</span>
                            {at.name}
                            <button onClick={() => setPendingAttachments(prev => prev.filter((_, idx) => idx !== i))} className="hover:text-rose-400"><span className="material-symbols-outlined text-[10px]">close</span></button>
                        </div>
                    ))}
                </div>
             )}
             <div className="flex items-center gap-2 bg-[#1e293b] border border-white/10 rounded-2xl p-2 focus-within:border-[#232ef2] transition-all shadow-inner">
                <button type="button" onClick={() => setPendingAttachments([...pendingAttachments, { name: 'Audit_Q2.pdf', size: '1.2MB', type: 'pdf' }])} className="p-2 text-[#94a3b8] hover:text-[#258cf4] transition-colors">
                    <span className="material-symbols-outlined">attach_file</span>
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question or request accounting analysis..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 placeholder:text-[#94a3b8]"
                  disabled={isEscalating}
                />
                <button
                  type="submit"
                  disabled={(!input.trim() && pendingAttachments.length === 0) || isEscalating}
                  className="bg-[#232ef2] hover:bg-blue-600 text-white p-2 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
             </div>
          </form>
          <p className="text-center text-[10px] text-[#94a3b8] mt-3 uppercase tracking-tighter">Powered by ASI Cogitator X • Transparent Escalation Enabled</p>
        </div>
      </div>

      {/* Export Modal */}
      {isExportOpen && (
        <div className="fixed inset-0 bg-[#101122]/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-[#1e293b] rounded-3xl shadow-2xl border border-white/10 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-8 border-b border-white/10 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Export Conversation</h2>
                        <p className="text-[#94a3b8] text-sm mt-1">Choose format and context for your accounting audit trail.</p>
                    </div>
                    <button onClick={() => setIsExportOpen(false)} className="text-[#94a3b8] hover:text-white transition-colors"><span className="material-symbols-outlined">close</span></button>
                </div>
                <div className="p-8 space-y-8">
                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8] mb-4">Select Format</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <ExportOption label="PDF Summary" desc="Executive Overview" active />
                            <ExportOption label="Full PDF" desc="Complete Transcript" />
                            <ExportOption label="Markdown" desc="Clean Text (.md)" />
                            <ExportOption label="JSON" desc="Structured Data" />
                        </div>
                    </section>
                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8] mb-4">Include Metadata</h3>
                        <div className="space-y-3">
                            <ToggleItem label="Include Attachments" active />
                            <ToggleItem label="Include Decision Artifacts" active />
                            <ToggleItem label="Include Lineage Hashes" />
                        </div>
                    </section>
                </div>
                <div className="p-8 bg-white/5 flex gap-4">
                    <button onClick={() => { toast({ title: "Export Started", description: "Your document is being generated." }); setIsExportOpen(false); }} className="flex-1 py-4 bg-[#232ef2] hover:bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-500/20">Transmit & Download</button>
                    <button onClick={() => setIsExportOpen(false)} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-[#94a3b8] rounded-2xl font-black uppercase tracking-widest text-xs transition-all border border-white/10">Cancel</button>
                </div>
            </div>
        </div>
      )}

      {/* Right Sidebar - Context Panel */}
      <aside className="hidden xl:flex w-80 flex-col border-l border-white/5 bg-[#0f101f] overflow-y-auto">
         <div className="p-6 space-y-8">
            <section>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">policy</span>
                    Active Governance
                </h3>
                <div className="bg-[#232ef2]/5 border border-[#232ef2]/20 rounded-xl p-4">
                    <p className="text-xs font-bold text-[#258cf4] mb-1">Financial Policy v2.3</p>
                    <p className="text-[10px] text-[#94a3b8] leading-relaxed">Requires Expert-level approval for all TFRS/IFRS interpretations.</p>
                </div>
            </section>

            <section>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">history</span>
                    Decision History
                </h3>
                <div className="space-y-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-[10px]">
                        <p className="font-bold text-white mb-1">Budget Allocation</p>
                        <p className="text-[#94a3b8]">Approved by CFO • 2h ago</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-[10px]">
                        <p className="font-bold text-white mb-1">Tax Provision Review</p>
                        <p className="text-[#94a3b8]">Verified by Expert • 1d ago</p>
                    </div>
                </div>
            </section>
         </div>
      </aside>
    </div>
  );
}

function MessageComponent({ message, onShare }: { message: Message; onShare?: () => void }) {
  const isAi = message.role === 'ai';

  return (
    <div className={cn("flex items-start gap-4 max-w-[90%] sm:max-w-[85%]", !isAi && "ml-auto flex-row-reverse")}>
      <div className={cn(
        "size-10 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 border-2 mt-1",
        isAi ? "bg-[#232ef2]/10 border-[#232ef2]/20 text-[#258cf4]" : "bg-slate-700 border-white/10 text-white"
      )}>
        {isAi ? (
          message.level === 'Staff' ? 'S' :
          message.level === 'Expert' ? 'E' :
          message.level === 'CFO' ? 'C' :
          (message.level as string) === 'Manager' ? 'M' :
          message.level === 'Human' ? 'H' : 'A'
        ) : 'U'}
      </div>

      <div className={cn("flex flex-col gap-2 w-full", !isAi && "items-end")}>
        <div className="flex items-center gap-3 px-1">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#94a3b8]">{message.sender}</span>
          {message.metadata?.policy && (
            <span className="text-[8px] font-black bg-[#232ef2]/20 text-[#258cf4] px-2 py-0.5 rounded border border-[#232ef2]/30 uppercase tracking-widest">
              {message.metadata.policy}
            </span>
          )}
          <span className="text-[9px] text-[#94a3b8]/50 font-mono">{message.timestamp}</span>
        </div>

        <div className={cn(
          "p-5 rounded-3xl text-[15px] leading-relaxed shadow-xl transition-all relative group",
          isAi ? "bg-[#1e293b] border border-white/5 text-[#f8fafc] rounded-tl-none" : "bg-[#232ef2] text-white rounded-tr-none shadow-blue-500/30"
        )}>
          {message.text}

          {message.attachments?.map((at, i) => (
             <div key={i} className="mt-4 flex items-stretch justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 hover:border-[#232ef2]/50 transition-all cursor-pointer group/card">
                <div className="flex flex-col justify-between py-1">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-rose-500">picture_as_pdf</span>
                        <p className="font-bold text-sm">{at.name}</p>
                    </div>
                    <p className="text-[10px] text-[#94a3b8] ml-9">{at.size} • Generated by system</p>
                    <div className="flex gap-2 ml-9 mt-3">
                        <button className="px-3 py-1 bg-[#232ef2] hover:bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">View</button>
                        <button onClick={onShare} className="px-3 py-1 bg-white/5 hover:bg-white/10 text-[#94a3b8] text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">Meeting Room</button>
                    </div>
                </div>
                <div className="w-24 h-full bg-slate-900/50 rounded-xl overflow-hidden border border-white/5 hidden sm:block">
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                        <span className="material-symbols-outlined text-4xl">table_chart</span>
                    </div>
                </div>
             </div>
          ))}

          {isAi && message.metadata && (
             <div className="mt-5 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg text-[#94a3b8]">verified_user</span>
                    <div className="flex flex-col">
                        <span className="text-[8px] uppercase font-black tracking-widest text-[#94a3b8]">Confidence</span>
                        <span className="text-xs font-black text-emerald-400">{Math.round(message.metadata.confidence! * 100)}%</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg text-[#94a3b8]">database</span>
                    <div className="flex flex-col">
                        <span className="text-[8px] uppercase font-black tracking-widest text-[#94a3b8]">Source</span>
                        <span className="text-xs font-black text-white truncate max-w-[120px]">{message.metadata.source}</span>
                    </div>
                </div>
             </div>
          )}

          {!isAi && (
            <button className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-[#94a3b8] hover:text-[#258cf4]">
                <span className="material-symbols-outlined text-lg">more_vert</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ExportOption({ label, desc, active = false }: { label: string; desc: string; active?: boolean }) {
    return (
        <label className={cn(
            "relative flex cursor-pointer items-start gap-4 rounded-2xl border-2 p-5 transition-all",
            active ? "border-[#232ef2] bg-[#232ef2]/5" : "border-white/5 hover:border-[#232ef2]/30"
        )}>
            <input type="radio" name="format" checked={active} className="mt-1 h-4 w-4 border-white/10 text-[#232ef2] focus:ring-[#232ef2] bg-transparent" />
            <div className="flex flex-col">
                <span className="font-bold text-white leading-tight">{label}</span>
                <span className="text-[10px] text-[#94a3b8] uppercase tracking-widest mt-1">{desc}</span>
            </div>
        </label>
    )
}

function ToggleItem({ label, active = false }: { label: string; active?: boolean }) {
    return (
        <label className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
            <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#258cf4] text-lg">
                    {label.includes("Attach") ? "attach_file" : label.includes("Decision") ? "analytics" : "account_tree"}
                </span>
                <span className="text-sm font-bold">{label}</span>
            </div>
            <input type="checkbox" checked={active} className="rounded border-white/20 text-[#232ef2] focus:ring-[#232ef2] bg-transparent h-5 w-5" />
        </label>
    )
}
