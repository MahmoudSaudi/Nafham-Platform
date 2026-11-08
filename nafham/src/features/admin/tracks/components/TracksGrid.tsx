import { LearningTrack } from "../types";
import TrackCard from "./TrackCard";

interface Props {
  tracks: LearningTrack[];
  onEdit?: (track: LearningTrack) => void;
  onDelete?: (track: LearningTrack) => void;
}

export default function TracksGrid({ tracks, onEdit, onDelete }: Props) {
  if (tracks.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-2">لا توجد مسارات مطابقة</h3>
        <p className="text-sm font-medium text-slate-500">
          لم يتم العثور على أي مسارات تطابق معايير البحث أو التصفية الحالية.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {tracks.map((track) => (
        <TrackCard 
          key={track.id} 
          track={track} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
