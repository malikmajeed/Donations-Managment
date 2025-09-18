import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';

export const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await apiClient.get(ENDPOINTS.USERS.PROFILE);
    return response;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await apiClient.put(ENDPOINTS.USERS.UPDATE_PROFILE, profileData);
    return response;
  },

  // Upload avatar
  uploadAvatar: async (formData) => {
    const response = await apiClient.post(ENDPOINTS.USERS.UPLOAD_AVATAR, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await apiClient.put(ENDPOINTS.USERS.CHANGE_PASSWORD, passwordData);
    return response;
  },

  // Get all users (admin only)
  getAllUsers: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.USERS.BASE, { params });
    return response;
  },

  // Get user by ID
  getUserById: async (userId) => {
    const response = await apiClient.get(`${ENDPOINTS.USERS.BASE}/${userId}`);
    return response;
  },

  // Delete user (admin only)
  deleteUser: async (userId) => {
    const response = await apiClient.delete(`${ENDPOINTS.USERS.BASE}/${userId}`);
    return response;
  },
};

export default userService;
