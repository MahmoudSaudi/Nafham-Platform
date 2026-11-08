"use client";

import Modal from "@/components/ui/Modal";
import { Reply, Send, BookOpen } from "lucide-react";
import { Discussion } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  discussion?: Discussion;
}

export default function ReplyDiscussionModal({ isOpen, onClose, discussion }: Props) {
  if (!discussion) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="الرد على النقاش">
      
      <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 mt-2 mb-4">
        <div className="flex items-center gap-2 mb-2 text-sky-800">
          <BookOpen className="w-4 h-4" />
          <span className="text-xs font-bold">{discussion.courseName} - {discussion.lessonName}</span>
        </div>
        <p className="text-sm text-sky-900 leading-relaxed font-medium">
          {discussion.content}
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">ردك (سيظهر باسمك بصفتك مسؤول)</label>
          <div className="relative">
            <Reply className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
            <textarea 
              placeholder="اكتب الإجابة النموذجية أو توضيح استفسار الطالب هنا..."
              rows={4}
              className="w-full bg-white border border-gray-200 text-sm rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-700 resize-none"
            ></textarea>
          </div>
        </div>
        
        <div className="pt-2 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            إلغاء
          </button>
          <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors shadow-sm">
            <Send className="w-4 h-4" />
            <span>نشر الرد</span>
          </button>
        </div>
      </form>

    </Modal>
  );
}
