import { Check } from 'lucide-react';

interface CourseLearningObjectivesProps {
  objectives: string[];
}

export default function CourseLearningObjectives({ objectives }: CourseLearningObjectivesProps) {
  if (!objectives || objectives.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <h2 className="text-2xl font-extrabold text-slate-800 mb-6">ماذا ستتعلم في هذا الكورس؟</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {objectives.map((objective, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="w-4 h-4 text-[#118B50]" strokeWidth={3} />
            </div>
            <span className="text-slate-800 font-medium leading-relaxed">{objective}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
