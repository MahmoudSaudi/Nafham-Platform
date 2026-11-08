"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { MessageSquare, Send, User, Clock } from "lucide-react";
import { Ticket } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ticket?: Ticket;
  onConfirm?: (content: string) => void;
  isReplying?: boolean;
}

export default function ReplyTicketModal({ isOpen, onClose, ticket, onConfirm, isReplying }: Props) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setContent("");
    }
  }, [isOpen]);

  if (!ticket) return null;

  const handleSubmit = () => {
    if (content.trim() && onConfirm) {
      onConfirm(content);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`الرد على تذكرة #${ticket.id}`}>
      
      {/* Ticket Details */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mt-2 mb-4">
        <h4 className="font-extrabold text-slate-900 text-lg mb-2">{ticket.subject}</h4>
        
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>{ticket.studentName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{new Date(ticket.lastUpdate).toLocaleDateString("ar-EG")}</span>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
          {/* Mock message content for UI preview */}
          مرحباً، أواجه مشكلة في تشغيل الفيديو الخاص بالدرس الثالث من وحدة التصميم. يرجى المساعدة في حل هذه المشكلة في أقرب وقت وشكراً.
        </p>
      </div>

      {/* Reply Form */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">رد الدعم الفني</label>
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="اكتب ردك هنا لكي يصل للطالب عبر البريد وتطبيق المنصة..."
              rows={4}
              className="w-full bg-white border border-gray-200 text-sm rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 resize-none"
            ></textarea>
          </div>
        </div>
        
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button 
            type="button" 
            onClick={onClose} 
            disabled={isReplying}
            className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
          >
            إلغاء
          </button>
          <button 
            type="button" 
            onClick={handleSubmit}
            disabled={isReplying || !content.trim()}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            {isReplying ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{isReplying ? 'جاري الإرسال...' : 'إرسال الرد'}</span>
          </button>
        </div>
      </div>

    </Modal>
  );
}
