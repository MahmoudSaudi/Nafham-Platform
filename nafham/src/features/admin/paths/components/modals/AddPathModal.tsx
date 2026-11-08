"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import CustomSelect from "@/components/ui/CustomSelect";
import { BookOpen, Image as ImageIcon, AlignLeft, Layers, Loader2, Plus, X, GripVertical, Search, ChevronUp, ChevronDown } from "lucide-react";
import { createPath, updatePath } from "@/services/paths/pathsApi";
import { uploadImage } from "@/services/courses/coursesApi";
import { toast } from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  courses: any[];
  editingPath?: any;
}

export default function AddPathModal({ isOpen, onClose, onSuccess, courses, editingPath }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    level: "مبتدئ",
  });

  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (editingPath) {
      setFormData({
        title: editingPath.title || "",
        description: editingPath.description || "",
        image: editingPath.image || "",
        level: editingPath.level || "مبتدئ",
      });
      if (editingPath.courses) {
        setSelectedCourses(editingPath.courses.map((pc: any) => pc.course));
      }
    } else {
      setFormData({
        title: "",
        description: "",
        image: "",
        level: "مبتدئ",
      });
      setSelectedCourses([]);
    }
  }, [editingPath]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const addCourse = (course: any) => {
    if (!selectedCourses.find(c => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const removeCourse = (courseId: string) => {
    setSelectedCourses(selectedCourses.filter(c => c.id !== courseId));
  };

  const moveCourse = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newCourses = [...selectedCourses];
      const temp = newCourses[index];
      newCourses[index] = newCourses[index - 1];
      newCourses[index - 1] = temp;
      setSelectedCourses(newCourses);
    } else if (direction === 'down' && index < selectedCourses.length - 1) {
      const newCourses = [...selectedCourses];
      const temp = newCourses[index];
      newCourses[index] = newCourses[index + 1];
      newCourses[index + 1] = temp;
      setSelectedCourses(newCourses);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("يرجى إدخال عنوان المسار");
      return;
    }
    if (selectedCourses.length === 0) {
      toast.error("يرجى إضافة دورة واحدة على الأقل للمسار");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        courses: selectedCourses.map(c => c.id)
      };

      if (editingPath) {
        await updatePath(editingPath.id, payload);
        toast.success("تم التعديل بنجاح!");
      } else {
        await createPath(payload);
        toast.success("تم إنشاء المسار بنجاح!");
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving path:", error);
      toast.error("حدث خطأ أثناء حفظ المسار");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
    !selectedCourses.find(sc => sc.id === c.id)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingPath ? "تعديل المسار التعليمي" : "إنشاء مسار جديد"} maxWidth="max-w-4xl">
      <form onSubmit={handleSubmit} className="flex flex-col">
        
        <div className="flex flex-col md:flex-row gap-6 max-h-[70vh] overflow-hidden">
          {/* Right side: Path details */}
          <div className="w-full md:w-1/2 space-y-4 overflow-y-auto pr-2 scrollbar-hide">
            <h4 className="font-bold text-slate-800 border-b border-gray-100 pb-2">تفاصيل المسار</h4>
            
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">عنوان المسار <span className="text-red-500">*</span></label>
              <div className="relative">
                <BookOpen className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  type="text" 
                  required
                  placeholder="مثال: مسار مطور الويب المتكامل..."
                  className="w-full bg-white border border-gray-200 text-sm rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <CustomSelect
                label="مستوى المسار"
                value={formData.level}
                onChange={(val) => handleSelectChange("level", val)}
                options={[
                  { value: "مبتدئ", label: "مبتدئ" },
                  { value: "متوسط", label: "متوسط" },
                  { value: "متقدم", label: "متقدم" },
                ]}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">صورة المسار</label>
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
                    <ImageIcon className="w-4 h-4" /> تم تحديد الصورة بنجاح
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">الوصف</label>
              <div className="relative">
                <AlignLeft className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="وصف شامل للمسار..."
                  className="w-full bg-white border border-gray-200 text-sm rounded-xl pr-11 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Left side: Courses selection */}
          <div className="w-full md:w-1/2 flex flex-col h-[60vh] md:h-[70vh]">
            <h4 className="font-bold text-slate-800 border-b border-gray-100 pb-2 mb-4">كورسات المسار ({selectedCourses.length})</h4>
            
            {/* Selected Courses */}
            <div className="flex-1 overflow-y-auto mb-4 border border-gray-200 rounded-xl bg-gray-50 p-2 scrollbar-hide">
              {selectedCourses.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-slate-400 font-medium">لم يتم إضافة كورسات بعد</div>
              ) : (
                <div className="space-y-2">
                  {selectedCourses.map((course, idx) => (
                    <div key={course.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1">
                          <button type="button" onClick={() => moveCourse(idx, 'up')} disabled={idx === 0} className="text-gray-400 hover:text-emerald-600 disabled:opacity-30"><ChevronUp className="w-4 h-4" /></button>
                          <button type="button" onClick={() => moveCourse(idx, 'down')} disabled={idx === selectedCourses.length - 1} className="text-gray-400 hover:text-emerald-600 disabled:opacity-30"><ChevronDown className="w-4 h-4" /></button>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">{idx + 1}</div>
                        <div className="font-bold text-slate-700 text-sm line-clamp-1">{course.title}</div>
                      </div>
                      <button type="button" onClick={() => removeCourse(course.id)} className="text-red-400 hover:text-red-600 p-1 bg-red-50 rounded-lg">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Available Courses */}
            <div className="h-64 flex flex-col border border-gray-200 rounded-xl bg-white overflow-hidden">
              <div className="p-2 border-b border-gray-100">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text"
                    placeholder="ابحث عن دورة لإضافتها..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 text-xs rounded-lg pr-9 pl-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide">
                {filteredCourses.length === 0 ? (
                  <div className="text-center py-4 text-xs text-slate-400">لا توجد دورات متاحة</div>
                ) : (
                  filteredCourses.map(course => (
                    <div key={course.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group" onClick={() => addCourse(course)}>
                      <div className="font-medium text-slate-600 text-xs line-clamp-1">{course.title}</div>
                      <button type="button" className="opacity-0 group-hover:opacity-100 text-emerald-600 bg-emerald-50 p-1 rounded">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100 w-full">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="px-8 py-2.5 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            إلغاء
          </button>
          <button type="submit" disabled={isSubmitting} className="px-8 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm flex justify-center items-center gap-2">
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {editingPath ? "حفظ التعديلات" : "إنشاء المسار"}
          </button>
        </div>

      </form>
    </Modal>
  );
}
