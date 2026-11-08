import CurriculumManager from "@/features/admin/courses/components/CurriculumManager";

export default async function CourseCurriculumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">إدارة المحتوى (المنهج)</h2>
          <p className="text-slate-500 mt-1">قم بإضافة الأقسام والدروس وترتيبها بشكل منطقي</p>
        </div>
      </div>
      
      <CurriculumManager courseId={id} />
    </div>
  );
}
