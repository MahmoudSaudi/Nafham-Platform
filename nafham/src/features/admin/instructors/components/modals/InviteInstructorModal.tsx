"use client";

import Modal from "@/components/ui/Modal";
import { Mail, Briefcase, Send } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteInstructorModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="دعوة مدرب جديد" maxWidth="max-w-md">
      
      <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-sm font-medium leading-relaxed mb-6">
        أدخل البريد الإلكتروني للمدرب والتخصص المبدئي. سيتم إرسال رابط آمن له لإكمال بياناته وإنشاء حسابه ورفع أوراقه للاعتماد.
      </div>

      <form className="space-y-4">
        
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">البريد الإلكتروني للمدرب</label>
          <div className="relative">
            <Mail className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="email" 
              placeholder="instructor@example.com"
              className="w-full bg-white border border-gray-200 text-sm rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 text-left"
              dir="ltr"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">التخصص المبدئي</label>
          <div className="relative">
            <Briefcase className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 hover:bg-gray-50 cursor-pointer">
              <option value="">اختر التخصص...</option>
              <option>برمجة وتطوير</option>
              <option>تصميم وجرافيك</option>
              <option>تسويق رقمي</option>
              <option>إدارة أعمال</option>
              <option>أمن سيبراني</option>
            </select>
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            إلغاء
          </button>
          <button type="submit" className="flex-1 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />
            <span>إرسال الدعوة</span>
          </button>
        </div>

      </form>
    </Modal>
  );
}
