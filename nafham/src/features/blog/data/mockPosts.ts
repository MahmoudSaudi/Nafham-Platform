export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

export const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "react-server-components-guide",
    title: "الدليل الشامل لفهم React Server Components",
    excerpt: "تعرف على ثورة الـ Server Components في React وكيف ستغير طريقة بناء تطبيقات الويب من حيث الأداء وتحسين محركات البحث. نشرح لك الفروقات الجوهرية ومتى تستخدم كلاً منهما.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800",
    author: "محمد أحمد",
    date: "14 يونيو 2026",
    category: "تطوير الويب"
  },
  {
    id: "2",
    slug: "ui-ux-principles",
    title: "أهم 5 مبادئ لتصميم واجهات مستخدم احترافية",
    excerpt: "تصميم الواجهات لا يقتصر على الألوان فقط، بل هو فهم كامل لتجربة المستخدم. في هذا المقال نستعرض أهم المبادئ المتبعة عالمياً في تصميم تجربة مستخدم سلسة ومريحة.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800",
    author: "سارة محمود",
    date: "10 يونيو 2026",
    category: "تصميم"
  },
  {
    id: "3",
    slug: "how-to-start-freelancing",
    title: "كيف تبدأ عملك الحر كمبرمج بنجاح",
    excerpt: "خطوات عملية لبناء ملف شخصي قوي، الحصول على أول عميل لك، وكيفية تسعير خدماتك كمستقل في منصات العمل الحر، مع تجنب الأخطاء الشائعة التي يقع فيها المبتدئون.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    author: "خالد سعيد",
    date: "5 يونيو 2026",
    category: "العمل الحر"
  },
  {
    id: "4",
    slug: "clean-architecture-in-nodejs",
    title: "مقدمة في البنية النظيفة (Clean Architecture) مع Node.js",
    excerpt: "كيف تبني تطبيقات قابلة للتوسع والصيانة على المدى الطويل باستخدام مبادئ الـ Clean Architecture في بيئة Node.js وفصل الطبقات عن بعضها.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
    author: "عمر الفاروق",
    date: "1 يونيو 2026",
    category: "هندسة برمجيات"
  }
];

export const BLOG_CATEGORIES = [
  "الكل",
  "تطوير الويب",
  "تطبيقات الموبايل",
  "تصميم",
  "العمل الحر",
  "هندسة برمجيات",
  "نصائح تقنية"
];
