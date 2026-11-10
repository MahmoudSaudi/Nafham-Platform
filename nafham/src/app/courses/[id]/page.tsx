import CourseDetailsView from "@/features/courses/components/CourseDetailsView";

interface PageProps {
  params: Promise<any>;
}

export default async function CoursePage({ params }: PageProps) {
  const resolvedParams = await params;
  const courseId = typeof resolvedParams.id === 'string' ? resolvedParams.id : Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : '';
  
  let initialCourse = null;
  let initialRelatedCourses = [];

  try {
    const baseUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    
    // Fetch course details
    const courseRes = await fetch(`${baseUrl}/courses/${courseId}`, {
      cache: 'no-store'
    });
    const courseData = await courseRes.json();
    if (courseData.success) {
      initialCourse = courseData.data;
    }

    // Fetch related courses
    const allCoursesRes = await fetch(`${baseUrl}/courses`, {
      cache: 'no-store'
    });
    const allCoursesData = await allCoursesRes.json();
    if (allCoursesData.success) {
      initialRelatedCourses = allCoursesData.data.filter((c: any) => c.id !== courseId).slice(0, 3);
    }
  } catch (error) {
    console.error("Failed to fetch course details on server", error);
  }

  return <CourseDetailsView initialCourse={initialCourse} initialRelatedCourses={initialRelatedCourses} />;
}
