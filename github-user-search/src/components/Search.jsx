import { useState } from "react";
import { searchUsers, getUserDetails } from "../services/api";
import UserCard from "./UserCard";

function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setUsers([]);

    try {
      // 1️⃣ Search users
      const searchResults = await searchUsers(query);

      if (searchResults.length === 0) {
        setError("No users found.");
        setLoading(false);
        return;
      }

      // 2️⃣ Fetch detailed info for each user
      const detailedUsers = await Promise.all(
        searchResults.map(async (user) => await getUserDetails(user.login))
      );

      setUsers(detailedUsers);
    } catch (err) {
      setError("Looks like we can't find the users.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search GitHub users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Search;
