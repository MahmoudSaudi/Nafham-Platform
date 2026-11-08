import HeroSection from "@/components/shared/home/HeroSection";
import StatsSection from "@/components/shared/home/StatsSection";
import PartnersSection from "@/components/shared/home/PartnersSection";
import CoursesListSection from "@/components/shared/home/CoursesListSection";

export default async function Home() {
  let initialCourses = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/courses`, { 
      cache: "no-store" // Prevent caching old course IDs from previous seeds during development
    });
    const data = await res.json();
    if (data.success) {
      initialCourses = data.data;
    }
  } catch (error) {
    console.error("Failed to fetch initial courses for home page", error);
  }

  return (
    <>
      <HeroSection />
      <StatsSection />
      <PartnersSection />
      <CoursesListSection initialCourses={initialCourses} />
    </>
  );
}
