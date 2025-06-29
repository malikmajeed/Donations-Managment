// API Configuration
const API_BASE_URL = 'http://localhost:3000';

export const API_CONFIG = {
    BASE_URL: API_BASE_URL,
    ENDPOINTS: {
        AUTH: {
            LOGIN: `${API_BASE_URL}/user/login`,
            SIGNUP: `${API_BASE_URL}/user/signup`,
        },
        USER: {
            PROFILE: `${API_BASE_URL}/user/dashboard`,
            UPDATE: `${API_BASE_URL}/user/update`,
            RESET: `${API_BASE_URL}/user/forgot-password`
        },
        DONATIONS: {
            LIST: `${API_BASE_URL}/donation`,
            CREATE: `${API_BASE_URL}/donation/create`,
        }
    }
};

export default API_CONFIG; 