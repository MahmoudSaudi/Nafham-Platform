import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTickets, replyToTicket } from "@/services/support/supportApi";
import { Ticket } from "../types";
import toast from "react-hot-toast";

export function useSupport() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("تصفية حسب الحالة");
  const [priorityFilter, setPriorityFilter] = useState("تصفية حسب الأولوية");

  const { data = [], isLoading } = useQuery({
    queryKey: ["supportTickets"],
    queryFn: getTickets
  });

  const replyMutation = useMutation({
    mutationFn: replyToTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supportTickets"] });
      toast.success("تم إرسال الرد بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء إرسال الرد");
    }
  });

  const handleReply = (id: string, content: string, senderId: string) => {
    replyMutation.mutate({ id, content, senderId });
  };

  const mapStatus = (status: string) => {
    switch(status) {
      case 'OPEN': return 'مفتوحة';
      case 'IN_PROGRESS': return 'قيد المعالجة';
      case 'CLOSED': return 'مغلقة';
      default: return 'مفتوحة';
    }
  };

  const mapPriority = (priority: string) => {
    switch(priority) {
      case 'LOW': return 'منخفضة';
      case 'NORMAL': return 'متوسطة';
      case 'HIGH': return 'عالية';
      case 'URGENT': return 'عاجلة';
      default: return 'متوسطة';
    }
  };

  const tickets: Ticket[] = data.map((t: any) => ({
    id: t.id,
    subject: t.subject,
    studentName: t.user?.name || "طالب محذوف",
    studentEmail: t.user?.email || "",
    status: mapStatus(t.status),
    priority: mapPriority(t.priority),
    lastUpdate: t.updatedAt,
    category: "دعم فني", // Can be dynamic
  }));

  return {
    tickets,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    isLoading,
    handleReply,
    isReplying: replyMutation.isPending
  };
}
