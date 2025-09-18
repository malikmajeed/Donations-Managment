import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';

export const studentService = {
  // Get all students
  getAllStudents: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.STUDENTS.BASE, { params });
    return response;
  },

  // Get student by ID
  getStudentById: async (studentId) => {
    const response = await apiClient.get(ENDPOINTS.STUDENTS.BY_ID(studentId));
    return response;
  },

  // Create new student
  createStudent: async (studentData) => {
    const response = await apiClient.post(ENDPOINTS.STUDENTS.BASE, studentData);
    return response;
  },

  // Update student
  updateStudent: async (studentId, studentData) => {
    const response = await apiClient.put(ENDPOINTS.STUDENTS.UPDATE(studentId), studentData);
    return response;
  },

  // Delete student
  deleteStudent: async (studentId) => {
    const response = await apiClient.delete(ENDPOINTS.STUDENTS.DELETE(studentId));
    return response;
  },

  // Upload student image
  uploadImage: async (formData) => {
    const response = await apiClient.post(ENDPOINTS.STUDENTS.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  // Get students by category/type
  getStudentsByCategory: async (category, params = {}) => {
    const response = await apiClient.get(`${ENDPOINTS.STUDENTS.BASE}/category/${category}`, { params });
    return response;
  },

  // Search students
  searchStudents: async (searchTerm, params = {}) => {
    const response = await apiClient.get(`${ENDPOINTS.STUDENTS.BASE}/search`, {
      params: { q: searchTerm, ...params }
    });
    return response;
  },
};

export default studentService;
