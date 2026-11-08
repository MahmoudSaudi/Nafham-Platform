import Link from 'next/link';
import { ArrowRight, Trophy, User } from 'lucide-react';

interface LearnHeaderProps {
  courseTitle: string;
  progressPercentage: number;
  courseId: string;
}

export default function LearnHeader({ courseTitle, progressPercentage, courseId }: LearnHeaderProps) {
  return (
    <header className="h-[64px] bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-50 text-slate-800 shadow-sm">
      
      {/* Right: Back Button */}
      <div className="flex items-center">
        <Link 
          href={`/courses/${courseId}`}
          className="flex items-center gap-2 text-slate-600 hover:text-[#118B50] transition-colors py-2 px-3 hover:bg-slate-50 rounded-lg"
        >
          <ArrowRight className="w-5 h-5" />
          <span className="font-bold hidden sm:inline">العودة للكورس</span>
        </Link>
      </div>

      {/* Center: Course Title */}
      <div className="flex-1 px-4 text-center overflow-hidden">
        <h1 className="text-base sm:text-lg font-bold truncate text-slate-800">
          {courseTitle}
        </h1>
      </div>

      {/* Left: Progress / User */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3 bg-slate-50 py-1.5 px-4 rounded-full border border-slate-200">
          <Trophy className={`w-4 h-4 ${progressPercentage === 100 ? 'text-yellow-500' : 'text-[#118B50]'}`} />
          <span className="text-sm font-bold text-slate-700">إنجاز: {progressPercentage}%</span>
        </div>
        
        {/* User Avatar Placeholder */}
        <div className="w-10 h-10 rounded-full bg-[#118B50]/10 border border-[#118B50]/20 flex items-center justify-center text-[#118B50] cursor-pointer hover:bg-[#118B50]/20 transition-colors">
          <User className="w-5 h-5" />
        </div>
      </div>

    </header>
  );
}
