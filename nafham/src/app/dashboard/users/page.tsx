import UsersView from "@/features/admin/users/components/UsersView";

export const metadata = {
  title: "إدارة المستخدمين | لوحة التحكم",
  description: "إدارة جميع المستخدمين والصلاحيات على منصة نفهم.",
};

export default function AdminUsersPage() {
  return <UsersView />;
}
