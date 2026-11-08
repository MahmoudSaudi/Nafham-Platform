import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Award } from "lucide-react";
import { EnrolledCourse } from "../hooks/useMyCourses";

interface Props {
  course: EnrolledCourse;
  isCompleted: boolean;
}

export default function EnrolledCourseCard({ course, isCompleted }: Props) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col group">
      {/* Course Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={course.image} 
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 right-4 left-4 flex justify-between items-end">
          <div>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
              {course.completedLessons} / {course.totalLessons} درس
            </span>
          </div>
          {isCompleted && (
            <div className="bg-emerald-500 text-white rounded-full p-2 shadow-lg">
              <Award className="w-5 h-5" />
            </div>
          )}
        </div>
      </div>

      {/* Course Info */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 leading-tight">
          {course.title}
        </h3>
        <p className="text-sm font-medium text-slate-500 mb-6">
          المدرب: {course.instructor}
        </p>

        {/* Progress Bar */}
        <div className="mt-auto mb-6">
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-emerald-700">{course.progress}% مكتمل</span>
            <span className="text-slate-400">آخر ظهور: {course.lastAccessed}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className={`h-2.5 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-l from-emerald-400 to-emerald-600'}`}
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Action Button */}
        <Link 
          href={`/courses/${course.id}/learn`}
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-colors ${
            isCompleted 
              ? 'bg-gray-50 hover:bg-gray-100 text-slate-700 border border-gray-200' 
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
          }`}
        >
          {isCompleted ? (
            <>
              <Award className="w-5 h-5" />
              <span>عرض الشهادة</span>
            </>
          ) : (
            <>
              <PlayCircle className="w-5 h-5" />
              <span>متابعة التعلم</span>
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
