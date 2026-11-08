"use client";

import { X, AlertTriangle, ArrowLeftRight, MessageSquare } from "lucide-react";
import { Transaction } from "../../types";

interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction;
  onConfirm?: () => void;
  isRefunding?: boolean;
}

export default function RefundModal({ isOpen, onClose, transaction, onConfirm, isRefunding }: RefundModalProps) {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-amber-50/50">
          <div className="flex items-center gap-3 text-amber-600">
            <div className="p-2 bg-amber-100 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold">تأكيد استرداد الأموال</h2>
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
            هل أنت متأكد من رغبتك في استرداد مبلغ المعاملة الخاصة بالطالب <span className="font-bold text-gray-900">{transaction.studentName}</span>؟
          </p>
          
          <div className="bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">رقم الفاتورة:</span>
              <span className="font-medium text-gray-900">{transaction.invoiceId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">المبلغ:</span>
              <span className="font-bold text-emerald-600">${transaction.amount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">طريقة الدفع:</span>
              <span className="font-medium text-gray-900">{transaction.paymentMethod}</span>
            </div>
          </div>

          <div className="bg-amber-50 text-amber-800 text-sm p-3 rounded-lg flex gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>هذا الإجراء لا يمكن التراجع عنه. سيتم إرجاع المبلغ إلى وسيلة الدفع الأصلية وإلغاء وصول الطالب للمنتج.</p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3 bg-gray-50/50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            disabled={isRefunding}
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 text-white bg-amber-500 rounded-xl hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/30 font-medium flex justify-center items-center gap-2"
            disabled={isRefunding}
          >
            {isRefunding ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "تأكيد الاسترداد"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
