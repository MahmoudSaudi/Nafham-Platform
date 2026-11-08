import { ChevronDown, ChevronUp, CheckCircle2, Circle, PlayCircle, HelpCircle } from 'lucide-react';
import { CourseLearningData, LearnItem } from '../data/learningData';

interface CurriculumSidebarProps {
  course: CourseLearningData;
  activeItem: LearnItem | null;
  expandedModules: Record<string, boolean>;
  onToggleModule: (moduleId: string) => void;
  onSelectItem: (item: LearnItem) => void;
  progressPercentage: number;
}

export default function CurriculumSidebar({
  course,
  activeItem,
  expandedModules,
  onToggleModule,
  onSelectItem,
  progressPercentage
}: CurriculumSidebarProps) {
  
  return (
    <div className="flex flex-col h-full bg-white text-slate-800 border-l border-slate-200">
      
      {/* Header & Progress */}
      <div className="p-6 border-b border-slate-200 bg-slate-50/50">
        <h2 className="text-lg font-extrabold text-slate-900 mb-4 line-clamp-2 leading-tight">
          {course.title}
        </h2>
        
        <div className="mb-2 flex justify-between items-center text-sm font-medium text-slate-600">
          <span>نسبة الإنجاز</span>
          <span className="text-[#118B50] font-bold">{progressPercentage}%</span>
        </div>
        
        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-[#118B50] h-full rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Modules List */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {course.modules.map((module, index) => {
          const isExpanded = expandedModules[module.id];
          
          return (
            <div key={module.id} className="border-b border-slate-100">
              {/* Module Header */}
              <button 
                onClick={() => onToggleModule(module.id)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-right"
              >
                <div className="flex flex-col gap-1 items-start">
                  <span className="text-xs text-slate-500 font-bold group-hover:text-[#118B50] transition-colors">الفصل {index + 1}</span>
                  <span className="font-bold text-slate-800">{module.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-[#118B50] transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-[#118B50] transition-transform duration-300" />
                )}
              </button>

              {/* Items List - Animated Dropdown */}
              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden bg-white">
                  <div className="py-2">
                  {module.items.map((item) => {
                    const isActive = activeItem?.id === item.id;
                    const isVideo = item.type === 'VIDEO';
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelectItem(item)}
                        className={`w-full flex items-start gap-3 p-3 px-6 transition-all duration-200 text-right group/item relative overflow-hidden ${
                          isActive 
                            ? 'bg-[#118B50]/10 text-[#118B50]' 
                            : 'hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        {/* Active Indicator Line */}
                        <div className={`absolute right-0 top-0 bottom-0 w-1 bg-[#118B50] transition-transform duration-300 ${isActive ? 'scale-y-100' : 'scale-y-0 group-hover/item:scale-y-50 opacity-50'}`}></div>
                        <div className="mt-0.5 shrink-0">
                          {item.isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-[#118B50]" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300" />
                          )}
                        </div>
                        
                        <div className="flex flex-col items-start gap-1 flex-1">
                          <span className={`font-medium text-sm leading-relaxed ${isActive ? 'font-bold' : ''}`}>
                            {item.title}
                          </span>
                          
                          <div className={`flex items-center gap-1.5 text-xs ${isActive ? 'text-[#118B50]/80' : 'text-slate-400'}`}>
                            {isVideo ? (
                              <>
                                <PlayCircle className="w-3.5 h-3.5" />
                                <span>{(item as any).duration}</span>
                              </>
                            ) : (
                              <>
                                <HelpCircle className="w-3.5 h-3.5" />
                                <span>{(item as any).questionsCount} أسئلة</span>
                              </>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
