import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/songs").then(res => {
      setSongs(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3001/api/songs", { title, artist });
    setSongs([...songs, res.data]);
    setTitle("");
    setArtist("");
  };

  return (
    <div>
      <h1>Songs</h1>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" />
        <button type="submit">Add Song</button>
      </form>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>{song.title} - {song.artist}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
