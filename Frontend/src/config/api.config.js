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
            RESET: `${API_BASE_URL}/user/forget-password`,
            GET_ALL_USERS: `${API_BASE_URL}/user/users`,
            GET_ALL_DONORS: `${API_BASE_URL}/user/donors`,
        },
        DONATIONS: {
            LIST: `${API_BASE_URL}/donation`,
            CREATE: `${API_BASE_URL}/donation/add`,
            STATISTICS: `${API_BASE_URL}/donation/statistics`,
            BY_ID: id => `${API_BASE_URL}/donation/${id}`,
            BY_TARGET: (type, id) => `${API_BASE_URL}/donation/target/${type}/${id}`,
            UPDATE_STATUS: id => `${API_BASE_URL}/donation/${id}/status`,
            DELETE: id => `${API_BASE_URL}/donation/${id}`
        },
        CAUSES: {
            LIST: `${API_BASE_URL}/causes/getAllCauses`,
            CREATE: `${API_BASE_URL}/causes/createCause`,
            BY_ID: id => `${API_BASE_URL}/causes/getCauseById/${id}`,
            UPDATE: id => `${API_BASE_URL}/causes/updateCause/${id}`,
            DELETE: id => `${API_BASE_URL}/causes/deleteCause/${id}`,
            BY_TYPE: type => `${API_BASE_URL}/causes/getCausesByType/${type}`,
            URGENT: `${API_BASE_URL}/causes/getUrgentCauses`,
            STATISTICS: `${API_BASE_URL}/causes/getStatistics`,
            UPDATE_AMOUNT: id => `${API_BASE_URL}/causes/updateAmountCollected/${id}`
        },
        STUDENTS: {
            LIST: `${API_BASE_URL}/student/getAllStudents`,
            CREATE: `${API_BASE_URL}/student/addStudent`,
            BY_ID: id => `${API_BASE_URL}/student/getStudentbyId/${id}`,
            UPDATE: id => `${API_BASE_URL}/student/updateStudent/${id}`,
            DELETE: id => `${API_BASE_URL}/student/deleteStudent/${id}`,
            UPDATE_SPONSORSHIP: id => `${API_BASE_URL}/student/updateSponsorship/${id}`,
            UPDATE_FEE_STATUS: id => `${API_BASE_URL}/student/updateFeeStatus/${id}`,
            RECORD_PAYMENT: id => `${API_BASE_URL}/student/recordPayment/${id}`,
            FEE_SUMMARY: id => `${API_BASE_URL}/student/getFeeSummary/${id}`
        }
    }
};

export default API_CONFIG; 