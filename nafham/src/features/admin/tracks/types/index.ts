export type TrackStatus = "منشور" | "مسودة";

export interface LearningTrack {
  id: string;
  title: string;
  description: string;
  category: string;
  status: TrackStatus;
  coursesCount: number;
  studentsCount: number;
  revenue: string;
  colorHex: string; // Used for the gradient or accent color
}
