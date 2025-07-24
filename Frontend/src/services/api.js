import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

export const updateUserProfile = async (userId, userData) => {
    try {
        const response = await axios.patch(
            API_CONFIG.ENDPOINTS.USER.UPDATE,
            userData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        if (response.data.success) {
            return response.data.user;
        } else {
            throw new Error(response.data.message || 'Failed to update profile');
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating profile');
    }
};

// Add other API functions here
export const login = async (credentials) => {
    try {
        const response = await axios.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
        if (response.data.success) {
            return response.data;
        }
        throw new Error(response.data.message || 'Login failed');
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

export const signup = async (userData) => {
    try {
        const response = await axios.post(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, userData);
        if (response.data.success) {
            return response.data;
        }
        throw new Error(response.data.message || 'Signup failed');
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Signup failed');
    }
};

export const getUserProfile = async () => {
    try {
        const response = await axios.get(API_CONFIG.ENDPOINTS.USER.PROFILE, {
            // headers: {
            //     'Authorization': `Bearer ${localStorage.getItem('token')}`
            // }
        });
        if (response.data.success) {
            return response.data.user;
        }
        throw new Error(response.data.message || 'Failed to fetch profile');
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
}; 