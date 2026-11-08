"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import CustomSelect from "@/components/ui/CustomSelect";
import { BookOpen, DollarSign, ListVideo, Image as ImageIcon, Clock, AlignLeft, Layers, Loader2, Code, Layout, TrendingUp, Briefcase, GraduationCap, Trophy, Target } from "lucide-react";
import { createCourse, uploadImage } from "@/services/courses/coursesApi";
import { toast } from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCourseModal({ isOpen, onClose, onSuccess }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "برمجة",
    price: "",
    image: "",
    duration: "",
    level: "مبتدئ",
    description: "",
    objectives: "",
    requirements: "",
    enTitle: "",
    enCategory: "",
    enInstructor: "",
    badgeText: "",
    badgeVariant: "default",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("يرجى إدخال عنوان الدورة");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await createCourse({
        ...formData,
        price: formData.price ? parseFloat(formData.price) : 0,
        objectives: formData.objectives.split("\n").filter(obj => obj.trim() !== ""),
        requirements: formData.requirements.split("\n").filter(req => req.trim() !== ""),
        isPublished: true, // Auto publish for testing
      });
      toast.success("تم إضافة الدورة بنجاح!");
      onSuccess();
      onClose();
      // Reset form
      setFormData({
        title: "",
        category: "برمجة",
        price: "",
        image: "",
        duration: "",
        level: "مبتدئ",
        description: "",
        objectives: "",
        requirements: "",
        enTitle: "",
        enCategory: "",
        enInstructor: "",
        badgeText: "",
        badgeVariant: "default",
      });
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("حدث خطأ أثناء إضافة الدورة");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="إضافة دورة جديدة" maxWidth="max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
        
        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">عنوان الدورة <span className="text-red-500">*</span></label>
          <div className="relative">
            <BookOpen className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input 
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text" 
              required
              placeholder="مثال: مقدمة في تطوير الويب..."
              className="w-full bg-white border border-gray-200 text-sm rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
            />
          </div>
        </div>

        {/* Category & Level */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex-1">
            <CustomSelect
              label="القسم"
              value={formData.category}
              onChange={(val) => handleSelectChange("category", val)}
              options={[
                { value: "برمجة", label: "برمجة", icon: <Code className="w-4 h-4" /> },
                { value: "تصميم", label: "تصميم", icon: <Layout className="w-4 h-4" /> },
                { value: "تسويق", label: "تسويق", icon: <TrendingUp className="w-4 h-4" /> },
                { value: "أعمال", label: "أعمال", icon: <Briefcase className="w-4 h-4" /> },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSelect
              label="المستوى"
              value={formData.level}
              onChange={(val) => handleSelectChange("level", val)}
              options={[
                { value: "مبتدئ", label: "مبتدئ", icon: <GraduationCap className="w-4 h-4" /> },
                { value: "متوسط", label: "متوسط", icon: <Target className="w-4 h-4" /> },
                { value: "متقدم", label: "متقدم", icon: <Trophy className="w-4 h-4" /> },
              ]}
            />
          </div>
        </div>

        {/* Price & Duration */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="space-y-1.5 flex-1">
            <label className="text-sm font-bold text-slate-700">السعر ($)</label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number" 
                placeholder="0.00"
                className="w-full bg-white border border-gray-200 text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 text-left"
                dir="ltr"
              />
            </div>
          </div>
          <div className="space-y-1.5 flex-1">
            <label className="text-sm font-bold text-slate-700">المدة (عدد الساعات)</label>
            <div className="relative">
              <Clock className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input 
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                type="text" 
                placeholder="مثال: 15 ساعة"
                className="w-full bg-white border border-gray-200 text-sm rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">صورة الدورة</label>
          <div className="relative">
            <input 
              type="file" 
              accept="image/*"
              onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                  try {
                    const toastId = toast.loading("جاري رفع الصورة...");
                    const file = e.target.files[0];
                    const url = await uploadImage(file);
                    setFormData({ ...formData, image: url });
                    toast.success("تم رفع الصورة بنجاح!", { id: toastId });
                  } catch (error) {
                    toast.error("فشل في رفع الصورة");
                  }
                }
              }}
              className="w-full bg-white border border-gray-200 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
            />
            {formData.image && (
              <div className="mt-2 text-sm text-emerald-600 font-bold flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                تم تحديد الصورة بنجاح
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">الوصف</label>
          <div className="relative">
            <AlignLeft className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="وصف شامل لما سيتعلمه الطالب في هذه الدورة..."
              className="w-full bg-white border border-gray-200 text-sm rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 resize-none"
            />
          </div>
        </div>

        {/* Objectives */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">ماذا ستتعلم؟ (كل هدف في سطر)</label>
          <div className="relative">
            <AlignLeft className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
            <textarea 
              name="objectives"
              value={formData.objectives}
              onChange={handleChange}
              rows={3}
              placeholder="هدف 1\nهدف 2\nهدف 3..."
              className="w-full bg-white border border-gray-200 text-sm rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 resize-none"
            />
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">المتطلبات (كل متطلب في سطر)</label>
          <div className="relative">
            <AlignLeft className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
            <textarea 
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={3}
              placeholder="متطلب 1\nمتطلب 2..."
              className="w-full bg-white border border-gray-200 text-sm rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 resize-none"
            />
          </div>
        </div>

        <div className="pt-4 flex gap-3 sticky bottom-0 bg-white pb-2">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50">
            إلغاء
          </button>
          <button type="submit" disabled={isSubmitting} className="flex-1 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm disabled:opacity-50 flex justify-center items-center gap-2">
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            إضافة الدورة
          </button>
        </div>

      </form>
    </Modal>
  );
}
