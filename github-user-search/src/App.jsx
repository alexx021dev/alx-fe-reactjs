// src/App.jsx
import React from "react";
import Search from "./components/Search";
import AdvancedSearch from "./components/AdvancedSearch";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">GitHub User Search</h1>
          <p className="text-sm text-gray-600">Search GitHub users by username or use advanced filters</p>
        </header>

        <main>
          <Search />
          <AdvancedSearch />
        </main>

        <footer className="mt-10 text-xs text-gray-500">
          Built for the ALX frontend task — Repo folder: <code>github-user-search</code>
        </footer>
      </div>
    </div>
  );
}

export default App;
