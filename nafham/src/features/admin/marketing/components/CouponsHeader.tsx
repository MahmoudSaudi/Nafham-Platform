import { Search, Filter, Plus, Tag } from "lucide-react";

interface Props {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onCreateCoupon: () => void;
}

export default function CouponsHeader({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  onCreateCoupon,
}: Props) {
  return (
    <div className="flex flex-col space-y-6 mb-8">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">التسويق والكوبونات</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">إدارة أكواد الخصم والحملات الترويجية</p>
          </div>
        </div>

        <button 
          onClick={onCreateCoupon}
          className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm w-full md:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>إنشاء كوبون جديد</span>
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col xl:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full">
          
          <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="ابحث برمز الكوبون..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 bg-gray-50 border border-gray-200 text-sm rounded-xl pr-10 pl-4 py-2.5 outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all text-slate-600 placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="relative w-full sm:w-48">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl pr-4 pl-10 py-2.5 outline-none focus:ring-2 focus:ring-pink-500/20 hover:bg-gray-50 cursor-pointer"
            >
              <option>تصفية حسب الحالة</option>
              <option>فعال</option>
              <option>منتهي</option>
              <option>معطل</option>
            </select>
            <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
