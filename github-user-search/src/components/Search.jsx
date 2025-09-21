// src/components/Search.jsx
import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";
import UserCard from "./UserCard";

export default function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setStatus("loading");
    setUser(null);
    setErrorMsg("");
    try {
      const data = await fetchUserData(username.trim());
      setUser(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      if (err.code === 404 || err.message === "Not Found") {
        setErrorMsg("Looks like we can't find the user");
      } else {
        setErrorMsg("Error fetching user. Try again.");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Search by username</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="px-4 py-2 border" type="submit">
          Search
        </button>
      </form>

      {status === "loading" && <p>Loading...</p>}

      {status === "error" && <p className="text-red-600">{errorMsg}</p>}

      {status === "success" && user && <UserCard user={user} />}
    </div>
  );
}
