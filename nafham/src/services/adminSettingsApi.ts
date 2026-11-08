import { apiClient } from './apiClient';

export interface PlatformSetting {
    id?: string;
    key: string;
    value: string;
    category: string;
    isPublic: boolean;
}

export const getAdminSettings = async () => {
    const data = await apiClient.get('/settings');
    return data as any;
};

export const updateAdminSettings = async (settings: Partial<PlatformSetting>[]) => {
    const data = await apiClient.put('/settings', { settings });
    return data as any;
};
