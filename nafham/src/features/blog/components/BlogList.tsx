import { BlogPost } from '../data/mockPosts';
import PostCardHorizontal from './PostCardHorizontal';

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white rounded-2xl border border-slate-100 p-12 min-h-[400px]">
        <p className="text-slate-500 font-medium">لا توجد مقالات لعرضها في الوقت الحالي.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-6">
      {posts.map(post => (
        <PostCardHorizontal key={post.id} post={post} />
      ))}
      
      {/* Pagination (Dummy) */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>
            السابق
          </button>
          <button className="w-10 h-10 rounded-lg bg-[#118B50] text-white flex items-center justify-center font-bold">
            1
          </button>
          <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors">
            2
          </button>
          <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors">
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}
