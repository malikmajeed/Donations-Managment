import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';

export const causeService = {
  // Get all causes
  getAllCauses: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.CAUSES.BASE, { params });
    return response;
  },

  // Get cause by ID
  getCauseById: async (causeId) => {
    const response = await apiClient.get(ENDPOINTS.CAUSES.BY_ID(causeId));
    return response;
  },

  // Create new cause
  createCause: async (causeData) => {
    const response = await apiClient.post(ENDPOINTS.CAUSES.BASE, causeData);
    return response;
  },

  // Update cause
  updateCause: async (causeId, causeData) => {
    const response = await apiClient.put(ENDPOINTS.CAUSES.UPDATE(causeId), causeData);
    return response;
  },

  // Delete cause
  deleteCause: async (causeId) => {
    const response = await apiClient.delete(ENDPOINTS.CAUSES.DELETE(causeId));
    return response;
  },

  // Upload cause image
  uploadImage: async (formData) => {
    const response = await apiClient.post(ENDPOINTS.CAUSES.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  // Get causes by type
  getCausesByType: async (type, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.CAUSES.BY_TYPE(type), { params });
    return response;
  },

  // Get urgent causes
  getUrgentCauses: async (params = {}) => {
    const response = await apiClient.get(`${ENDPOINTS.CAUSES.BASE}/urgent`, { params });
    return response;
  },

  // Get causes statistics
  getStatistics: async () => {
    const response = await apiClient.get(ENDPOINTS.CAUSES.STATISTICS);
    return response;
  },

  // Search causes
  searchCauses: async (searchTerm, params = {}) => {
    const response = await apiClient.get(`${ENDPOINTS.CAUSES.BASE}/search`, {
      params: { q: searchTerm, ...params }
    });
    return response;
  },
};

export default causeService;
