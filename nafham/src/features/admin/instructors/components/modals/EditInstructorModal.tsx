"use client";

import Modal from "@/components/ui/Modal";
import { User, Mail, BookOpen, Percent } from "lucide-react";
import { Instructor } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  instructor?: Instructor;
}

export default function EditInstructorModal({ isOpen, onClose, instructor }: Props) {
  if (!instructor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تعديل بيانات المدرب">
      <form className="space-y-4 mt-2">
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-100 bg-emerald-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={instructor.avatar} alt={instructor.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{instructor.name}</h3>
            <p className="text-xs font-medium text-slate-500" dir="ltr">{instructor.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">اسم المدرب</label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                defaultValue={instructor.name}
                className="w-full bg-white border border-gray-200 text-sm font-medium rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="email"
                defaultValue={instructor.email}
                className="w-full bg-white border border-gray-200 text-sm font-medium rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 text-left"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">التخصص / المسار</label>
          <div className="relative">
            <BookOpen className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <select 
              defaultValue={instructor.track}
              className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl px-4 pr-11 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 hover:bg-gray-50 cursor-pointer"
            >
              <option>تطوير الويب</option>
              <option>التصميم الجرافيكي</option>
              <option>إدارة الأعمال</option>
              <option>التسويق الرقمي</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">نسبة الأرباح للمدرب</label>
            <div className="relative">
              <Percent className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="number"
                defaultValue="70"
                className="w-full bg-white border border-gray-200 text-sm font-bold rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">حالة العقد</label>
            <div className="relative">
              <select 
                defaultValue={instructor.contractStatus}
                className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 hover:bg-gray-50 cursor-pointer"
              >
                <option>نشط</option>
                <option>قيد المراجعة</option>
                <option>معلق</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            إلغاء
          </button>
          <button type="button" className="flex-1 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm">
            حفظ التعديلات
          </button>
        </div>
      </form>
    </Modal>
  );
}
