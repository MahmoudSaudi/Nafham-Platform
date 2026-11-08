import { useState, useEffect } from "react";
import { getCourseById, getCourses } from "@/services/courses/coursesApi";

export const useCourseDetails = (courseId: string) => {
  const [course, setCourse] = useState<any>(null);
  const [relatedCourses, setRelatedCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        // Fetch the main course details
        const fetchedCourse = await getCourseById(courseId);
        setCourse(fetchedCourse);

        // Fetch related courses (for now just grab a few active ones)
        // You can optimize this backend side to return related courses based on category
        const allCourses = await getCourses();
        // Filter out the current course and take top 3
        const related = allCourses.filter((c: any) => c.id !== courseId).slice(0, 3);
        setRelatedCourses(related);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
        setCourse(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  return {
    course,
    relatedCourses,
    isLoading
  };
};
