import { apiClient } from '../apiClient';

export const getCertificates = async (): Promise<any[]> => {
    const data = await apiClient.get('/certificates');
    return data as any;
};

export const createCertificate = async (payload: { userId: string, courseId: string, certificateUrl?: string }): Promise<any> => {
    const data = await apiClient.post('/certificates', payload);
    return data;
};

export const revokeCertificate = async (id: string): Promise<any> => {
    const data = await apiClient.post(`/certificates/${id}/revoke`, {});
    return data;
};
