"use client";

import Modal from "@/components/ui/Modal";
import { AlertTriangle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  onConfirm: () => void;
}

export default function DeleteUserModal({ isOpen, onClose, userName, onConfirm }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="حذف مستخدم" maxWidth="max-w-sm">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h4 className="text-lg font-bold text-slate-900 mb-2">تأكيد الحذف</h4>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          هل أنت متأكد من رغبتك في حذف المستخدم <span className="font-bold text-slate-700">{userName || "هذا"}</span> نهائياً؟ 
          هذا الإجراء لا يمكن التراجع عنه.
        </p>

        <div className="flex gap-3 w-full">
          <button 
            onClick={onClose} 
            className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          >
            إلغاء
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm"
          >
            نعم، احذف
          </button>
        </div>
      </div>
    </Modal>
  );
}
