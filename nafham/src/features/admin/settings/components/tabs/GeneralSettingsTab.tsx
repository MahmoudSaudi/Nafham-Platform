import React, { useRef, useState } from "react";
import { Globe, UploadCloud } from "lucide-react";
import { apiClient } from "@/services/apiClient";
import { SettingsTabProps } from "./types";

export function GeneralSettingsTab({ formData, handleChange, handleToggle, setFormData }: SettingsTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formDataObj = new FormData();
      formDataObj.append('file', file);

      const { data } = await apiClient.post('/upload', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (data.success) {
        setFormData(prev => ({ ...prev, PLATFORM_LOGO: data.url }));
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Globe className="w-6 h-6 text-emerald-600" />
        البيانات الأساسية
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-slate-700">شعار المنصة (Logo)</label>
          <div className="flex items-center gap-4">
            {formData.PLATFORM_LOGO ? (
              <div className="w-20 h-20 rounded-xl border border-slate-200 overflow-hidden bg-white flex items-center justify-center shrink-0">
                <img src={formData.PLATFORM_LOGO as string} alt="Logo" className="max-w-full max-h-full object-contain" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center shrink-0">
                <Globe className="w-8 h-8 text-slate-300" />
              </div>
            )}
            <div className="flex-1">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleLogoUpload} 
                accept="image/*" 
                className="hidden" 
              />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                <UploadCloud className="w-4 h-4" />
                {isUploading ? "جاري الرفع..." : "تغيير الشعار"}
              </button>
              <p className="text-xs text-slate-500 mt-2">يفضل أن يكون الشعار بصيغة PNG أو SVG بخلفية شفافة.</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-slate-700">اسم المنصة</label>
          <input 
            type="text" 
            name="SITE_NAME"
            value={formData.SITE_NAME as string || ""} 
            onChange={handleChange}
            placeholder="نفهم"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-slate-700">وصف المنصة (لتحسين محركات البحث SEO)</label>
          <textarea 
            name="SITE_DESCRIPTION"
            value={formData.SITE_DESCRIPTION as string || ""} 
            onChange={handleChange}
            rows={3}
            placeholder="أفضل منصة للتعليم الإلكتروني..."
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none"
          />
        </div>

        <div className="md:col-span-2 pt-4 border-t border-slate-100">
          <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
            <div>
              <div className="font-semibold text-slate-900">وضع الصيانة</div>
              <div className="text-sm text-slate-500 mt-1">إيقاف الموقع مؤقتاً وعرض رسالة الصيانة للزوار</div>
            </div>
            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.MAINTENANCE_MODE ? 'bg-emerald-600' : 'bg-slate-200'}`}>
              <input type="checkbox" className="sr-only" checked={!!formData.MAINTENANCE_MODE} onChange={() => handleToggle('MAINTENANCE_MODE')} />
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.MAINTENANCE_MODE ? '-translate-x-6' : '-translate-x-1'}`} />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
