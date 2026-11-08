import { Star, Users, PlayCircle } from 'lucide-react';
import { MOCK_INSTRUCTOR_PROFILE } from '../data/mockInstructor';

interface InstructorStatsProps {
  stats: typeof MOCK_INSTRUCTOR_PROFILE.stats;
}

export default function InstructorStats({ stats }: InstructorStatsProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 mt-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-wrap gap-6 items-center justify-between">
        
        <div className="flex items-center gap-4 flex-1 justify-center md:justify-start min-w-[150px]">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-800">{stats.students.toLocaleString()}</span>
            <span className="text-slate-500 text-sm font-medium">طالب إجمالي</span>
          </div>
        </div>
        
        <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
        
        <div className="flex items-center gap-4 flex-1 justify-center md:justify-center min-w-[150px]">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <Star className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-800">{stats.reviews}</span>
            <span className="text-slate-500 text-sm font-medium">متوسط التقييم</span>
          </div>
        </div>

        <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
        
        <div className="flex items-center gap-4 flex-1 justify-center md:justify-end min-w-[150px]">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#118B50] flex items-center justify-center">
            <PlayCircle className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-800">{stats.courses}</span>
            <span className="text-slate-500 text-sm font-medium">كورس تعليمي</span>
          </div>
        </div>

      </div>
    </div>
  );
}
