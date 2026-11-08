export type CourseStatus = "منشورة" | "مسودة";

export interface AdminCourse {
  id: string;
  title: string;
  lessonsCount: number;
  image: string;
  instructorName: string;
  instructorAvatar: string;
  category: string;
  categoryColor: string;
  price: string;
  status: CourseStatus;
  rawDuration?: string;
  rawLevel?: string;
  rawDescription?: string;
}
