"use client";

import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function CourseWriteReview() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("الرجاء اختيار التقييم أولاً");
      return;
    }
    if (!comment.trim()) {
      toast.error("الرجاء كتابة تعليقك");
      return;
    }
    
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("تم إرسال تقييمك بنجاح! شكراً لك.");
      setRating(0);
      setComment("");
    }, 1000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <h3 className="text-xl font-extrabold text-slate-800 mb-6">أضف تقييمك للكورس</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Rating Selection */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">ما هو تقييمك العام؟</label>
          <div className="flex items-center gap-2" dir="ltr" style={{ display: 'inline-flex' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star 
                  className={`w-8 h-8 ${
                    star <= (hoverRating || rating) 
                      ? 'text-yellow-500 fill-yellow-500' 
                      : 'text-slate-200'
                  } transition-colors duration-200`} 
                />
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2 text-right">
            {rating > 0 ? `لقد قمت بتقييم الكورس ${rating} من 5 نجوم` : 'انقر على النجوم للتقييم'}
          </p>
        </div>

        {/* Comment Textarea */}
        <div>
          <label htmlFor="comment" className="block text-sm font-bold text-slate-700 mb-2">تعليقك (اختياري)</label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="شاركنا رأيك في هذا الكورس وما الذي استفدته منه..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#118B50] hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-sm shadow-[#118B50]/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>إرسال التقييم</span>
                <Send className="w-4 h-4 rotate-180" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
