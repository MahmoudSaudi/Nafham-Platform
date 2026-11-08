import { Search, MessageSquare, ThumbsUp, PlusCircle, Flame, Clock, Hash } from 'lucide-react';
import Image from 'next/image';

const FORUM_POSTS = [
  {
    id: 1,
    title: "أفضل مصادر لتعلم الخوارزميات بجانب الكورسات هنا؟",
    content: "أنهيت كورس هياكل البيانات وأبحث عن منصات للتدريب على الخوارزميات بشكل مكثف...",
    author: "خالد جمال",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    replies: 14,
    likes: 32,
    time: "منذ ساعتين",
    tags: ["برمجة", "خوارزميات", "نقاش عام"]
  },
  {
    id: 2,
    title: "مشاركة: كيف تجاوزت متلازمة المحتال (Imposter Syndrome)",
    content: "أردت مشاركة تجربتي في بداياتي مع البرمجة وكيف تمكنت من التغلب على شعور النقص...",
    author: "ندى محمد",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    replies: 45,
    likes: 128,
    time: "منذ يوم",
    tags: ["قصص نجاح", "نصائح", "تحفيز"]
  },
  {
    id: 3,
    title: "مشكلة في تحميل Next.js بالإصدار 15",
    content: "يظهر لي خطأ متعلق بـ React 19 عند محاولة تشغيل المشروع، هل من حلول؟",
    author: "عمر الفاروق",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    replies: 5,
    likes: 12,
    time: "منذ 3 ساعات",
    tags: ["أسئلة تقنية", "Next.js", "React"]
  }
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]" dir="rtl">
      
      {/* Header Section */}
      <div className="bg-[#118B50] text-white pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-5xl font-black">مجتمع نفهم</h1>
            <p className="text-emerald-100 text-lg max-w-xl">
              تواصل مع زملائك، اطرح أسئلتك، وشارك خبراتك في أكبر مجتمع تعليمي عربي.
            </p>
          </div>
          <button className="bg-white text-[#118B50] hover:bg-slate-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl">
            <PlusCircle className="w-5 h-5" />
            <span>موضوع جديد</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Search */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-slate-800">البحث</h3>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ابحث في المواضيع..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2">
              <h3 className="font-bold text-slate-800 mb-2">التصنيفات</h3>
              <button className="flex items-center gap-3 w-full text-right px-3 py-2 rounded-lg bg-emerald-50 text-[#118B50] font-medium transition-colors">
                <Flame className="w-4 h-4" />
                <span>الشائعة (Trending)</span>
              </button>
              <button className="flex items-center gap-3 w-full text-right px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <Clock className="w-4 h-4" />
                <span>الأحدث</span>
              </button>
              <button className="flex items-center gap-3 w-full text-right px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <Hash className="w-4 h-4" />
                <span>أسئلة تقنية</span>
              </button>
              <button className="flex items-center gap-3 w-full text-right px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <Hash className="w-4 h-4" />
                <span>قصص نجاح</span>
              </button>
            </div>
            
          </div>

          {/* Posts List */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {FORUM_POSTS.map(post => (
              <div key={post.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg md:text-xl font-bold text-slate-800 hover:text-[#118B50] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 text-sm line-clamp-2 mt-1">
                      {post.content}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image src={post.avatar} alt={post.author} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800">{post.author}</span>
                      <span className="text-xs text-slate-500">{post.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-slate-500 text-sm">
                    <div className="flex items-center gap-1.5 hover:text-[#118B50] transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.replies}</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-[#118B50] transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Load More */}
            <button className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:border-[#118B50] hover:text-[#118B50] transition-colors mt-4">
              عرض المزيد من المواضيع
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
