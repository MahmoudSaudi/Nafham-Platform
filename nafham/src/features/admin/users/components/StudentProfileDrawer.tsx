"use client";

import { X, Mail, Phone, MapPin, Calendar, BookOpen, Route as RouteIcon, CreditCard, Medal, HeadphonesIcon, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentEmail: string;
  studentAvatar?: string;
}

export default function StudentProfileDrawer({ isOpen, onClose, studentName, studentEmail, studentAvatar }: Props) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!isOpen) return null;

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(studentName)}&background=f1f5f9&color=64748b`;

  const tabs = [
    { id: "overview", label: "نظرة عامة" },
    { id: "courses", label: "المنتجات (دورات/مسارات)" },
    { id: "financials", label: "المدفوعات والفواتير" },
    { id: "certificates", label: "الشهادات" },
    { id: "tickets", label: "التذاكر" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 bottom-0 left-0 w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Header - Fixed */}
        <div className="bg-slate-900 text-white p-6 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="relative flex justify-between items-start z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white p-1 overflow-hidden shrink-0 shadow-lg">
                <div className="w-full h-full relative rounded-xl overflow-hidden bg-slate-100">
                  <Image src={studentAvatar || defaultAvatar} alt={studentName} fill className="object-cover" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-white mb-1">{studentName}</h2>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Mail className="w-3.5 h-3.5" />
                  <span dir="ltr">{studentEmail}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mt-2 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  حساب نشط
                </div>
              </div>
            </div>

            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-100 shrink-0 px-2 flex overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? "border-emerald-600 text-emerald-700" 
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900">4</div>
                    <div className="text-xs font-bold text-slate-500">دورات مسجل بها</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900">85%</div>
                    <div className="text-xs font-bold text-slate-500">متوسط الإنجاز</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 border-b border-gray-50 pb-3">معلومات التواصل</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span dir="ltr">+20 100 123 4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>القاهرة، مصر</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>تاريخ الانضمام: 15 سبتمبر 2023</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === "courses" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                    <RouteIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">مسار تطوير الويب المتكامل</h4>
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full mt-1 inline-block">مسار</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-600">مكتمل 100%</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">أساسيات React.js</h4>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1 inline-block">دورة</span>
                  </div>
                </div>
                <div className="text-right w-24">
                  <div className="text-xs font-bold text-slate-500 mb-1 flex justify-between">
                    <span>التقدم</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "financials" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">شراء مسار تطوير الويب المتكامل</h4>
                    <div className="text-xs text-slate-400 mt-1">15 أكتوبر 2023 • Visa</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-emerald-600 text-lg">$450</div>
                  <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block">مدفوع</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <Medal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">شهادة إتمام مسار تطوير الويب</h4>
                    <div className="text-xs text-slate-500 mt-1">تاريخ الإصدار: 20 نوفمبر 2023</div>
                  </div>
                </div>
                <button className="text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors">
                  تحميل
                </button>
              </div>
            </div>
          )}

          {activeTab === "tickets" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <HeadphonesIcon className="w-4 h-4 text-amber-500" />
                    <h4 className="font-bold text-slate-900 text-sm">استفسار بخصوص الدفع المزدوج</h4>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                    قيد المعالجة
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-2">لقد تم سحب المبلغ مرتين من بطاقتي، الرجاء المساعدة في استرداد المبلغ الإضافي.</p>
                <div className="text-[10px] text-slate-400">آخر تحديث: قبل يومين</div>
              </div>
            </div>
          )}

        </div>

      </div>
    </>
  );
}
