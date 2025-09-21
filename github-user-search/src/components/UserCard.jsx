function UserCard({ user }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-16 h-16 rounded-full"
      />
      <div>
        <h2 className="font-bold">{user.login}</h2>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}

export default UserCard;
