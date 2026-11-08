import { Search, Filter, Download } from "lucide-react";

interface Props {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  roleFilter: string;
  setRoleFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export default function UsersFilters({
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-100 bg-white rounded-t-2xl">
      
      {/* Right side: Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="بحث بالاسم أو البريد الإلكتروني..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl pr-10 pl-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-600 placeholder:text-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="h-6 w-px bg-gray-200 hidden sm:block mx-1"></div>

        {/* Role Filter */}
        <div className="relative w-full sm:w-auto">
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl pr-10 pl-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 hover:bg-gray-50 cursor-pointer"
          >
            <option>تصفية حسب الدور</option>
            <option>مدير</option>
            <option>مدرب</option>
            <option>طالب</option>
          </select>
          <Filter className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Status Filter */}
        <div className="relative w-full sm:w-auto">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl pr-10 pl-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 hover:bg-gray-50 cursor-pointer"
          >
            <option>تصفية حسب الحالة</option>
            <option>نشط</option>
            <option>محظور</option>
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 rounded-full border-2 border-slate-400 flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Left side: Export */}
      <div className="w-full md:w-auto">
        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 text-slate-600 hover:bg-gray-50 hover:text-slate-800 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          <span>تصدير القائمة</span>
        </button>
      </div>

    </div>
  );
}
