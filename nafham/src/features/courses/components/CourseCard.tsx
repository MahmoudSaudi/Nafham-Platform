import Image from "next/image";
import Link from "next/link";
import { formatCourseDuration } from "@/utils/formatDuration";
import { CourseData } from "@/constants/coursesData";
import { Clock } from "lucide-react";

interface CourseCardProps {
  course: CourseData;
}

export default function CourseCard({ course }: CourseCardProps) {
  // Handle instructor type (string in mock data, object in real backend)
  const instructorData: any = course.instructor;
  const isInstObj = typeof instructorData === 'object' && instructorData !== null;
  const instructorName = isInstObj ? instructorData.name : instructorData || "مدرب";
  const instructorAvatar = isInstObj && instructorData.avatarUrl 
    ? instructorData.avatarUrl 
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(instructorName)}&background=random&color=fff`;

  return (
    <Link href={`/courses/${course.id}`} className="group block h-full">
      <div className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">
        
        {/* Top Image Section */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-emerald-900">
          <Image 
            src={course.image} 
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
          
          {/* Badge */}
          {course.badge && (
            <div className="absolute top-4 right-4 z-10">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${
                course.badge.variant === 'success' ? 'bg-white text-emerald-600' :
                course.badge.variant === 'warning' ? 'bg-white text-amber-500' :
                'bg-white text-gray-700'
              }`}>
                {course.badge.text}
              </span>
            </div>
          )}
          
          {/* English Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
            {course.enCategory && (
              <span className="text-white/80 text-[10px] uppercase tracking-[0.2em] font-medium mb-3">
                {course.enCategory}
              </span>
            )}
            {course.enTitle && (
              <h3 className="text-white font-extrabold text-2xl leading-tight mb-3 font-sans whitespace-pre-line">
                {course.enTitle}
              </h3>
            )}
            {course.enInstructor && (
              <span className="text-white/70 text-sm font-medium font-sans">
                {course.enInstructor}
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col justify-between bg-white z-20">
          {/* Arabic Title (Fixed height for alignment) */}
          <h4 className="font-extrabold text-[#0f172a] text-lg leading-relaxed text-right line-clamp-2 min-h-[56px] mb-6">
            {course.title}
          </h4>
          
          {/* Footer (Duration & Instructor) */}
          <div className="flex items-center justify-between pt-5 border-t border-gray-100/80 mt-auto">
            {/* Right Side: Instructor */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-gray-50 bg-gray-100 overflow-hidden relative shadow-sm">
                <Image 
                  src={instructorAvatar} 
                  alt={instructorName}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-bold text-gray-400">{instructorName}</span>
            </div>
            
            {/* Left Side: Duration */}
            <div className="flex items-center gap-1.5 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold pt-0.5">{formatCourseDuration(course.duration)}</span>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}
