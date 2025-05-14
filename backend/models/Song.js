const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  title: String,
  artist: String,
  spotifyId: String,
});

module.exports = mongoose.model("Song", SongSchema);
