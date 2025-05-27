const Token = require("../models/Token");

const validateToken = async (req, res, next) => {
  try {
    const tokenDoc = await Token.findOne().sort({ createdAt: -1 });

    if (!tokenDoc) return res.status(401).json({ error: "No token found" });

    const now = Date.now() / 1000;
    const tokenTime = new Date(tokenDoc.createdAt).getTime() / 1000;
    const isExpired = (now - tokenTime) > tokenDoc.expires_in;

    if (isExpired) {
      return res.status(401).json({ error: "Token expired" });
    }

    req.spotifyToken = tokenDoc.access_token;
    next();
  } catch (err) {
    console.error("JWT validation error:", err);
    res.status(500).json({ error: "Token validation failed" });
  }
};

module.exports = validateToken;
