import { apiClient } from '../apiClient';

export const getCoupons = async (): Promise<any[]> => {
    const data = await apiClient.get('/marketing/coupons');
    return data as any;
};

export const createCoupon = async (payload: any): Promise<any> => {
    const data = await apiClient.post('/marketing/coupons', payload);
    return data;
};

export const deleteCoupon = async (id: string): Promise<any> => {
    const data = await apiClient.delete(`/marketing/coupons/${id}`);
    return data;
};

export const getCampaigns = async (): Promise<any[]> => {
    const data = await apiClient.get('/marketing/campaigns');
    return data as any;
};

export const createCampaign = async (payload: any): Promise<any> => {
    const data = await apiClient.post('/marketing/campaigns', payload);
    return data;
};

export const deleteCampaign = async (id: string): Promise<any> => {
    const data = await apiClient.delete(`/marketing/campaigns/${id}`);
    return data;
};
