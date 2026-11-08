"use client";

import { useEffect, useState } from "react";
import PathCard, { PathData } from "@/features/paths/components/PathCard";
import { getPaths } from "@/services/paths/pathsApi";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function PathsView() {
  const [paths, setPaths] = useState<PathData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const data = await getPaths();
        setPaths(data);
      } catch (error) {
        console.error("Error fetching paths:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPaths();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/30 py-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-[#0f172a] mb-4">مسارات التعلم الاحترافية</h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            اختر مسارك التعليمي المفضل وابدأ رحلة احترافية مصممة خصيصاً لتصل بك إلى أهدافك المهنية.
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : paths.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
            {paths.map(path => (
              <Link href={`/paths/${path.id}`} key={path.id}>
                <PathCard path={path} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-2">لا توجد مسارات تعليمية حتى الآن</h3>
            <p className="text-gray-500">سيتم إضافة مسارات تعليمية قريباً.</p>
          </div>
        )}
      </div>
    </div>
  );
}

