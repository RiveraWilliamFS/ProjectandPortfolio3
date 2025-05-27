const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const router = express.Router();
const Token = require("../models/Token");
const validateToken = require("../middleware/validateToken");
require("dotenv").config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = "https://b91a-2603-9001-e00-1e2f-3d18-36fa-16bc-47f2.ngrok-free.app";

router.get("/login", (req, res) => {
  const scope = "user-read-private user-read-email";
  const query = querystring.stringify({
    response_type: "code",
    client_id,
    scope,
    redirect_uri,
  });
  res.redirect(`https://accounts.spotify.com/authorize?${query}`);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri,
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    await Token.create({
      access_token,
      refresh_token,
      expires_in,
    });

    res.json({ access_token, refresh_token, expires_in });
  } catch (err) {
    console.error("Error getting tokens from Spotify:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get access token" });
  }
});

router.get("/search", validateToken, async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing search query" });

  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${req.spotifyToken}`,
      },
      params: {
        q,
        type: "artist,track,album",
        limit: 3,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error("Spotify search error:", err.response?.data || err.message);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
