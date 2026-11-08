import { MOCK_POSTS } from '../data/mockPosts';
import BlogSidebar from './BlogSidebar';
import BlogList from './BlogList';

export default function BlogLayout() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16" dir="rtl">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">المدونة التعليمية</h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            تصفح أحدث المقالات التقنية، ونصائح العمل الحر، وتطوير المهارات لتواكب متطلبات سوق العمل.
          </p>
        </div>

        {/* Blog Content: Sidebar + List */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main List */}
          <BlogList posts={MOCK_POSTS} />
          
          {/* Sidebar */}
          <BlogSidebar />
          
        </div>

      </div>
    </div>
  );
}
