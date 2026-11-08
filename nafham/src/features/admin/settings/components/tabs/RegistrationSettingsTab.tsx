import React from "react";
import { UserPlus } from "lucide-react";
import { SettingsTabProps } from "./types";

export function RegistrationSettingsTab({ formData, handleToggle }: SettingsTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <UserPlus className="w-6 h-6 text-emerald-600" />
        إعدادات التسجيل والأمان
      </h2>
      
      <div className="space-y-4">
        <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div>
            <div className="font-semibold text-slate-900">السماح بتسجيل حسابات جديدة</div>
            <div className="text-sm text-slate-500 mt-1">إذا تم الإغلاق لن يتمكن أي طالب جديد من إنشاء حساب</div>
          </div>
          <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.ALLOW_REGISTRATION !== false ? 'bg-emerald-600' : 'bg-slate-200'}`}>
            <input type="checkbox" className="sr-only" checked={formData.ALLOW_REGISTRATION !== false} onChange={() => handleToggle('ALLOW_REGISTRATION')} />
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.ALLOW_REGISTRATION !== false ? '-translate-x-6' : '-translate-x-1'}`} />
          </div>
        </label>

        <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div>
            <div className="font-semibold text-slate-900">التحقق الإجباري من البريد</div>
            <div className="text-sm text-slate-500 mt-1">إرسال كود تحقق عبر الإيميل قبل تفعيل الحساب</div>
          </div>
          <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.REQUIRE_EMAIL_VERIFICATION ? 'bg-emerald-600' : 'bg-slate-200'}`}>
            <input type="checkbox" className="sr-only" checked={!!formData.REQUIRE_EMAIL_VERIFICATION} onChange={() => handleToggle('REQUIRE_EMAIL_VERIFICATION')} />
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.REQUIRE_EMAIL_VERIFICATION ? '-translate-x-6' : '-translate-x-1'}`} />
          </div>
        </label>
      </div>
    </div>
  );
}
