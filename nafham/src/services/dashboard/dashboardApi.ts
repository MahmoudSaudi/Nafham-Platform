import { apiClient } from '../apiClient';

export const getDashboardOverview = async (): Promise<any> => {
    // apiClient already unwraps response.data.data if success is true
    const data = await apiClient.get('/dashboard/overview');
    return data as any;
};
