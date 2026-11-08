import { Filter } from "lucide-react";

interface Registration {
  id: string;
  user: string;
  course: string;
  date: string;
  progress: number;
  status: string;
}

export default function RegistrationsTable({ registrations }: { registrations: Registration[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-lg">أحدث التسجيلات</h3>
        <button className="p-2 text-slate-500 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right text-slate-600">
          <thead className="bg-gray-50/50 text-slate-500 font-bold border-b border-gray-100">
            <tr>
              <th scope="col" className="px-6 py-4">المستخدم</th>
              <th scope="col" className="px-6 py-4">الدورة</th>
              <th scope="col" className="px-6 py-4">تاريخ التسجيل</th>
              <th scope="col" className="px-6 py-4 w-48">التقدم</th>
              <th scope="col" className="px-6 py-4">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((item) => (
              <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">{item.user}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.course}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8">{item.progress}%</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-600 rounded-full" 
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                    item.status === "نشط" 
                      ? "bg-emerald-50 text-emerald-700" 
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
