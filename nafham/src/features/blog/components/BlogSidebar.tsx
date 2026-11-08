import { Search, Hash } from 'lucide-react';
import { BLOG_CATEGORIES } from '../data/mockPosts';

export default function BlogSidebar() {
  return (
    <aside className="w-full lg:w-80 flex flex-col gap-8 shrink-0">
      
      {/* Search Widget */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-lg text-slate-800 mb-4">ابحث في المدونة</h3>
        <div className="relative">
          <input 
            type="text" 
            placeholder="ابحث عن مقال..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#118B50]/20 focus:border-[#118B50] transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-lg text-slate-800 mb-4 border-b border-slate-100 pb-3">التصنيفات</h3>
        <ul className="flex flex-col gap-2">
          {BLOG_CATEGORIES.map((category, idx) => (
            <li key={idx}>
              <button className={`w-full text-right px-3 py-2 rounded-lg text-sm font-medium transition-colors ${idx === 0 ? 'bg-[#118B50]/10 text-[#118B50]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Tags Widget */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-lg text-slate-800 mb-4 border-b border-slate-100 pb-3">وسوم شائعة</h3>
        <div className="flex flex-wrap gap-2">
          {["React", "Next.js", "UI/UX", "Node.js", "فريلانس", "تطوير"].map((tag, idx) => (
            <span key={idx} className="flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-200 cursor-pointer transition-colors">
              <Hash className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>

    </aside>
  );
}
