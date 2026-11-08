export interface Reply {
  id: string;
  authorName: string;
  authorRole: "مدرب" | "طالب" | "مسؤول" | string;
  content: string;
  date: string;
  avatar: string;
}

export interface Discussion {
  id: string;
  studentName: string;
  studentAvatar: string;
  courseName: string;
  lessonName: string;
  content: string;
  date: string;
  replies: Reply[];
}
