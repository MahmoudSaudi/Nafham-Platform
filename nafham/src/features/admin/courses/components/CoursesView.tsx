"use client";

import { useAdminCourses } from "../hooks/useAdminCourses";
import CoursesFilters from "./CoursesFilters";
import CoursesTable from "./CoursesTable";
import Pagination from "@/components/ui/Pagination";
import { Plus, FolderOpen } from "lucide-react";
import AddCourseModal from "./modals/AddCourseModal";
import EditCourseModal from "./modals/EditCourseModal";
import DeleteCourseModal from "./modals/DeleteCourseModal";
import ViewCourseDrawer from "./modals/ViewCourseDrawer";
import { useState } from "react";
import { AdminCourse } from "../types";

export default function CoursesView() {
  const {
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
  } = useAdminCourses();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<AdminCourse | undefined>();
  const [deletingCourse, setDeletingCourse] = useState<AdminCourse | undefined>();
  const [viewingCourse, setViewingCourse] = useState<AdminCourse | undefined>();

  // Filter Logic
  const filteredCourses = courses.filter((c: AdminCourse) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "كل الأقسام" || c.category === categoryFilter;
    const matchesStatus = statusFilter === "الحالة" || c.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalItems = filteredCourses.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">إدارة الدورات</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm w-full md:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة دورة جديدة</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col min-w-0 overflow-hidden">
        <CoursesFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">لا توجد دورات حالياً</h3>
            <p className="text-slate-500 max-w-sm">لم يتم العثور على أي دورات تطابق شروط البحث الحالية.</p>
          </div>
        ) : (
          <CoursesTable 
            courses={paginatedCourses} 
            onEdit={(course) => setEditingCourse(course)}
            onDelete={(course) => setDeletingCourse(course)}
            onView={(course) => setViewingCourse(course)}
          />
        )}
        
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          itemName="دورة"
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modals & Drawers */}
      <AddCourseModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={refreshCourses}
      />
      <EditCourseModal 
        isOpen={!!editingCourse} 
        onClose={() => setEditingCourse(undefined)} 
        course={editingCourse} 
        onSuccess={refreshCourses}
      />
      <DeleteCourseModal 
        isOpen={!!deletingCourse} 
        onClose={() => setDeletingCourse(undefined)} 
        courseTitle={deletingCourse?.title} 
        onConfirm={async () => {
          if (deletingCourse) {
            await handleDelete(deletingCourse.id);
          }
        }}
      />
      <ViewCourseDrawer 
        isOpen={!!viewingCourse} 
        onClose={() => setViewingCourse(undefined)} 
        course={viewingCourse} 
      />

    </div>
  );
}
