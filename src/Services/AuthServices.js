import { apiFetch } from "./api";
const API_URL = import.meta.env.VITE_API_URL;

export const getLoggedVerify = async (token) => {
  try {
    const verify = await apiFetch(`${API_URL}/api/auth/verify`);
    return verify;
  } catch (error) {
    throw error;
  }
};

export const postAuthLogin = async (payload) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const postAuthSignUp = async (payload) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Registration failed",
        data: data.data,
      };
    }
    return {
      success: true,
      message: data.message || "Register successfully",
      data: data.data,
    };
  } catch (error) {
    if (error.message === "Unauthorized") throw error;
    return {
      success: false,
      message: "Network error",
    };
  }
};
