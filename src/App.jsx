import { useState } from "react";
import { shortenUrl } from "./utils/apis";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClear = () => {
    setUrl("");
    setShortenedUrl("");
  };

  const handleShorten = async () => {
    if (!url.trim()) return alert("Please enter a valid URL!");
    setLoading(true);
    try {
      const data = await shortenUrl(url.trim());
      setShortenedUrl(data.shortenedUrl || data.short_url);
    } catch (error) {
      console.error("Error shortening URL:", error);
      alert("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">URL Shortener</h1>

      <div className="card">
        <input
          type="text"
          placeholder="Enter full URL (e.g., https://www.example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="url-input"
        />

        <div className="buttons">
          <button onClick={handleShorten} className="shorten-btn" disabled={loading}>
            {loading ? "Shortening..." : "Shorten"}
          </button>
          <button onClick={handleClear} className="clear-btn">
            Clear
          </button>
        </div>

        {shortenedUrl && (
          <div className="result-section">
            <h2>Your Shortened URL</h2>
            <div className="shortened-url-container">
              <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
                {shortenedUrl}
              </a>
              <button onClick={handleCopy} className="copy-btn">
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
