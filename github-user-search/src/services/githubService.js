import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_GITHUB_API_URL || "https://api.github.com",
});

// Advanced search with optional location and minRepos
export const fetchUserData = async (username, location = "", minRepos = 0) => {
  let query = username;
  if (location) query += `+location:${location}`;
  if (minRepos > 0) query += `+repos:>${minRepos}`;

  const url = `https://api.github.com/search/users?q=${query}`;
  const response = await axios.get(url);
  return response.data.items;
};

// Fetch detailed info for a single user
export const getUserDetails = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export default api;
