"use client";

import { useState, useEffect } from "react";
import { getCourseById, createChapter, deleteChapter, updateChapter, createLesson, deleteLesson, updateLesson, uploadFile } from "@/services/courses/coursesApi";
import CustomSelect from "@/components/ui/CustomSelect";
import { Plus, Trash2, Edit, ChevronDown, ChevronUp, GripVertical, PlayCircle, Loader2, Video, PlaySquare, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function CurriculumManager({ courseId }: { courseId: string }) {
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [chapterForm, setChapterForm] = useState({ id: "", title: "", order: 1 });
  
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [lessonForm, setLessonForm] = useState({ id: "", chapterId: "", title: "", videoUrl: "", videoType: "UPLOAD", duration: "", order: 1, isFree: false });

  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});

  const fetchCourse = async () => {
    setIsLoading(true);
    try {
      const data = await getCourseById(courseId);
      setCourse(data);
      // Auto expand all chapters
      if (data.chapters) {
        const expanded: Record<string, boolean> = {};
        data.chapters.forEach((c: any) => expanded[c.id] = true);
        setExpandedChapters(expanded);
      }
    } catch (error) {
      toast.error("فشل في تحميل بيانات المنهج");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const toggleChapter = (id: string) => {
    setExpandedChapters(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveChapter = async () => {
    if (!chapterForm.title) {
      toast.error("يرجى إدخال اسم القسم");
      return;
    }
    const toastId = toast.loading("جاري الحفظ...");
    try {
      if (chapterForm.id) {
        await updateChapter(chapterForm.id, chapterForm);
      } else {
        await createChapter(courseId, chapterForm);
      }
      toast.success("تم الحفظ بنجاح!", { id: toastId });
      setIsChapterModalOpen(false);
      fetchCourse();
    } catch (error) {
      toast.error("حدث خطأ أثناء الحفظ", { id: toastId });
    }
  };

  const handleSaveLesson = async () => {
    if (!lessonForm.title || !lessonForm.chapterId) {
      toast.error("يرجى إكمال البيانات المطلوبة");
      return;
    }
    const toastId = toast.loading("جاري الحفظ...");
    try {
      if (lessonForm.id) {
        await updateLesson(lessonForm.id, lessonForm);
      } else {
        await createLesson(lessonForm.chapterId, lessonForm);
      }
      toast.success("تم الحفظ بنجاح!", { id: toastId });
      setIsLessonModalOpen(false);
      fetchCourse();
    } catch (error) {
      toast.error("حدث خطأ أثناء الحفظ", { id: toastId });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center py-20"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h3 className="text-lg font-bold text-slate-800">الأقسام والدروس</h3>
        <button 
          onClick={() => {
            setChapterForm({ id: "", title: "", order: (course?.chapters?.length || 0) + 1 });
            setIsChapterModalOpen(true);
          }}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> إضافة قسم جديد
        </button>
      </div>

      <div className="space-y-4">
        {course?.chapters?.length === 0 ? (
          <div className="text-center py-10 text-slate-400 font-medium">لا توجد أقسام بعد. أضف قسمك الأول!</div>
        ) : (
          course?.chapters?.map((chapter: any, index: number) => (
            <div key={chapter.id} className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
              <div className="flex items-center justify-between p-4 bg-gray-100/50">
                <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => toggleChapter(chapter.id)}>
                  {expandedChapters[chapter.id] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  <h4 className="font-bold text-slate-800">القسم {index + 1}: {chapter.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setLessonForm({ id: "", chapterId: chapter.id, title: "", videoUrl: "", videoType: "UPLOAD", duration: "", order: (chapter.lessons?.length || 0) + 1, isFree: false });
                      setIsLessonModalOpen(true);
                    }}
                    className="flex items-center gap-1 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> إضافة درس
                  </button>
                  <button onClick={() => { setChapterForm(chapter); setIsChapterModalOpen(true); }} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-gray-200 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      toast("هل أنت متأكد من حذف القسم؟ سيتم حذف كافة الدروس بداخله!", {
                        action: {
                          label: "حذف",
                          onClick: async () => {
                            await deleteChapter(chapter.id);
                            toast.success("تم الحذف");
                            fetchCourse();
                          }
                        },
                        cancel: {
                          label: "إلغاء",
                          onClick: () => {}
                        }
                      });
                    }}
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {expandedChapters[chapter.id] && (
                <div className="p-4 space-y-2 bg-white">
                  {chapter.lessons?.length === 0 ? (
                    <div className="text-center py-4 text-sm text-slate-400 font-medium bg-gray-50 rounded-lg border border-dashed border-gray-200">هذا القسم فارغ</div>
                  ) : (
                    chapter.lessons?.map((lesson: any, lIndex: number) => (
                      <div key={lesson.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-emerald-200 hover:shadow-sm transition-all group bg-white">
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-4 h-4 text-gray-300 cursor-grab" />
                          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">{lIndex + 1}</div>
                          <div>
                            <div className="font-bold text-slate-700 text-sm">{lesson.title}</div>
                            <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-medium">
                              <span className="flex items-center gap-1"><PlayCircle className="w-3 h-3" /> {lesson.duration || "غير محدد"}</span>
                              {lesson.isFree && <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[10px]">متاح مجاناً</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setLessonForm({...lesson, chapterId: chapter.id, videoType: lesson.videoType || "UPLOAD"}); setIsLessonModalOpen(true); }} className="p-1.5 text-slate-400 hover:text-slate-600 bg-gray-50 rounded-lg">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={async () => {
                              toast("هل أنت متأكد من حذف الدرس؟", {
                                action: {
                                  label: "حذف",
                                  onClick: async () => {
                                    await deleteLesson(lesson.id);
                                    toast.success("تم الحذف");
                                    fetchCourse();
                                  }
                                },
                                cancel: {
                                  label: "إلغاء",
                                  onClick: () => {}
                                }
                              });
                            }} 
                            className="p-1.5 text-red-400 hover:text-red-600 bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Chapter Modal */}
      {isChapterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-xl p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">{chapterForm.id ? "تعديل القسم" : "إضافة قسم جديد"}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">عنوان القسم</label>
                <input value={chapterForm.title} onChange={e => setChapterForm({...chapterForm, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="مثال: الأساسيات" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">الترتيب</label>
                <input type="number" value={chapterForm.order} onChange={e => setChapterForm({...chapterForm, order: parseInt(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsChapterModalOpen(false)} className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold rounded-xl transition-colors text-sm">إلغاء</button>
              <button onClick={handleSaveChapter} className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors text-sm">حفظ</button>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Modal */}
      {isLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-xl p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">{lessonForm.id ? "تعديل الدرس" : "إضافة درس جديد"}</h3>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">عنوان الدرس</label>
                <input value={lessonForm.title} onChange={e => setLessonForm({...lessonForm, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="مثال: مقدمة في لغة HTML" />
              </div>
              <div className="mb-4">
                <CustomSelect
                  label="نوع مصدر الفيديو"
                  value={lessonForm.videoType}
                  onChange={(val) => setLessonForm({...lessonForm, videoType: val, videoUrl: ""})}
                  options={[
                    { value: "UPLOAD", label: "رفع فيديو مباشر", icon: <Video className="w-4 h-4" /> },
                    { value: "YOUTUBE", label: "رابط يوتيوب (YouTube)", icon: <PlaySquare className="w-4 h-4" /> },
                    { value: "VIMEO", label: "رابط فيميو (Vimeo)", icon: <Video className="w-4 h-4" /> },
                    { value: "EXTERNAL", label: "رابط خارجي (External URL)", icon: <ExternalLink className="w-4 h-4" /> },
                  ]}
                  className="mb-3"
                />

                {lessonForm.videoType === "UPLOAD" ? (
                  <input 
                    type="file" 
                    accept="video/*"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        try {
                          const toastId = toast.loading("جاري رفع الفيديو (قد يستغرق بعض الوقت)...");
                          const file = e.target.files[0];
                          const url = await uploadFile(file);
                          setLessonForm({ ...lessonForm, videoUrl: url });
                          toast.success("تم رفع الفيديو بنجاح!", { id: toastId });
                        } catch (error) {
                          toast.error("فشل في رفع الفيديو");
                        }
                      }
                    }}
                    className="w-full bg-white border border-gray-200 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
                  />
                ) : (
                  <input 
                    type="text" 
                    value={lessonForm.videoUrl}
                    onChange={e => setLessonForm({...lessonForm, videoUrl: e.target.value})}
                    placeholder={
                      lessonForm.videoType === "YOUTUBE" ? "https://youtube.com/watch?v=..." :
                      lessonForm.videoType === "VIMEO" ? "https://vimeo.com/..." : "https://..."
                    }
                    className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-left" dir="ltr"
                  />
                )}
                
                {lessonForm.videoUrl && (
                  <div className="mt-2 text-sm text-emerald-600 font-bold flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" />
                    {lessonForm.videoType === "UPLOAD" ? "تم رفع وتحديد الفيديو بنجاح" : "تمت إضافة الرابط بنجاح"}
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">مدة الدرس (مثال: 05:30)</label>
                <input value={lessonForm.duration} onChange={e => setLessonForm({...lessonForm, duration: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-left" dir="ltr" placeholder="10:00" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">الترتيب</label>
                <input type="number" value={lessonForm.order} onChange={e => setLessonForm({...lessonForm, order: parseInt(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                <input type="checkbox" id="isFree" checked={lessonForm.isFree} onChange={e => setLessonForm({...lessonForm, isFree: e.target.checked})} className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                <label htmlFor="isFree" className="text-sm font-bold text-emerald-800 cursor-pointer">إتاحة هذا الدرس مجاناً (للمعاينة)</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsLessonModalOpen(false)} className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold rounded-xl transition-colors text-sm">إلغاء</button>
              <button onClick={handleSaveLesson} className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors text-sm">حفظ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
