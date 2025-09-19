import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllCauses,
  getCauseById,
  createCause,
  updateCause,
  deleteCause,
  getCausesByType,
  getUrgentCauses,
  getCausesStatistics,
  updateAmountCollected
} from '../services/causes.service';
import { toast } from 'react-toastify';

// Get all causes
export const useAllCauses = () => {
  return useQuery({
    queryKey: ['causes'],
    queryFn: getAllCauses
  });
};

// Get cause by ID
export const useCauseById = (id) => {
  return useQuery({
    queryKey: ['cause', id],
    queryFn: () => getCauseById(id),
    enabled: !!id
  });
};

// Get causes by type
export const useCausesByType = (type) => {
  return useQuery({
    queryKey: ['causes', 'type', type],
    queryFn: () => getCausesByType(type),
    enabled: !!type
  });
};

// Get urgent causes
export const useUrgentCauses = () => {
  return useQuery({
    queryKey: ['causes', 'urgent'],
    queryFn: getUrgentCauses
  });
};

// Get causes statistics
export const useCausesStatistics = () => {
  return useQuery({
    queryKey: ['causes', 'statistics'],
    queryFn: getCausesStatistics
  });
};

// Create cause
export const useCreateCause = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCause,
    onSuccess: () => {
      queryClient.invalidateQueries(['causes']);
      toast.success("New Cause Added");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create cause");
    }
  });
};

// Update cause
export const useUpdateCause = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateCause(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['causes']);
      toast.success("Cause Updated");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update cause");
    }
  });
};

// Delete cause
export const useDeleteCause = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCause,
    onSuccess: () => {
      queryClient.invalidateQueries(['causes']);
      toast.warn("Cause Deleted");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete cause");
    }
  });
};

// Update amount collected for a cause
export const useUpdateAmountCollected = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateAmountCollected(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['causes']);
      toast.success("Amount Updated");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update amount");
    }
  });
};
