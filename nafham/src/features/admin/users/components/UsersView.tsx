"use client";

import { useUsers } from "../hooks/useUsers";
import UsersFilters from "./UsersFilters";
import UsersTable from "./UsersTable";
import Pagination from "@/components/ui/Pagination";
import { Loader2, Plus } from "lucide-react";
import AddUserModal from "./modals/AddUserModal";
import EditUserModal from "./modals/EditUserModal";
import DeleteUserModal from "./modals/DeleteUserModal";
import StudentProfileDrawer from "./StudentProfileDrawer";
import { useState } from "react";
import { AdminUser } from "../types";

export default function UsersView() {
  const {
    users,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    isLoading,
    handleDelete
  } = useUsers();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | undefined>();
  const [deletingUser, setDeletingUser] = useState<AdminUser | undefined>();
  const [viewingProfile, setViewingProfile] = useState<AdminUser | undefined>();

  const onConfirmDelete = () => {
    if (deletingUser) {
      handleDelete(deletingUser.id);
      setDeletingUser(undefined);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm w-full md:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة مستخدم جديد</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col min-w-0">
        <UsersFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        
        <UsersTable 
          users={users} 
          onEdit={(user) => setEditingUser(user)}
          onDelete={(user) => setDeletingUser(user)}
          onViewProfile={(user) => setViewingProfile(user)}
        />
        
        <Pagination 
          currentPage={1}
          totalPages={Math.ceil(users.length / 10) || 1}
          totalItems={users.length}
          itemsPerPage={10}
          itemName="مستخدم"
        />
      </div>

      {/* Modals */}
      <AddUserModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
      <EditUserModal 
        isOpen={!!editingUser} 
        onClose={() => setEditingUser(undefined)} 
        user={editingUser} 
      />
      <DeleteUserModal 
        isOpen={!!deletingUser} 
        onClose={() => setDeletingUser(undefined)} 
        userName={deletingUser?.name} 
        onConfirm={onConfirmDelete}
      />

      <StudentProfileDrawer 
        isOpen={!!viewingProfile}
        onClose={() => setViewingProfile(undefined)}
        studentName={viewingProfile?.name || ""}
        studentEmail={viewingProfile?.email || ""}
      />

    </div>
  );
}
