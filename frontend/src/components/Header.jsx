export default function Header({ user, onLogout }) {
  return (
    <header className="header">
      <h1>taskboard</h1>
      {user && (
        <div className="header-user">
          <span>{user.name}</span>
          <button onClick={onLogout}>Log out</button>
        </div>
      )}
    </header>
  );
}
