import { Plus, Search, Filter, LayoutGrid, List } from "lucide-react";

interface Props {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onCreateTrack: () => void;
}

export default function TracksHeader({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  onCreateTrack,
}: Props) {
  return (
    <div className="flex flex-col space-y-6 mb-8">
      
      {/* Top Section: Title & Create Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button 
          onClick={onCreateTrack}
          className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm w-full md:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>إنشاء مسار جديد</span>
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col xl:flex-row items-center justify-between gap-4">
        
        {/* Right side: Search & Selects */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto flex-1">
          
          <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="ابحث عن مسار تعليمي..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 bg-gray-50 border border-gray-200 text-sm rounded-xl pr-10 pl-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-600 placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="relative w-full sm:w-40">
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl pr-4 pl-10 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 hover:bg-gray-50 cursor-pointer"
            >
              <option>تصفية حسب الفئة</option>
              <option>برمجة</option>
              <option>تصميم</option>
              <option>تسويق</option>
              <option>أعمال</option>
            </select>
            <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative w-full sm:w-40">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 hover:bg-gray-50 cursor-pointer"
            >
              <option>تصفية حسب الحالة</option>
              <option>منشور</option>
              <option>مسودة</option>
            </select>
          </div>
        </div>

        {/* Left side: View Toggles */}
        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200 shrink-0 w-full xl:w-auto justify-center xl:justify-start">
          <button className="p-2 rounded-lg bg-white shadow-sm text-emerald-700 transition-all">
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-gray-100 transition-all">
            <List className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
