import { Edit, Trash2, Eye, PlayCircle, ListVideo } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AdminCourse } from "../types";

interface Props {
  courses: AdminCourse[];
  onEdit?: (course: AdminCourse) => void;
  onDelete?: (course: AdminCourse) => void;
  onView?: (course: AdminCourse) => void;
}

export default function CoursesTable({ courses, onEdit, onDelete, onView }: Props) {
  const getStatusBadge = (status: string) => {
    const isPublished = status === "منشورة";
    return (
      <div className="flex items-center gap-2">
        <span className={`font-bold text-sm ${isPublished ? 'text-slate-700' : 'text-slate-400'}`}>{status}</span>
        <span className={`w-2 h-2 rounded-full ${isPublished ? "bg-emerald-500" : "bg-gray-300"}`}></span>
      </div>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-right">
        <thead className="bg-gray-50 text-slate-400 font-bold border-b border-gray-100">
          <tr>
            <th scope="col" className="px-6 py-4">الدورة</th>
            <th scope="col" className="px-6 py-4">المدرب</th>
            <th scope="col" className="px-6 py-4">القسم</th>
            <th scope="col" className="px-6 py-4">السعر</th>
            <th scope="col" className="px-6 py-4">الحالة</th>
            <th scope="col" className="px-6 py-4">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <Image 
                      src={course.image || "https://ui-avatars.com/api/?name=Course&background=f8fafc&color=94a3b8"} 
                      alt={course.title || "Course"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 line-clamp-1">{course.title}</div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-slate-500 font-medium">
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>{course.lessonsCount} درس</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 whitespace-nowrap">
                   <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                    <Image 
                      src={course.instructorAvatar || "https://ui-avatars.com/api/?name=Instructor&background=e0e7ff&color=4f46e5"} 
                      alt={course.instructorName || "Instructor"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium text-slate-700">{course.instructorName}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${course.categoryColor}`}>
                  {course.category}
                </span>
              </td>
              <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">
                {course.price}
              </td>
              <td className="px-6 py-4">
                {getStatusBadge(course.status)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1.5">
                  <Link 
                    href={`/dashboard/courses/${course.id}/curriculum`}
                    className="p-1.5 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1"
                    title="إدارة المحتوى (الفيديوهات)"
                  >
                    <ListVideo className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => onEdit?.(course)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onView?.(course)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete?.(course)}
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
