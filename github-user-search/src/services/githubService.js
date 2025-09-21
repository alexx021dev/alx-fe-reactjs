// src/services/githubService.js
import axios from "axios";

const GITHUB_BASE = "https://api.github.com";

const api = axios.create({
  baseURL: GITHUB_BASE,
  headers: {
    // If you set VITE_APP_GITHUB_API_KEY in .env, it will be used. Otherwise requests are unauthenticated.
    Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
      ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
      : undefined,
  },
});

/**
 * fetchUserData - fetches a single GitHub user by username
 * Endpoint: GET /users/{username}
 * @param {string} username
 * @returns {Promise<Object>} user data
 */
export async function fetchUserData(username) {
  if (!username) throw new Error("username is required");
  try {
    const resp = await api.get(`/users/${encodeURIComponent(username)}`);
    return resp.data;
  } catch (err) {
    // normalize error
    const message =
      err?.response?.status === 404
        ? "Not Found"
        : err?.message || "Failed to fetch user";
    const e = new Error(message);
    e.code = err?.response?.status;
    throw e;
  }
}

/**
 * searchUsers - advanced search using GitHub Search API
 * Endpoint: GET /search/users?q={query}&page={page}&per_page={per_page}
 * Query building example: q=location:italy+repos:>10+john
 *
 * @param {object} params - { username, location, minRepos, page=1, per_page=30 }
 * @returns {Promise<{total_count:number, items: Array}>}
 */
export async function searchUsers({
  username = "",
  location = "",
  minRepos = 0,
  page = 1,
  per_page = 30,
} = {}) {
  // Build q parameter
  let terms = [];
  if (username) terms.push(username);
  if (location) terms.push(`location:${location}`);
  if (minRepos && Number(minRepos) > 0) terms.push(`repos:>=${minRepos}`);
  const q = terms.length > 0 ? terms.join("+") : "";

  if (!q) {
    // Return empty result if no criteria provided
    return { total_count: 0, items: [] };
  }

  try {
    const resp = await api.get(`/search/users`, {
      params: { q, page, per_page },
    });
    return resp.data;
  } catch (err) {
    const e = new Error(err?.message || "Search failed");
    e.code = err?.response?.status;
    throw e;
  }
}

export default api;
