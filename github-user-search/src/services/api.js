import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_GITHUB_API_URL || "https://api.github.com",
});

// Fetch multiple users (search)
export const searchUsers = async (query) => {
  const response = await api.get(`/search/users?q=${query}`);
  return response.data.items; // array of users
};

// Fetch detailed info for a single user
export const getUserDetails = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export default api;
