import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDiscussions, replyToDiscussion, deleteDiscussion } from "@/services/discussions/discussionsApi";
import { Discussion } from "../types";
import toast from "react-hot-toast";

export function useDiscussions() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("تصفية حسب الكورس");

  const { data = [], isLoading } = useQuery({
    queryKey: ["discussions"],
    queryFn: getDiscussions
  });

  const replyMutation = useMutation({
    mutationFn: replyToDiscussion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
      toast.success("تم إرسال الرد بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء إرسال الرد");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDiscussion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
      toast.success("تم حذف النقاش بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء حذف النقاش");
    }
  });

  const handleReply = (id: string, content: string, userId: string) => {
    replyMutation.mutate({ id, content, userId });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const discussions: Discussion[] = data.map((d: any) => ({
    id: d.id,
    studentName: d.user?.name || "مستخدم محذوف",
    studentAvatar: d.user?.avatarUrl || `https://ui-avatars.com/api/?name=${d.user?.name || 'User'}&background=f1f5f9&color=64748b`,
    courseName: d.course?.title || "كورس عام",
    lessonName: "نقاش عام",
    content: d.content,
    date: d.updatedAt,
    replies: [], // If we want to show replies inline, we would map them here (requires them to be returned from API or fetched in Details)
  }));

  return {
    discussions,
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    isLoading,
    handleReply,
    handleDelete,
    isReplying: replyMutation.isPending
  };
}
