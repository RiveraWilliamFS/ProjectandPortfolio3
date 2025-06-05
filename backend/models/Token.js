const express = require("express");
const router = express.Router();
const Token = require("../models/Token");

router.get("/token/validate", async (req, res) => {
  try {
    const token = await Token.findOne().sort({ created_at: -1 });

    if (!token) {
      return res.status(401).json({ error: "No token found" });
    }

    const now = Math.floor(Date.now() / 1000); 
    const createdAt = Math.floor(new Date(token.created_at).getTime() / 1000);

    if (now > createdAt + token.expires_in) {
      return res.status(401).json({ error: "Token expired" });
    }

    res.status(200).json({ valid: true });
  } catch (err) {
    console.error("Token validation error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
