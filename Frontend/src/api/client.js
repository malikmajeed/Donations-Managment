import axios from 'axios';
import { handleHttpError } from '../config/error.handler.config';

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful responses
    if (response.status >= 200 && response.status < 300) {
      // Log response time for debugging
      const duration = new Date() - response.config.metadata.startTime;
      console.log(`API ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status} (${duration}ms)`);
      
      return response.data;
    }
    
    // Handle non-2xx status codes that are still considered successful
    return Promise.reject(new Error(`Unexpected status code: ${response.status}`));
  },
  (error) => {
    // Handle network errors (no response received)
    if (!error.response) {
      return Promise.reject({
        ...error,
        message: 'Network error: Unable to connect to the server',
        code: 'NETWORK_ERROR'
      });
    }

    const { status, data } = error.response;
    return handleHttpError(error, status, data);
  }
);

export default apiClient;
