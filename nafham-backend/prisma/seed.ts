import 'dotenv/config';
import { Role, AuthProvider } from '@prisma/client';
import bcrypt from 'bcryptjs';
import prisma from '../src/utils/prisma';

const ARABIC_FIRST_NAMES = ["أحمد", "محمد", "محمود", "عمر", "علي", "عبد الله", "فاطمة", "مريم", "سارة", "نورة", "خالد", "يوسف", "حسن", "حسين", "زينب", "آية", "ياسمين", "كريم", "طارق", "سامي", "هدى", "منى", "سميرة", "عادل", "ماجد", "رامي", "سمير"];
const ARABIC_LAST_NAMES = ["السيد", "حسن", "إبراهيم", "توفيق", "سعد", "سليمان", "عبد الرحمن", "عبد العزيز", "عثمان", "منصور", "صالح", "فاروق", "عبد الحميد", "شوقي", "حافظ", "المهدي", "نور", "النجار", "الحداد", "شاهين"];

function getRandomName() {
  const first = ARABIC_FIRST_NAMES[Math.floor(Math.random() * ARABIC_FIRST_NAMES.length)];
  const last = ARABIC_LAST_NAMES[Math.floor(Math.random() * ARABIC_LAST_NAMES.length)];
  return `${first} ${last}`;
}

const COURSES_DATA = [
  {
    title: "كورس تطوير واجهات الويب الشامل (React & Next.js)",
    description: "في هذا الكورس الشامل ستتعلم كل ما يخص تطوير واجهات الويب الحديثة باستخدام تقنيات React و Next.js من الصفر وحتى الاحتراف مع بناء تطبيقات حقيقية.",
    price: 1500,
    level: "متقدم",
    category: "برمجة وتطوير",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    duration: "45 ساعة",
    isPublished: true,
    enTitle: "React & Next.js\nFullstack Course",
    enCategory: "WEB DEVELOPMENT",
    enInstructor: "Eng. Ahmed",
    badgeText: "الأكثر مبيعاً",
    badgeVariant: "success",
    objectives: [
      "بناء تطبيقات ويب سريعة الاستجابة باستخدام React",
      "فهم عميق للـ Hooks وإدارة حالة التطبيق (State Management)",
      "تطوير تطبيقات تدعم الـ SEO باستخدام Next.js",
      "ربط التطبيقات بواجهات برمجية API والتعامل مع قواعد البيانات",
      "نشر التطبيقات على منصات مثل Vercel و Netlify"
    ],
    requirements: [
      "معرفة أساسية بـ HTML و CSS",
      "أساسيات لغة JavaScript (ES6+)",
      "جهاز كمبيوتر واتصال بالإنترنت"
    ],
    chapters: [
      {
        title: "مقدمة في أساسيات الويب",
        order: 1,
        lessons: [
          { title: "ما هو الـ DOM وكيف يعمل؟", videoUrl: "https://www.youtube.com/watch?v=1sIADz2w8u4", videoType: "YOUTUBE", duration: "12:00", order: 1, isFree: true },
          { title: "مقدمة سريعة للـ HTML و CSS", videoUrl: "https://www.youtube.com/watch?v=pQN-pnXPaVg", videoType: "YOUTUBE", duration: "15:30", order: 2, isFree: true }
        ]
      },
      {
        title: "أساسيات React",
        order: 2,
        lessons: [
          { title: "ما هو React ولماذا نستخدمه؟", videoUrl: "https://www.youtube.com/watch?v=N3AkSS5hXMA", videoType: "YOUTUBE", duration: "25:00", order: 1, isFree: false },
          { title: "الـ Components و Props", videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY", videoType: "YOUTUBE", duration: "30:45", order: 2, isFree: false }
        ]
      }
    ]
  },
  {
    title: "التسويق الرقمي وإدارة الحملات الإعلانية",
    description: "احترف إنشاء وإدارة الحملات الإعلانية على فيسبوك، انستجرام، وجوجل. استراتيجيات متقدمة للوصول لجمهورك المستهدف وزيادة المبيعات.",
    price: 900,
    level: "متوسط",
    category: "تسويق",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1000&auto=format&fit=crop",
    duration: "20 ساعة",
    isPublished: true,
    enTitle: "Digital Marketing\nMasterclass",
    enCategory: "MARKETING",
    enInstructor: "Sarah Ali",
    badgeText: "جديد",
    badgeVariant: "warning",
    objectives: [
      "إنشاء حملات إعلانية ناجحة على فيسبوك وانستجرام",
      "استهداف الجمهور المناسب بدقة عالية",
      "إدارة ميزانية الإعلانات وتقليل التكلفة",
      "تحليل النتائج وتحسين أداء الحملات",
      "احتراف إعلانات جوجل وشبكة البحث"
    ],
    requirements: [
      "لا توجد متطلبات مسبقة، الكورس يبدأ من الصفر",
      "حساب فيسبوك شخصي لإنشاء مدير الأعمال"
    ],
    chapters: [
      {
        title: "أساسيات التسويق الرقمي",
        order: 1,
        lessons: [
          { title: "مقدمة في التسويق عبر وسائل التواصل", videoUrl: "https://www.youtube.com/watch?v=5z-fE5mH4sM", videoType: "YOUTUBE", duration: "10:15", order: 1, isFree: true },
          { title: "كيف تحدد شريحتك المستهدفة؟", videoUrl: "https://www.youtube.com/watch?v=UqQ1l1zLntk", videoType: "YOUTUBE", duration: "14:20", order: 2, isFree: false }
        ]
      }
    ]
  },
  {
    title: "تعلم التصميم الجرافيكي باستخدام Photoshop",
    description: "تعلم برنامج Adobe Photoshop من الصفر، كيف تتعامل مع الطبقات (Layers) وتصميم إعلانات سوشيال ميديا احترافية.",
    price: 600,
    level: "مبتدئ",
    category: "تصميم وجرافيك",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1000&auto=format&fit=crop",
    duration: "15 ساعة",
    isPublished: true,
    enTitle: "Photoshop\nZero to Hero",
    enCategory: "GRAPHIC DESIGN",
    enInstructor: "Mahmoud",
    badgeText: "للمبتدئين",
    badgeVariant: "default",
    objectives: [
      "التعامل مع واجهة برنامج فوتوشوب بمرونة",
      "فهم واستخدام نظام الطبقات (Layers) والأقنعة (Masks)",
      "تصميم إعلانات سوشيال ميديا جذابة واحترافية",
      "تعديل الصور الفوتوغرافية وتصحيح الألوان",
      "دمج الصور وصنع تصميمات دمج احترافية"
    ],
    requirements: [
      "توفر برنامج Adobe Photoshop 2020 أو أحدث",
      "لا يشترط وجود خبرة سابقة في التصميم"
    ],
    chapters: [
      {
        title: "واجهة البرنامج وأدوات التحديد",
        order: 1,
        lessons: [
          { title: "التعرف على واجهة فوتوشوب 2024", videoUrl: "https://www.youtube.com/watch?v=IyR_uYsRdPs", videoType: "YOUTUBE", duration: "20:00", order: 1, isFree: true }
        ]
      }
    ]
  },
  {
    title: "تطوير تطبيقات الموبايل باستخدام Flutter",
    description: "ابنِ تطبيقات تعمل على الأندرويد والآيفون بكود واحد باستخدام إطار عمل فلاتر ولغة دارت.",
    price: 1200,
    level: "متوسط",
    category: "برمجة وتطوير",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
    duration: "35 ساعة",
    isPublished: true,
    enTitle: "Flutter\nMobile Dev",
    enCategory: "MOBILE",
    enInstructor: "Omar",
    badgeText: "مطلوب بالسوق",
    badgeVariant: "success",
    objectives: [
      "برمجة تطبيقات الهاتف لمنصتي أندرويد و iOS باستخدام كود برمجي واحد",
      "تعلم أساسيات ومفاهيم لغة Dart",
      "تصميم واجهات مستخدم معقدة باستخدام الـ Widgets",
      "إدارة الحالة (State Management) باستخدام Provider و Bloc",
      "التعامل مع قواعد البيانات المحلية والخارجية (Firebase)"
    ],
    requirements: [
      "معرفة سابقة بأساسيات البرمجة (المتغيرات، الشروط، الحلقات التكرارية)",
      "جهاز كمبيوتر بمواصفات جيدة لتشغيل Android Studio أو VS Code"
    ],
    chapters: [
      {
        title: "مقدمة في لغة Dart",
        order: 1,
        lessons: [
          { title: "أساسيات لغة Dart للمبتدئين", videoUrl: "https://www.youtube.com/watch?v=5F-6n_2XWR8", videoType: "YOUTUBE", duration: "15:00", order: 1, isFree: true }
        ]
      }
    ]
  },
  {
    title: "تعلم لغة بايثون من الصفر إلى الاحتراف",
    description: "في هذا الكورس ستتعلم لغة بايثون القوية، وكيفية استخدامها في تحليل البيانات، وبناء تطبيقات الويب، والذكاء الاصطناعي.",
    price: 800,
    level: "مبتدئ",
    category: "برمجة وتطوير",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    duration: "22 ساعة",
    isPublished: true,
    objectives: [
      "تعلم كتابة كود بايثون نظيف وفعال",
      "فهم البرمجة الكائنية التوجه (OOP) في بايثون",
      "مقدمة في التعامل مع المكتبات مثل Pandas و NumPy",
      "كتابة سكربتات لأتمتة المهام اليومية",
      "إنشاء تطبيقات بسيطة وتطويرها"
    ],
    requirements: [
      "لا توجد أي متطلبات سابقة",
      "الرغبة في تعلم البرمجة وحل المشكلات"
    ],
    chapters: [
      {
        title: "أساسيات لغة بايثون",
        order: 1,
        lessons: [
          { title: "ما هي لغة بايثون؟ تثبيت البيئة", videoUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", videoType: "YOUTUBE", duration: "10:00", order: 1, isFree: true },
          { title: "المتغيرات وأنواع البيانات", videoUrl: "https://www.youtube.com/watch?v=k9TUPpGqYTo", videoType: "YOUTUBE", duration: "15:00", order: 2, isFree: true }
        ]
      }
    ]
  },
  {
    title: "دورة إدارة المشاريع الاحترافية PMP",
    description: "احصل على شهادة PMP وتعرف على أفضل الممارسات في إدارة المشاريع، الجداول الزمنية، والموارد البشرية.",
    price: 2500,
    level: "متقدم",
    category: "إدارة أعمال",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
    duration: "40 ساعة",
    isPublished: true,
    objectives: [
      "الاستعداد لاجتياز اختبار PMP بنجاح من المحاولة الأولى",
      "تعلم أفضل المنهجيات المرنة (Agile) والتقليدية (Waterfall) لإدارة المشاريع",
      "إدارة المخاطر، الجودة، والميزانية بكفاءة عالية",
      "تطوير مهارات القيادة وإدارة فرق العمل بفعالية"
    ],
    requirements: [
      "يفضل وجود خبرة سابقة في بيئة عمل المشاريع",
      "الالتزام بحضور كافة الساعات التدريبية لحل الاختبارات التجريبية"
    ],
    chapters: [
      {
        title: "مقدمة في إدارة المشاريع",
        order: 1,
        lessons: [
          { title: "ما هو المشروع؟", videoUrl: "https://www.youtube.com/watch?v=yQjEMM1gD_Y", videoType: "YOUTUBE", duration: "12:00", order: 1, isFree: true }
        ]
      }
    ]
  },
  {
    title: "تصميم واجهات المستخدم UI/UX باستخدام Figma",
    description: "تعلم تصميم واجهات التطبيقات والمواقع باستخدام برنامج فيجما Figma، مع دراسة تجربة المستخدم بشكل علمي.",
    price: 1100,
    level: "متوسط",
    category: "تصميم وجرافيك",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
    duration: "18 ساعة",
    isPublished: true,
    objectives: [
      "التمييز بين تجربة المستخدم UX وواجهة المستخدم UI",
      "استخدام برنامج Figma باحترافية لتصميم شاشات الموبايل والويب",
      "إنشاء نماذج أولية تفاعلية (Interactive Prototypes)",
      "تطبيق مبادئ التصميم المرئي (الألوان، الخطوط، المساحات)",
      "إجراء اختبارات قابلية الاستخدام (Usability Testing)"
    ],
    requirements: [
      "لا يشترط خبرة برمجية نهائياً",
      "جهاز كمبيوتر وتوفر اتصال بالإنترنت للعمل على Figma"
    ],
    chapters: [
      {
        title: "مبادئ تجربة المستخدم UX",
        order: 1,
        lessons: [
          { title: "الفروق بين UI و UX", videoUrl: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU", videoType: "YOUTUBE", duration: "08:45", order: 1, isFree: true },
          { title: "أساسيات Figma", videoUrl: "https://www.youtube.com/watch?v=jwSmKGJ1a1Q", videoType: "YOUTUBE", duration: "25:00", order: 2, isFree: false }
        ]
      }
    ]
  },
  {
    title: "التجارة الإلكترونية والدروبشيبينغ",
    description: "كيف تبدأ متجرك الإلكتروني على Shopify وتتعلم فنون الدروبشيبينغ لاختيار المنتجات الرابحة.",
    price: 2000,
    level: "مبتدئ",
    category: "تسويق وأعمال",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop",
    duration: "25 ساعة",
    isPublished: true,
    objectives: [
      "إنشاء متجر إلكتروني متكامل على منصة Shopify أو WooCommerce",
      "البحث عن المنتجات الرابحة واختيار الموردين الموثوقين",
      "إدارة الطلبات والشحن لنموذج الدروبشيبينغ",
      "إطلاق حملات تسويقية مجدية على تيك توك وفيسبوك للمتجر"
    ],
    requirements: [
      "لا يطلب خبرة سابقة في البرمجة أو بناء المواقع",
      "رغبة حقيقية في تعلم التجارة الإلكترونية وإدارة الأعمال"
    ],
    chapters: [
      {
        title: "إنشاء المتجر",
        order: 1,
        lessons: [
          { title: "مقدمة للدروبشيبينغ", videoUrl: "https://www.youtube.com/watch?v=u5-vQ2718yA", videoType: "YOUTUBE", duration: "14:10", order: 1, isFree: true }
        ]
      }
    ]
  },
  {
    title: "تعلم المونتاج الاحترافي Premiere Pro",
    description: "دورة شاملة لتعلم برنامج أدوبي بريمير برو للمونتاج، إضافة المؤثرات، وتعديل الألوان.",
    price: 1300,
    level: "متوسط",
    category: "تصميم وجرافيك",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop",
    duration: "30 ساعة",
    isPublished: true,
    objectives: [
      "احتراف المونتاج والقص وتعديل الفيديوهات ببرنامج أدوبي بريمير",
      "إضافة المؤثرات الانتقالية والبصرية، وصناعة عناوين متحركة",
      "تعديل وتصحيح الألوان (Color Grading & Correction)",
      "هندسة الصوت داخل البريمير وتحسين جودة التسجيلات",
      "إخراج وتصدير الفيديو بأفضل جودة لمختلف المنصات"
    ],
    requirements: [
      "توفر برنامج Adobe Premiere Pro 2021 أو أعلى",
      "جهاز كمبيوتر يمتلك مواصفات متوسطة أو عالية لمعالجة الفيديو"
    ],
    chapters: [
      {
        title: "أساسيات المونتاج",
        order: 1,
        lessons: [
          { title: "واجهة البرنامج وأدوات القص", videoUrl: "https://www.youtube.com/watch?v=1b-XG6wV95U", videoType: "YOUTUBE", duration: "16:20", order: 1, isFree: true }
        ]
      }
    ]
  }
];

const INSTRUCTOR_BIOS = [
  "أنا مهندس برمجيات ذو خبرة تزيد عن 10 سنوات في تطوير وبناء تطبيقات الويب والموبايل باستخدام تقنيات حديثة. عملت في عدة شركات تقنية كبرى وقمت بتدريب آلاف الطلاب للبدء في مشوارهم التقني.",
  "خبير تسويق رقمي معتمد من جوجل وميتا، ساعدت العديد من الشركات الناشئة والمتوسطة في زيادة مبيعاتهم من خلال استراتيجيات تسويقية متقدمة وتحليلات دقيقة للسوق الرقمي.",
  "مصمم جرافيك محترف ومستشار في تصميم تجربة واجهة المستخدم، شاركت في تطوير هويات بصرية لمؤسسات حكومية وشركات خاصة. شغفي هو نقل هذه الخبرة بشكل مبسط للمبتدئين.",
  "مدير مشاريع محترف وحاصل على شهادة PMP، أمتلك خبرة عملية طويلة في إدارة المشاريع الهندسية والتقنية. أهدف دائماً لتطبيق أفضل الممارسات في التدريب والإدارة.",
  "صانع محتوى مرئي ومونتير محترف، عملت على العديد من البرامج التلفزيونية والأفلام الوثائقية. الكورسات التي أقدمها هنا هي خلاصة خبرتي الطويلة في عالم المونتاج."
];

async function main() {
  console.log('Starting Database Seeding...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Clean up existing data (Optional but good for fresh seeds)
  console.log('Cleaning up old data...');
  await prisma.review.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Admins
  console.log('Seeding Admins...');
  const admins = [];
  
  const mainAdmin = await prisma.user.create({
    data: {
      name: 'المدير العام',
      email: 'admin@nafham.com',
      password: passwordHash,
      role: Role.ADMIN,
    }
  });
  admins.push(mainAdmin);

  for (let i = 1; i <= 3; i++) {
    const admin = await prisma.user.create({
      data: {
        name: `مدير النظام ${i}`,
        email: `admin${i}@nafham.com`,
        password: passwordHash,
        role: Role.ADMIN,
      }
    });
    admins.push(admin);
  }

  // 3. Create Instructors with Bios
  console.log('Seeding Instructors...');
  const instructors = [];
  for (let i = 1; i <= 15; i++) {
    const instructor = await prisma.user.create({
      data: {
        name: `م. ${getRandomName()}`,
        email: `instructor${i}@nafham.com`,
        password: passwordHash,
        role: Role.TEACHER,
        // @ts-ignore - bio exists in DB but IDE types are cached
        bio: INSTRUCTOR_BIOS[i % INSTRUCTOR_BIOS.length],
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent('مدرب')}&background=random`
      }
    });
    instructors.push(instructor);
  }

  // 4. Create Students
  console.log('Seeding Students...');
  const students = [];
  // Bulk create 100 students
  const studentsData = Array.from({ length: 100 }).map((_, idx) => ({
    name: getRandomName(),
    email: `student${idx + 1}@nafham.com`,
    password: passwordHash,
    role: Role.STUDENT,
  }));
  
  await prisma.user.createMany({ data: studentsData });
  const createdStudents = await prisma.user.findMany({ where: { role: Role.STUDENT } });

  // 5. Create Courses with Chapters and Lessons
  console.log('Seeding Courses and Content...');
  const allCourses = [];
  for (let i = 0; i < COURSES_DATA.length; i++) {
    const courseData = COURSES_DATA[i];
    const instructor = instructors[i % instructors.length];

    const course = await prisma.course.create({
      data: {
        title: courseData.title,
        description: courseData.description,
        price: courseData.price,
        level: courseData.level,
        category: courseData.category,
        image: courseData.image,
        duration: courseData.duration,
        isPublished: courseData.isPublished,
        // @ts-ignore
        objectives: courseData.objectives,
        // @ts-ignore
        requirements: courseData.requirements,
        instructorId: instructor.id,
        chapters: {
          create: courseData.chapters.map(ch => ({
            title: ch.title,
            order: ch.order,
            lessons: {
              create: ch.lessons.map(l => ({
                title: l.title,
                videoUrl: l.videoUrl,
                videoType: l.videoType,
                duration: l.duration,
                order: l.order,
                isFree: l.isFree
              }))
            }
          }))
        }
      }
    });
    allCourses.push(course);
  }

  // 6. Create Enrollments and Reviews
  console.log('Seeding Enrollments & Reviews...');
  for (const student of createdStudents) {
    // Each student enrolls in 1 or 2 random courses
    const numEnrollments = Math.floor(Math.random() * 2) + 1;
    const shuffledCourses = allCourses.sort(() => 0.5 - Math.random());
    const coursesToEnroll = shuffledCourses.slice(0, numEnrollments);

    for (const course of coursesToEnroll) {
      await prisma.enrollment.create({
        data: {
          userId: student.id,
          courseId: course.id,
          progress: Math.floor(Math.random() * 100) // Random progress
        }
      });

      // 50% chance to leave a review
      if (Math.random() > 0.5) {
        const ratings = [4, 5, 5, 4, 3, 5];
        const comments = ["كورس ممتاز جداً واستفدت منه الكثير", "شرح رائع من المهندس", "ممتاز جدا شكرا لك", "جيد ولكن يحتاج لتفاصيل أكثر", "أفضل كورس في هذا المجال", "رائع ومبسط"];
        await prisma.review.create({
          data: {
            rating: ratings[Math.floor(Math.random() * ratings.length)],
            comment: comments[Math.floor(Math.random() * comments.length)],
            userId: student.id,
            courseId: course.id,
          }
        });
      }
    }
  }

  // Update course stats
  for (const course of allCourses) {
    const reviews = await prisma.review.findMany({ where: { courseId: course.id } });
    const enrollmentsCount = await prisma.enrollment.count({ where: { courseId: course.id } });
    const avgRating = reviews.length > 0 ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length : 0;
    
    await prisma.course.update({
      where: { id: course.id },
      data: {
        rating: avgRating,
        students: enrollmentsCount
      }
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
