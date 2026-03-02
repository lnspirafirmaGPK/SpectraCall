
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
          <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
          <div className="bg-background-card border border-border-subtle rounded-xl p-6">
            <p className="text-text-muted">Configuration options for the ASI platform will be displayed here.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
