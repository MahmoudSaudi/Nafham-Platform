import { useState, useEffect } from "react";

export interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  image: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed: string;
}

export function useMyCourses() {
  const [activeTab, setActiveTab] = useState<"in-progress" | "completed">("in-progress");
  const [isLoading, setIsLoading] = useState(true);

  const [inProgressCourses, setInProgressCourses] = useState<EnrolledCourse[]>([]);
  const [completedCourses, setCompletedCourses] = useState<EnrolledCourse[]>([]);

  useEffect(() => {
    // Mock fetching data
    setTimeout(() => {
      setInProgressCourses([
        {
          id: "1",
          title: "أساسيات تصميم واجهة المستخدم (UI/UX)",
          instructor: "أحمد محمد",
          image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          progress: 65,
          totalLessons: 40,
          completedLessons: 26,
          lastAccessed: "منذ ساعتين",
        },
        {
          id: "2",
          title: "برمجة تطبيقات الويب باستخدام React",
          instructor: "سارة أحمد",
          image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          progress: 30,
          totalLessons: 50,
          completedLessons: 15,
          lastAccessed: "أمس",
        }
      ]);

      setCompletedCourses([
        {
          id: "3",
          title: "مقدمة في الذكاء الاصطناعي",
          instructor: "د. خالد حسن",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          progress: 100,
          totalLessons: 25,
          completedLessons: 25,
          lastAccessed: "الشهر الماضي",
        },
        {
          id: "4",
          title: "مهارات التواصل الفعال",
          instructor: "منى حسين",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          progress: 100,
          totalLessons: 15,
          completedLessons: 15,
          lastAccessed: "منذ 3 أشهر",
        }
      ]);

      setIsLoading(false);
    }, 800);
  }, []);

  return {
    activeTab,
    setActiveTab,
    inProgressCourses,
    completedCourses,
    isLoading
  };
}
