// API Endpoints Configuration
const API_BASE = '';

export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE}/auth/login`,
    REGISTER: `${API_BASE}/auth/register`,
    LOGOUT: `${API_BASE}/auth/logout`,
    REFRESH: `${API_BASE}/auth/refresh`,
    FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
    VERIFY_EMAIL: `${API_BASE}/auth/verify-email`,
  },

  // Users
  USERS: {
    BASE: `${API_BASE}/users`,
    PROFILE: `${API_BASE}/users/profile`,
    UPDATE_PROFILE: `${API_BASE}/users/profile`,
    UPLOAD_AVATAR: `${API_BASE}/users/upload-avatar`,
    CHANGE_PASSWORD: `${API_BASE}/users/change-password`,
  },

  // Students
  STUDENTS: {
    BASE: `${API_BASE}/students`,
    BY_ID: (id) => `${API_BASE}/students/${id}`,
    UPLOAD_IMAGE: `${API_BASE}/students/upload-image`,
    UPDATE: (id) => `${API_BASE}/students/${id}`,
    DELETE: (id) => `${API_BASE}/students/${id}`,
  },

  // Donation Causes
  CAUSES: {
    BASE: `${API_BASE}/causes`,
    BY_ID: (id) => `${API_BASE}/causes/${id}`,
    BY_TYPE: (type) => `${API_BASE}/causes/type/${type}`,
    UPLOAD_IMAGE: `${API_BASE}/causes/upload-image`,
    UPDATE: (id) => `${API_BASE}/causes/${id}`,
    DELETE: (id) => `${API_BASE}/causes/${id}`,
    STATISTICS: `${API_BASE}/causes/statistics`,
  },

  // Donations
  DONATIONS: {
    BASE: `${API_BASE}/donations`,
    BY_ID: (id) => `${API_BASE}/donations/${id}`,
    BY_USER: `${API_BASE}/donations/user`,
    CREATE: `${API_BASE}/donations`,
    UPDATE: (id) => `${API_BASE}/donations/${id}`,
    DELETE: (id) => `${API_BASE}/donations/${id}`,
  },

  // File Upload
  UPLOAD: {
    USERS: `${API_BASE}/upload/users`,
    STUDENTS: `${API_BASE}/upload/students`,
    CAUSES: `${API_BASE}/upload/causes`,
  },
};

export default ENDPOINTS;
