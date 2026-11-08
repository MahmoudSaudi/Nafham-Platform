import Image from 'next/image';
import Link from 'next/link';
import { Link as LinkIcon, Globe, Mail } from 'lucide-react';
import { MOCK_INSTRUCTOR_PROFILE } from '../data/mockInstructor';

interface InstructorProfileHeaderProps {
  instructor: typeof MOCK_INSTRUCTOR_PROFILE;
}

export default function InstructorProfileHeader({ instructor }: InstructorProfileHeaderProps) {
  return (
    <div className="bg-white border-b border-slate-200 pt-16 pb-12 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-right">
        
        {/* Avatar */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-50 shadow-xl flex-shrink-0 bg-slate-200">
          <Image src={instructor.avatar} alt={instructor.name} fill className="object-cover" />
        </div>
        
        {/* Info */}
        <div className="flex flex-col gap-4 flex-1">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">{instructor.name}</h1>
            <h2 className="text-[#118B50] font-medium text-lg">{instructor.title}</h2>
          </div>
          
          <p className="text-slate-600 leading-relaxed max-w-2xl text-sm md:text-base">
            {instructor.bio}
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
            <Link href={instructor.socials.github} className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition-colors">
              <LinkIcon className="w-5 h-5" />
            </Link>
            <Link href={instructor.socials.linkedin} className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-colors">
              <Globe className="w-5 h-5" />
            </Link>
            <Link href={instructor.socials.twitter} className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-colors">
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
