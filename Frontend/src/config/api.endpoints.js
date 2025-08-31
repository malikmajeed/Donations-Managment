const ENDPOINTS = {
    
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
    
};


export default ENDPOINTS;