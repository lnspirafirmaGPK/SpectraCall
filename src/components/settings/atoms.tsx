import React from 'react';
import { cn } from '@/lib/utils';

export interface SettingsSectionProps {
  title: string;
  description?: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

export const SettingsSection = ({
  title,
  description,
  icon,
  children,
  className
}: SettingsSectionProps) => {
  return (
    <section className={cn("bg-background-card border border-border-subtle rounded-3xl p-8 space-y-6 shadow-xl shadow-black/20", className)}>
      <div className="space-y-1">
        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
          {icon && <span className="material-symbols-outlined text-primary">{icon}</span>}
          {title}
        </h2>
        {description && <p className="text-text-muted text-sm">{description}</p>}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
};

export interface SettingsRowProps {
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const SettingsRow = ({
  label,
  description,
  children,
  className
}: SettingsRowProps) => {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-white/5 last:border-0", className)}>
      <div className="space-y-0.5">
        <p className="font-bold text-sm text-text-main">{label}</p>
        {description && <p className="text-[10px] text-text-muted uppercase tracking-widest">{description}</p>}
      </div>
      <div className="flex items-center">
        {children}
      </div>
    </div>
  );
};

export const SettingControl = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-w-[200px] flex justify-end">{children}</div>;
};
