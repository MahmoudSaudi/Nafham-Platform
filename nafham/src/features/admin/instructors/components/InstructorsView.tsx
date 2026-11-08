"use client";

import { useState } from "react";
import { useInstructors } from "../hooks/useInstructors";
import InstructorsStats from "./InstructorsStats";
import InstructorsFilters from "./InstructorsFilters";
import InstructorsTable from "./InstructorsTable";
import Pagination from "@/components/ui/Pagination";
import InviteInstructorModal from "./modals/InviteInstructorModal";
import EditInstructorModal from "./modals/EditInstructorModal";
import DeleteInstructorModal from "./modals/DeleteInstructorModal";
import PayoutInstructorModal from "./modals/PayoutInstructorModal";
import { UserPlus, FileSpreadsheet, FolderOpen } from "lucide-react";
import { Instructor } from "../types";
import * as XLSX from "xlsx";

export default function InstructorsView() {
  const {
    instructors,
    searchQuery,
    setSearchQuery,
    trackFilter,
    setTrackFilter,
    contractFilter,
    setContractFilter,
    isLoading,
    error
  } = useInstructors();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editingInst, setEditingInst] = useState<Instructor | undefined>();
  const [deletingInst, setDeletingInst] = useState<Instructor | undefined>();
  const [payoutInst, setPayoutInst] = useState<Instructor | undefined>();

  // Filter Logic (Could be extracted to hook, but works fine here)
  const filteredInstructors = instructors.filter((inst: Instructor) => {
    const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          inst.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrack = trackFilter === "تصفية حسب المسار" || inst.track === trackFilter;
    const matchesContract = contractFilter === "حالة العقد" || inst.contractStatus === contractFilter;
    
    return matchesSearch && matchesTrack && matchesContract;
  });

  const totalItems = filteredInstructors.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedInstructors = filteredInstructors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const exportToExcel = () => {
    const wsData = filteredInstructors.map(inst => ({
      "الاسم": inst.name,
      "البريد الإلكتروني": inst.email,
      "التخصص": inst.track,
      "الأرباح": inst.earnings,
      "مستحقات معلقة": inst.pendingPayout,
      "الدورات المنشورة": inst.publishedCourses,
      "التقييم": inst.rating,
      "حالة العقد": inst.contractStatus
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "المدربين");
    XLSX.writeFile(wb, "المدربين.xlsx");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold text-slate-800">إدارة المدربين</h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={exportToExcel}
            disabled={filteredInstructors.length === 0}
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <span className="hidden sm:inline">تصدير Excel</span>
          </button>
          
          <button 
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm w-full md:w-auto"
          >
            <UserPlus className="w-5 h-5" />
            <span>دعوة مدرب جديد</span>
          </button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <InstructorsStats instructors={instructors} />

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col min-w-0 overflow-hidden">
        <InstructorsFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          trackFilter={trackFilter}
          setTrackFilter={setTrackFilter}
          contractFilter={contractFilter}
          setContractFilter={setContractFilter}
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          </div>
        ) : error && instructors.length === 0 ? (
          // If error happens but no data is available
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">حدث خطأ أثناء جلب البيانات</h3>
            <p className="text-slate-500 max-w-sm">يرجى المحاولة مرة أخرى لاحقاً أو التحقق من الاتصال بالخادم.</p>
          </div>
        ) : filteredInstructors.length === 0 ? (
          // Empty State Handling
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">لا توجد بيانات حالياً</h3>
            <p className="text-slate-500 max-w-sm">لم يتم العثور على أي مدربين يطابقون شروط البحث الحالية.</p>
          </div>
        ) : (
          <InstructorsTable 
            instructors={paginatedInstructors} 
            onEdit={(inst) => setEditingInst(inst)}
            onDelete={(inst) => setDeletingInst(inst)}
            onPayout={(inst) => setPayoutInst(inst)}
          />
        )}
        
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          itemName="مدرب"
          onPageChange={setCurrentPage}
          leftContent={
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button className="bg-gray-900 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors w-full sm:w-auto">
                تطبيق
              </button>
              <select className="w-full sm:w-48 appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 hover:bg-gray-50 cursor-pointer">
                <option>إجراءات جماعية</option>
                <option>تفعيل العقود</option>
                <option>إيقاف مؤقت</option>
              </select>
            </div>
          }
        />
      </div>

      {/* Modals */}
      <InviteInstructorModal 
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
      
      <EditInstructorModal 
        isOpen={!!editingInst} 
        onClose={() => setEditingInst(undefined)} 
        instructor={editingInst}
      />
      
      <DeleteInstructorModal 
        isOpen={!!deletingInst} 
        onClose={() => setDeletingInst(undefined)} 
        instructor={deletingInst}
      />
      
      <PayoutInstructorModal 
        isOpen={!!payoutInst} 
        onClose={() => setPayoutInst(undefined)} 
        instructor={payoutInst}
      />

    </div>
  );
}
