"use client";

import Modal from "@/components/ui/Modal";
import { AlertTriangle, Trash2 } from "lucide-react";
import { LearningTrack } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  track?: LearningTrack;
}

export default function DeleteTrackModal({ isOpen, onClose, track }: Props) {
  if (!track) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="حذف مسار تعليمي">
      
      <div className="flex flex-col items-center text-center mt-2 p-4">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <Trash2 className="w-8 h-8" />
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2">هل أنت متأكد من الحذف؟</h3>
        <p className="text-sm text-slate-500 leading-relaxed max-w-[280px]">
          سيتم حذف مسار <span className="font-bold text-slate-700">({track.title})</span>. لن يتم حذف الكورسات التابعة له، ولكن سيتم فك ارتباطها بهذا المسار.
        </p>
      </div>
      
      <div className="pt-6 flex gap-3">
        <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
          تراجع
        </button>
        <button type="button" className="flex-1 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm">
          تأكيد الحذف
        </button>
      </div>

    </Modal>
  );
}
