import { apiFetch } from "./api";

export const getLoggedVerify = async (token) => {
  try {
    const verify = await apiFetch(
      `https://actcomputer.onrender.com/api/auth/verify`,
    );
    return verify;
  } catch (error) {
    throw error;
  }
};

export const postAuthLogin = async (payload) => {
  try {
    const response = await fetch(
      "https://actcomputer.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data;
  } catch (error) {
    throw error;
  }
};
