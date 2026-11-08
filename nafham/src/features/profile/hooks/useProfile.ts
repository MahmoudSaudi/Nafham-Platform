import { useState, useEffect } from "react";
import { User } from "@/features/user/types";

export interface UserStats {
  completedCourses: number;
  totalHours: number;
  certificates: number;
  points: number;
}

export function useProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock fetching data
    setTimeout(() => {
      setUser({
        id: "1",
        name: "أحمد خالد",
        email: "ahmed@example.com",
        role: "STUDENT",
        avatar: "https://ui-avatars.com/api/?name=%D8%A3%D8%AD%D9%85%D8%AF%20%D8%AE%D8%A7%D9%84%D8%AF&background=047857&color=fff",
      });
      setStats({
        completedCourses: 4,
        totalHours: 32,
        certificates: 4,
        points: 1250,
      });
      setIsLoading(false);
    }, 600);
  }, []);

  return { user, stats, isLoading };
}
