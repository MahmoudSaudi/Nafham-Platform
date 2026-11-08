import { MoreVertical, BookOpen, Users, DollarSign, Code, Palette, Briefcase, Megaphone, Lightbulb, Settings, Copy, Trash2, Edit } from "lucide-react";
import { LearningTrack } from "../types";
import { useState, useRef, useEffect } from "react";

interface Props {
  track: LearningTrack;
  onEdit?: (track: LearningTrack) => void;
  onDelete?: (track: LearningTrack) => void;
}

export default function TrackCard({ track, onEdit, onDelete }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "برمجة": return <Code className="w-8 h-8 text-white" />;
      case "تصميم": return <Palette className="w-8 h-8 text-white" />;
      case "أعمال": return <Briefcase className="w-8 h-8 text-white" />;
      case "تسويق": return <Megaphone className="w-8 h-8 text-white" />;
      default: return <Lightbulb className="w-8 h-8 text-white" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group">
      
      {/* Visual Cover */}
      <div className={`h-32 bg-gradient-to-r ${track.colorHex} relative flex items-center justify-center`}>
        {/* Status Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
          <div className={`w-2 h-2 rounded-full ${track.status === 'منشور' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
          <span className="text-slate-700">{track.status}</span>
        </div>
        
        {/* Category Icon */}
        <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner">
          {getCategoryIcon(track.category)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-extrabold text-lg text-slate-900 leading-tight">
            {track.title}
          </h3>
          
          {/* Options Menu */}
          <div className="relative shrink-0" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-400 hover:text-slate-700 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute left-0 top-full mt-1 w-40 bg-white border border-gray-100 rounded-xl shadow-lg p-1.5 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                <button 
                  onClick={() => { onEdit?.(track); setIsMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4 text-blue-500" />
                  <span>تعديل</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>تكرار</span>
                </button>
                <div className="h-px bg-gray-100 my-1 mx-2"></div>
                <button 
                  onClick={() => { onDelete?.(track); setIsMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>حذف المسار</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-sm font-medium text-slate-500 mb-6 line-clamp-2">
          {track.description}
        </p>

        <div className="mt-auto">
          {/* Metrics */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-50 mb-4">
            <div className="flex flex-col items-center flex-1">
              <span className="text-xs font-bold text-slate-400 mb-1 flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> الدورات</span>
              <span className="text-sm font-extrabold text-slate-700">{track.coursesCount}</span>
            </div>
            <div className="w-px h-8 bg-gray-100"></div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-xs font-bold text-slate-400 mb-1 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> المشتركين</span>
              <span className="text-sm font-extrabold text-slate-700">{track.studentsCount.toLocaleString("en-US")}</span>
            </div>
            <div className="w-px h-8 bg-gray-100"></div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-xs font-bold text-slate-400 mb-1 flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> الإيرادات</span>
              <span className="text-sm font-extrabold text-emerald-600" dir="ltr">{track.revenue}</span>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full flex items-center justify-center gap-2 bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
            <Settings className="w-4 h-4" />
            <span>إدارة المسار</span>
          </button>
        </div>
      </div>

    </div>
  );
}
