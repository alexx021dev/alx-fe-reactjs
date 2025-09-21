import axios from "axios";

// Base Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_GITHUB_API_URL || "https://api.github.com",
});

// Search users using GitHub Search API
export const fetchUserData = async (username) => {
  // ✅ Explicitly use the search API endpoint string
  const url = `https://api.github.com/search/users?q=${username}`;
  const response = await axios.get(url);
  return response.data.items; // array of users
};

// Fetch detailed info for a single user
export const getUserDetails = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export default api;
