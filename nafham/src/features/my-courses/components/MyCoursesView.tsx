"use client";

import { useMyCourses } from "../hooks/useMyCourses";
import EnrolledCourseCard from "./EnrolledCourseCard";
import { BookOpen, CheckCircle } from "lucide-react";

export default function MyCoursesView() {
  const { activeTab, setActiveTab, inProgressCourses, completedCourses, isLoading } = useMyCourses();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentCourses = activeTab === "in-progress" ? inProgressCourses : completedCourses;

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900">دوراتي</h1>
          <p className="text-slate-500 mt-2">تابع تقدمك وأكمل مسيرتك التعليمية.</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-gray-200 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("in-progress")}
            className={`flex items-center gap-2 pb-4 px-2 font-bold text-sm whitespace-nowrap transition-all border-b-2 ${
              activeTab === "in-progress" 
                ? "border-emerald-600 text-emerald-700" 
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>الكورسات الحالية ({inProgressCourses.length})</span>
          </button>
          
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex items-center gap-2 pb-4 px-2 font-bold text-sm whitespace-nowrap transition-all border-b-2 ${
              activeTab === "completed" 
                ? "border-emerald-600 text-emerald-700" 
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span>المكتملة ({completedCourses.length})</span>
          </button>
        </div>

        {/* Grid */}
        {currentCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentCourses.map(course => (
              <EnrolledCourseCard 
                key={course.id} 
                course={course} 
                isCompleted={activeTab === "completed"} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">لا توجد كورسات هنا</h3>
            <p className="text-slate-500">
              {activeTab === "in-progress" 
                ? "لم تقم بالاشتراك في أي كورس بعد، تصفح المسارات التعليمية وابدأ الآن!" 
                : "لم تقم بإكمال أي كورس بعد، استمر في التعلم!"}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
