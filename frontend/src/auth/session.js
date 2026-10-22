const REFRESH_THRESHOLD_MS = 5 * 60 * 1000;

export function millisecondsUntilExpiry(session) {
  return session.expiresAt - Date.now();
}

export function getSessionAction(session) {
  if (!session) return "logout";

  const remaining = millisecondsUntilExpiry(session);
  if (remaining <= 0) return "logout";
  if (remaining <= REFRESH_THRESHOLD_MS) return "refresh";
  return "none";
}

export function saveSession(session) {
  localStorage.setItem("taskboard_session", JSON.stringify(session));
}

export function loadSession() {
  const raw = localStorage.getItem("taskboard_session");
  return raw ? JSON.parse(raw) : null;
}

export function clearSession() {
  localStorage.removeItem("taskboard_session");
}
