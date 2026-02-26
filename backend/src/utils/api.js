const BASE_URL = "https://neoflow-x.onrender.com";

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("auth_token");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      ...(options.headers || {}),
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("auth_token");
    window.location.href = "/login";
    return;
  }

  return response.json();
};