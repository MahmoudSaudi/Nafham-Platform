"use client";

import Modal from "@/components/ui/Modal";
import { Mail, User, Lock, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/services/users/usersApi";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddUserModal({ isOpen, onClose }: Props) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      toast.success("تم إنشاء حساب الطالب بنجاح");
      setFormData({ name: "", email: "", password: "" });
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء الإنشاء");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="إضافة طالب جديد">
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">الاسم</label>
          <div className="relative">
            <User className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input 
              required
              type="text" 
              placeholder="اسم الطالب"
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
              required
              type="email" 
              placeholder="student@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white border border-gray-200 text-sm rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 text-left"
              dir="ltr"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">كلمة المرور المؤقتة</label>
          <div className="relative">
            <Lock className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input 
              required
              type="password" 
              placeholder="********"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-white border border-gray-200 text-sm rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 text-left"
              dir="ltr"
            />
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            إلغاء
          </button>
          <button disabled={mutation.isPending} type="submit" className="flex-1 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
            {mutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                <Send className="w-4 h-4" />
                <span>إنشاء الحساب</span>
              </>
            )}
          </button>
        </div>
      </form>

    </Modal>
  );
}
