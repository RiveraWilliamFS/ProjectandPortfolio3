const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const songRoutes = require("./routes/songs");
const spotifyRoutes = require("./routes/spotify");
const tokenRoutes = require("./models/Token");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/songs", songRoutes);
app.use("/", spotifyRoutes);
app.use("/api", tokenRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is running. Go to /login to authenticate with Spotify.");
});
