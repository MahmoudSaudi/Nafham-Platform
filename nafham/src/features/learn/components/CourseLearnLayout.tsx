"use client";

import { useCourseLearning } from '../hooks/useCourseLearning';
import CurriculumSidebar from './CurriculumSidebar';
import LearnVideoPlayer from './LearnVideoPlayer';
import InteractiveQuiz from './InteractiveQuiz';
import LearnHeader from './LearnHeader';
import LearnTabs from './LearnTabs';
import { useState } from 'react';
import { PanelRightClose, PanelRightOpen, X } from 'lucide-react';

interface CourseLearnLayoutProps {
  courseId: string;
}

export default function CourseLearnLayout({ courseId }: CourseLearnLayoutProps) {
  // Use custom hook to separate logic from UI
  const {
    course,
    activeItem,
    expandedModules,
    progressPercentage,
    quizScores,
    toggleModule,
    handleSelectItem,
    handleQuizComplete,
    markVideoComplete
  } = useCourseLearning(courseId);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-16 h-16 border-4 border-[#118B50] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#FAFAFA] flex flex-col overflow-hidden" dir="rtl">
      
      {/* Mini Header Specific to Learning Page */}
      <LearnHeader 
        courseTitle={course.title} 
        progressPercentage={progressPercentage} 
        courseId={courseId} 
      />

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row relative">
        
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar (Right side in RTL) */}
        <div className={`
          absolute md:relative z-30 md:z-0
          h-full w-[85%] sm:w-80 lg:w-[25%] 
          flex-shrink-0 border-l border-slate-200 flex flex-col bg-white shadow-xl md:shadow-none
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:hidden'}
        `}>
          {/* Mobile close button */}
          <button 
            className="md:hidden absolute top-4 left-4 p-2 bg-slate-100 rounded-full text-slate-600 z-50"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
          
          <CurriculumSidebar 
            course={course}
            activeItem={activeItem}
            expandedModules={expandedModules}
            onToggleModule={toggleModule}
            onSelectItem={(item) => {
              handleSelectItem(item);
              if (window.innerWidth < 768) {
                setIsSidebarOpen(false); // Auto close on mobile after selection
              }
            }}
            progressPercentage={progressPercentage}
          />
        </div>

        {/* Main Content Area (Left side in RTL) */}
        <div className="flex-1 overflow-y-auto bg-[#FAFAFA] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full">
          <div className="max-w-7xl mx-auto h-full flex flex-col px-0 sm:px-4 md:px-8 py-4 md:py-6">
            
            {/* Toolbar above content */}
            <div className="px-4 md:px-0 mb-4 flex items-center">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center gap-2 text-slate-600 hover:text-[#118B50] transition-colors bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm"
              >
                {isSidebarOpen ? (
                  <>
                    <PanelRightClose className="w-4 h-4" />
                    <span className="hidden sm:inline">إخفاء القائمة</span>
                  </>
                ) : (
                  <>
                    <PanelRightOpen className="w-4 h-4" />
                    <span className="hidden sm:inline">إظهار القائمة</span>
                  </>
                )}
              </button>
            </div>
            
            {!activeItem && (
              <div className="flex-1 flex items-center justify-center text-slate-500">
                يرجى اختيار درس أو امتحان من القائمة للبدء
              </div>
            )}

            {activeItem && activeItem.type === 'VIDEO' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full h-full flex flex-col">
                <div className="flex-shrink-0">
                  <LearnVideoPlayer 
                    item={activeItem as any} 
                    onComplete={markVideoComplete} 
                  />
                </div>
                
                {/* Learn Tabs (Overview, Attachments, Q&A) */}
                <div className="flex-1 w-full mt-2 px-4 md:px-0">
                  <LearnTabs activeItem={activeItem} />
                </div>
              </div>
            )}

            {activeItem && activeItem.type === 'QUIZ' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto w-full mt-4 md:mt-8 mb-12">
                <InteractiveQuiz 
                  item={activeItem as any} 
                  onComplete={handleQuizComplete}
                  previousScore={quizScores[activeItem.id]}
                />
              </div>
            )}

          </div>
        </div>
      </div>
      
    </div>
  );
}
