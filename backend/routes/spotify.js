const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const router = express.Router();
require("dotenv").config(); 


const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = " https://4fca-2603-9001-e00-1e2f-ac0b-d666-3fdb-ad20.ngrok-free.app "; 


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

    const { access_token, refresh_token } = response.data;

    res.json({ access_token, refresh_token });
  } catch (err) {
    console.error("Error getting tokens from Spotify:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get access token" });
  }
});

module.exports = router;
