import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";

export default function AppDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
