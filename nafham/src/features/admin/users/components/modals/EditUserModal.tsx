"use client";

import Modal from "@/components/ui/Modal";
import { Mail, User, Shield, Loader2 } from "lucide-react";
import { AdminUser } from "../../types";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/services/users/usersApi";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user?: AdminUser | any;
}

export default function EditUserModal({ isOpen, onClose, user }: Props) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ name: "", isActive: true });

  useEffect(() => {
    if (user) {
      setFormData({ 
        name: user.name || "", 
        isActive: user.rawIsActive ?? (user.status === "نشط") 
      });
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: (data: any) => updateUser(user?.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      toast.success("تم التعديل بنجاح");
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء التعديل");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    mutation.mutate(formData);
  };

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تعديل بيانات المستخدم">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">الاسم الكامل</label>
          <div className="relative">
            <User className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white border border-gray-200 text-sm rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
            />
          </div>
        </div>
        
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">البريد الإلكتروني</label>
          <div className="relative">
            <Mail className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="email" 
              defaultValue={user.email}
              className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl pr-11 pl-4 py-3 text-slate-500 cursor-not-allowed text-left"
              dir="ltr"
              readOnly
            />
          </div>
          <p className="text-xs text-slate-400 font-medium">لا يمكن تغيير البريد الإلكتروني بعد إنشاء الحساب.</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">الدور والصلاحيات</label>
          <div className="relative">
            <Shield className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select 
              defaultValue="طالب"
              disabled
              className="w-full appearance-none bg-gray-50 border border-gray-200 text-sm font-medium text-slate-500 rounded-xl pr-11 pl-4 py-3 cursor-not-allowed"
            >
              <option>طالب</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">حالة الحساب</label>
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="status" 
                checked={formData.isActive === true}
                onChange={() => setFormData({...formData, isActive: true})}
                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300" 
              />
              <span className="text-sm font-bold text-slate-700">نشط</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="status" 
                checked={formData.isActive === false}
                onChange={() => setFormData({...formData, isActive: false})}
                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300" 
              />
              <span className="text-sm font-bold text-slate-700">محظور</span>
            </label>
          </div>
        </div>
        
        <div className="pt-4 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            إلغاء
          </button>
          <button disabled={mutation.isPending} type="submit" className="flex-1 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
            {mutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "حفظ التعديلات"}
          </button>
        </div>

      </form>
    </Modal>
  );
}
