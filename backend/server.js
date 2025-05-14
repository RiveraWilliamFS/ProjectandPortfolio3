const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const songRoutes = require("./routes/songs");
const spotifyRoutes = require("./routes/spotify"); // ✅ ADD THIS LINE

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/songs", songRoutes);
app.use("/", spotifyRoutes); // ✅ AND THIS LINE TOO

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

