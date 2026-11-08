import { Course } from "@/constants/coursesData";
import CourseInstructor from "./CourseInstructor";
import { PlayCircle, Volume2, Settings, Maximize } from "lucide-react"; 

interface CourseHeroProps {
  course: any; // Using any or specific interface matching DB
  isSubscribing: boolean;
  onSubscribe: () => void;
  totalLessons: number;
}

export default function CourseHero({ course, isSubscribing, onSubscribe, totalLessons }: CourseHeroProps) {
  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Right Content (Text & Instructor) */}
        <div className="order-2 lg:order-1 text-right relative z-10">
          <h1 className="text-4xl lg:text-[42px] font-extrabold text-[#0f172a] mb-6 leading-tight">
            {course.title}
          </h1>
          
          <p className="text-slate-800 font-medium leading-[1.8] mb-8 text-lg">
            {course.description}
          </p>

          <div className="flex flex-col items-start gap-4 mb-8">
            <button 
              onClick={onSubscribe}
              disabled={isSubscribing}
              className="bg-[#118B50] hover:bg-[#0f7a46] text-white font-extrabold text-xl py-4 px-12 rounded-xl transition-colors shadow-lg shadow-[#118B50]/20 disabled:opacity-70"
            >
              {isSubscribing ? "جاري الاشتراك..." : "اشترك الآن"}
            </button>
            <div className="text-slate-500 font-bold text-sm bg-slate-100 px-4 py-2 rounded-lg">
              عدد الدروس: {totalLessons} | المدة: {course.duration || "غير محدد"}
            </div>
          </div>

          <CourseInstructor instructor={course.instructor} />
        </div>

        {/* Left Content (Video Player Preview) */}
        <div className="order-1 lg:order-2 w-full relative z-20">
          {/* Custom Video Player Wrapper matching the design - added isolate to prevent layer leaking */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-slate-900 group cursor-pointer border border-slate-700 isolate">
            
            {/* The Poster Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={course.image ? { backgroundImage: `url(${course.image})` } : {}}
            />
            
            {/* Solid Dark Overlay to ensure visibility of controls and prevent any weird white fading */}
            <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-colors duration-300"></div>

            {/* Play Button Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#118B50] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(17,139,80,0.4)]">
                <PlayCircle className="w-10 h-10 text-white ml-1" />
              </div>
            </div>

            {/* Fake Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent flex items-center gap-4 text-white">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-4 bg-white rounded-sm"></div>
                <div className="w-1.5 h-4 bg-white rounded-sm"></div>
              </div>
              <div className="text-sm font-medium font-sans tracking-wide">
                02:45 / 15:30
              </div>
              
              <div className="flex-1 h-1.5 bg-white/20 rounded-full relative overflow-hidden mx-2">
                <div className="absolute top-0 left-0 bottom-0 w-[15%] bg-[#118B50] rounded-full shadow-[0_0_10px_rgba(17,139,80,0.8)]"></div>
              </div>

              <div className="flex items-center gap-4">
                <Volume2 className="w-5 h-5 cursor-pointer hover:text-[#118B50] transition-colors" />
                <Settings className="w-5 h-5 cursor-pointer hover:text-[#118B50] transition-colors" />
                <Maximize className="w-5 h-5 cursor-pointer hover:text-[#118B50] transition-colors" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

