"use client";

import Modal from "@/components/ui/Modal";
import { DollarSign, CheckCircle2 } from "lucide-react";
import { Instructor } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  instructor?: Instructor;
}

export default function PayoutInstructorModal({ isOpen, onClose, instructor }: Props) {
  if (!instructor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تسوية أرباح المدرب">
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mt-2 mb-4">
        <h4 className="font-bold text-emerald-900 text-sm mb-1">الرصيد المعلق الحالي للمدرب ({instructor.name}):</h4>
        <div className="flex items-center gap-2 mt-2">
          <DollarSign className="w-6 h-6 text-emerald-600" />
          <span className="text-3xl font-extrabold text-emerald-700" dir="ltr">${instructor.pendingPayout}</span>
        </div>
        <p className="text-xs text-emerald-700 mt-2 font-medium">
          عند تأكيد التسوية، سيتم تصفير هذا الرصيد وإضافته إلى إجمالي أرباح المدرب.
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">المبلغ المراد تسويته</label>
          <div className="relative">
            <DollarSign className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="number"
              defaultValue={instructor.pendingPayout}
              className="w-full bg-white border border-gray-200 text-sm font-bold rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">وسيلة الدفع المُستخدمة (اختياري)</label>
          <div className="relative">
            <select 
              className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 hover:bg-gray-50 cursor-pointer"
            >
              <option>PayPal</option>
              <option>حوالة بنكية</option>
              <option>Vodafone Cash</option>
            </select>
          </div>
        </div>
        
        <div className="pt-4 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            إلغاء
          </button>
          <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>تأكيد وتسوية</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
