"use client";

import Modal from "@/components/ui/Modal";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { Coupon } from "../../types";

interface DeleteCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupon?: Coupon;
  onConfirm?: () => void;
}

export default function DeleteCouponModal({ isOpen, onClose, coupon, onConfirm }: DeleteCouponModalProps) {
  if (!isOpen || !coupon) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-red-50/50">
          <div className="flex items-center gap-3 text-red-600">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold">حذف الكوبون</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-gray-600 text-center">
          <p>
            هل أنت متأكد من رغبتك في حذف الكوبون <span className="font-bold text-gray-900" dir="ltr">{coupon.code}</span>؟
          </p>
          
          <div className="bg-red-50 text-red-800 text-sm p-3 rounded-lg flex items-center justify-center gap-2">
            <p>لا يمكن التراجع عن هذا الإجراء.</p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3 bg-gray-50/50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30 font-medium"
          >
            تأكيد الحذف
          </button>
        </div>
      </div>
    </div>
  );
}
