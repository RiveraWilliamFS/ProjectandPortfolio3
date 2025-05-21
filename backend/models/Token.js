const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  access_token: String,
  refresh_token: String,
  expires_in: Number,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Token", tokenSchema);
