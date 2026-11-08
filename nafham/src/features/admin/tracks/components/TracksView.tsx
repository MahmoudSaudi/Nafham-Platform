"use client";

import { useTracks } from "../hooks/useTracks";
import TracksHeader from "./TracksHeader";
import TracksGrid from "./TracksGrid";
import Pagination from "@/components/ui/Pagination";
import { useMemo, useState } from "react";
import TrackModal from "./modals/TrackModal";
import DeleteTrackModal from "./modals/DeleteTrackModal";
import { LearningTrack } from "../types";

export default function TracksView() {
  const {
    tracks,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
  } = useTracks();

  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<LearningTrack | null>(null);
  const [deletingTrack, setDeletingTrack] = useState<LearningTrack | undefined>();

  // Basic client-side filtering logic
  const filteredTracks = useMemo(() => {
    return tracks.filter(track => {
      const matchesSearch = track.title.includes(searchQuery) || track.description.includes(searchQuery);
      const matchesCategory = categoryFilter === "تصفية حسب الفئة" || track.category === categoryFilter;
      const matchesStatus = statusFilter === "تصفية حسب الحالة" || track.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [tracks, searchQuery, categoryFilter, statusFilter]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <TracksHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onCreateTrack={() => {
          setEditingTrack(null);
          setIsTrackModalOpen(true);
        }}
      />

      <TracksGrid 
        tracks={filteredTracks} 
        onEdit={(track) => {
          setEditingTrack(track);
          setIsTrackModalOpen(true);
        }}
        onDelete={(track) => setDeletingTrack(track)}
      />

      {filteredTracks.length > 0 && (
        <Pagination 
          currentPage={1}
          totalPages={1}
          totalItems={filteredTracks.length}
          itemsPerPage={10}
          itemName="مسار"
        />
      )}

      {/* Modals */}
      <TrackModal 
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        track={editingTrack}
      />

      <DeleteTrackModal 
        isOpen={!!deletingTrack}
        onClose={() => setDeletingTrack(undefined)}
        track={deletingTrack}
      />

    </div>
  );
}
