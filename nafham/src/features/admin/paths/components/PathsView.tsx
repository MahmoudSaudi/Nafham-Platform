"use client";

import { useState } from "react";
import { Plus, Trash2, Edit, Loader2, Route, BookOpen } from "lucide-react";
import AddPathModal from "./modals/AddPathModal";
import { getPaths, deletePath } from "@/services/paths/pathsApi";
import { getAdminCourses } from "@/services/courses/coursesApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function PathsView() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPath, setEditingPath] = useState<any>(null);

  const { data: paths = [], isLoading: isLoadingPaths } = useQuery({
    queryKey: ["adminPaths"],
    queryFn: getPaths
  });

  const { data: courses = [], isLoading: isLoadingCourses } = useQuery({
    queryKey: ["adminCourses"],
    queryFn: getAdminCourses
  });

  const deleteMutation = useMutation({
    mutationFn: deletePath,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminPaths"] });
      toast.success("تم الحذف بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء الحذف");
    }
  });

  const handleDelete = async (id: string) => {
    toast("هل أنت متأكد من حذف هذا المسار؟", {
      action: {
        label: "حذف",
        onClick: () => deleteMutation.mutate(id)
      },
      cancel: {
        label: "إلغاء",
        onClick: () => {}
      }
    });
  };

  const isLoading = isLoadingPaths || isLoadingCourses;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">إدارة المسارات التعليمية</h2>
          <p className="text-slate-500 text-sm mt-1">إنشاء وتعديل المسارات وترتيب الدورات بداخلها</p>
        </div>
        <button 
          onClick={() => { setEditingPath(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm shadow-emerald-200"
        >
          <Plus className="w-5 h-5" />
          <span>مسار جديد</span>
        </button>
      </div>

      {/* Content */}
      {paths.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
            <Route className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">لا توجد مسارات حتى الآن</h3>
          <p className="text-slate-500 mb-6 max-w-md">قم بتجميع كورساتك في مسارات تعليمية منظمة لمساعدة الطلاب على الوصول لأهدافهم بسهولة.</p>
          <button 
            onClick={() => { setEditingPath(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-5 h-5" /> ابدأ بإنشاء أول مسار
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path: any) => (
            <div key={path.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="h-40 bg-gray-100 relative">
                {path.image ? (
                  <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Route className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-sm">
                  {path.level}
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1">{path.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{path.description}</p>
                
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium mb-4 bg-slate-50 p-3 rounded-xl">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>{path.courses?.length || 0} دورات مسجلة</span>
                </div>

                <div className="flex gap-2 mt-auto">
                  <button 
                    onClick={() => { setEditingPath(path); setIsModalOpen(true); }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold rounded-xl transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" /> تعديل
                  </button>
                  <button 
                    onClick={() => handleDelete(path.id)}
                    className="flex items-center justify-center w-10 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <AddPathModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => queryClient.invalidateQueries({ queryKey: ["adminPaths"] })}
          courses={courses}
          editingPath={editingPath}
        />
      )}
    </div>
  );
}
