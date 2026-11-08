import { Star, Users, PlayCircle, Award } from 'lucide-react';
import Image from 'next/image';

interface InstructorProps {
  id: string;
  name: string;
  title: string;
  bio: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  reviewsCount: number;
  imageUrl?: string;
}

export default function InstructorPreviewCard({ instructor }: { instructor: InstructorProps }) {
  if (!instructor) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <h2 className="text-xl font-extrabold text-slate-800 mb-6 border-b border-slate-100 pb-4">عن المدرب</h2>
      
      <div className="flex flex-col gap-6 items-center text-center">
        {/* Instructor Image */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 relative bg-slate-200 shadow-md">
          {instructor.imageUrl ? (
            <Image 
              src={instructor.imageUrl} 
              alt={instructor.name} 
              fill 
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#118B50] to-emerald-300 text-white text-4xl font-bold">
              {instructor.name.charAt(0)}
            </div>
          )}
        </div>
        
        {/* Instructor Name & Title */}
        <div>
          <h3 className="text-xl font-bold text-[#118B50] hover:underline cursor-pointer mb-1">
            {instructor.name}
          </h3>
          <p className="text-slate-500 font-medium text-sm">{instructor.title}</p>
        </div>

        {/* Instructor Bio */}
        <div className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100 w-full text-right">
          <p>{instructor.bio}</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full mt-2">
          <div className="flex flex-col items-center justify-center bg-slate-50 rounded-xl p-3 border border-slate-100">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mb-1" />
            <span className="text-xs text-slate-500">التقييم</span>
            <span className="font-bold text-slate-800">{instructor.rating}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-slate-50 rounded-xl p-3 border border-slate-100">
            <Award className="w-5 h-5 text-[#118B50] mb-1" />
            <span className="text-xs text-slate-500">المراجعات</span>
            <span className="font-bold text-slate-800">{instructor.reviewsCount?.toLocaleString('en-US')}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-slate-50 rounded-xl p-3 border border-slate-100">
            <Users className="w-5 h-5 text-blue-500 mb-1" />
            <span className="text-xs text-slate-500">الطلاب</span>
            <span className="font-bold text-slate-800">{instructor.studentsCount?.toLocaleString('en-US')}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-slate-50 rounded-xl p-3 border border-slate-100">
            <PlayCircle className="w-5 h-5 text-rose-500 mb-1" />
            <span className="text-xs text-slate-500">الكورسات</span>
            <span className="font-bold text-slate-800">{instructor.coursesCount}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
