"use client";

import { useSession } from "next-auth/react";
import { useAdminSettings } from "../hooks/useAdminSettings";
import { Globe, CreditCard, UserPlus, Save, CheckCircle2, Link as LinkIcon, Bot, UserCircle } from "lucide-react";
import { 
  GeneralSettingsTab, 
  RegistrationSettingsTab, 
  PaymentsSettingsTab, 
  SocialSettingsTab, 
  AISettingsTab, 
  ProfileSettingsTab 
} from "./tabs";

export default function AdminSettingsView() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;

  const {
    activeTab,
    setActiveTab,
    formData,
    handleChange,
    handleToggle,
    isSaving,
    isLoading,
    successMessage,
    handleSave,
    setFormData,
  } = useAdminSettings();

  // If loading settings from backend
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: "platform", label: "إعدادات المنصة", icon: Globe },
    { id: "registration", label: "التسجيل والأمان", icon: UserPlus },
    { id: "social", label: "التواصل الاجتماعي", icon: LinkIcon },
    { id: "ai", label: "الذكاء الاصطناعي", icon: Bot },
    { id: "profile", label: "حساب المسؤول", icon: UserCircle },
  ];

  // Only SUPER_ADMIN (or whatever role mechanism you have) gets to see Payments.
  // For now, if role is ADMIN, we'll assume they can see it, but we can restrict this later.
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
      tabs.push({ id: "payments", label: "بوابات الدفع", icon: CreditCard });
  }

  const commonProps = {
    formData,
    handleChange,
    handleToggle,
    setFormData,
    role
  };

  return (
    <div className="min-h-[80vh] pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">إعدادات المنصة</h1>
        <p className="text-slate-500 mt-2">الإعدادات العامة، بوابات الدفع، والتسجيل.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex flex-row md:flex-col gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id 
                    ? "bg-emerald-50 text-emerald-700" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-emerald-600" : "text-slate-400"}`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            
            {activeTab === "platform" && <GeneralSettingsTab {...commonProps} />}
            {activeTab === "registration" && <RegistrationSettingsTab {...commonProps} />}
            {activeTab === "social" && <SocialSettingsTab {...commonProps} />}
            {activeTab === "ai" && <AISettingsTab {...commonProps} />}
            {activeTab === "payments" && <PaymentsSettingsTab {...commonProps} />}
            {activeTab === "profile" && <ProfileSettingsTab {...commonProps} />}

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              {successMessage ? (
                <div className="flex items-center gap-2 text-emerald-600 font-medium animate-in fade-in slide-in-from-right-4">
                  <CheckCircle2 className="w-5 h-5" />
                  {successMessage}
                </div>
              ) : <div />}
              
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-70"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
