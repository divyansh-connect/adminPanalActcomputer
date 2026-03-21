export const pineHealth = async () => {
  try {
    const response = await apiFetch(
      `https://actcomputer.onrender.com/api/health`,
    );
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
