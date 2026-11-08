export type UserRole = "مدير" | "مدرب" | "طالب";
export type UserStatus = "نشط" | "محظور" | "معلق";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: UserRole;
  status: UserStatus;
  joinDate: string;
  avatarColor: string;
}
