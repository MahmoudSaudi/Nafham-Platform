import DiscussionsView from "@/features/admin/discussions/components/DiscussionsView";

export const metadata = {
  title: "النقاشات والأسئلة | لوحة التحكم",
  description: "متابعة أسئلة الطلاب داخل الكورسات والرد عليها.",
};

export default function DiscussionsPage() {
  return <DiscussionsView />;
}
