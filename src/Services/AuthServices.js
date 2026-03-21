import { apiFetch } from "./api";
const API_URL = import.meta.env.VITE_API_URL;
export const getLoggedVerify = async (token) => {
  try {
    const verify = await apiFetch(`${API_URL}/api/auth/verify`);
    return verify;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postAuthLogin = async (payload) => {
  console.log(API_URL);

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
