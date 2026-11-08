import { 
  Megaphone, Code2, PenTool, Camera, Video, Rocket, 
  ShieldCheck, BrainCircuit, LineChart, Edit3, Briefcase, Smartphone 
} from "lucide-react";
import { PathData } from "@/features/paths/components/PathCard";

export const MOCK_PATHS: PathData[] = [
  {
    id: "1",
    title: "التسويق الإلكتروني",
    coursesCount: 12,
    colorClass: "bg-fuchsia-500",
    badgeText: "مسار معتمد",
    icon: <Megaphone className="w-10 h-10 text-white" />
  },
  {
    id: "2",
    title: "تطوير البرمجيات",
    coursesCount: 18,
    colorClass: "bg-blue-500",
    badgeText: "الأكثر طلباً",
    icon: <Code2 className="w-10 h-10 text-white" />
  },
  {
    id: "3",
    title: "التصميم الجرافيكي",
    coursesCount: 15,
    colorClass: "bg-amber-400",
    badgeText: "مسار إبداعي",
    icon: <PenTool className="w-10 h-10 text-white" />
  },
  {
    id: "4",
    title: "التصوير الفوتوغرافي",
    coursesCount: 11,
    colorClass: "bg-teal-500",
    badgeText: "مهارات فنية",
    icon: <Camera className="w-10 h-10 text-white" />
  },
  {
    id: "5",
    title: "المونتاج والتحريك",
    coursesCount: 10,
    colorClass: "bg-orange-500",
    badgeText: "إنتاج محتوى",
    icon: <Video className="w-10 h-10 text-white" />
  },
  {
    id: "6",
    title: "ريادة الأعمال",
    coursesCount: 14,
    colorClass: "bg-blue-600",
    badgeText: "تطوير أعمال",
    icon: <Rocket className="w-10 h-10 text-white" />
  },
  {
    id: "7",
    title: "الأمن السيبراني",
    coursesCount: 11,
    colorClass: "bg-red-500",
    badgeText: "أمن وحماية",
    icon: <ShieldCheck className="w-10 h-10 text-white" />
  },
  {
    id: "8",
    title: "الذكاء الاصطناعي",
    coursesCount: 16,
    colorClass: "bg-indigo-600",
    badgeText: "تقنيات حديثة",
    icon: <BrainCircuit className="w-10 h-10 text-white" />
  },
  {
    id: "9",
    title: "علم البيانات",
    coursesCount: 20,
    colorClass: "bg-indigo-700",
    badgeText: "تحليل وتطوير",
    icon: <LineChart className="w-10 h-10 text-white" />
  },
  {
    id: "10",
    title: "كتابة المحتوى",
    coursesCount: 7,
    colorClass: "bg-amber-500",
    badgeText: "مهارات لغوية",
    icon: <Edit3 className="w-10 h-10 text-white" />
  },
  {
    id: "11",
    title: "إدارة المشاريع",
    coursesCount: 9,
    colorClass: "bg-slate-500",
    badgeText: "إدارية وتنظيم",
    icon: <Briefcase className="w-10 h-10 text-white" />
  },
  {
    id: "12",
    title: "تصميم تجربة المستخدم",
    coursesCount: 14,
    colorClass: "bg-teal-700",
    badgeText: "تصميم وابتكار",
    icon: <Smartphone className="w-10 h-10 text-white" />
  }
];
