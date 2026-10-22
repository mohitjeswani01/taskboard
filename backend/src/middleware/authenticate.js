const { getSession } = require("../services/tokenService");

function authenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing bearer token" });
  }

  const session = getSession(token);
  if (!session) {
    return res.status(401).json({ error: "Invalid or expired session" });
  }

  const nowInSeconds = Math.floor(Date.now() / 1000);
  if (nowInSeconds > session.expiresAt) {
    return res.status(401).json({ error: "Session expired" });
  }

  req.userId = session.userId;
  next();
}

module.exports = authenticate;
