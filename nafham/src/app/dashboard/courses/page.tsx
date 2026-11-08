import CoursesView from "@/features/admin/courses/components/CoursesView";

export const metadata = {
  title: "إدارة الدورات | لوحة التحكم",
  description: "إدارة جميع الدورات التدريبية على منصة نفهم.",
};

export default function AdminCoursesPage() {
  return <CoursesView />;
}
