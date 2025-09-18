import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';

export const authService = {
  // Login user
  login: async (credentials) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
    return response;
  },

  // Register user
  register: async (userData) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, userData);
    return response;
  },

  // Logout user
  logout: async () => {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    return response;
  },

  // Refresh token
  refreshToken: async () => {
    const response = await apiClient.post(ENDPOINTS.AUTH.REFRESH);
    return response;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      password: newPassword,
    });
    return response;
  },

  // Verify email
  verifyEmail: async (token) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
    return response;
  },

  // Get current user profile
  getCurrentUser: async () => {
    const response = await apiClient.get(ENDPOINTS.USERS.PROFILE);
    return response;
  },
};

export default authService;
