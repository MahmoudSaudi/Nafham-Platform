"use client";

import Modal from "@/components/ui/Modal";
import { Route, LayoutGrid, Type, BookOpen, Palette } from "lucide-react";
import { LearningTrack } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  track?: LearningTrack | null;
}

export default function TrackModal({ isOpen, onClose, track }: Props) {
  const isEditing = !!track;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "تعديل المسار التعليمي" : "إنشاء مسار جديد"}>
      
      <form className="space-y-4 mt-2">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">عنوان المسار</label>
          <div className="relative">
            <Type className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="مثال: مسار مطور الويب المتكامل"
              defaultValue={track?.title || ""}
              className="w-full bg-white border border-gray-200 text-sm font-bold rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">التصنيف</label>
          <div className="relative">
            <LayoutGrid className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <select 
              defaultValue={track?.category || "البرمجة والتطوير"}
              className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl px-4 pr-11 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:bg-gray-50 cursor-pointer"
            >
              <option>البرمجة والتطوير</option>
              <option>التصميم والجرافيك</option>
              <option>التسويق الرقمي</option>
              <option>إدارة الأعمال</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">وصف المسار</label>
          <div className="relative">
            <BookOpen className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
            <textarea 
              placeholder="اكتب وصفاً جذاباً يشرح ما سيتعلمه الطالب في هذا المسار..."
              defaultValue={track?.description || ""}
              rows={3}
              className="w-full bg-white border border-gray-200 text-sm font-medium rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 resize-none"
            ></textarea>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">الحالة</label>
            <div className="relative">
              <select 
                defaultValue={track?.status || "مسودة"}
                className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:bg-gray-50 cursor-pointer"
              >
                <option>مسودة</option>
                <option>منشور</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">لون المسار (الهوية)</label>
            <div className="relative">
              <Palette className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input 
                type="color"
                defaultValue={track?.colorHex || "#6366f1"}
                className="w-full h-11 bg-white border border-gray-200 rounded-xl pr-11 px-2 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            إلغاء
          </button>
          <button type="button" className="flex-1 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm">
            {isEditing ? "حفظ التعديلات" : "إنشاء المسار"}
          </button>
        </div>
      </form>

    </Modal>
  );
}
