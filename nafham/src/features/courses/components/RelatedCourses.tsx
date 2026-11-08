import { CourseData } from "@/constants/coursesData";
import CourseCard from "./CourseCard";

interface RelatedCoursesProps {
  courses: CourseData[];
}

export default function RelatedCourses({ courses }: RelatedCoursesProps) {
  if (!courses || courses.length === 0) return null;

  return (
    <div className="container mx-auto px-4 lg:px-8 mt-10">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-[#0f172a] text-right">شاهد أيضاً</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
