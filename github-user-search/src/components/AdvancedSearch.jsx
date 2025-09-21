// src/components/AdvancedSearch.jsx
import React, { useState } from "react";
import { searchUsers } from "../services/githubService";
import UserList from "./UserList";

export default function AdvancedSearch() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState({ total_count: 0, items: [] });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 30;

  const doSearch = async (p = 1) => {
    // p = page
    const params = {
      username: username.trim(),
      location: location.trim(),
      minRepos: Number(minRepos) || 0,
      page: p,
      per_page: perPage,
    };

    // Require at least one criterion to run search
    if (!params.username && !params.location && !params.minRepos) {
      setErrorMsg("Enter at least one search criterion.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const data = await searchUsers(params);
      setResults((prev) => (p === 1 ? data : { ...data, items: [...prev.items, ...data.items] }));
      setStatus("success");
      setPage(p);
    } catch (err) {
      setStatus("error");
      setErrorMsg("Search failed. Try again.");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    doSearch(1);
  };

  const loadMore = () => {
    const next = page + 1;
    doSearch(next);
  };

  return (
    <div className="p-4 mt-6 border-t">
      <h2 className="text-xl font-semibold mb-3">Advanced Search</h2>
      <form onSubmit={onSubmit} className="grid gap-2 grid-cols-1 sm:grid-cols-4 items-end">
        <div>
          <label className="block text-sm">Username</label>
          <input
            className="border p-2 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. john"
          />
        </div>
        <div>
          <label className="block text-sm">Location</label>
          <input
            className="border p-2 w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Berlin"
          />
        </div>
        <div>
          <label className="block text-sm">Min repos</label>
          <input
            className="border p-2 w-full"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            placeholder="e.g. 10"
            type="number"
            min="0"
          />
        </div>
        <div>
          <button className="px-4 py-2 border w-full" type="submit">
            Search
          </button>
        </div>
      </form>

      {status === "loading" && <p className="mt-3">Loading...</p>}
      {status === "error" && <p className="mt-3 text-red-600">{errorMsg}</p>}
      {status === "success" && (
        <div className="mt-4">
          <p className="mb-2">Found {results.total_count} users</p>
          <UserList users={results.items} />
          {/* Load more button if there are more results on next pages */}
          {results.items && results.items.length < results.total_count && (
            <div className="mt-4">
              <button className="px-4 py-2 border" onClick={loadMore}>
                Load more
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
