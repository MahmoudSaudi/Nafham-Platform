import { Search, Filter, Download } from "lucide-react";

interface Props {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export default function FinancialsHeader({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}: Props) {
  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filters Section */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="ابحث باسم الطالب أو الإيميل..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 bg-white border border-gray-200 text-sm rounded-xl pr-10 pl-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-600 placeholder:text-slate-400 shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="relative w-full sm:w-48">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl pr-4 pl-10 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 hover:bg-gray-50 cursor-pointer shadow-sm"
            >
              <option>تصفية حسب الحالة</option>
              <option>مدفوع</option>
              <option>معلق</option>
              <option>ملغى</option>
            </select>
            <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Export Button */}
        <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm w-full md:w-auto">
          <Download className="w-4 h-4" />
          <span>تصدير البيانات</span>
        </button>
      </div>
    </div>
  );
}
