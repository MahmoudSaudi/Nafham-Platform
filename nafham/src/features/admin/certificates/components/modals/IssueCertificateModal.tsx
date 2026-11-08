"use client";

import Modal from "@/components/ui/Modal";
import { User, Award, CheckCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function IssueCertificateModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="إصدار شهادة يدوياً">
      
      <form className="space-y-4 mt-2">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">الطالب</label>
          <div className="relative">
            <User className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 hover:bg-gray-50 cursor-pointer">
              <option value="">اختر الطالب...</option>
              <option>ياسين محمود</option>
              <option>نورة أحمد</option>
              <option>خالد سعيد</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">المنتج التعليمي (دورة/مسار)</label>
          <div className="relative">
            <Award className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 hover:bg-gray-50 cursor-pointer">
              <option value="">اختر الدورة أو المسار...</option>
              <option>تطبيقات الويب المتكامل</option>
              <option>أساسيات التصميم الجرافيكي</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">التقدير (الدرجة)</label>
          <div className="relative">
            <CheckCircle className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 hover:bg-gray-50 cursor-pointer">
              <option>ممتاز (100%)</option>
              <option>جيد جداً (85%)</option>
              <option>جيد (75%)</option>
              <option>مقبول (65%)</option>
            </select>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-3 text-sm text-blue-700 font-medium">
          <span className="shrink-0 text-xl">ℹ️</span>
          <p>
            بمجرد إصدار الشهادة، سيتم إرسال إشعار بريد إلكتروني للطالب يحتوي على رابط التنزيل ورقم التحقق الفريد.
          </p>
        </div>
        
        <div className="pt-4 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            إلغاء
          </button>
          <button type="button" className="flex-1 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm">
            إصدار الشهادة
          </button>
        </div>
      </form>

    </Modal>
  );
}
