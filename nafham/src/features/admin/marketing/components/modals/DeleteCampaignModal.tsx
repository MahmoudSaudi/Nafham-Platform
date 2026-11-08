"use client";

import Modal from "@/components/ui/Modal";
import { AlertTriangle } from "lucide-react";
import { Campaign } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  campaign?: Campaign;
  onConfirm: () => void;
}

export default function DeleteCampaignModal({ isOpen, onClose, campaign, onConfirm }: Props) {
  if (!campaign) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="حذف الحملة" maxWidth="max-w-sm">
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2">هل أنت متأكد من الحذف؟</h3>
        <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6">
          سيتم حذف الحملة <span className="font-bold text-slate-700">"{campaign.name}"</span> نهائياً. لا يمكن التراجع عن هذا الإجراء.
        </p>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          >
            تراجع
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2.5 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors shadow-sm"
          >
            تأكيد الحذف
          </button>
        </div>
      </div>
    </Modal>
  );
}
