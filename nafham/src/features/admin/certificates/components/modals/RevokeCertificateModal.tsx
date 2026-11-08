"use client";

import Modal from "@/components/ui/Modal";
import { AlertTriangle, MessageSquare, X } from "lucide-react";
import { Certificate } from "../../types";

interface RevokeCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate?: Certificate;
  onConfirm?: () => void;
  isRevoking?: boolean;
}

export default function RevokeCertificateModal({ isOpen, onClose, certificate, onConfirm, isRevoking }: RevokeCertificateModalProps) {
  if (!isOpen || !certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-red-50/50">
          <div className="flex items-center gap-3 text-red-600">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold">إلغاء الشهادة</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-gray-600">
          <p>
            هل أنت متأكد من رغبتك في إلغاء شهادة الطالب <span className="font-bold text-gray-900">{certificate.studentName}</span>؟
          </p>
          
          <div className="bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">رقم الشهادة:</span>
              <span className="font-medium text-gray-900">{certificate.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">المسار/الدورة:</span>
              <span className="font-medium text-gray-900">{certificate.productName}</span>
            </div>
          </div>

          <div className="bg-red-50 text-red-800 text-sm p-3 rounded-lg flex gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>هذا الإجراء سيجعل الشهادة غير صالحة ولن يتمكن الطالب من استخدامها كإثبات إتمام.</p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3 bg-gray-50/50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            disabled={isRevoking}
          >
            تراجع
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30 font-medium flex justify-center items-center gap-2"
            disabled={isRevoking}
          >
            {isRevoking ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "تأكيد الإلغاء"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
