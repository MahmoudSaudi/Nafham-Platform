import { apiClient } from '../apiClient';

export const getAdmins = async (): Promise<any[]> => {
    const data = await apiClient.get('/admins');
    return data as any;
};

export const createAdmin = async (adminData: any) => {
    const data = await apiClient.post('/admins', adminData);
    return data;
};

export const updateAdmin = async (id: string, adminData: any) => {
    const data = await apiClient.put(`/admins/${id}`, adminData);
    return data;
};

export const deleteAdmin = async (id: string) => {
    const data = await apiClient.delete(`/admins/${id}`);
    return data;
};
