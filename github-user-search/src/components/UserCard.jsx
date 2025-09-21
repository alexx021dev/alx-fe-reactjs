function UserCard({ user }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-24 h-24 rounded-full mb-2"
      />
      <h2 className="font-bold text-lg">{user.name || user.login}</h2>
      <p className="text-gray-600">@{user.login}</p>
      {user.location && <p className="text-gray-600">Location: {user.location}</p>}
      <p className="text-gray-700">Followers: {user.followers}</p>
      <p className="text-gray-700">Following: {user.following}</p>
      <p className="text-gray-700">Public Repos: {user.public_repos}</p>
      {user.bio && <p className="mt-2 text-gray-600">{user.bio}</p>}
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline mt-2"
      >
        View Profile
      </a>
    </div>
  );
}

export default UserCard;
