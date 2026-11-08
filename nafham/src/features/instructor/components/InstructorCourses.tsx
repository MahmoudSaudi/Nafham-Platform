import Image from 'next/image';
import Link from 'next/link';
import { Star, Award } from 'lucide-react';
import { MOCK_INSTRUCTOR_PROFILE } from '../data/mockInstructor';

interface InstructorCoursesProps {
  instructorName: string;
  courses: typeof MOCK_INSTRUCTOR_PROFILE.courses;
}

export default function InstructorCourses({ instructorName, courses }: InstructorCoursesProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
        <Award className="w-6 h-6 text-[#118B50]" />
        كورسات يقدمها {instructorName}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(course => (
          <Link href={`/courses/${course.id}`} key={course.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <Image src={course.image} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6 flex flex-col gap-4 h-40">
              <h4 className="font-bold text-lg text-slate-800 line-clamp-2 group-hover:text-[#118B50] transition-colors">{course.title}</h4>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{course.rating}</span>
                  <span className="text-slate-400 font-normal">({course.students.toLocaleString()})</span>
                </div>
                <span className="font-black text-[#118B50]">{course.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
