import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { BlogPost } from '../data/mockPosts';

interface PostCardHorizontalProps {
  post: BlogPost;
}

export default function PostCardHorizontal({ post }: PostCardHorizontalProps) {
  return (
    <Link 
      href={`/blog/${post.slug}`} 
      className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row"
    >
      {/* Image Section */}
      <div className="relative w-full md:w-64 lg:w-72 h-48 md:h-auto overflow-hidden shrink-0">
        <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#118B50]">
          {post.category}
        </div>
        <Image 
          src={post.image} 
          alt={post.title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1 justify-center">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 group-hover:text-[#118B50] transition-colors leading-snug">
          {post.title}
        </h2>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 mb-6">
          {post.excerpt}
        </p>
        
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-4 text-xs md:text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5"><User className="w-4 h-4 text-slate-400" />{post.author}</div>
            <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" />{post.date}</div>
          </div>
          <div className="flex items-center gap-2 text-[#118B50] font-bold text-sm">
            <span>اقرأ المزيد</span>
            <ArrowLeft className="w-4 h-4 -translate-x-1 group-hover:-translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
