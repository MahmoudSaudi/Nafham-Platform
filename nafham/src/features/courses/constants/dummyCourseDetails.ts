export const DUMMY_OBJECTIVES = [
  "بناء تطبيقات ويب كاملة باستخدام React و Next.js",
  "التعامل مع قواعد البيانات PostgreSQL باستخدام Prisma",
  "إدارة حالة التطبيق المتقدمة (State Management)",
  "بناء نظام مصادقة آمن للمستخدمين",
  "تنفيذ عمليات الدفع الإلكتروني بنجاح",
  "رفع الموقع على استضافة حقيقية (Deployment)"
];

export const DUMMY_CURRICULUM = [
  {
    id: "m1", title: "الفصل الأول: أساسيات متقدمة", items: [
      { id: "i1", title: "مقدمة في React Server Components", type: "VIDEO" as const, duration: "15:20" },
      { id: "i2", title: "إعداد بيئة العمل والمشروع", type: "VIDEO" as const, duration: "10:05" },
      { id: "i3", title: "اختبار الفهم للأساسيات", type: "QUIZ" as const, questionsCount: 5 }
    ]
  },
  {
    id: "m2", title: "الفصل الثاني: إدارة الحالة", items: [
      { id: "i4", title: "استخدام Zustand", type: "VIDEO" as const, duration: "20:45" },
      { id: "i5", title: "Context API متى نستخدمه؟", type: "VIDEO" as const, duration: "12:30" }
    ]
  }
];

export const DUMMY_INSTRUCTOR = {
  id: "inst1",
  name: "أحمد محمد",
  title: "مهندس برمجيات أول ومطور واجهات",
  bio: "مهندس برمجيات متخصص في تقنيات الويب الحديثة، عملت في العديد من الشركات التقنية الكبرى وأقوم بتدريس البرمجة منذ أكثر من 5 سنوات لمساعدة آلاف الطلاب على دخول سوق العمل.",
  rating: 4.8,
  studentsCount: 15420,
  coursesCount: 12,
  reviewsCount: 3200
};

export const DUMMY_REVIEWS = {
  averageRating: 4.7,
  totalReviews: 320,
  ratingDistribution: { 5: 200, 4: 80, 3: 20, 2: 10, 1: 10 },
  topReviews: [
    { id: "r1", userName: "عمر خالد", rating: 5, date: "قبل أسبوعين", comment: "كورس ممتاز جداً وشرح مبسط وعملي، استفدت كثيراً من التطبيق العملي." },
    { id: "r2", userName: "سارة أحمد", rating: 4, date: "قبل شهر", comment: "الشرح رائع لكن كنت أتمنى وجود أمثلة أكثر على الـ Testing، بشكل عام الكورس ممتاز." }
  ]
};
