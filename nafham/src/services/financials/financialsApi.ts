import { apiClient } from '../apiClient';

export const getFinancialStats = async (): Promise<any> => {
    const data = await apiClient.get('/financials/stats');
    return data;
};

export const getTransactions = async (): Promise<any[]> => {
    const data = await apiClient.get('/financials/transactions');
    return data as any;
};

export const refundTransaction = async (id: string): Promise<any> => {
    const data = await apiClient.post(`/financials/transactions/${id}/refund`, {});
    return data;
};

export const approveTransaction = async (id: string): Promise<any> => {
    const data = await apiClient.put(`/financials/transactions/${id}/approve`, {});
    return data;
};

export const rejectTransaction = async (id: string): Promise<any> => {
    const data = await apiClient.put(`/financials/transactions/${id}/reject`, {});
    return data;
};
