import TracksView from "@/features/admin/tracks/components/TracksView";

export const metadata = {
  title: "المسارات التعليمية | لوحة التحكم",
  description: "إدارة المسارات التعليمية، الكورسات، والإيرادات.",
};

export default function AdminTracksPage() {
  return <TracksView />;
}
