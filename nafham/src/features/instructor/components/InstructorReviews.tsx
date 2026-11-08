import { Star, MessageSquare } from 'lucide-react';
import { MOCK_INSTRUCTOR_PROFILE } from '../data/mockInstructor';

interface InstructorReviewsProps {
  reviews: typeof MOCK_INSTRUCTOR_PROFILE.reviews;
}

export default function InstructorReviews({ reviews }: InstructorReviewsProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-20">
      <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
        <MessageSquare className="w-6 h-6 text-[#118B50]" />
        آراء وتقييمات الطلاب
      </h3>

      <div className="flex flex-col gap-6">
        {reviews.map(review => (
          <div key={review.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#118B50]/10 text-[#118B50] flex items-center justify-center font-bold">
                  {review.studentName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{review.studentName}</h4>
                  <span className="text-xs text-slate-400">{review.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-200 fill-slate-200'}`} 
                  />
                ))}
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-50">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
