const Song = require("../models/Song");

exports.getAllSongs = async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
};

exports.addSong = async (req, res) => {
  const song = new Song(req.body);
  await song.save();
  res.json(song);
};
