import { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle, HelpCircle } from 'lucide-react';

export interface CurriculumPreviewModule {
  id: string;
  title: string;
  lessons: {
    id: string;
    title: string;
    type?: 'VIDEO' | 'QUIZ';
    duration?: string;
    questionsCount?: number;
  }[];
}

interface CourseCurriculumPreviewProps {
  modules: CurriculumPreviewModule[];
  totalLessons: number;
  totalDuration: string;
}

export default function CourseCurriculumPreview({ modules, totalLessons, totalDuration }: CourseCurriculumPreviewProps) {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(
    // Expand the first module by default
    modules.reduce((acc, module, index) => {
      if (index === 0) acc[module.id] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allExpanded = modules.reduce((acc, module) => {
      acc[module.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setExpandedModules(allExpanded);
  };

  if (!modules || modules.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-extrabold text-slate-800">محتوى الكورس</h2>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <span>{modules.length} فصول</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>{totalLessons} دروس</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>{totalDuration} إجمالي الساعات</span>
          <button onClick={expandAll} className="text-[#118B50] font-bold hover:underline mr-4 hidden sm:block">
            توسيع الكل
          </button>
        </div>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden">
        {modules.map((module, index) => {
          const isExpanded = expandedModules[module.id];
          return (
            <div key={module.id} className="border-b border-slate-200 last:border-b-0">
              <button 
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-4 md:p-5 bg-slate-50 hover:bg-slate-100 transition-colors text-right"
              >
                <div className="flex items-center gap-4">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                  <span className="font-bold text-slate-800">{module.title}</span>
                </div>
                <span className="text-sm text-slate-500 hidden sm:block">{module.lessons?.length || 0} دروس</span>
              </button>

              {isExpanded && module.lessons && (
                <div className="bg-white py-2 px-4 md:px-10">
                  {module.lessons.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
                      <div className="flex items-center gap-3">
                        {item.type === 'VIDEO' ? (
                          <PlayCircle className="w-4 h-4 text-slate-400" />
                        ) : (
                          <HelpCircle className="w-4 h-4 text-slate-400" />
                        )}
                        <span className="text-sm text-slate-800 font-medium">{item.title}</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {item.type === 'VIDEO' ? item.duration : `${item.questionsCount} أسئلة`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
