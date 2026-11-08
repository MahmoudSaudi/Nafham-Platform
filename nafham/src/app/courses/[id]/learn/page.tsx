import CourseLearnLayout from "@/features/learn/components/CourseLearnLayout";

interface PageProps {
  params: Promise<any>;
}

export default async function CourseLearnPage({ params }: PageProps) {
  const resolvedParams = await params;
  const courseId = typeof resolvedParams.id === 'string' ? resolvedParams.id : Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : '';
  return <CourseLearnLayout courseId={courseId} />;
}
