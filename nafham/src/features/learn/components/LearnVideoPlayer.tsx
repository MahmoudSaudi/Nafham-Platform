import { VideoLearnItem } from '../data/learningData';
import { PlayCircle, Volume2, Maximize, Settings } from 'lucide-react';

interface LearnVideoPlayerProps {
  item: VideoLearnItem;
  onComplete: (videoId: string) => void;
}

export default function LearnVideoPlayer({ item, onComplete }: LearnVideoPlayerProps) {
  // In a real implementation, you would use an actual video element or a wrapper
  // like video.js / react-player. Here we simulate the UI with a custom design.
  
  return (
    <div className="w-full">
      {/* Video Player Container */}
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group flex flex-col">
        
        {/* Placeholder for actual video rendering */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#118B50]/20 to-transparent opacity-30"></div>
          
          <button 
            onClick={() => onComplete(item.id)} // Simulated complete on play click for demo
            className="w-24 h-24 rounded-full bg-[#118B50]/90 backdrop-blur-md border border-[#118B50]/50 shadow-[0_0_40px_rgba(17,139,80,0.4)] flex items-center justify-center hover:scale-110 hover:bg-[#118B50] transition-all duration-300 z-10 group-hover:shadow-[0_0_60px_rgba(17,139,80,0.6)]"
          >
            <PlayCircle className="w-12 h-12 text-white ml-2" />
          </button>
          
          <div className="absolute top-6 right-6 text-white/50 font-bold text-xl tracking-wider">
            NAFHAM VIDEO PLAYER
          </div>
        </div>

        {/* Custom Controls Overlay (Always visible for design, or group-hover in real life) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          
          {/* Progress Bar */}
          <div className="flex-1 h-2 bg-white/20 rounded-full relative overflow-hidden cursor-pointer hover:h-3 transition-all duration-300 group/progress">
            <div className="absolute top-0 left-0 bottom-0 w-[45%] bg-[#118B50] rounded-full relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-md"></div>
            </div>
          </div>
          
          {/* Controls Row */}
          <div className="flex items-center justify-between text-white mt-2">
            <div className="flex items-center gap-4">
              <button className="hover:text-[#118B50] transition-colors">
                <PlayCircle className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
                <div className="w-16 h-1 bg-white/30 rounded-full">
                  <div className="w-1/2 h-full bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-sm font-medium font-sans text-slate-300">
                04:12 / {item.duration}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="hover:text-white text-slate-300 transition-colors hover:rotate-90 duration-300">
                <Settings className="w-5 h-5" />
              </button>
              <button className="hover:text-white text-slate-300 transition-colors hover:scale-110 duration-300">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
      
      {/* Below Video Description (Simulating Tabs Content) */}
      <div className="mt-8 flex flex-col gap-4 px-2">
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 mb-2">
          {item.title}
        </h1>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-slate-600 leading-relaxed text-lg">
          {item.description}
        </div>
      </div>
    </div>
  );
}
