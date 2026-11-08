import axios from 'axios';
import { getSession } from 'next-auth/react';

// Separate axios instance for audit that returns the full response (not just data)
const rawApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

rawApiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session && (session.user as any).backendToken) {
      config.headers.Authorization = `Bearer ${(session.user as any).backendToken}`;
    }
    return config;
  }
);

export interface AuditLogResponse {
    success: boolean;
    data: any[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }
}

export interface AuditFilters {
    page?: number;
    limit?: number;
    action?: string;
    entity?: string;
    search?: string;
}

export const getAuditLogs = async (filters: AuditFilters = {}): Promise<AuditLogResponse> => {
    const { page = 1, limit = 20, action, entity, search } = filters;
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('limit', String(limit));
    if (action) params.append('action', action);
    if (entity) params.append('entity', entity);
    if (search) params.append('search', search);

    const response = await rawApiClient.get(`/audit?${params.toString()}`);
    return response.data as AuditLogResponse;
};
