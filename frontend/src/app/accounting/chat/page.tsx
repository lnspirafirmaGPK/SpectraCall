"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  Send,
  Paperclip,
  Image as ImageIcon,
  Mic,
  MoreVertical,
  Download,
  Users,
  Settings,
  FileText,
  X,
  Plus,
  ArrowRight,
  ShieldCheck,
  History,
  FileJson,
  CheckCircle2,
  FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// --- Types ---
interface Attachment {
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'audio' | 'spreadsheet';
}

interface Message {
  id: string;
  role: 'user' | 'ai';
  sender: string;
  text: string;
  timestamp: string;
  level?: 'Staff' | 'Expert' | 'CFO' | 'Human';
  attachments?: Attachment[];
  metadata?: {
    confidence?: number;
    source?: string;
    policy?: string;
    lineage_hash?: string;
  };
}

// --- Mock Data ---
const initialMessages: Message[] = [
  {
    id: "1",
    role: "ai",
    sender: "SmartNote AI",
    text: "สวัสดีครับคุณ Alex Rivera ผมคือผู้ช่วย Staff-Level ของคุณ มีอะไรให้ผมช่วยวิเคราะห์ข้อมูลบัญชีหรือเตรียมงบประมาณในวันนี้ไหมครับ?",
    timestamp: "10:30 AM",
    level: "Staff",
    metadata: {
      confidence: 0.98,
      source: "Accounting Core v1.2",
      policy: "General Inquiry"
    }
  },
  {
    id: "2",
    role: "user",
    sender: "Alex Rivera",
    text: "ช่วยวิเคราะห์งบการเงิน Q2 นี้หน่อยครับ ผมแนบไฟล์ให้แล้ว",
    timestamp: "10:32 AM",
    attachments: [
      { name: "งบการเงิน_Q2_2024.pdf", size: "2.4 MB", type: "pdf" }
    ]
  },
  {
    id: "3",
    role: "ai",
    sender: "SmartNote AI",
    text: "จากการวิเคราะห์เบื้องต้น งบ Q2 มีอัตรากำไรขั้นต้นเพิ่มขึ้น 15% เมื่อเทียบกับ Q1 ครับ แต่มีค่าใช้จ่ายในการดำเนินงาน (OpEx) สูงขึ้นผิดปกติในหมวดจัดซื้อจัดจ้าง ผมแนะนำให้ดึง 'Financial-Expert' มาร่วมวิเคราะห์เชิงลึกในห้องประชุมครับ",
    timestamp: "10:33 AM",
    level: "Staff",
    metadata: {
      confidence: 0.92,
      source: "RAG / Finance Analysis Engine",
      policy: "OpEx Policy v2.1"
    }
  }
];

export default function AccountingChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isMeetingRoomOpen, setIsMeetingRoomOpen] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<Attachment[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() && pendingAttachments.length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      sender: "Alex Rivera",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: pendingAttachments.length > 0 ? [...pendingAttachments] : undefined
    };

    setMessages([...messages, newMessage]);
    setInput("");
    setPendingAttachments([]);

    // Mock AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        sender: "SmartNote AI",
        text: "รับทราบครับ ผมกำลังประมวลผลข้อมูลที่คุณส่งมา...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        level: "Staff",
        metadata: {
          confidence: 0.95,
          source: "Tachyon Core",
          policy: "Standard Response"
        }
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const removePendingAttachment = (index: number) => {
    setPendingAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const addMockAttachment = (type: Attachment['type']) => {
    const mockFiles: Record<Attachment['type'], Attachment> = {
      pdf: { name: "Audit_Report.pdf", size: "1.2 MB", type: "pdf" },
      image: { name: "Receipt_Scan.jpg", size: "850 KB", type: "image" },
      audio: { name: "Meeting_Recording.mp3", size: "15.4 MB", type: "audio" },
      spreadsheet: { name: "Budget_Forecast.xlsx", size: "450 KB", type: "spreadsheet" }
    };
    setPendingAttachments([...pendingAttachments, mockFiles[type]]);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#101122] text-white overflow-hidden font-sans">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-white/5">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0f101f]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#232ef2]/10 border border-[#232ef2]/30 flex items-center justify-center">
              <Bot className="text-[#258cf4] w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-white">SmartNote AI</h2>
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">System Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-white/5 text-[#94a3b8] hover:text-white transition-all">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="size-8 rounded-full border border-white/10 bg-slate-800 bg-cover bg-center" style={{ backgroundImage: 'url("https://i.pravatar.cc/100?u=alex")' }}></div>
          </div>
        </header>

        {/* Conversation Area */}
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="max-w-4xl mx-auto space-y-8">
            {messages.map((msg) => (
              <MessageComponent
                key={msg.id}
                message={msg}
                onShareToMeeting={() => setIsMeetingRoomOpen(true)}
              />
            ))}
          </div>
        </ScrollArea>

        {/* Input & Bottom Bar Container */}
        <div className="p-6 bg-gradient-to-t from-[#0f101f] to-transparent">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Pending Attachments Preview */}
            {pendingAttachments.length > 0 && (
              <div className="flex flex-wrap gap-2 px-4 pb-2">
                {pendingAttachments.map((at, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 animate-in zoom-in duration-200">
                    <AttachmentIcon type={at.type} className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold truncate max-w-[120px]">{at.name}</span>
                    <button onClick={() => removePendingAttachment(i)} className="text-[#94a3b8] hover:text-rose-500 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="bg-[#1e293b]/50 border border-white/10 rounded-3xl p-2 flex items-center gap-2 shadow-2xl focus-within:border-[#232ef2]/50 transition-all backdrop-blur-sm">
              <div className="flex items-center gap-1 pl-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-white/5 text-[#94a3b8] hover:text-[#258cf4]">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1e293b] border-white/10 text-white w-48 p-2 rounded-2xl">
                    <DropdownMenuItem onClick={() => addMockAttachment('pdf')} className="rounded-xl flex items-center gap-3 cursor-pointer">
                      <FileText className="w-4 h-4 text-rose-500" />
                      <span className="text-xs font-bold">เอกสาร (PDF)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addMockAttachment('image')} className="rounded-xl flex items-center gap-3 cursor-pointer">
                      <ImageIcon className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold">รูปภาพ</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addMockAttachment('audio')} className="rounded-xl flex items-center gap-3 cursor-pointer">
                      <Mic className="w-4 h-4 text-[#258cf4]" />
                      <span className="text-xs font-bold">เสียง</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addMockAttachment('spreadsheet')} className="rounded-xl flex items-center gap-3 cursor-pointer">
                      <FileSpreadsheet className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-bold">ตาราง / สเปรดชีท</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-white/5 text-[#94a3b8] hover:text-[#258cf4]">
                  <ImageIcon className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-white/5 text-[#94a3b8] hover:text-[#258cf4]">
                  <Mic className="w-5 h-5" />
                </Button>
              </div>

              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="พิมพ์ข้อความที่ต้องการสอบถาม..."
                className="bg-transparent border-none focus-visible:ring-0 text-white text-sm h-12"
              />

              <Button
                onClick={handleSend}
                className="h-10 w-10 rounded-2xl bg-[#232ef2] hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 mr-1 transition-all"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Bottom Navigation Actions */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <Button
                onClick={() => setIsMeetingRoomOpen(true)}
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-[#232ef2]/10 hover:border-[#232ef2]/50 text-[#94a3b8] hover:text-[#258cf4] rounded-2xl px-6 h-10 font-black uppercase tracking-widest text-[10px] transition-all"
              >
                <Users className="w-4 h-4 mr-2" />
                ห้องประชุม
              </Button>
              <Button
                onClick={() => setIsExportOpen(true)}
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-[#232ef2]/10 hover:border-[#232ef2]/50 text-[#94a3b8] hover:text-[#258cf4] rounded-2xl px-6 h-10 font-black uppercase tracking-widest text-[10px] transition-all"
              >
                <Download className="w-4 h-4 mr-2" />
                ส่งออกประวัติ
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Context Panel (Refined) */}
      <aside className="hidden xl:flex w-80 flex-col border-l border-white/5 bg-[#0f101f] overflow-y-auto">
         <div className="p-6 space-y-8">
            <section>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8] mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#258cf4]" />
                    Active Governance
                </h3>
                <div className="bg-[#232ef2]/5 border border-[#232ef2]/20 rounded-xl p-4">
                    <p className="text-xs font-bold text-[#258cf4] mb-1">Financial Policy v2.3</p>
                    <p className="text-[10px] text-[#94a3b8] leading-relaxed">Requires Expert-level approval for all TFRS/IFRS interpretations.</p>
                </div>
            </section>

            <section>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8] mb-4 flex items-center gap-2">
                    <History className="w-3.5 h-3.5 text-[#258cf4]" />
                    Decision History
                </h3>
                <div className="space-y-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-[10px] hover:border-white/20 transition-all cursor-pointer group">
                        <p className="font-bold text-white mb-1 group-hover:text-[#258cf4]">Budget Allocation</p>
                        <p className="text-[#94a3b8]">Approved by CFO • 2h ago</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-[10px] hover:border-white/20 transition-all cursor-pointer group">
                        <p className="font-bold text-white mb-1 group-hover:text-[#258cf4]">Tax Provision Review</p>
                        <p className="text-[#94a3b8]">Verified by Expert • 1d ago</p>
                    </div>
                </div>
            </section>
         </div>
      </aside>

      {/* Modals */}
      <ExportDialog open={isExportOpen} onOpenChange={setIsExportOpen} />
      <MeetingRoomDialog open={isMeetingRoomOpen} onOpenChange={setIsMeetingRoomOpen} />
    </div>
  );
}

// --- Sub-components ---

function MessageComponent({ message, onShareToMeeting }: { message: Message; onShareToMeeting: () => void }) {
  const isAi = message.role === 'ai';

  return (
    <div className={cn("flex items-start gap-4 max-w-[90%]", !isAi && "ml-auto flex-row-reverse")}>
      <div className={cn(
        "size-10 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 border-2 mt-1 shadow-inner",
        isAi ? "bg-[#232ef2]/10 border-[#232ef2]/20 text-[#258cf4]" : "bg-slate-700 border-white/10 text-white"
      )}>
        {isAi ? message.level?.charAt(0) : 'U'}
      </div>

      <div className={cn("flex flex-col gap-2 w-full", !isAi && "items-end")}>
        <div className="flex items-center gap-3 px-1">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#94a3b8]">{message.sender}</span>
          {message.metadata?.policy && (
            <span className="text-[8px] font-black bg-[#232ef2]/20 text-[#258cf4] px-2 py-0.5 rounded border border-[#232ef2]/30 uppercase tracking-widest">
              {message.metadata.policy}
            </span>
          )}
          <span className="text-[9px] text-[#94a3b8]/50 font-mono tracking-tighter">{message.timestamp}</span>
        </div>

        <div className={cn(
          "p-5 rounded-3xl text-[14px] leading-relaxed shadow-xl transition-all relative group",
          isAi ? "bg-[#1e293b] border border-white/5 text-[#f8fafc] rounded-tl-none" : "bg-[#232ef2] text-white rounded-tr-none shadow-blue-500/20"
        )}>
          {message.text}

          {message.attachments?.map((at, i) => (
             <div key={i} className="mt-4 flex items-stretch justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 hover:border-[#232ef2]/50 transition-all group/card">
                <div className="flex flex-col justify-between py-1">
                    <div className="flex items-center gap-3">
                        <AttachmentIcon type={at.type} className="text-[#258cf4]" />
                        <p className="font-bold text-sm">{at.name}</p>
                    </div>
                    <p className="text-[10px] text-[#94a3b8] ml-9 font-mono">{at.size} • Lineage Verified</p>
                    <div className="flex gap-2 ml-9 mt-3">
                        <Button size="sm" className="h-7 bg-[#232ef2] hover:bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg px-3">View</Button>
                        <Button onClick={onShareToMeeting} variant="ghost" size="sm" className="h-7 bg-white/5 hover:bg-white/10 text-[#94a3b8] text-[9px] font-black uppercase tracking-widest rounded-lg px-3">Room Access</Button>
                    </div>
                </div>
                <div className="w-24 h-full bg-slate-900/50 rounded-xl overflow-hidden border border-white/5 hidden sm:flex items-center justify-center opacity-20">
                   <Plus className="w-8 h-8" />
                </div>
             </div>
          ))}

          {isAi && message.metadata && (
             <div className="mt-5 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <Bot className="text-emerald-400 w-4 h-4" />
                    <div className="flex flex-col">
                        <span className="text-[8px] uppercase font-black tracking-widest text-[#94a3b8]">Confidence</span>
                        <span className="text-xs font-black text-emerald-400">{Math.round(message.metadata.confidence! * 100)}%</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <History className="text-[#258cf4] w-4 h-4" />
                    <div className="flex flex-col">
                        <span className="text-[8px] uppercase font-black tracking-widest text-[#94a3b8]">Source</span>
                        <span className="text-xs font-black text-white truncate max-w-[120px]">{message.metadata.source}</span>
                    </div>
                </div>
             </div>
          )}

          <div className={cn(
            "absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity",
            isAi ? "-right-12" : "-left-12"
          )}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-[#94a3b8] hover:text-[#258cf4]">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1e293b] border-white/10 text-white p-1 rounded-xl">
                <DropdownMenuItem className="rounded-lg text-xs font-bold gap-2 cursor-pointer" onClick={onShareToMeeting}>
                  <Users className="w-3.5 h-3.5" />
                  ส่งไปยังห้องประชุม
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg text-xs font-bold gap-2 cursor-pointer text-rose-400">
                  <X className="w-3.5 h-3.5" />
                  ลบข้อความ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

function AttachmentIcon({ type, className }: { type: Attachment['type']; className?: string }) {
  switch (type) {
    case 'pdf': return <FileText className={cn("w-5 h-5", className)} />;
    case 'image': return <ImageIcon className={cn("w-5 h-5", className)} />;
    case 'audio': return <Mic className={cn("w-5 h-5", className)} />;
    case 'spreadsheet': return <FileSpreadsheet className={cn("w-5 h-5", className)} />;
    default: return <Paperclip className={cn("w-5 h-5", className)} />;
  }
}

function ExportDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#101122] border-white/10 text-white max-w-lg p-0 overflow-hidden rounded-[2rem]">
        <div className="p-8 pb-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase tracking-widest">ส่งออกประวัติการสนทนา</DialogTitle>
            <DialogDescription className="text-[#94a3b8] text-xs font-bold uppercase tracking-tighter mt-2">
              เลือรูปแบบและข้อมูลที่ต้องการรวมในเอกสารสำหรับการอ้างอิงและตรวจสอบ
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-8">
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8] mb-4">รูปแบบไฟล์ (Format)</h3>
            <RadioGroup defaultValue="pdf-summary" className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf-summary" id="r1" className="border-white/20 text-[#232ef2]" />
                <Label htmlFor="r1" className="text-xs font-bold">PDF (พร้อมสรุป)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf-full" id="r2" className="border-white/20 text-[#232ef2]" />
                <Label htmlFor="r2" className="text-xs font-bold">PDF (ตัวเต็ม)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="markdown" id="r3" className="border-white/20 text-[#232ef2]" />
                <Label htmlFor="r3" className="text-xs font-bold">Markdown (.md)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="json" id="r4" className="border-white/20 text-[#232ef2]" />
                <Label htmlFor="r4" className="text-xs font-bold">JSON (รวม metadata)</Label>
              </div>
            </RadioGroup>
          </section>

          <section>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8] mb-4">ข้อมูลเพิ่มเติม</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <Paperclip className="w-4 h-4 text-[#258cf4]" />
                  <span className="text-xs font-bold">รวมไฟล์แนบ (Bundle Attachments)</span>
                </div>
                <Checkbox defaultChecked className="border-white/20 data-[state=checked]:bg-[#232ef2]" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <Bot className="w-4 h-4 text-[#258cf4]" />
                  <span className="text-xs font-bold">รวม Decision Artifacts</span>
                </div>
                <Checkbox defaultChecked className="border-white/20 data-[state=checked]:bg-[#232ef2]" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <History className="w-4 h-4 text-[#258cf4]" />
                  <span className="text-xs font-bold">รวม Lineage Hashes</span>
                </div>
                <Checkbox className="border-white/20 data-[state=checked]:bg-[#232ef2]" />
              </div>
            </div>
          </section>
        </div>

        <DialogFooter className="p-8 bg-white/5 flex gap-4 mt-0 border-t border-white/10">
          <Button
            onClick={() => {
              toast({ title: "ระบบกำลังสร้างไฟล์", description: "กรุณารอสักครู่ กำลังดาวน์โหลดเอกสารของคุณ..." });
              onOpenChange(false);
            }}
            className="flex-1 h-14 bg-[#232ef2] hover:bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-500/20"
          >
            ดาวน์โหลดเอกสาร
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="px-8 h-14 bg-white/5 hover:bg-white/10 text-[#94a3b8] rounded-2xl font-black uppercase tracking-widest text-xs border border-white/10"
          >
            ยกเลิก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MeetingRoomDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#101122] border-white/10 text-white max-w-md p-0 overflow-hidden rounded-[2rem]">
        <div className="p-8">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
              <Users className="text-[#258cf4] w-6 h-6" />
              ห้องประชุม AI
            </DialogTitle>
            <DialogDescription className="text-[#94a3b8] text-xs font-bold uppercase tracking-tighter mt-2">
              เข้าสู่โหมดการประชุมร่วมกับ AI เพื่อการวิเคราะห์ที่ซับซ้อนขึ้น
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8 space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8] mb-2">ห้องประชุมที่กำลังดำเนินการ</h3>
            <div className="p-4 rounded-2xl bg-[#232ef2]/10 border border-[#232ef2]/30 hover:bg-[#232ef2]/20 transition-all cursor-pointer group">
              <div className="flex justify-between items-start">
                <p className="font-bold text-sm text-[#258cf4]">วางแผนงบประมาณ Q3</p>
                <span className="size-2 rounded-full bg-emerald-500"></span>
              </div>
              <p className="text-[10px] text-[#94a3b8] mt-1">ผู้เข้าร่วม: 2 Humans, 3 AI Experts</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 opacity-60 hover:opacity-100 transition-all cursor-pointer">
              <p className="font-bold text-sm">ทบทวนสัญญาจัดซื้อ v1.2</p>
              <p className="text-[10px] text-[#94a3b8] mt-1">สิ้นสุดการประชุมเมื่อ: 2 ชั่วโมงที่แล้ว</p>
            </div>

            <Button className="w-full h-14 mt-4 bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-2xl font-black uppercase tracking-widest text-xs transition-all group">
              <Plus className="w-4 h-4 mr-2 group-hover:text-[#258cf4] transition-colors" />
              สร้างห้องประชุมใหม่
            </Button>
          </div>
        </div>

        <DialogFooter className="p-6 bg-white/5 border-t border-white/10">
          <Button
            className="w-full h-12 bg-[#232ef2] hover:bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-xs"
            onClick={() => onOpenChange(false)}
          >
            เข้าสู่หน้า Dashboard ห้องประชุม
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
