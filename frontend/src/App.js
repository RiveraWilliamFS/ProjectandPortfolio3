import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tokenValid, setTokenValid] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/token/validate")
      .then(() => setTokenValid(true))
      .catch(() => setTokenValid(false));
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      const res = await axios.get("http://localhost:3001/search", {
        params: { q: searchTerm },
      });
      setResults(res.data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div style={{ background: "#fff", color: "#000", padding: "2rem", fontFamily: "Arial" }}>
      {!tokenValid ? (
        <div>
          <h1>Welcome</h1>
          <p>Please log in with Spotify to continue.</p>
          <a
            href="http://localhost:3001/login"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              background: "#1DB954",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px"
            }}
          >
            Login with Spotify
          </a>
        </div>
      ) : (
        <div>
          <h1>Search Spotify</h1>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for artists, tracks, albums..."
            style={{ padding: "0.5rem", width: "300px" }}
          />
          <button onClick={handleSearch} style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}>
            Search
          </button>

          <div style={{ marginTop: "2rem" }}>
            <h2>Results:</h2>
            <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(results, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
