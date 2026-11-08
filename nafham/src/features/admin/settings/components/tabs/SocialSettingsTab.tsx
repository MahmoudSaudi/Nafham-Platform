import React from "react";
import { Link as LinkIcon } from "lucide-react";
import { SettingsTabProps } from "./types";

export function SocialSettingsTab({ formData, handleChange }: SettingsTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <LinkIcon className="w-6 h-6 text-emerald-600" />
        التواصل الاجتماعي
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">رابط فيسبوك</label>
          <input 
            type="url" 
            name="SOCIAL_FACEBOOK"
            value={formData.SOCIAL_FACEBOOK as string || ""} 
            onChange={handleChange}
            placeholder="https://facebook.com/nafham"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-left dir-ltr"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">رابط تويتر (X)</label>
          <input 
            type="url" 
            name="SOCIAL_TWITTER"
            value={formData.SOCIAL_TWITTER as string || ""} 
            onChange={handleChange}
            placeholder="https://twitter.com/nafham"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-left dir-ltr"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">رابط انستجرام</label>
          <input 
            type="url" 
            name="SOCIAL_INSTAGRAM"
            value={formData.SOCIAL_INSTAGRAM as string || ""} 
            onChange={handleChange}
            placeholder="https://instagram.com/nafham"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-left dir-ltr"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">رابط يوتيوب</label>
          <input 
            type="url" 
            name="SOCIAL_YOUTUBE"
            value={formData.SOCIAL_YOUTUBE as string || ""} 
            onChange={handleChange}
            placeholder="https://youtube.com/c/nafham"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-left dir-ltr"
          />
        </div>
      </div>
    </div>
  );
}
