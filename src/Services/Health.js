import { apiFetch } from "./api";
const API_URL = import.meta.env.VITE_API_URL;

export const pineHealth = async () => {
  try {
    const response = await apiFetch(`${API_URL}/api/health`);
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message,
      };
    }
    return data;
  } catch (error) {
    throw error;
  }
};
