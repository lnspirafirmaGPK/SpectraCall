import React from 'react';
import { SettingsSection, SettingsRow, SettingControl } from '../atoms';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockBilling } from '@/lib/mock/settings';

export const BillingTab = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SettingsSection
        title="Subscription & Plan"
        description="Overview of your current enterprise license."
        icon="payments"
      >
        <div className="flex items-center justify-between p-6 bg-primary/10 border border-primary/20 rounded-3xl">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Current Plan</p>
            <h3 className="text-2xl font-black">{mockBilling.plan}</h3>
            <p className="text-xs text-text-muted mt-2">Renews on {mockBilling.expiryDate}</p>
          </div>
          <Button className="bg-primary text-white text-xs font-black uppercase tracking-widest px-6 h-12 rounded-2xl">Upgrade Plan</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {[
            { label: 'Messages', current: 12450, limit: 50000, icon: 'chat' },
            { label: 'Files Processed', current: 234, limit: 1000, icon: 'description' },
            { label: 'Meeting Rooms', current: 45, limit: 100, icon: 'meeting_room' },
            { label: 'Agent Calls', current: 3200, limit: 10000, icon: 'smart_toy' },
          ].map(stat => (
            <div key={stat.label} className="space-y-3">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">{stat.icon}</span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{stat.label}</p>
                </div>
                <p className="text-xs font-bold">{stat.current.toLocaleString()} / {stat.limit.toLocaleString()}</p>
              </div>
              <Progress value={(stat.current / stat.limit) * 100} className="h-1.5 bg-white/5" indicatorClassName="bg-primary" />
            </div>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Payment & Invoices"
        description="Manage billing methods and download past statements."
        icon="receipt_long"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-text-muted">credit_card</span>
              </div>
              <div>
                <p className="font-bold">Visa ending in {mockBilling.paymentMethod.last4}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-widest">Primary Payment Method</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-primary text-[10px] font-bold uppercase">Edit</Button>
          </div>

          <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-[10px] uppercase font-black text-text-muted">
                <tr>
                  <th className="px-6 py-3">Invoice ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockBilling.invoices.map(invoice => (
                  <tr key={invoice.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{invoice.id}</td>
                    <td className="px-6 py-4 text-text-muted">{invoice.date}</td>
                    <td className="px-6 py-4 font-bold">${invoice.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="material-symbols-outlined text-text-muted hover:text-primary">download</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
};
