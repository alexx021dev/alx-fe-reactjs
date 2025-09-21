// src/components/UserList.jsx
import React from "react";

export default function UserList({ users = [] }) {
  if (!users || users.length === 0) {
    return <p>No users to show.</p>;
  }

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-2">
      {users.map((u) => (
        <div key={u.id} className="border p-3 rounded-md">
          <div className="flex items-center gap-3">
            <img src={u.avatar_url} alt={u.login} width={56} className="rounded-full" />
            <div>
              <div className="font-semibold">{u.login}</div>
              <a
                className="text-sm underline"
                href={u.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View profile
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
