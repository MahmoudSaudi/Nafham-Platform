"use client";

import { useState } from "react";
import { useSettings } from "../hooks/useSettings";
import { useSession } from "next-auth/react";
import { User, Bell, Shield, Save, CheckCircle2, Eye, EyeOff, Globe, CreditCard, UserPlus } from "lucide-react";

export default function SettingsView() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role || "ADMIN";

  const { 
    activeTab, 
    setActiveTab, 
    formData, 
    handleChange, 
    handleToggle, 
    isSaving, 
    successMessage, 
    handleSave 
  } = useSettings();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const tabs = [
    { id: "account", label: "الحساب الشخصي", icon: User },
    { id: "notifications", label: "الإشعارات", icon: Bell },
    { id: "security", label: "الأمان", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">الإعدادات</h1>
          <p className="text-slate-500 mt-2">إدارة حسابك وتفضيلاتك على المنصة.</p>
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
                      : "text-slate-600 hover:bg-gray-50 hover:text-slate-900"
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-emerald-600" : "text-slate-400"}`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
            {successMessage && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-700">
                <CheckCircle2 className="w-5 h-5" />
                <p className="font-medium">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleSave}>
              {activeTab === "account" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-6">المعلومات الأساسية</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 block">الاسم الكامل</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 block">البريد الإلكتروني</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-colors bg-gray-50"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <label className="text-sm font-bold text-slate-700 block">النبذة التعريفية (Bio)</label>
                    <textarea 
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">تفضيلات الإشعارات</h2>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div>
                      <p className="font-bold text-slate-800">إشعارات البريد الإلكتروني</p>
                      <p className="text-sm text-slate-500 mt-1">تلقي تحديثات الكورسات والعروض على بريدك.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleToggle("notificationsEmail")}
                      className={`relative w-12 h-6 rounded-full transition-colors ${formData.notificationsEmail ? "bg-emerald-500" : "bg-gray-300"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.notificationsEmail ? "left-1" : "right-1"}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div>
                      <p className="font-bold text-slate-800">إشعارات المتصفح (Push)</p>
                      <p className="text-sm text-slate-500 mt-1">تلقي إشعارات فورية عند تفاعل الآخرين معك.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleToggle("notificationsPush")}
                      className={`relative w-12 h-6 rounded-full transition-colors ${formData.notificationsPush ? "bg-emerald-500" : "bg-gray-300"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.notificationsPush ? "left-1" : "right-1"}`} />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">تغيير كلمة المرور</h2>
                  
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 block">كلمة المرور الحالية</label>
                      <div className="relative">
                        <input 
                          type={showCurrentPassword ? "text" : "password"} 
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-12 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-colors"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors p-1"
                        >
                          {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 block">كلمة المرور الجديدة</label>
                      <div className="relative">
                        <input 
                          type={showNewPassword ? "text" : "password"} 
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-12 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-colors"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors p-1"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* Form Actions */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm shadow-emerald-600/20"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  <span>{isSaving ? "جاري الحفظ..." : "حفظ التعديلات"}</span>
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
