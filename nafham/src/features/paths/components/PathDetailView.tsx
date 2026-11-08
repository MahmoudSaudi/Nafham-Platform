"use client";

import { useEffect, useState } from "react";
import { getPathById } from "@/services/paths/pathsApi";
import { Loader2, ArrowRight, Route, Layers } from "lucide-react";
import Link from "next/link";
import CourseCard from "@/features/courses/components/CourseCard";
import { CourseData } from "@/constants/coursesData";

interface PathDetailData {
  id: string;
  title: string;
  description: string;
  image?: string;
  level: string;
  courses: Array<{
    id: string;
    order: number;
    course: any;
  }>;
}

export default function PathDetailView({ id }: { id: string }) {
  const [path, setPath] = useState<PathDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPath = async () => {
      try {
        const data = await getPathById(id);
        setPath(data);
      } catch (error) {
        console.error("Error fetching path details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchPath();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!path) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">المسار غير موجود</h2>
        <Link href="/paths" className="text-emerald-600 hover:underline flex items-center gap-2">
          <ArrowRight className="w-4 h-4" />
          العودة للمسارات
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 pb-20">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100 py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/50 -skew-x-12 transform origin-top translate-x-20"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <Link href="/paths" className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors mb-8">
              <ArrowRight className="w-4 h-4" />
              <span>العودة للمسارات</span>
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold">
                {path.level || "مبتدئ"}
              </span>
              <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                {path.courses.length} دورات
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-6 leading-tight">
              {path.title}
            </h1>
            
            <p className="text-xl text-gray-500 leading-relaxed max-w-3xl">
              {path.description}
            </p>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="container mx-auto px-4 lg:px-8 mt-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Route className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">دورات المسار</h2>
            <p className="text-gray-500 text-sm mt-1">تعلم هذه الدورات بالترتيب لتحقيق أقصى استفادة</p>
          </div>
        </div>

        {path.courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
            {path.courses.map((pc, index) => {
              // Map backend course to CourseCard expected structure
              const mappedCourse = {
                ...pc.course,
                image: pc.course.image || '/images/default-course.png',
                duration: pc.course.duration || 'غير محدد',
                badge: { text: `الخطوة ${index + 1}`, variant: 'success' }
              };
              
              return <CourseCard key={pc.id} course={mappedCourse as any} />;
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-3xl">
            <Layers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">لا توجد دورات مسجلة بعد</h3>
            <p className="text-gray-500">سيتم إضافة الدورات التدريبية لهذا المسار قريباً.</p>
          </div>
        )}
      </div>
    </div>
  );
}
