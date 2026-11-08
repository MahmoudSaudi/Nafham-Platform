import { Star } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt?: string;
  user?: {
    name: string;
    avatarUrl?: string;
  };
  // Fallbacks for mock data
  userName?: string;
  date?: string;
}

interface CourseReviewsSummaryProps {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  topReviews: Review[];
}

export default function CourseReviewsSummary({ averageRating, totalReviews, ratingDistribution, topReviews }: CourseReviewsSummaryProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 md:w-5 md:h-5 ${i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} 
      />
    ));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <h2 className="text-2xl font-extrabold text-slate-800 mb-8">تقييمات الطلاب</h2>
      
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Rating Average */}
        <div className="flex flex-col items-center justify-center min-w-[150px]">
          <div className="text-6xl font-black text-[#118B50] mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex gap-1 mb-2">
            {renderStars(averageRating)}
          </div>
          <p className="text-slate-500 font-bold text-sm">تقييم الكورس</p>
        </div>

        {/* Rating Bars */}
        <div className="flex-1 flex flex-col justify-center gap-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingDistribution[stars as keyof typeof ratingDistribution];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-3">
                <div className="relative flex items-center gap-1 w-20">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <div className="absolute inset-0 bg-white/80" style={{ width: `${(5 - stars) * 20}%`, left: 0, right: 'auto' }}></div>
                </div>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#118B50] rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
                <div className="w-12 text-sm text-slate-500 text-left">{percentage.toFixed(0)}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topReviews.map(review => (
          <div key={review.id} className="border border-slate-100 bg-slate-50 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#118B50] flex items-center justify-center font-bold">
                  {(review.user?.name || review.userName || "م").charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{review.user?.name || review.userName || "مجهول"}</h4>
                  <div className="text-xs text-slate-400">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString('ar-EG') : review.date}
                  </div>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-200'}`} />
                ))}
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              "{review.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
