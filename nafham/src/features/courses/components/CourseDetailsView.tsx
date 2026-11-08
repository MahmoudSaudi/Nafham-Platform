"use client";

import { useRouter } from "next/navigation";
import CourseHero from "./CourseHero";
import RelatedCourses from "./RelatedCourses";
import CourseLearningObjectives from "./CourseLearningObjectives";
import CourseCurriculumPreview from "./CourseCurriculumPreview";
import InstructorPreviewCard from "./InstructorPreviewCard";
import CourseReviewsSummary from "./CourseReviewsSummary";
import CourseWriteReview from "./CourseWriteReview";

interface CourseDetailsViewProps {
  initialCourse?: any;
  initialRelatedCourses?: any[];
}

export default function CourseDetailsView({ initialCourse, initialRelatedCourses = [] }: CourseDetailsViewProps) {
  const router = useRouter();
  
  const course = initialCourse;
  const relatedCourses = initialRelatedCourses;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <h2 className="text-2xl font-bold text-gray-500">عذراً، لم يتم العثور على الكورس.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16" dir="rtl">
      
      {/* Hero Section */}
      <CourseHero 
        course={course} 
        isSubscribing={false} // Disable old button loading state
        onSubscribe={() => router.push(`/courses/${course.id}/checkout`)}
        totalLessons={course.chapters?.reduce((acc: number, ch: any) => acc + ch.lessons?.length || 0, 0) || 0}
      />

      {/* Main Content Area - Professional Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Right Column (Main Content) */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          
          {/* Learning Objectives */}
          <CourseLearningObjectives objectives={course.objectives || []} />

          {/* Curriculum Preview */}
          <CourseCurriculumPreview 
            modules={course.chapters || []} 
            totalLessons={course.chapters?.reduce((acc: number, ch: any) => acc + ch.lessons.length, 0) || 0} 
            totalDuration={course.duration || "غير محدد"} 
          />

          {/* Reviews Summary */}
          <CourseReviewsSummary 
            averageRating={course.rating || 0}
            totalReviews={course.reviews?.length || 0}
            ratingDistribution={{
              5: course.reviews?.filter((r: any) => r.rating === 5).length || 0,
              4: course.reviews?.filter((r: any) => r.rating === 4).length || 0,
              3: course.reviews?.filter((r: any) => r.rating === 3).length || 0,
              2: course.reviews?.filter((r: any) => r.rating === 2).length || 0,
              1: course.reviews?.filter((r: any) => r.rating === 1).length || 0,
            }}
            topReviews={course.reviews || []}
          />

          {/* Write a Review */}
          <CourseWriteReview />

        </div>

        {/* Left Column (Sidebar) */}
        <div className="lg:col-span-1 flex flex-col gap-8 sticky top-24">
          
          {/* Instructor Info */}
          <InstructorPreviewCard instructor={{
            id: course.instructor?.id || "1",
            name: course.instructor?.name || "مدرب مجهول",
            title: "مدرب محترف",
            bio: course.instructor?.bio || "لا توجد نبذة شخصية.",
            rating: 4.8,
            studentsCount: course.students || 0,
            coursesCount: 1,
            reviewsCount: course.reviews?.length || 0,
            imageUrl: course.instructor?.avatarUrl
          }} />

        </div>

      </div>

      <div className="border-t border-gray-200 mt-20 max-w-[90%] lg:max-w-7xl mx-auto opacity-70"></div>
      
      <RelatedCourses courses={relatedCourses} />

    </div>
  );
}
