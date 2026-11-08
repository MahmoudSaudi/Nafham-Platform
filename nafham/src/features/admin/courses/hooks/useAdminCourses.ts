import { useState } from "react";
import { AdminCourse } from "../types";
import { getAdminCourses, deleteCourse } from "@/services/courses/coursesApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAdminCourses() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("كل الأقسام");
  const [statusFilter, setStatusFilter] = useState("الحالة");

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["adminCourses"],
    queryFn: async () => {
      const data = await getAdminCourses();
      return data.map((c: any) => {
        let categoryColor = "bg-gray-50 text-gray-600";
        if (c.category === "برمجة") categoryColor = "bg-blue-50 text-blue-600";
        else if (c.category === "تصميم") categoryColor = "bg-purple-50 text-purple-600";
        else if (c.category === "تسويق") categoryColor = "bg-orange-50 text-orange-600";
        else if (c.category === "أعمال") categoryColor = "bg-emerald-50 text-emerald-600";

        return {
          id: c.id,
          title: c.title,
          lessonsCount: c._count?.chapters || 0,
          image: c.image ? (c.image.startsWith('http') ? c.image : `http://localhost:5000${c.image}`) : "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
          instructorName: c.instructor?.name || "مدرب",
          instructorAvatar: c.instructor?.avatarUrl || `https://ui-avatars.com/api/?name=${c.instructor?.name || 'User'}&background=f1f5f9&color=64748b`,
          category: c.category,
          categoryColor,
          price: `${c.price} $`,
          status: c.isPublished ? "منشورة" : "مسودة",
          rawDuration: c.duration,
          rawLevel: c.level,
          rawDescription: c.description
        };
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
    },
    onError: (error) => {
      console.error("Failed to delete course", error);
      toast.error("حدث خطأ أثناء الحذف");
    }
  });

  const handleDelete = async (id: string) => {
    deleteMutation.mutate(id);
  };

  const refreshCourses = () => {
    queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
  };

  return {
    courses,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    isLoading,
    handleDelete,
    refreshCourses
  };
}
