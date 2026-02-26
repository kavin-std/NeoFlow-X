const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("auth_token");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API Error");
  }

  return data;
};