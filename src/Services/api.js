export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: token ? `Bearer ${token}` : "",
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  const response = await fetch(url, {
    ...options,
    headers,
  });
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
    throw new Error("Unauthorized");
  }
  return response;
};
