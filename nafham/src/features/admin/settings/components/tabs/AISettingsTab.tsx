import React, { useState } from "react";
import { Bot, Shield, Key, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { SettingsTabProps } from "./types";
import { apiClient } from "@/services/apiClient";

export function AISettingsTab({ formData, handleChange, handleToggle, role }: SettingsTabProps) {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{success: boolean; message: string} | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    setTestResult(null);
    try {
      const response = await apiClient.post('/chatbot/test-connection', {
        apiKey: formData.OPENAI_API_KEY
      });
      // Need to cast to any since apiClient interceptor changes response type
      setTestResult({ success: true, message: (response as any).message });
      
      // Auto-save the key on successful test to prevent loss on refresh
      if (formData.OPENAI_API_KEY && formData.OPENAI_API_KEY !== '********') {
        await apiClient.put('/settings', {
          settings: [{
            key: 'OPENAI_API_KEY',
            value: String(formData.OPENAI_API_KEY),
            category: 'AI_API_KEYS',
            isPublic: false
          }]
        });
      }

    } catch (error: any) {
      setTestResult({ 
        success: false, 
        message: error.message || 'فشل الاتصال بمزود الخدمة' 
      });
    } finally {
      setIsTestingConnection(false);
      setTimeout(() => setTestResult(null), 5000); // clear after 5s
    }
  };

  if (role !== "SUPER_ADMIN" && role !== "ADMIN") {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Bot className="w-6 h-6 text-emerald-600" />
          الذكاء الاصطناعي والدعم الفني
        </h2>
        <div className="bg-red-50 text-red-800 p-4 rounded-xl text-sm border border-red-200">
          <Shield className="w-5 h-5 inline-block mr-2" />
          عذراً، ليس لديك صلاحية لعرض هذا القسم.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Bot className="w-6 h-6 text-emerald-600" />
        الذكاء الاصطناعي والدعم الفني
      </h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
            <Key className="w-4 h-4" />
            مفاتيح الـ API (API Keys)
          </h3>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">OpenAI API Key أو OpenRouter API Key</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input 
                  type={showApiKey ? "text" : "password"} 
                  name="OPENAI_API_KEY"
                  value={formData.OPENAI_API_KEY as string || ""}
                  onChange={handleChange}
                  className="w-full p-3 pr-10 bg-slate-50 border border-slate-200 rounded-xl flex-1 text-left"
                  placeholder="sk-..."
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTestingConnection || !formData.OPENAI_API_KEY}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 disabled:opacity-50 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                {isTestingConnection ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                فحص الاتصال
              </button>
            </div>
            <p className="text-xs text-slate-500">يتعرف النظام تلقائياً على المزود: مفاتيح (sk-...) تعني OpenAI، ومفاتيح (sk-or-...) تعني OpenRouter.</p>
            
            {testResult && (
              <div dir="auto" className={`p-3 rounded-xl text-sm font-semibold flex items-start gap-2 mt-2 break-words ${testResult.success ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{testResult.message}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 border-b pb-2">إعدادات الشات بوت (Chatbot)</h3>
          <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <div className="font-semibold text-slate-900">تفعيل الشات بوت للزوار</div>
              <div className="text-sm text-slate-500 mt-1">عرض أيقونة الدعم الفني الذكي في جميع صفحات الموقع للزوار والطلاب.</div>
            </div>
            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.CHATBOT_ENABLED ? 'bg-emerald-600' : 'bg-slate-200'}`}>
              <input type="checkbox" className="sr-only" checked={!!formData.CHATBOT_ENABLED} onChange={() => handleToggle('CHATBOT_ENABLED')} />
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.CHATBOT_ENABLED ? '-translate-x-6' : '-translate-x-1'}`} />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
