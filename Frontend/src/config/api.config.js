import axios from 'axios';
import {handleHttpError} from './error.handler.config'
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:3000';

// Create an axios instance
export const apiConfig = axios.create({
    baseURL: API_BASE_URL,
   
});

// Request interceptor to attach Authorization header
apiConfig.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiConfig.interceptors.response.use(
    (response) => {
        // Handle successful responses
        if (response.status >= 200 && response.status < 300) {
    
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

