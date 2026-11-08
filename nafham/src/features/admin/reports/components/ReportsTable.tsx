import Image from "next/image";
import { Star } from "lucide-react";
import { ReportCoursePerformance } from "../types";

interface Props {
  coursePerformance: ReportCoursePerformance[];
}

export default function ReportsTable({ coursePerformance }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col min-w-0">
      
      {/* Tabs */}
      <div className="flex items-center gap-6 px-6 border-b border-gray-100 overflow-x-auto">
        <button className="py-4 text-sm font-bold text-emerald-700 border-b-2 border-emerald-600 whitespace-nowrap">
          أداء الكورسات
        </button>
        <button className="py-4 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors whitespace-nowrap">
          نشاط المستخدمين
        </button>
        <button className="py-4 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors whitespace-nowrap">
          الإيرادات
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead className="bg-gray-50/50 text-slate-400 font-bold border-b border-gray-100">
            <tr>
              <th scope="col" className="px-6 py-4">اسم الدورة</th>
              <th scope="col" className="px-6 py-4 text-center">الطلاب</th>
              <th scope="col" className="px-6 py-4">معدل الإكمال</th>
              <th scope="col" className="px-6 py-4">التقييم</th>
              <th scope="col" className="px-6 py-4">الإيرادات</th>
            </tr>
          </thead>
          <tbody>
            {coursePerformance.map((course) => (
              <tr key={course.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      <Image 
                        src={course.image} 
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900">{course.title}</div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">{course.instructor}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-bold text-slate-700">{course.studentsCount}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-700 w-8">{course.completionRate}%</span>
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden" dir="ltr">
                      <div 
                        className="h-full bg-emerald-600 rounded-full" 
                        style={{ width: `${course.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-900 text-xs ml-1">{course.rating}</span>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < Math.floor(course.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} 
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-extrabold text-emerald-700" dir="ltr">{course.revenue}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
