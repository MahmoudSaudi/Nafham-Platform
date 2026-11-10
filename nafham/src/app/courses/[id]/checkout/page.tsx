import CheckoutFormView from "@/features/courses/components/CheckoutFormView";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<any>;
}

export default async function CheckoutPage({ params }: PageProps) {
  const resolvedParams = await params;
  const courseId = typeof resolvedParams.id === 'string' ? resolvedParams.id : Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : '';
  
  let initialCourse = null;

  try {
    const baseUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    
    // Fetch course details
    const courseRes = await fetch(`${baseUrl}/courses/${courseId}`, {
      next: { revalidate: 30 },
      cache: "no-store"
    });
    
    if (!courseRes.ok) {
      if (courseRes.status === 404) return notFound();
      throw new Error(`Failed to fetch course: ${courseRes.statusText}`);
    }

    const courseData = await courseRes.json();
    if (courseData.success) {
      initialCourse = courseData.data;
    } else {
      return notFound();
    }
  } catch (error) {
    console.error("Failed to fetch course details on server for checkout", error);
    return notFound();
  }

  return <CheckoutFormView initialCourse={initialCourse} />;
}
