export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    behance?: string;
  };
}

export interface CourseData {
  id: string;
  title: string;
  instructor: string;
  image: string;
  duration: string;
  lessonsCount: number;
  badge?: { text: string; variant: "success" | "warning" | "default" };
  // Extra fields for the English overlay matching the design
  enCategory?: string;
  enTitle?: string;
  enInstructor?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessonsCount: number;
  durationHours: number;
  previewVideoUrl: string;
  posterUrl: string;
  instructor: Instructor;
}

export const MOCK_COURSE_DETAILS: Record<string, Course> = {
  "1": {
    id: "1",
    title: "أساسيات الفوتوشوب",
    description: "تعلم أساسيات برنامج أدوبي فوتوشوب من الصفر حتى الاحتراف. في هذه الدورة الشاملة، ستتعرف على واجهة البرنامج، أدوات التحديد، الطبقات، الأقنعة، وكيفية دمج الصور وتعديل الألوان لإنشاء تصميمات احترافية ومذهلة.",
    lessonsCount: 33,
    durationHours: 5,
    previewVideoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    posterUrl: "https://images.unsplash.com/photo-1542744094-24638ea0b3b5?q=80&w=2070&auto=format&fit=crop",
    instructor: {
      id: "i1",
      name: "Mohamed El Mufty",
      title: "Senior Graphic Designer & Instructor",
      bio: "مصمم جرافيك بخبرة تزيد عن 10 سنوات في مجال التصميم الإعلاني وتطوير الهويات البصرية للشركات الكبرى.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      socials: {
        linkedin: "#",
        twitter: "#",
        behance: "#"
      }
    }
  }
};

export const MOCK_COURSES: CourseData[] = [
  {
    id: "1",
    title: "احتراف تطوير تطبيقات الويب المتكاملة من الصفر",
    instructor: "أحمد خالد",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "45 ساعة",
    lessonsCount: 112,
    badge: { text: "جديد", variant: "default" },
    enCategory: "PROFESSIONAL COURSE",
    enTitle: "FULL-STACK WEB\nDEVELOPMENT",
    enInstructor: "with Ahmed Khalid"
  },
  {
    id: "2",
    title: "أساسيات وتوجهات تصميم تجربة المستخدم الحديثة",
    instructor: "سارة منصور",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "12 ساعة",
    lessonsCount: 45,
    badge: { text: "مجاني", variant: "success" },
    enCategory: "MASTERCLASS",
    enTitle: "MODERN UI/UX DESIGN\nTRENDS",
    enInstructor: "with Sara Mansour"
  },
  {
    id: "3",
    title: "استراتيجيات التسويق الرقمي وبناء العلامة التجارية",
    instructor: "عمر زايد",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "28 ساعة",
    lessonsCount: 180,
    badge: { text: "الأكثر مبيعاً", variant: "warning" },
    enCategory: "EXECUTIVE PROGRAM",
    enTitle: "DIGITAL MARKETING\nSTRATEGY",
    enInstructor: "with Omar Zayed"
  },
  {
    id: "4",
    title: "احتراف التصوير الفوتوغرافي ومعالجة الصور الرقمية",
    instructor: "سامي الشامي",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "20 ساعة",
    lessonsCount: 85,
    badge: { text: "جديد", variant: "default" },
    enCategory: "CREATIVE SKILLS",
    enTitle: "PRO PHOTOGRAPHY\nMASTERCLASS",
    enInstructor: "with Sami Alshami"
  },
  {
    id: "5",
    title: "ريادة الأعمال: كيف تبدأ مشروعك التجاري الأول",
    instructor: "أمل كمال",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "8 ساعات",
    lessonsCount: 32,
    badge: { text: "مجاني", variant: "success" },
    enCategory: "FOUNDATIONS",
    enTitle: "ENTREPRENEURSHIP 101",
    enInstructor: "with Amal Kamal"
  },
  {
    id: "6",
    title: "الذكاء الاصطناعي وتعلم الآلة: من النظرية إلى التطبيق",
    instructor: "د. مصطفى علي",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "32 ساعة",
    lessonsCount: 140,
    badge: { text: "جديد", variant: "default" },
    enCategory: "ADVANCED COURSE",
    enTitle: "AI & MACHINE LEARNING\nMODELS",
    enInstructor: "with Dr. Mostafa Ali"
  },
];
