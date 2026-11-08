import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUser } from "@/services/users/usersApi";
import { AdminUser } from "../types";

export function useUsers() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("تصفية حسب الدور"); // Not strictly needed for students but kept for UI compatibility
  const [statusFilter, setStatusFilter] = useState("تصفية حسب الحالة");

  const { data: usersData = [], isLoading } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: getUsers
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    }
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  // Map backend data to UI format
  const users: AdminUser[] = usersData.map((u: any) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    initials: u.name ? u.name.split(' ').map((n: string) => n[0]).join('.') : "م",
    role: u.role === "STUDENT" ? "طالب" : u.role,
    status: u.isActive ? "نشط" : "محظور",
    joinDate: new Intl.DateTimeFormat('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(u.createdAt)),
    avatarColor: "bg-blue-100 text-blue-600",
    rawIsActive: u.isActive
  } as any));

  return {
    users,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    isLoading,
    handleDelete
  };
}
