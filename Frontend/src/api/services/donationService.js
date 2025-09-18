import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';

export const donationService = {
  // Get all donations
  getAllDonations: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.DONATIONS.BASE, { params });
    return response;
  },

  // Get donation by ID
  getDonationById: async (donationId) => {
    const response = await apiClient.get(ENDPOINTS.DONATIONS.BY_ID(donationId));
    return response;
  },

  // Create new donation
  createDonation: async (donationData) => {
    const response = await apiClient.post(ENDPOINTS.DONATIONS.CREATE, donationData);
    return response;
  },

  // Update donation
  updateDonation: async (donationId, donationData) => {
    const response = await apiClient.put(ENDPOINTS.DONATIONS.UPDATE(donationId), donationData);
    return response;
  },

  // Delete donation
  deleteDonation: async (donationId) => {
    const response = await apiClient.delete(ENDPOINTS.DONATIONS.DELETE(donationId));
    return response;
  },

  // Get user's donations
  getUserDonations: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.DONATIONS.BY_USER, { params });
    return response;
  },

  // Get donations by cause
  getDonationsByCause: async (causeId, params = {}) => {
    const response = await apiClient.get(`${ENDPOINTS.DONATIONS.BASE}/cause/${causeId}`, { params });
    return response;
  },

  // Get donations by student
  getDonationsByStudent: async (studentId, params = {}) => {
    const response = await apiClient.get(`${ENDPOINTS.DONATIONS.BASE}/student/${studentId}`, { params });
    return response;
  },

  // Get donation statistics
  getStatistics: async (params = {}) => {
    const response = await apiClient.get(`${ENDPOINTS.DONATIONS.BASE}/statistics`, { params });
    return response;
  },

  // Process payment
  processPayment: async (paymentData) => {
    const response = await apiClient.post(`${ENDPOINTS.DONATIONS.BASE}/process-payment`, paymentData);
    return response;
  },
};

export default donationService;
