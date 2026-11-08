import { apiClient } from '../apiClient';

export const getTickets = async (): Promise<any[]> => {
    const data = await apiClient.get('/support/tickets');
    return data as any;
};

export const getTicketDetails = async (id: string): Promise<any> => {
    const data = await apiClient.get(`/support/tickets/${id}`);
    return data;
};

export const replyToTicket = async (payload: { id: string, content: string, senderId: string }): Promise<any> => {
    const data = await apiClient.post(`/support/tickets/${payload.id}/reply`, { content: payload.content, senderId: payload.senderId });
    return data;
};

export const updateTicketStatus = async (payload: { id: string, status: string }): Promise<any> => {
    const data = await apiClient.put(`/support/tickets/${payload.id}/status`, { status: payload.status });
    return data;
};
