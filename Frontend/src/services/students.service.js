import { apiConfig } from '../config/api.config';
import ENDPOINTS  from '../config/api.endpoints';

// Get all students
export const getAllStudents = async () => {
    const students = await apiConfig.get(ENDPOINTS.STUDENTS.LIST);
    return students || [];
};

// Get student by ID
export const getStudentById = async (id) => {
    const response = await apiConfig.get(ENDPOINTS.STUDENTS.BY_ID(id));
    return response.data;
};

// Create a new student
export const createStudent = async (studentData) => {
    const response = await apiConfig.post(ENDPOINTS.STUDENTS.CREATE, studentData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

// Update a student
export const updateStudent = async (id, studentData) => {
    const response = await apiConfig.patch(ENDPOINTS.STUDENTS.UPDATE(id), studentData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

// Delete a student
export const deleteStudent = async (id) => {
    const response = await apiConfig.delete(ENDPOINTS.STUDENTS.DELETE(id));
    return response.data;
};

// Update sponsorship
export const updateSponsorship = async (id, sponsorshipData) => {
    const response = await apiConfig.patch(ENDPOINTS.STUDENTS.UPDATE_SPONSORSHIP(id), sponsorshipData);
    return response.data;
};

// Update fee status
export const updateFeeStatus = async (id, feeStatusData) => {
    const response = await apiConfig.patch(ENDPOINTS.STUDENTS.UPDATE_FEE_STATUS(id), feeStatusData);
    return response.data;
};

// Record payment
export const recordPayment = async (id, paymentData) => {
    const response = await apiConfig.post(ENDPOINTS.STUDENTS.RECORD_PAYMENT(id), paymentData);
    return response.data;
};

// Get fee summary
export const getFeeSummary = async (id) => {
    const response = await apiConfig.get(ENDPOINTS.STUDENTS.FEE_SUMMARY(id));
    return response.data;
}; 