
"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function SettingsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-text-main font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-10">
          <h1 className="text-4xl font-black text-white mb-10 tracking-tight">System Settings</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-background-card border border-border-subtle rounded-3xl p-8 space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">groups</span>
                    AI Meeting Rooms
                </h2>
                <p className="text-text-muted text-sm">Manage your collaborative workspaces and agent permissions.</p>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/50 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">meeting_room</span>
                            </div>
                            <div>
                                <p className="font-bold">Manage Saved Rooms</p>
                                <p className="text-[10px] text-text-muted uppercase tracking-widest">12 Active Workspaces</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">chevron_right</span>
                    </div>

                    <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/50 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">star</span>
                            </div>
                            <div>
                                <p className="font-bold">Favorite AI Agents</p>
                                <p className="text-[10px] text-text-muted uppercase tracking-widest">Configure Auto-Invite</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">chevron_right</span>
                    </div>
                </div>

                <button className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all">
                    Navigate to Meeting Manager
                </button>
              </section>

              <section className="bg-background-card border border-border-subtle rounded-3xl p-8 space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">security</span>
                    Governance & Access
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                        <p className="text-xs font-bold uppercase tracking-tighter text-text-muted">Agent Autonomy</p>
                        <p className="text-lg font-black">Level 3 (Restricted)</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                        <p className="text-xs font-bold uppercase tracking-tighter text-text-muted">Decision Threshold</p>
                        <p className="text-lg font-black">$50,000 USD</p>
                    </div>
                </div>
              </section>
            </div>

            <aside className="space-y-8">
                <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 space-y-4">
                    <span className="material-symbols-outlined text-primary text-4xl">info</span>
                    <h3 className="text-lg font-bold">Enterprise Mode Active</h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                        Your organization is currently operating under the ASI Technical Reference Architecture (TRA) v2.3 protocols. All agent escalations are logged to GenesisCore.
                    </p>
                    <button className="text-[10px] font-black uppercase text-primary hover:underline tracking-widest">View TRA Documentation</button>
                </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
