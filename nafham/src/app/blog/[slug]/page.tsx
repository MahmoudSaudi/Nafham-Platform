import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Share2, Bookmark } from 'lucide-react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      
      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 pt-20 pb-10">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#118B50] font-bold hover:underline mb-8">
          <ArrowRight className="w-4 h-4" /> العودة للمدونة
        </Link>
        
        <div className="flex items-center gap-3 text-sm font-bold mb-6">
          <span className="bg-emerald-50 text-[#118B50] px-3 py-1 rounded-full">تطوير الويب</span>
          <span className="text-slate-500 flex items-center gap-1"><Calendar className="w-4 h-4" /> 14 يونيو 2026</span>
          <span className="text-slate-500 flex items-center gap-1"><User className="w-4 h-4" /> محمد أحمد</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
          الدليل الشامل لفهم React Server Components وكيفية استخدامها
        </h1>

        <div className="flex items-center gap-4 border-y border-slate-100 py-4">
          <button className="flex items-center gap-2 text-slate-600 hover:text-[#118B50] transition-colors text-sm font-bold">
            <Share2 className="w-4 h-4" /> مشاركة المقال
          </button>
          <button className="flex items-center gap-2 text-slate-600 hover:text-[#118B50] transition-colors text-sm font-bold">
            <Bookmark className="w-4 h-4" /> حفظ للقراءة لاحقاً
          </button>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-xl border border-slate-100">
          <Image src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1600" alt="React Banner" fill className="object-cover" />
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-4 pb-20 prose prose-emerald prose-lg rtl:prose-p:text-right rtl:prose-headings:text-right text-slate-700">
        <p className="lead text-xl text-slate-600 font-medium">
          في السنوات الأخيرة، شهدنا تطوراً متسارعاً في بيئة React، وكان الإعلان عن React Server Components (RSC) واحداً من أهم النقلات النوعية في كيفية بناء التطبيقات.
        </p>
        
        <h2>ما هي الـ Server Components؟</h2>
        <p>
          بشكل مبسط، هي مكونات يتم تصييرها (Rendering) حصرياً على السيرفر، ولا يتم إرسال أي كود جافاسكريبت خاص بها إلى متصفح العميل (Client). هذا يقلل بشكل كبير من حجم حزمة الجافاسكريبت (Bundle Size) ويحسن الأداء.
        </p>

        <h3>مميزات استخدامها:</h3>
        <ul>
          <li><strong>أداء أفضل:</strong> تقليل حجم الجافاسكريبت المحمل للمتصفح.</li>
          <li><strong>الوصول المباشر للبيانات:</strong> يمكنك الاتصال بقاعدة البيانات مباشرة من داخل الـ Component دون الحاجة لإنشاء API منفصل.</li>
          <li><strong>تحسين الـ SEO:</strong> المحتوى يظهر جاهزاً لمحركات البحث منذ اللحظة الأولى.</li>
        </ul>

        <blockquote>
          "تخيل أن تتمكن من كتابة استعلام SQL داخل مكون React مباشرة وبأمان تام! هذا ما يوفره لنا نظام RSC المدمج مع Next.js"
        </blockquote>

        <h2>كيف تختلف عن Client Components؟</h2>
        <p>
          المكونات العادية (Client Components) هي التي كنا نستخدمها دائماً، وتحتوي على الحالة (State) والتأثيرات (Effects) وتتطلب جافاسكريبت للعمل في المتصفح. أما الـ Server Components فهي مخصصة لجلب البيانات وعرض المحتوى الثابت.
        </p>

        <p>
          في النهاية، المزج الذكي بين الاثنين هو ما يصنع تطبيقاً حديثاً وقوياً. استخدم RSC لجلب البيانات وعرض المحتوى، واستخدم Client Components فقط للأجزاء التفاعلية التي يضغط عليها المستخدم.
        </p>
      </div>

    </div>
  );
}
