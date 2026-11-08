"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Ticket, Percent, DollarSign, Calendar, RefreshCcw } from "lucide-react";
import { Coupon } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  coupon?: Coupon | null; // null means "Add New", Coupon means "Edit"
  onCreate?: (data: any) => Promise<void>;
}

export default function CouponModal({ isOpen, onClose, coupon, onCreate }: Props) {
  const isEditing = !!coupon;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    code: coupon?.code || "",
    discountType: "PERCENTAGE", // "PERCENTAGE" or "FIXED_AMOUNT"
    discountValue: "",
    linkedProduct: "الكل",
    expiryDate: "",
    usageLimit: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onCreate) return;

    setIsSubmitting(true);
    try {
      await onCreate({
        code: formData.code,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        validUntil: formData.expiryDate ? new Date(formData.expiryDate).toISOString() : null,
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null,
        courseId: null, // Defaulting to null for now
      });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code: result });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "تعديل بيانات الكوبون" : "إضافة كوبون جديد"}>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">كود الخصم (Coupon Code)</label>
          <div className="relative">
            <Ticket className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="مثال: NAFHAM20"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              required
              className="w-full bg-white border border-gray-200 text-sm font-bold rounded-xl pr-11 pl-24 py-3 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-700 uppercase"
            />
            <button type="button" onClick={generateCode} className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
              <RefreshCcw className="w-3.5 h-3.5" />
              توليد
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">نوع الخصم</label>
            <div className="relative">
              <select 
                value={formData.discountType}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 hover:bg-gray-50 cursor-pointer"
              >
                <option value="PERCENTAGE">نسبة مئوية</option>
                <option value="FIXED_AMOUNT">مبلغ ثابت</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">القيمة</label>
            <div className="relative">
              {formData.discountType === "FIXED_AMOUNT" ? (
                <DollarSign className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              ) : (
                <Percent className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              )}
              <input 
                type="number"
                placeholder="0"
                value={formData.discountValue}
                onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                required
                min="1"
                className="w-full bg-white border border-gray-200 text-sm font-bold rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-700"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">المنتج المرتبط بالكوبون</label>
          <div className="relative">
            <select 
              value={formData.linkedProduct}
              onChange={(e) => setFormData({ ...formData, linkedProduct: e.target.value })}
              className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 hover:bg-gray-50 cursor-pointer"
            >
              <option value="الكل">جميع الكورسات والمسارات (عام)</option>
              <option value="دورة">دورة: تطوير تطبيقات الويب</option>
              <option value="دورة">دورة: أساسيات التصميم</option>
              <option value="مسار">مسار: احتراف التسويق الرقمي</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">تاريخ الانتهاء</label>
            <div className="relative">
              <Calendar className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full bg-white border border-gray-200 text-sm font-medium rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">الحد الأقصى للاستخدام</label>
            <div className="relative">
              <input 
                type="number"
                placeholder="بدون حد"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                min="1"
                className="w-full bg-white border border-gray-200 text-sm font-medium rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-700"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex gap-3">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50">
            إلغاء
          </button>
          <button type="submit" disabled={isSubmitting} className="flex-1 py-3 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors shadow-sm disabled:opacity-50">
            {isSubmitting ? "جاري الحفظ..." : isEditing ? "حفظ التعديلات" : "إنشاء الكوبون"}
          </button>
        </div>
      </form>

    </Modal>
  );
}
