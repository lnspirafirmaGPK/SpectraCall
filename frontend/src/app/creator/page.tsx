
"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";

export default function CreatorStudioPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-slate-100 antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 flex flex-col w-full max-w-[1440px] mx-auto p-6 lg:p-10 gap-8 overflow-y-auto">
          {/* Header & Progress */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap justify-between items-end gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-primary text-sm font-bold uppercase tracking-wider">Deployment Pipeline</p>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                  Agent Governance Gate
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl">
                  Configure mandatory smart contract bindings for data access, action permissions, and ethical boundaries before deployment.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-sm transition-colors">
                  Save Draft
                </button>
                <button className="px-5 py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-sm transition-colors shadow-lg shadow-primary/25">
                  Validate & Continue
                </button>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-background-card rounded-full h-2 overflow-hidden flex">
              <div className="bg-primary h-full" style={{ width: '83%' }}></div>
              <div className="bg-primary/30 h-full animate-pulse" style={{ width: '17%' }}></div>
            </div>
            <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <span>Identity</span>
              <span>Knowledge</span>
              <span>Tools</span>
              <span>Model</span>
              <span className="text-primary">Governance</span>
              <span>Deploy</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Configuration Form */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Data Access Contracts */}
              <Section title="Data Access Contracts" icon="database" description="Define read/write permissions for neural data vaults.">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <FormSelect label="Protocol" options={["GDPR-Compliant User Data (Standard)", "HIPAA-Secure Medical Records", "Public Domain Knowledge Only"]} />
                    </div>
                    <FormSelect label="Version" options={["v2.4.1 (Stable)", "v2.5.0 (Beta)", "v1.9.0 (Legacy)"]} />
                  </div>
                  <WarningBox title="Deprecated Protocol Detected" text="The selected data protocol v1.9.0 will be sunset in 14 days. Upgrade recommended." />
                </div>
              </Section>

              {/* Action & Ethics Boundaries */}
              <Section title="Action & Ethics Boundaries" icon="gavel" description="Set autonomous decision-making limits." color="purple">
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Authorization Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="border border-slate-200 dark:border-slate-700 rounded-lg py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-300">Read Only</button>
                      <button className="bg-primary/20 border border-primary text-primary rounded-lg py-2 text-sm font-bold relative overflow-hidden">
                        Suggest & Review
                        <div className="absolute top-0 right-0 size-2 bg-primary rounded-bl-full"></div>
                      </button>
                      <button className="border border-slate-200 dark:border-slate-700 rounded-lg py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-300 opacity-50 cursor-not-allowed">Full Autonomy</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormSelect label="Ethics Module" options={["Asimov Core (Three Laws)", "Corporate Safety Standard", "Financial Risk Aversion"]} />
                    <FormInput label="Budget Cap (Daily)" type="number" prefix="$" value="50.00" />
                  </div>
                  <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <ToggleSwitch title="Emergency Kill-Switch" description="Allow human override at kernel level" checked />
                    <ToggleSwitch title="Audit Trail Logging" description="Record every decision vector on-chain" checked />
                  </div>
                </div>
              </Section>
            </div>

            {/* Right Column: Live Validator */}
            <div className="lg:col-span-5">
              <div className="sticky top-6 flex flex-col gap-4">
                <div className="bg-background-card border border-border-subtle rounded-xl overflow-hidden shadow-2xl relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                  <div className="p-5 border-b border-border-subtle bg-background-card flex justify-between items-center">
                    <div className="flex items-center gap-2 text-white">
                      <span className="material-symbols-outlined text-secondary animate-pulse">security</span>
                      <h3 className="font-bold tracking-tight">Live Policy Validator</h3>
                    </div>
                    <span className="px-2 py-1 rounded bg-secondary/10 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-wider">Online</span>
                  </div>
                  <div className="p-5 space-y-6">
                    <div className="flex items-center gap-4">
                       <RiskGauge value={60} label="Med" />
                       <div className="flex flex-col gap-1 flex-1">
                        <h4 className="text-white text-sm font-medium">Validation Status</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Configuration contains <span className="text-accent">1 warning</span>. Deployment is permitted but requires manual override confirmation.
                        </p>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <ValidationItem label="Schema Compatibility" status="PASS" />
                       <ValidationItem label="Budget Constraints" status="PASS" />
                       <ValidationItem label="Protocol Lifecycle" status="WARN" />
                       <ValidationItem label="Final Sign-off" status="PENDING" />
                    </div>
                    <div className="bg-[#0d131a] rounded-lg p-4 font-mono text-xs overflow-hidden border border-border-subtle">
                       <div className="flex justify-between items-center mb-2 text-slate-500">
                         <span>contract_manifest.json</span>
                         <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-white">content_copy</span>
                       </div>
                       <div className="text-slate-400">
                         <span className="text-purple-400">"governance"</span>: {'{'}<br/>
                         &nbsp;&nbsp;<span className="text-blue-400">"protocol"</span>: <span className="text-secondary">"gdpr_std_v2"</span>,<br/>
                         &nbsp;&nbsp;<span className="text-blue-400">"ethics_engine"</span>: <span className="text-secondary">"asimov_core"</span>,<br/>
                         &nbsp;&nbsp;<span className="text-blue-400">"risk_score"</span>: <span className="text-accent">45</span>,<br/>
                         &nbsp;&nbsp;<span className="text-blue-400">"override"</span>: <span className="text-accent-danger">true</span><br/>
                         {'}'}
                       </div>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3 items-start">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">lightbulb</span>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">ASI Assistant</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Need a custom contract? Use the <a className="text-primary hover:underline" href="#">Contract Builder</a> to create bespoke governance logic.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Section({ title, icon, description, children, color = "primary" }: any) {
  const iconBg = color === "purple" ? "bg-purple-500/10 text-purple-400" : "bg-primary/10 text-primary";
  return (
    <div className="bg-white dark:bg-background-card border border-slate-200 dark:border-border-subtle rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className={cn("p-2 rounded-lg", iconBg)}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function FormSelect({ label, options }: any) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">{label}</label>
      <div className="relative">
        <select className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-subtle rounded-lg px-4 py-2.5 text-slate-900 dark:text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary appearance-none">
          {options.map((o: any) => <option key={o}>{o}</option>)}
        </select>
        <div className="absolute right-3 top-2.5 pointer-events-none text-slate-500">
          <span className="material-symbols-outlined text-[20px]">arrow_drop_down</span>
        </div>
      </div>
    </div>
  );
}

function WarningBox({ title, text }: any) {
  return (
    <div className="flex items-start gap-3 p-3 rounded bg-accent/10 border border-accent/20">
      <span className="material-symbols-outlined text-accent text-[20px] mt-0.5">warning</span>
      <div>
        <p className="text-sm font-bold text-accent">{title}</p>
        <p className="text-xs text-slate-400 mt-0.5">{text}</p>
      </div>
    </div>
  );
}

function FormInput({ label, type, prefix, value }: any) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">{label}</label>
      <div className="relative flex items-center">
        {prefix && <span className="absolute left-4 text-slate-500 text-sm">{prefix}</span>}
        <input className={cn("w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-subtle rounded-lg py-2.5 text-slate-900 dark:text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary", prefix ? "pl-8" : "pl-4")} type={type} defaultValue={value}/>
      </div>
    </div>
  );
}

function ToggleSwitch({ title, description, checked }: any) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-primary transition-colors">{title}</span>
        <span className="text-xs text-slate-500">{description}</span>
      </div>
      <div className={cn("relative inline-flex h-6 w-11 items-center rounded-full transition-colors", checked ? "bg-secondary/20" : "bg-slate-200 dark:bg-slate-700")}>
        <span className={cn("inline-block h-4 w-4 transform rounded-full bg-secondary transition", checked ? "translate-x-6" : "translate-x-1")}></span>
      </div>
    </label>
  );
}

function RiskGauge({ value, label }: any) {
  return (
    <div className="relative size-20 shrink-0">
      <svg className="size-full rotate-[-90deg]" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-700" />
        <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${value}, 100`} className="text-accent" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-sm font-bold">{label}</span>
        <span className="text-[10px] text-slate-400">Risk</span>
      </div>
    </div>
  );
}

function ValidationItem({ label, status }: any) {
  const isPass = status === "PASS";
  const isWarn = status === "WARN";
  const isPending = status === "PENDING";

  const icon = isPass ? "check_circle" : isWarn ? "error" : "hourglass_empty";
  const color = isPass ? "text-secondary" : isWarn ? "text-accent" : "text-slate-500";
  const bg = isPass ? "bg-slate-800/50 border-border-subtle" : isWarn ? "bg-accent/5 border-accent/20" : "bg-slate-800/50 border-border-subtle";

  return (
    <div className={cn("flex items-center justify-between p-3 rounded border transition-colors", bg)}>
      <div className="flex items-center gap-3">
        <span className={cn("material-symbols-outlined text-[18px]", color)}>{icon}</span>
        <span className="text-sm text-slate-200">{label}</span>
      </div>
      <span className={cn("text-xs font-mono", color)}>{status}</span>
    </div>
  );
}
