import React from "react";
import { CreditCard, Shield } from "lucide-react";
import { SettingsTabProps } from "./types";

export function PaymentsSettingsTab({ formData, handleChange }: SettingsTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <CreditCard className="w-6 h-6 text-emerald-600" />
        بوابات الدفع (Stripe & Paymob)
      </h2>
      
      <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-sm mb-6 flex gap-3 border border-yellow-200">
        <Shield className="w-5 h-5 shrink-0 text-yellow-600" />
        <div>
          <strong>منطقة حساسة:</strong> هذه الإعدادات تظهر لمدير النظام (Super Admin) فقط.
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 border-b pb-2">عملة الموقع الافتراضية</h3>
          <div className="space-y-2">
            <select 
              name="CURRENCY"
              value={formData.CURRENCY as string || "EGP"}
              onChange={handleChange}
              className="w-full md:w-1/2 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            >
              <option value="EGP">جنيه مصري (EGP)</option>
              <option value="SAR">ريال سعودي (SAR)</option>
              <option value="USD">دولار أمريكي (USD)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 border-b pb-2">Stripe Keys</h3>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Public Key</label>
            <input 
              type="text" 
              name="STRIPE_PUBLIC_KEY"
              value={formData.STRIPE_PUBLIC_KEY as string || ""}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
              placeholder="pk_test_..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Secret Key</label>
            <input 
              type="password" 
              name="STRIPE_SECRET_KEY"
              value={formData.STRIPE_SECRET_KEY as string || ""}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
              placeholder="sk_test_..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 border-b pb-2">Paymob Keys</h3>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">API Key</label>
            <input 
              type="password" 
              name="PAYMOB_API_KEY"
              value={formData.PAYMOB_API_KEY as string || ""}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
