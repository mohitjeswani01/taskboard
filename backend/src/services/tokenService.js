const crypto = require("crypto");

const SESSION_TTL_SECONDS = Number(process.env.SESSION_TTL_SECONDS) || 3600;

// In-memory session store. Fine for a small side project; swap for Redis if
// this ever needs to survive a restart or run on more than one instance.
const sessions = new Map();

function issueToken(user) {
  const token = crypto.randomBytes(24).toString("hex");
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;

  sessions.set(token, { userId: user.id, expiresAt });

  return { token, expiresAt };
}

function refreshToken(oldToken) {
  const session = sessions.get(oldToken);
  if (!session) return null;

  sessions.delete(oldToken);
  const token = crypto.randomBytes(24).toString("hex");
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  sessions.set(token, { userId: session.userId, expiresAt });

  return { token, expiresAt };
}

function getSession(token) {
  return sessions.get(token) || null;
}

module.exports = { issueToken, refreshToken, getSession };
