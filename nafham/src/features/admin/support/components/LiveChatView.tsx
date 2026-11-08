import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, User, Bot, AlertCircle, Loader2, Info } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import { toast } from "sonner";
import { io, Socket } from "socket.io-client";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function LiveChatView() {
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketMessages, setSocketMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  // Fetch Tickets List
  const { data: ticketsData, isLoading: isLoadingTickets } = useQuery({
    queryKey: ["support-tickets"],
    queryFn: async () => {
      const res: any = await apiClient.get('/support/tickets');
      return res;
    },
    refetchInterval: 30000,
  });

  // Fetch Active Ticket Details
  const { data: activeTicketData, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["support-ticket", activeTicketId],
    queryFn: async () => {
      if (!activeTicketId) return null;
      const res: any = await apiClient.get(`/support/tickets/${activeTicketId}`);
      return res;
    },
    enabled: !!activeTicketId,
  });

  const activeTicket = activeTicketData;
  const tickets = ticketsData || [];

  // Manage WebSockets
  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000', {
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      console.log('Admin Socket connected');
    });

    newSocket.on('receive-message', (data: any) => {
      setSocketMessages(prev => [...prev, data]);
      queryClient.invalidateQueries({ queryKey: ["support-tickets"] });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [queryClient]);

  // Join Room & Initialize messages when active ticket changes
  useEffect(() => {
    if (activeTicketId && socket) {
      socket.emit('join-ticket', activeTicketId);
      setSocketMessages(activeTicket?.messages || []);
    }
  }, [activeTicketId, activeTicket?.messages, socket]);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [socketMessages, activeTicket?.aiChatHistory]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeTicketId || !socket) return;

    const userText = message;
    setMessage("");

    // Optimistic UI could be added here, but socket will broadcast it back anyway
    // Admin needs senderId (placeholder for now, should come from auth context)
    const adminId = "admin-id-placeholder";

    try {
      socket.emit('send-message', {
        ticketId: activeTicketId,
        content: userText,
        isFromAdmin: true,
        senderId: adminId
      });
      
      // Update ticket status to IN_PROGRESS if needed
      if (activeTicket?.status === 'OPEN') {
        await apiClient.put(`/support/tickets/${activeTicketId}/status`, { status: 'IN_PROGRESS' });
        queryClient.invalidateQueries({ queryKey: ["support-tickets"] });
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء إرسال الرسالة');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex overflow-hidden min-h-[600px] max-h-[80vh] animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Sidebar: Ticket List */}
      <div className="w-full md:w-1/3 border-l border-gray-100 bg-gray-50/50 flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-800 text-lg">المحادثات النشطة</h2>
            <p className="text-sm text-slate-500 mt-1">تذاكر الدعم والتحويلات المباشرة</p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {isLoadingTickets ? (
            <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-emerald-500" /></div>
          ) : tickets.length === 0 ? (
            <div className="text-center text-gray-400 p-8 text-sm">لا توجد تذاكر نشطة</div>
          ) : (
            tickets.map((ticket: any) => (
              <div 
                key={ticket.id} 
                onClick={() => setActiveTicketId(ticket.id)}
                className={`p-3 rounded-xl cursor-pointer transition-colors ${activeTicketId === ticket.id ? 'bg-emerald-50 border border-emerald-100' : 'bg-white border border-transparent hover:border-gray-200 shadow-sm'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800 text-sm truncate">{ticket.user?.name || "مستخدم غير معروف"}</span>
                  <span className="text-xs text-slate-400">
                    {format(new Date(ticket.updatedAt), 'hh:mm a', { locale: ar })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 truncate max-w-[150px]">{ticket.subject}</span>
                  {ticket.status === 'OPEN' && (
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {activeTicketId ? (
          isLoadingDetails ? (
            <div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>
          ) : activeTicket ? (
            <>
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white shadow-sm z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                    {activeTicket.user?.avatarUrl ? (
                      <img src={activeTicket.user.avatarUrl} alt={activeTicket.user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{activeTicket.user?.name}</h3>
                    <p className="text-xs text-slate-500">{activeTicket.user?.email}</p>
                  </div>
                </div>

                {/* Enrolled Courses Summary */}
                {activeTicket.user?.enrollments?.length > 0 && (
                  <div className="hidden lg:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-xs text-slate-600">
                    <Info className="w-4 h-4 text-emerald-600" />
                    مسجل في {activeTicket.user.enrollments.length} كورسات
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                
                {/* System Message - AI Chat History Header */}
                {activeTicket.aiChatHistory && Array.isArray(activeTicket.aiChatHistory) && activeTicket.aiChatHistory.length > 0 && (
                  <>
                    <div className="flex justify-center my-4">
                      <span className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full border border-purple-200 flex items-center gap-1">
                        <Bot className="w-3 h-3" /> سجل محادثة الذكاء الاصطناعي (قبل التحويل)
                      </span>
                    </div>

                    {activeTicket.aiChatHistory.map((msg: any, idx: number) => {
                      if (msg.role === 'system') return null; // hide system prompt
                      const isUser = msg.role === 'user';
                      return (
                        <div key={`ai-${idx}`} className={`flex items-start gap-3 opacity-70 ${isUser ? 'justify-end' : ''}`}>
                          {!isUser && (
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                              <Bot className="w-4 h-4 text-purple-600" />
                            </div>
                          )}
                          <div className={`${isUser ? 'bg-slate-200 text-slate-800' : 'bg-white border border-gray-200 text-slate-600'} p-3 rounded-2xl shadow-sm text-sm max-w-[80%] ${isUser ? 'rounded-tl-none' : 'rounded-tr-none'}`}>
                            {msg.content}
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex justify-center my-4">
                      <span className="bg-emerald-50 text-emerald-800 text-xs px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                        <User className="w-3 h-3" /> تم تحويل الطالب إليك، يمكنك بدء الرد الآن
                      </span>
                    </div>
                  </>
                )}

                {/* Live Socket Messages */}
                {socketMessages.map((msg: any, idx: number) => {
                  const isAdmin = msg.isFromAdmin;
                  return (
                    <div key={`msg-${msg.id || idx}`} className={`flex items-start gap-3 ${!isAdmin ? 'justify-end' : ''}`}>
                      {isAdmin && (
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-emerald-600" />
                        </div>
                      )}
                      <div className={`${!isAdmin ? 'bg-emerald-600 text-white rounded-tl-none' : 'bg-white border border-gray-100 text-slate-700 rounded-tr-none'} p-3 rounded-2xl shadow-sm text-sm max-w-[80%]`}>
                        {msg.content}
                      </div>
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-gray-100 bg-white">
                <form onSubmit={handleSendMessage} className="relative">
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب ردك للطالب هنا..."
                    className="w-full p-3 pl-12 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                  <button 
                    type="submit"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                    disabled={!message.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col text-slate-400">
              <AlertCircle className="w-16 h-16 mb-4 opacity-20 text-red-500" />
              <p>تعذر تحميل التذكرة</p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col text-slate-400">
            <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
            <p>اختر محادثة للبدء في الرد وحل المشكلة</p>
          </div>
        )}
      </div>

    </div>
  );
}
