export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  level: string;
  duration?: string;
  price?: number;
  isPublished: boolean;
  instructorId: string;
  instructor?: Partial<User>;
  createdAt: string;
  updatedAt: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  image?: string;
  level: string;
  courses?: PathCourse[];
  createdAt: string;
  updatedAt: string;
}

export interface PathCourse {
  id: string;
  pathId: string;
  courseId: string;
  order: number;
  course?: Course;
  createdAt: string;
  updatedAt: string;
}
