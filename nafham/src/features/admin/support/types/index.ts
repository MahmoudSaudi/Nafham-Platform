export type TicketStatus = "مفتوحة" | "قيد المعالجة" | "مغلقة" | string;
export type TicketPriority = "عالية" | "متوسطة" | "منخفضة" | "عاجلة" | string;

export interface Ticket {
  id: string;
  subject: string;
  studentName: string;
  studentEmail: string;
  status: TicketStatus;
  priority: TicketPriority;
  lastUpdate: string;
  category: string;
}
