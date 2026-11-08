import { Edit, Trash2, Star, DollarSign } from "lucide-react";
import Image from "next/image";
import { Instructor } from "../types";
import ActionDropdown from "@/components/ui/ActionDropdown";

interface Props {
  instructors: Instructor[];
  onEdit?: (inst: Instructor) => void;
  onDelete?: (inst: Instructor) => void;
  onPayout?: (inst: Instructor) => void;
}

export default function InstructorsTable({ instructors, onEdit, onDelete, onPayout }: Props) {

  const getContractStatusBadge = (status: string) => {
    let bgColor = "bg-gray-100 text-slate-600";
    let dotColor = "bg-gray-400";

    if (status === "نشط") {
      bgColor = "bg-emerald-50 text-emerald-700";
      dotColor = "bg-emerald-500";
    } else if (status === "قيد المراجعة") {
      bgColor = "bg-amber-50 text-amber-700";
      dotColor = "bg-amber-500";
    }

    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${bgColor}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
        <span>{status}</span>
      </div>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-right">
        <thead className="bg-gray-50 text-slate-400 font-bold border-b border-gray-100">
          <tr>
            <th scope="col" className="px-6 py-4">المدرب</th>
            <th scope="col" className="px-6 py-4">التخصص</th>
            <th scope="col" className="px-6 py-4 text-center">الدورات المنشورة</th>
            <th scope="col" className="px-6 py-4 text-center">تقييم الطلاب</th>
            <th scope="col" className="px-6 py-4">الأرباح</th>
            <th scope="col" className="px-6 py-4">حالة العقد</th>
            <th scope="col" className="px-6 py-4">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
                    <Image 
                      src={instructor.avatar} 
                      alt={instructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{instructor.name}</div>
                    <div className="text-xs text-slate-400 font-medium mt-0.5">{instructor.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${instructor.trackColor}`}>
                  {instructor.track}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="font-bold text-slate-900">{instructor.publishedCourses}</div>
                <div className="text-[10px] text-slate-400 font-medium">دورة نشطة</div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-1 font-bold text-slate-900">
                  <span>{instructor.rating}/5</span>
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mb-0.5" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-extrabold text-emerald-600">${instructor.earnings.toLocaleString("en-US")}</div>
                {instructor.pendingPayout > 0 && (
                  <div className="text-[10px] text-amber-600 font-bold mt-0.5">مستحق: ${instructor.pendingPayout.toLocaleString("en-US")}</div>
                )}
              </td>
              <td className="px-6 py-4">
                {getContractStatusBadge(instructor.contractStatus)}
              </td>
              <td className="px-6 py-4 relative">
                <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <ActionDropdown 
                    actions={[
                      {
                        label: "تعديل الصلاحيات",
                        icon: <Edit className="w-4 h-4 text-emerald-500" />,
                        onClick: () => onEdit?.(instructor)
                      },
                      {
                        label: "تسوية الأرباح",
                        icon: <DollarSign className="w-4 h-4 text-blue-500" />,
                        onClick: () => onPayout?.(instructor)
                      },
                      { divider: true, label: "" },
                      {
                        label: "إزالة المدرب",
                        icon: <Trash2 className="w-4 h-4" />,
                        variant: "danger",
                        onClick: () => onDelete?.(instructor)
                      }
                    ]}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
