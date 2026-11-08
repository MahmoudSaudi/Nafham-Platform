import { apiClient } from '../apiClient';

export const getUsers = async (): Promise<any[]> => {
    const data = await apiClient.get('/users');
    return data as any;
};

export const createUser = async (userData: any) => {
    const data = await apiClient.post('/users', userData);
    return data;
};

export const updateUser = async (id: string, userData: any) => {
    const data = await apiClient.put(`/users/${id}`, userData);
    return data;
};

export const deleteUser = async (id: string) => {
    const data = await apiClient.delete(`/users/${id}`);
    return data;
};
