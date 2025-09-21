// src/components/UserCard.jsx
import React from "react";

export default function UserCard({ user }) {
  if (!user) return null;

  return (
    <div className="border p-4 rounded-md max-w-md">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar_url}
          alt={user.login}
          width={88}
          height={88}
          className="rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">{user.name || user.login}</h3>
          <p className="text-sm text-gray-600">{user.login}</p>
        </div>
      </div>

      {user.bio && <p className="mt-3">{user.bio}</p>}

      <div className="mt-3 flex gap-3 text-sm">
        <div>Followers: {user.followers ?? "—"}</div>
        <div>Following: {user.following ?? "—"}</div>
        <div>Repos: {user.public_repos ?? "—"}</div>
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 underline"
      >
        View Profile on GitHub
      </a>
    </div>
  );
}
