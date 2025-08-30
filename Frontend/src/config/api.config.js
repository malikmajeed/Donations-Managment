import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const API_CONFIG = {
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/user/login',
            SIGNUP: '/user/signup',
        },
        USER: {
            PROFILE: '/user/dashboard',
            UPDATE: '/user/update',
            RESET: '/user/forget-password',
            GET_ALL_USERS: '/user/users',
            GET_ALL_DONORS: '/user/donors',
        },
        DONATIONS: {
            LIST: '/donation',
            CREATE: '/donation/add',
            STATISTICS: '/donation/statistics',
            BY_ID: id => `/donation/${id}`,
            BY_TARGET: (type, id) => `/donation/target/${type}/${id}`,
            UPDATE_STATUS: id => `/donation/${id}/status`,
            DELETE: id => `/donation/${id}`
        },
        CAUSES: {
            LIST: '/causes/getAllCauses',
            CREATE: '/causes/createCause',
            BY_ID: id => `/causes/getCauseById/${id}`,
            UPDATE: id => `/causes/updateCause/${id}`,
            DELETE: id => `/causes/deleteCause/${id}`,
            BY_TYPE: type => `/causes/getCausesByType/${type}`,
            URGENT: '/causes/getUrgentCauses',
            STATISTICS: '/causes/getStatistics',
            UPDATE_AMOUNT: id => `/causes/updateAmountCollected/${id}`
        },
        STUDENTS: {
            LIST: '/student/getAllStudents',
            CREATE: '/student/addStudent',
            BY_ID: id => `/student/getStudentbyId/${id}`,
            UPDATE: id => `/student/updateStudent/${id}`,
            DELETE: id => `/student/deleteStudent/${id}`,
            UPDATE_SPONSORSHIP: id => `/student/updateSponsorship/${id}`,
            UPDATE_FEE_STATUS: id => `/student/updateFeeStatus/${id}`,
            RECORD_PAYMENT: id => `/student/recordPayment/${id}`,
            FEE_SUMMARY: id => `/student/getFeeSummary/${id}`
        }
    }
};

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
    (response) => response,
    (error) => {
        // Optionally handle global errors here
        // For example, redirect to login on 401
        if (error.response && error.response.status === 401) {
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default API_CONFIG; 