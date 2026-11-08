export type ContractStatus = "نشط" | "قيد المراجعة" | "معلق";

export interface Instructor {
  id: string;
  name: string;
  email: string;
  avatar: string;
  track: string;
  trackColor: string;
  publishedCourses: number;
  rating: number;
  earnings: number;
  pendingPayout: number;
  contractStatus: ContractStatus;
}
