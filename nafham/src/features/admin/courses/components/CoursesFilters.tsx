import { Search, Filter, Download } from "lucide-react";

interface Props {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export default function CoursesFilters({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-100 bg-white rounded-t-2xl">
      
      {/* Right side: Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="بحث باسم الدورة أو المدرب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl pr-10 pl-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-600 placeholder:text-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="h-6 w-px bg-gray-200 hidden sm:block mx-1"></div>

        {/* Category Filter */}
        <div className="relative w-full sm:w-32">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 hover:bg-gray-50 cursor-pointer"
          >
            <option>كل الأقسام</option>
            <option>برمجة</option>
            <option>تصميم</option>
            <option>تسويق</option>
            <option>أعمال</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative w-full sm:w-28">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 hover:bg-gray-50 cursor-pointer"
          >
            <option>الحالة</option>
            <option>منشورة</option>
            <option>مسودة</option>
          </select>
        </div>
      </div>

      {/* Left side: Export */}
      <div className="w-full md:w-auto">
        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 text-slate-600 hover:bg-gray-50 hover:text-slate-800 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          <span>تصدير</span>
        </button>
      </div>

    </div>
  );
}
