const express = require("express");
const { users } = require("../data/seed");
const { issueToken, refreshToken } = require("../services/tokenService");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const { token, expiresAt } = issueToken(user);
  res.json({
    token,
    expiresAt,
    user: { id: user.id, name: user.name, username: user.username },
  });
});

router.post("/refresh", (req, res) => {
  const { token } = req.body || {};
  if (!token) {
    return res.status(400).json({ error: "Missing token" });
  }

  const refreshed = refreshToken(token);
  if (!refreshed) {
    return res.status(401).json({ error: "Session can't be refreshed, log in again" });
  }

  res.json(refreshed);
});

module.exports = router;
