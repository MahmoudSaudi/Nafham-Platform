import { Plus, Search, Filter } from "lucide-react";

interface Props {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  roleFilter: string;
  setRoleFilter: (val: string) => void;
  onAddAdmin: () => void;
}

export default function AdminsHeader({
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  onAddAdmin,
}: Props) {
  return (
    <div className="flex flex-col space-y-6 mb-8">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
        <button 
          onClick={onAddAdmin}
          className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm w-full md:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>تعيين مسؤول جديد</span>
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col xl:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full">
          <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="ابحث بالاسم أو البريد..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 bg-gray-50 border border-gray-200 text-sm rounded-xl pr-10 pl-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-600 placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="relative w-full sm:w-48">
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl pr-4 pl-10 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 hover:bg-gray-50 cursor-pointer"
            >
              <option>تصفية حسب الدور</option>
              <option>مدير عام</option>
              <option>محرر محتوى</option>
              <option>دعم فني</option>
            </select>
            <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
