import { apiFetch } from "./api";
const API_URL = import.meta.env.VITE_API_URL;

export const getDashboardCourse = async () => {
  try {
    const response = await apiFetch(`${API_URL}/api/dashboard/course`);
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Course data failed",
      };
    }
    return {
      success: true,
      message: data.message || "Course fetched",
      data: data.data,
    };
  } catch (error) {
    if (error.message === "Unauthorized") throw error;
    return {
      success: false,
      message: error.message || "Network error",
    };
  }
};
export const getDashboardPayment = async () => {
  try {
    const response = await apiFetch(`${API_URL}/api/dashboard/payments`);
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Payments data failed",
      };
    }
    return {
      success: true,
      message: data.message || "Payments fetched",
      data: data.data,
    };
  } catch (error) {
    if (error.message === "Unauthorized") throw error;
    return {
      success: false,
      message: error.message || "Network error",
    };
  }
};

export const getDashboardStaff = async () => {
  try {
    const response = await apiFetch(`${API_URL}/api/auth/member`);
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Staff data failed",
      };
    }
    return {
      success: true,
      message: data.message || "Staff fetched",
      data: data.data,
    };
  } catch (error) {
    if (error.message === "Unauthorized") throw error;
    return {
      success: false,
      message: error.message || "Network error",
    };
  }
};
