import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdmins, deleteAdmin } from "@/services/admins/adminsApi";
import { AdminUser } from "../types";

export function useAdmins() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("تصفية حسب الدور");

  const { data: adminsData = [], isLoading } = useQuery({
    queryKey: ["admins"],
    queryFn: getAdmins
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    }
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const admins: AdminUser[] = adminsData.map((u: any) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role === "ADMIN" ? "مدير عام" : u.role === "TEACHER" ? "مدرب" : u.role,
    status: u.isActive ? "نشط" : "مقيد",
    joinDate: new Intl.DateTimeFormat('en-CA').format(new Date(u.createdAt)), // YYYY-MM-DD roughly
    avatar: `https://ui-avatars.com/api/?name=${u.name}&background=047857&color=fff`,
    lastActive: "الآن", // Mocked for now
    rawRole: u.role,
    rawIsActive: u.isActive
  }));

  return {
    admins,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    isLoading,
    handleDelete
  };
}
