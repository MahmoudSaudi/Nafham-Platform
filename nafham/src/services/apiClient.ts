import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

// Create a centralized Axios instance
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isSigningOut = false;

// Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // Inject the backendToken if available
    const session = await getSession();
    console.log("[DEBUG apiClient] session:", session ? "Exists" : "Null", "token:", (session?.user as any)?.backendToken ? "Exists" : "Missing");
    if (session && (session.user as any).backendToken) {
      config.headers.Authorization = `Bearer ${(session.user as any).backendToken}`;
    } else if (typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard')) {
      if (!isSigningOut) {
        isSigningOut = true;
        console.warn("[apiClient] Missing backendToken on dashboard route. Signing out...");
        signOut({ callbackUrl: '/auth/login' });
      }
      return Promise.reject(new Error("No valid authentication token found. Redirecting to login..."));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // If the backend wraps responses in { success: true, data: ... }, extract data
    if (response.data && response.data.success !== undefined) {
      if (!response.data.success) {
        return Promise.reject(new Error(response.data.message || 'API Error'));
      }
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    // Handle centralized error logging or token refresh logic
    const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
    const status = error.response?.status;
    
    console.error(`[API Error - ${status || 'Unknown Status'}]:`, errorMessage);
    
    if (status === 401 && typeof window !== 'undefined') {
      if (!isSigningOut) {
        isSigningOut = true;
        console.warn("[apiClient] 401 Unauthorized received. Signing out to clear invalid session...");
        signOut({ callbackUrl: '/auth/login' });
      }
    }

    const customError = new Error(errorMessage);
    (customError as any).status = status;
    
    return Promise.reject(customError);
  }
);

export default apiClient;
