"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, Trash2, HeadphonesIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { apiClient } from "@/services/apiClient";
import { toast } from "sonner";
import { io, Socket } from "socket.io-client";

export default function ChatbotWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Support Mode States
  const [mode, setMode] = useState<'AI' | 'SUPPORT'>('AI');
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("nafham_chat_history");
    const savedMode = localStorage.getItem("nafham_chat_mode");
    const savedTicketId = localStorage.getItem("nafham_chat_ticket_id");

    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        setMessages([]);
      }
    }
    if (savedMode === 'SUPPORT' && savedTicketId) {
      setMode('SUPPORT');
      setTicketId(savedTicketId);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("nafham_chat_history", JSON.stringify(messages));
      localStorage.setItem("nafham_chat_mode", mode);
      if (ticketId) localStorage.setItem("nafham_chat_ticket_id", ticketId);
    }
  }, [messages, mode, ticketId, isInitialized]);

  // Handle Socket Connection if in SUPPORT mode
  useEffect(() => {
    if (mode === 'SUPPORT' && ticketId && !socket) {
      const newSocket = io(process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000', {
        withCredentials: true,
      });

      newSocket.on('connect', () => {
        setIsConnected(true);
        newSocket.emit('join-ticket', ticketId);
      });

      newSocket.on('receive-message', (data: any) => {
        // Only append if it's from admin
        if (data.isFromAdmin) {
          setMessages(prev => [...prev, { id: data.id, type: "admin", text: data.content }]);
        }
      });

      newSocket.on('disconnect', () => {
        setIsConnected(false);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [mode, ticketId]);

  // Generate initial AI greeting if chat is opened and empty
  useEffect(() => {
    if (isOpen && isInitialized && messages.length === 0 && !isLoading && mode === 'AI') {
      generateGreeting();
    }
  }, [isOpen, isInitialized, messages.length]);

  const generateGreeting = async () => {
    setIsLoading(true);
    try {
      const response: any = await apiClient.post('/chatbot/message', { 
        messages: [{ role: "user", content: "مرحباً، أرجو أن تلقي التحية عليّ باختصار وبطريقة ودودة للترحيب بي في منصة نفهم للتعليم." }] 
      });
      setMessages([{ id: Date.now(), type: "bot", text: response?.data?.text || "مرحباً بك في نفهم! كيف يمكنني مساعدتك اليوم؟" }]);
    } catch (error) {
      setMessages([{ id: Date.now(), type: "bot", text: "مرحباً بك في نفهم! كيف يمكنني مساعدتك اليوم؟" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    toast('هل أنت متأكد من مسح سجل المحادثة؟', {
      action: {
        label: 'تأكيد',
        onClick: () => {
          setMessages([]);
          setMode('AI');
          setTicketId(null);
          localStorage.removeItem("nafham_chat_history");
          localStorage.removeItem("nafham_chat_mode");
          localStorage.removeItem("nafham_chat_ticket_id");
          if (socket) socket.disconnect();
          setSocket(null);
          toast.success('تم مسح المحادثة بنجاح والعودة للذكاء الاصطناعي');
        }
      },
      cancel: {
        label: 'إلغاء',
        onClick: () => {}
      }
    });
  };

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userText = message;
    const userMsg = { id: Date.now(), type: "user", text: userText };
    setMessages(prev => [...prev, userMsg]);
    setMessage("");
    
    if (mode === 'SUPPORT' && socket && isConnected) {
      // Send via WebSocket
      socket.emit('send-message', {
        ticketId,
        content: userText,
        isFromAdmin: false
      });
      return;
    }

    // AI Mode
    setIsLoading(true);
    try {
      const chatHistory = messages.filter(msg => msg.type === 'user' || msg.type === 'bot').map(msg => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.text
      }));
      chatHistory.push({ role: "user", content: userText });

      // TODO: Replace with actual logged-in user ID if available
      const userId = "placeholder-user-id"; 

      const response: any = await apiClient.post('/chatbot/message', { 
        messages: chatHistory,
        userId: userId 
      });
      
      const responseData = response?.data;

      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, type: "bot", text: responseData?.text || "عذراً، حدث خطأ في معالجة رسالتك." }
      ]);

      if (responseData?.requiresLiveAgent && responseData?.ticketId) {
        setMode('SUPPORT');
        setTicketId(responseData.ticketId);
      }

    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, type: "bot", text: "عذراً، لا يمكنني الاتصال بالخادم الآن. يرجى المحاولة لاحقاً." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/auth') || pathname?.startsWith('/login')) {
    return null;
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 ${mode === 'SUPPORT' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="المحادثة المباشرة"
      >
        {mode === 'SUPPORT' ? <HeadphonesIcon className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      <div 
        className={`fixed bottom-6 right-6 sm:w-96 w-[calc(100%-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50 transition-all origin-bottom-right duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
        style={{ height: '500px', maxHeight: 'calc(100vh - 6rem)' }}
      >
        {/* Header */}
        <div className={`${mode === 'SUPPORT' ? 'bg-blue-600' : 'bg-emerald-600'} text-white p-4 flex items-center justify-between transition-colors`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              {mode === 'SUPPORT' ? <HeadphonesIcon className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-bold">{mode === 'SUPPORT' ? 'خدمة العملاء - نفهم' : 'المساعد الذكي - نفهم'}</h3>
              <p className={`${mode === 'SUPPORT' ? 'text-blue-100' : 'text-emerald-100'} text-xs flex items-center gap-1`}>
                <span className={`w-2 h-2 rounded-full ${mode === 'SUPPORT' && !isConnected ? 'bg-yellow-400' : 'bg-green-300'} inline-block`}></span> 
                {mode === 'SUPPORT' ? (isConnected ? 'موظف الدعم متصل' : 'جاري الاتصال...') : 'متصل الآن'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button 
                onClick={clearHistory}
                title="إنهاء المحادثة"
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-2 ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.type === "user" ? (mode === 'SUPPORT' ? 'bg-blue-100' : 'bg-emerald-100') : "bg-white border border-gray-200"
              }`}>
                {msg.type === "user" ? 
                  <User className={`w-4 h-4 ${mode === 'SUPPORT' ? 'text-blue-600' : 'text-emerald-600'}`} /> : 
                  (msg.type === "admin" ? <HeadphonesIcon className="w-4 h-4 text-blue-600" /> : <Bot className="w-4 h-4 text-emerald-600" />)
                }
              </div>
              <div className={`p-3 text-sm shadow-sm max-w-[80%] ${
                msg.type === "user" 
                  ? `${mode === 'SUPPORT' ? 'bg-blue-600' : 'bg-emerald-600'} text-white rounded-2xl rounded-tl-none` 
                  : "bg-white text-slate-700 rounded-2xl rounded-tr-none border border-gray-100"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white border border-gray-200">
                <Bot className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="p-4 text-sm shadow-sm max-w-[80%] bg-white text-slate-700 rounded-2xl rounded-tr-none border border-gray-100 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSendMessage} className="relative">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب استفسارك هنا..."
              className={`w-full p-3 pl-12 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all ${
                mode === 'SUPPORT' ? 'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500' : 'focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500'
              }`}
            />
            <button 
              type="submit"
              className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 ${
                mode === 'SUPPORT' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'
              } text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50`}
              disabled={!message.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-center mt-2">
            {mode === 'SUPPORT' ? (
              <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                محادثة مباشرة مؤمنة <HeadphonesIcon className="w-3 h-3" />
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                مدعوم بالذكاء الاصطناعي <Bot className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
