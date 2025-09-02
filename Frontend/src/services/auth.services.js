import { apiConfig } from "../config/api.config";
import ENDPOINTS from "../config/api.endpoints";

export const registerUser = async (formData) => {
  console.log(formData);
  const { data } = await apiConfig.post(ENDPOINTS.AUTH.SIGNUP, formData);
  return data;
};

export const loginUser = async (formData) => {
  const { data } = await apiConfig.post(ENDPOINTS.AUTH.LOGIN, formData);
  return data;
};
