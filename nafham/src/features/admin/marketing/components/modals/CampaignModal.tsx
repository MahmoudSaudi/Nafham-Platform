"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Mail, MessageSquare, Bell, Calendar, AlignLeft, Send } from "lucide-react";
import { Campaign } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  campaign?: Campaign | null;
  onCreate?: (data: any) => Promise<void>;
}

export default function CampaignModal({ isOpen, onClose, campaign, onCreate }: Props) {
  const isEditing = !!campaign;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: campaign?.name || "",
    type: campaign?.type || "EMAIL",
    audience: campaign?.audience || "ALL",
    content: campaign?.content || "",
    scheduledFor: campaign?.scheduledFor || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onCreate) return;

    setIsSubmitting(true);
    try {
      await onCreate({
        name: formData.name,
        type: formData.type,
        audience: formData.audience,
        content: formData.content,
        scheduledFor: formData.scheduledFor ? new Date(formData.scheduledFor).toISOString() : null,
      });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "تعديل بيانات الحملة" : "إنشاء حملة ترويجية جديدة"}>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">اسم الحملة</label>
          <div className="relative">
            <Send className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="مثال: خصم الصيف 2024"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full bg-white border border-gray-200 text-sm font-bold rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">نوع الحملة</label>
            <div className="relative">
              <select 
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 hover:bg-gray-50 cursor-pointer"
              >
                <option value="EMAIL">بريد إلكتروني</option>
                <option value="SMS">رسالة نصية SMS</option>
                <option value="IN_APP">إشعار داخل التطبيق</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">الجمهور المستهدف</label>
            <div className="relative">
              <select 
                value={formData.audience}
                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 hover:bg-gray-50 cursor-pointer"
              >
                <option value="ALL">جميع المستخدمين</option>
                <option value="ACTIVE">المستخدمين النشطين</option>
                <option value="INACTIVE">المستخدمين غير النشطين</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">محتوى الرسالة</label>
          <div className="relative">
            <AlignLeft className="w-5 h-5 text-slate-400 absolute right-3.5 top-4" />
            <textarea 
              placeholder="اكتب محتوى رسالتك هنا..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={4}
              className="w-full bg-white border border-gray-200 text-sm font-medium rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-700 resize-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">جدولة الإرسال (اختياري)</label>
          <div className="relative">
            <Calendar className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="datetime-local"
              value={formData.scheduledFor}
              onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
              className="w-full bg-white border border-gray-200 text-sm font-medium rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-700"
            />
          </div>
        </div>
        
        <div className="pt-4 flex gap-3">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50">
            إلغاء
          </button>
          <button type="submit" disabled={isSubmitting} className="flex-1 py-3 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors shadow-sm disabled:opacity-50">
            {isSubmitting ? "جاري الحفظ..." : isEditing ? "حفظ التعديلات" : "إطلاق الحملة"}
          </button>
        </div>
      </form>

    </Modal>
  );
}
