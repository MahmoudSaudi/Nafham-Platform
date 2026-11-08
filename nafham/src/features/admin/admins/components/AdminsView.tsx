"use client";

import { useState, useMemo } from "react";
import { useAdmins } from "../hooks/useAdmins";
import AdminsHeader from "./AdminsHeader";
import AdminsTable from "./AdminsTable";
import AddAdminModal from "./modals/AddAdminModal";
import EditAdminModal from "./modals/EditAdminModal";
import DeleteAdminModal from "./modals/DeleteAdminModal";
import Pagination from "@/components/ui/Pagination";
import { AdminUser } from "../types";

export default function AdminsView() {
  const {
    admins,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    isLoading,
    handleDelete
  } = useAdmins();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | undefined>();
  const [deletingAdmin, setDeletingAdmin] = useState<AdminUser | undefined>();

  // Filtering Logic
  const filteredAdmins = useMemo(() => {
    return admins.filter((admin: AdminUser) => {
      const matchesSearch = admin.name.includes(searchQuery) || admin.email.includes(searchQuery);
      const matchesRole = roleFilter === "تصفية حسب الدور" || admin.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [admins, searchQuery, roleFilter]);

  const onConfirmDelete = () => {
    if (deletingAdmin) {
      handleDelete(deletingAdmin.id);
      setDeletingAdmin(undefined);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <AdminsHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        onAddAdmin={() => setIsAddModalOpen(true)}
      />

      <AdminsTable 
        admins={filteredAdmins} 
        onEdit={(admin) => setEditingAdmin(admin)}
        onDelete={(admin) => setDeletingAdmin(admin)}
      />

      {filteredAdmins.length > 0 && (
        <Pagination 
          currentPage={1}
          totalPages={Math.ceil(filteredAdmins.length / 10) || 1}
          totalItems={filteredAdmins.length}
          itemsPerPage={10}
          itemName="مسؤول"
          onPageChange={() => {}}
        />
      )}

      {/* Modals */}
      <AddAdminModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
      <EditAdminModal 
        isOpen={!!editingAdmin} 
        onClose={() => setEditingAdmin(undefined)} 
        admin={editingAdmin}
      />
      <DeleteAdminModal 
        isOpen={!!deletingAdmin} 
        onClose={() => setDeletingAdmin(undefined)} 
        adminName={deletingAdmin?.name}
        onConfirm={onConfirmDelete}
      />

    </div>
  );
}
