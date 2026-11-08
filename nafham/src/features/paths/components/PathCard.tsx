import { Route, Layers } from "lucide-react";

export interface PathData {
  id: string;
  title: string;
  description?: string;
  image?: string;
  level?: string;
  courses?: any[];
  coursesCount?: number;
  colorClass?: string;
  badgeText?: string;
  icon?: React.ReactNode;
}

export default function PathCard({ path }: { path: PathData }) {
  const coursesCount = path.courses ? path.courses.length : 0;
  
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer group">
      {/* Top Section */}
      <div className="relative h-48 w-full flex items-center justify-center bg-emerald-50 overflow-hidden">
        {path.image ? (
          <img src={path.image} alt={path.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-24 h-24 bg-white/50 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100 transform group-hover:scale-110 transition-transform duration-500">
            <Route className="w-12 h-12 text-emerald-400" />
          </div>
        )}
        
        {/* Badge */}
        <div className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-medium shadow-sm">
          {path.level || "مبتدئ"}
        </div>
      </div>

      {/* Bottom Content Section */}
      <div className="p-6 flex flex-col items-center justify-center flex-1 text-center bg-white">
        <h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-1">{path.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{path.description}</p>
        
        <div className="flex items-center gap-1.5 text-gray-500 text-sm bg-gray-50 px-4 py-2 rounded-xl mt-auto">
          <Layers className="w-4 h-4 text-emerald-500" />
          <span>{coursesCount} دورة تدريبية</span>
        </div>
      </div>
    </div>
  );
}

