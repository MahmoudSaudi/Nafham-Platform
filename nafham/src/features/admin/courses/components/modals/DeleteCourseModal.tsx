"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
  onConfirm: () => Promise<void>;
}

export default function DeleteCourseModal({ isOpen, onClose, courseTitle, onConfirm }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      toast.success("تم الحذف بنجاح!");
      onClose();
    } catch (error) {
      toast.error("حدث خطأ أثناء الحذف");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="حذف دورة" maxWidth="max-w-sm">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h4 className="text-lg font-bold text-slate-900 mb-2">تأكيد الحذف</h4>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          هل أنت متأكد من رغبتك في حذف دورة <span className="font-bold text-slate-700">{courseTitle || "هذه"}</span> نهائياً؟ 
          سيتم حذف جميع الدروس والملفات المرتبطة بها. هذا الإجراء لا يمكن التراجع عنه.
        </p>

        <div className="flex gap-3 w-full">
          <button 
            onClick={onClose} 
            disabled={isDeleting}
            className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
          >
            إلغاء
          </button>
          <button 
            onClick={handleConfirm} 
            disabled={isDeleting}
            className="flex-1 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
            نعم، احذف الدورة
          </button>
        </div>
      </div>
    </Modal>
  );
}
