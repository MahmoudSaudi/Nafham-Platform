"use client";

import { useAudit } from "../hooks/useAudit";
import AuditLogsTable from "./AuditLogsTable";
import Pagination from "@/components/ui/Pagination";
import { FolderOpen, Activity, Search, Filter } from "lucide-react";

const ACTION_OPTIONS = [
  { value: "", label: "كل الإجراءات" },
  { value: "APPROVE_TRANSACTION", label: "موافقة دفع" },
  { value: "REJECT_TRANSACTION", label: "رفض دفع" },
  { value: "REFUND_TRANSACTION", label: "استرداد مبلغ" },
  { value: "DELETE_COURSE", label: "حذف كورس" },
  { value: "UPDATE_COURSE", label: "تعديل كورس" },
];

const ENTITY_OPTIONS = [
  { value: "", label: "كل الكيانات" },
  { value: "Transaction", label: "المعاملة المالية" },
  { value: "Course", label: "الكورس" },
  { value: "User", label: "المستخدم" },
];

export default function AuditView() {
  const {
    logs,
    pagination,
    currentPage,
    setCurrentPage,
    search,
    handleSearchChange,
    actionFilter,
    handleActionFilter,
    entityFilter,
    handleEntityFilter,
    isLoading,
    error,
  } = useAudit();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900">سجل نشاطات النظام</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            تتبع كافة الإجراءات والنشاطات التي قام بها مديرو النظام
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="بحث عن مستخدم، إجراء أو تفاصيل..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
            />
          </div>

          {/* Action Filter */}
          <div className="relative">
            <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={actionFilter}
              onChange={(e) => handleActionFilter(e.target.value)}
              className="appearance-none w-full sm:w-48 pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all cursor-pointer"
            >
              {ACTION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Entity Filter */}
          <div className="relative">
            <select
              value={entityFilter}
              onChange={(e) => handleEntityFilter(e.target.value)}
              className="appearance-none w-full sm:w-44 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all cursor-pointer"
            >
              {ENTITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active filter indicator */}
        {pagination.total > 0 && (
          <p className="text-xs text-slate-400 font-medium mt-3 pr-1">
            يعرض <span className="text-slate-700 font-bold">{pagination.total}</span> نشاط
            {(search || actionFilter || entityFilter) && " (نتائج مفلترة)"}
          </p>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-24 bg-white rounded-2xl border border-gray-100">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
            <p className="text-sm font-medium text-slate-400">جارٍ تحميل السجل...</p>
          </div>
        </div>
      ) : error && (!logs || logs.length === 0) ? (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
            <FolderOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">حدث خطأ أثناء جلب السجل</h3>
          <p className="text-slate-500 max-w-sm text-sm">يرجى المحاولة مرة أخرى لاحقاً.</p>
        </div>
      ) : !logs || logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
            <FolderOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">
            {search || actionFilter || entityFilter ? "لا توجد نتائج مطابقة" : "لا توجد نشاطات مسجلة"}
          </h3>
          <p className="text-slate-500 max-w-sm text-sm">
            {search || actionFilter || entityFilter
              ? "حاول تغيير معايير البحث أو الفلتر."
              : "لم يتم تسجيل أي إجراءات إدارية حتى الآن."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col min-w-0">
          <AuditLogsTable logs={logs} />
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            itemsPerPage={pagination.limit}
            itemName="نشاط"
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
