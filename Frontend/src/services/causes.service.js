import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

// Get all causes
export const getAllCauses = async () => {
    const response = await axios.get(API_CONFIG.ENDPOINTS.CAUSES.LIST);
    return response.data;
};

// Get cause by ID
export const getCauseById = async (id) => {
    const response = await axios.get(API_CONFIG.ENDPOINTS.CAUSES.BY_ID(id));
    return response.data;
};

// Create a new cause
export const createCause = async (causeData) => {
    const response = await axios.post(API_CONFIG.ENDPOINTS.CAUSES.CREATE, causeData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

// Update a cause
export const updateCause = async (id, causeData) => {
    const response = await axios.patch(API_CONFIG.ENDPOINTS.CAUSES.UPDATE(id), causeData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

// Delete a cause
export const deleteCause = async (id) => {
    const response = await axios.delete(API_CONFIG.ENDPOINTS.CAUSES.DELETE(id));
    return response.data;
};

// Get causes by type
export const getCausesByType = async (type) => {
    const response = await axios.get(API_CONFIG.ENDPOINTS.CAUSES.BY_TYPE(type));
    return response.data;
};

// Get urgent causes
export const getUrgentCauses = async () => {
    const response = await axios.get(API_CONFIG.ENDPOINTS.CAUSES.URGENT);
    return response.data;
};

// Get causes statistics
export const getCausesStatistics = async () => {
    const response = await axios.get(API_CONFIG.ENDPOINTS.CAUSES.STATISTICS);
    return response.data;
};

// Update amount collected for a cause
export const updateAmountCollected = async (id, amountData) => {
    const response = await axios.patch(API_CONFIG.ENDPOINTS.CAUSES.UPDATE_AMOUNT(id), amountData);
    return response.data;
};
