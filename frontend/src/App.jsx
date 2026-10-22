import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import TaskFilters from "./components/TaskFilters.jsx";
import TaskList from "./components/TaskList.jsx";
import { useTaskPolling } from "./hooks/useTaskPolling.js";
import { login, refreshSession } from "./api/client.js";
import { clearSession, getSessionAction, loadSession, saveSession } from "./auth/session.js";

const SESSION_CHECK_INTERVAL_MS = 15000;

export default function App() {
  const [session, setSession] = useState(() => loadSession());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [filter, setFilter] = useState({ status: "" });

  const { tasks, error } = useTaskPolling(session?.token, filter);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!session) return;

      const action = getSessionAction(session);
      if (action === "refresh") {
        refreshSession(session.token)
          .then((refreshed) => {
            const next = { ...session, ...refreshed };
            setSession(next);
            saveSession(next);
          })
          .catch(() => {
            clearSession();
            setSession(null);
          });
      } else if (action === "logout") {
        clearSession();
        setSession(null);
      }
    }, SESSION_CHECK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [session]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError(null);
    try {
      const result = await login(username, password);
      setSession(result);
      saveSession(result);
    } catch (err) {
      setLoginError(err.message);
    }
  }

  function handleLogout() {
    clearSession();
    setSession(null);
  }

  if (!session) {
    return (
      <div className="login-screen">
        <h1>taskboard</h1>
        <form onSubmit={handleLogin}>
          <label>
            Username
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Log in</button>
          {loginError && <p className="error">{loginError}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="app">
      <Header user={session.user} onLogout={handleLogout} />
      <main>
        <TaskFilters filter={filter} onChange={setFilter} />
        {error && <p className="error">{error}</p>}
        <TaskList tasks={tasks} />
      </main>
    </div>
  );
}
