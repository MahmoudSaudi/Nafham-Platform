import { apiClient } from '../apiClient';

export const getDiscussions = async (): Promise<any[]> => {
    const data = await apiClient.get('/discussions');
    return data as any;
};

export const getDiscussionDetails = async (id: string): Promise<any> => {
    const data = await apiClient.get(`/discussions/${id}`);
    return data;
};

export const replyToDiscussion = async (payload: { id: string, content: string, userId: string }): Promise<any> => {
    const data = await apiClient.post(`/discussions/${payload.id}/reply`, { content: payload.content, userId: payload.userId });
    return data;
};

export const toggleDiscussionLock = async (id: string): Promise<any> => {
    const data = await apiClient.put(`/discussions/${id}/lock`, {});
    return data;
};

export const deleteDiscussion = async (id: string): Promise<any> => {
    const data = await apiClient.delete(`/discussions/${id}`);
    return data;
};
