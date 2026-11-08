import { Users, CreditCard, LayoutGrid, Clock } from "lucide-react";

export default function ReportsStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* 1 */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-end text-right">
        <div className="w-full flex justify-between items-start mb-4">
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">+12.5%</span>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className="text-sm font-bold text-slate-500 mb-1">إجمالي الطلاب المسجلين</div>
        <div className="text-3xl font-extrabold text-slate-900">24,582</div>
      </div>

      {/* 2 */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-end text-right">
        <div className="w-full flex justify-between items-start mb-4">
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">+8.2%</span>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
        <div className="text-sm font-bold text-slate-500 mb-1">إجمالي الإيرادات</div>
        <div className="text-3xl font-extrabold text-slate-900" dir="ltr">$142,400</div>
      </div>

      {/* 3 */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-end text-right">
        <div className="w-full flex justify-between items-start mb-4">
          <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">-2.4%</span>
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <LayoutGrid className="w-5 h-5" />
          </div>
        </div>
        <div className="text-sm font-bold text-slate-500 mb-1">الكورسات النشطة</div>
        <div className="text-3xl font-extrabold text-slate-900">156</div>
      </div>

      {/* 4 */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-end text-right">
        <div className="w-full flex justify-between items-start mb-4">
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">+15.8%</span>
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="text-sm font-bold text-slate-500 mb-1">ساعات التعلم</div>
        <div className="text-3xl font-extrabold text-slate-900">8,240</div>
      </div>

    </div>
  );
}
