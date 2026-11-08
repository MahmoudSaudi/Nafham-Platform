export interface ReportCoursePerformance {
  id: string;
  title: string;
  instructor: string;
  image: string;
  studentsCount: number;
  completionRate: number;
  rating: number;
  revenue: string;
}

export interface RegistrationSource {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export interface GrowthData {
  month: string;
  users: number;
  revenue: number;
}
