import { DollarSign, CreditCard, Clock } from "lucide-react";
import { FinancialStats } from "../types";

interface Props {
  stats: FinancialStats;
}

export default function StatCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      {/* Total Revenue */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
        <div>
          <p className="text-sm font-bold text-slate-500 mb-1">إجمالي الإيرادات</p>
          <div className="flex items-end gap-3">
            <h3 className="text-2xl font-extrabold text-slate-900" dir="ltr">{stats.totalRevenue}</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mb-1.5" dir="ltr">
              {stats.revenueChange}
            </span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
          <DollarSign className="w-6 h-6" />
        </div>
      </div>

      {/* Active Subscriptions */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
        <div>
          <p className="text-sm font-bold text-slate-500 mb-1">الاشتراكات النشطة</p>
          <div className="flex items-end gap-3">
            <h3 className="text-2xl font-extrabold text-slate-900">{stats.activeSubscriptions.toLocaleString("en-US")}</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mb-1.5" dir="ltr">
              {stats.subscriptionsChange}
            </span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
          <CreditCard className="w-6 h-6" />
        </div>
      </div>

      {/* Pending Amount */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
        <div>
          <p className="text-sm font-bold text-slate-500 mb-1">المبالغ المعلقة</p>
          <div className="flex items-end gap-3">
            <h3 className="text-2xl font-extrabold text-slate-900" dir="ltr">{stats.pendingAmount}</h3>
            <span className="text-xs font-bold text-slate-500 bg-gray-100 px-2 py-0.5 rounded-md mb-1.5" dir="ltr">
              {stats.pendingChange}
            </span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
          <Clock className="w-6 h-6" />
        </div>
      </div>

    </div>
  );
}
