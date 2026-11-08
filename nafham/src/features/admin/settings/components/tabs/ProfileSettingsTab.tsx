import React from "react";
import { UserCircle } from "lucide-react";
import { SettingsTabProps } from "./types";

export function ProfileSettingsTab({ formData, handleChange }: SettingsTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <UserCircle className="w-6 h-6 text-emerald-600" />
        حساب المسؤول
      </h2>
      
      <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-6 border border-blue-200">
        سيتم إضافة إمكانية تعديل البريد الإلكتروني وكلمة المرور الخاصة بحسابك هنا قريباً. (قيد التطوير)
      </div>
    </div>
  );
}
