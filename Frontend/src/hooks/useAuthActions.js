import { useMutation } from '@tanstack/react-query';
import { registerUser, loginUser } from '../services/auth.services';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


  // 🔹 Hook for Registration
  export const useRegisterUser = () => {
    const navigate = useNavigate();

    return useMutation({
      mutationFn: registerUser,
      onSuccess: () => {
        navigate("/"); 
        toast.success("Account created successfully!");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to register. Please try again.");
      },
    });
  };

// 🔹 Hook for Login
export const useLoginUser = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      navigate("/"); 
      toast.success(`Welcome back, ${data?.user?.name || "User"}!`);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Invalid credentials. Please check and try again.");
    },
  });
};
