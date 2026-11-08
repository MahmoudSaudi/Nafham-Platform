export type LearnItemType = 'VIDEO' | 'QUIZ';

export interface BaseLearnItem {
  id: string;
  title: string;
  type: LearnItemType;
  isCompleted: boolean;
}

export interface VideoLearnItem extends BaseLearnItem {
  type: 'VIDEO';
  videoUrl: string;
  duration: string; // e.g., "12:30"
  description: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface QuizLearnItem extends BaseLearnItem {
  type: 'QUIZ';
  questionsCount: number;
  questions: QuizQuestion[];
  passingScore: number;
}

export type LearnItem = VideoLearnItem | QuizLearnItem;

export interface CourseModule {
  id: string;
  title: string;
  items: LearnItem[];
}

export interface CourseLearningData {
  id: string;
  title: string;
  modules: CourseModule[];
}

// Dummy Data
export const dummyCourseLearningData: CourseLearningData = {
  id: '1',
  title: 'كورس تطوير واجهات المستخدم المتقدم',
  modules: [
    {
      id: 'm1',
      title: 'الفصل الأول: أساسيات متقدمة',
      items: [
        {
          id: 'v1',
          title: 'مقدمة في React Server Components',
          type: 'VIDEO',
          isCompleted: true,
          videoUrl: 'https://example.com/video1.mp4',
          duration: '15:20',
          description: 'في هذا الدرس سنتعرف على كيفية عمل RSC والفائدة منها في تسريع تحميل التطبيق.'
        },
        {
          id: 'v2',
          title: 'كيفية التعامل مع الـ Data Fetching',
          type: 'VIDEO',
          isCompleted: false,
          videoUrl: 'https://example.com/video2.mp4',
          duration: '22:10',
          description: 'شرح مفصل لجلب البيانات من الـ API داخل المكونات.'
        },
        {
          id: 'q1',
          title: 'اختبار الفصل الأول',
          type: 'QUIZ',
          isCompleted: false,
          questionsCount: 2,
          passingScore: 50,
          questions: [
            {
              id: 'qq1',
              text: 'أين يتم تنفيذ الـ Server Components بشكل افتراضي؟',
              options: ['في المتصفح (Client)', 'في الخادم (Server)', 'في كليهما', 'لا يتم تنفيذها'],
              correctAnswerIndex: 1
            },
            {
              id: 'qq2',
              text: 'ما هو الأمر المستخدم لإنشاء تطبيق Next.js جديد؟',
              options: ['npx create-react-app', 'npm init next', 'npx create-next-app', 'next new app'],
              correctAnswerIndex: 2
            }
          ]
        }
      ]
    },
    {
      id: 'm2',
      title: 'الفصل الثاني: إدارة الحالة (State Management)',
      items: [
        {
          id: 'v3',
          title: 'إدارة الحالة باستخدام Zustand',
          type: 'VIDEO',
          isCompleted: false,
          videoUrl: 'https://example.com/video3.mp4',
          duration: '18:45',
          description: 'تعرف على مكتبة Zustand وكيفية استخدامها.'
        }
      ]
    }
  ]
};
