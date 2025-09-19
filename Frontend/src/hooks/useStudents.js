import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  updateSponsorship,
  updateFeeStatus,
  recordPayment,
  getFeeSummary
} from '../services/students.service';
import { toast } from 'react-toastify';

// Get all students
export const useAllStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: getAllStudents
  });
};

// Get student by ID
export const useStudentById = (id) => {
  return useQuery({
    queryKey: ['student', id],
    queryFn: () => getStudentById(id),
    enabled: !!id
  });
};

// Create student
export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
      toast.success("New Student Added")
    }
  });
};

// Update student
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
      toast.success("Student Updated")
    }
  });
};

// Delete student
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
      toast.warn("Student Deleted")
    }
  });
};

// Update sponsorship
export const useUpdateSponsorship = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateSponsorship(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
    }
  });
};

// Update fee status
export const useUpdateFeeStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateFeeStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
    }
  });
};

// Record payment
export const useRecordPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => recordPayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
    }
  });
};

// Get fee summary
export const useFeeSummary = (id) => {
  return useQuery({
    queryKey: ['student-fee-summary', id],
    queryFn: () => getFeeSummary(id),
    enabled: !!id
  });
};
