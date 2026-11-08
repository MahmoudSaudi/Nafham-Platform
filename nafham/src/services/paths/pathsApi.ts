import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with credentials
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const getPaths = async () => {
    const response = await api.get('/paths');
    return response.data.data;
};

export const getPathById = async (id: string) => {
    const response = await api.get(`/paths/${id}`);
    return response.data.data;
};

export const createPath = async (pathData: any) => {
    const response = await api.post('/paths', pathData);
    return response.data.data;
};

export const updatePath = async (id: string, pathData: any) => {
    const response = await api.put(`/paths/${id}`, pathData);
    return response.data.data;
};

export const deletePath = async (id: string) => {
    const response = await api.delete(`/paths/${id}`);
    return response.data;
};
