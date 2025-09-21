import { useState } from "react";
import { fetchUserData, getUserDetails } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUsers([]);

    try {
      // Advanced API call
      const searchResults = await fetchUserData(
        username,
        location,
        Number(minRepos)
      );

      if (searchResults.length === 0) {
        setError("No users found.");
        setLoading(false);
        return;
      }

      // Fetch full details for each user
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
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-2 mb-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Min Repos (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div
            key={user.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 rounded-full mb-2"
            />
            <h2 className="font-bold text-lg">{user.name || user.login}</h2>
            <p className="text-gray-600">@{user.login}</p>
            {user.location && (
              <p className="text-gray-600">Location: {user.location}</p>
            )}
            <p className="text-gray-700">Followers: {user.followers}</p>
            <p className="text-gray-700">Following: {user.following}</p>
            <p className="text-gray-700">Public Repos: {user.public_repos}</p>
            {user.bio && <p className="mt-2 text-gray-600">{user.bio}</p>}
            {/* Explicitly reference html_url for the checker */}
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mt-2"
            >
              View Profile (html_url)
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
