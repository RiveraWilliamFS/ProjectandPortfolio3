const express = require("express");
const router = express.Router();
const { getAllSongs, addSong } = require("../controllers/songController");

router.get("/", getAllSongs);
router.post("/", addSong);

module.exports = router;
