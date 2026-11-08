export const MOCK_INSTRUCTOR_PROFILE = {
  id: "i1",
  name: "Mohamed El Mufty",
  title: "Senior Full-Stack Developer & Instructor",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
  bio: "مهندس برمجيات متخصص في تقنيات الويب الحديثة (React, Next.js, Node.js). عملت مع العديد من الشركات الناشئة لبناء أنظمة قابلة للتوسع، ولدي شغف كبير بمشاركة المعرفة وتبسيط المفاهيم البرمجية المعقدة لتصبح في متناول الجميع. هدفي هو تمكين الجيل القادم من المطورين العرب.",
  stats: {
    students: 15420,
    reviews: 4.8,
    courses: 12,
  },
  socials: {
    github: "#",
    linkedin: "#",
    twitter: "#"
  },
  courses: [
    {
      id: "1",
      title: "تطوير الويب الشامل باستخدام React و Next.js",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=800",
      rating: 4.9,
      students: 5200,
      price: "1,500 ج.م"
    },
    {
      id: "2",
      title: "احتراف تصميم واجهات المستخدم UI/UX",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800",
      rating: 4.7,
      students: 3400,
      price: "1,200 ج.م"
    }
  ],
  reviews: [
    {
      id: "r1",
      studentName: "أحمد محمود",
      rating: 5,
      date: "منذ أسبوعين",
      comment: "شرح ممتاز جداً ومبسط. المهندس محمد لديه قدرة عجيبة على توصيل المعلومة المعقدة بأسلوب سهل وبسيط.",
      courseId: "1"
    },
    {
      id: "r2",
      studentName: "سارة خالد",
      rating: 4,
      date: "منذ شهر",
      comment: "الكورس رائع ومليء بالمعلومات العملية التي نحتاجها في سوق العمل. أتمنى إضافة المزيد من المشاريع في التحديثات القادمة.",
      courseId: "1"
    },
    {
      id: "r3",
      studentName: "عمر الفاروق",
      rating: 5,
      date: "منذ شهرين",
      comment: "أفضل مدرب تعاملت معه! المتابعة مستمرة والرد على الأسئلة في المنصة سريع جداً.",
      courseId: "2"
    }
  ]
};
