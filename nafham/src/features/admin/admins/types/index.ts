export type AdminRole = "مدير عام" | "محرر محتوى" | "دعم فني";
export type AdminStatus = "نشط" | "مقيد";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  joinDate: string;
  avatar: string;
  lastActive: string;
}
