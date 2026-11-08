import { Users, UserCheck, Star, FileText } from "lucide-react";

import { Instructor } from "../types";

interface InstructorsStatsProps {
  instructors: Instructor[];
}

export default function InstructorsStats({ instructors }: InstructorsStatsProps) {
  const total = instructors.length;
  const activeCount = instructors.filter(i => i.contractStatus === "نشط").length;
  const averageRating = total > 0 
    ? (instructors.reduce((sum, i) => sum + (i.rating || 0), 0) / total).toFixed(2) 
    : "0.00";
  const pendingContracts = instructors.filter(i => i.contractStatus === "معلق").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-extrabold text-slate-900">{total}</span>
          </div>
          <div className="text-sm font-bold text-slate-500">إجمالي المدربين</div>
        </div>
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
          <Users className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <div className="text-2xl font-extrabold text-slate-900 mb-1">{activeCount}</div>
          <div className="text-sm font-bold text-slate-500">المدربين النشطين</div>
        </div>
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
          <UserCheck className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <div className="text-2xl font-extrabold text-slate-900 mb-1">{averageRating}</div>
          <div className="text-sm font-bold text-slate-500">متوسط التقييم</div>
        </div>
        <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center shrink-0">
          <Star className="w-6 h-6 fill-amber-500" />
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-extrabold text-slate-900">{pendingContracts}</span>
            {pendingContracts > 0 && (
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">تنبيه</span>
            )}
          </div>
          <div className="text-sm font-bold text-slate-500">عقود معلقة</div>
        </div>
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
          <FileText className="w-6 h-6" />
        </div>
      </div>

    </div>
  );
}
