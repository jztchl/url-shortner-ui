import React from "react";
import { useLocation, Link } from "react-router-dom";

function Result() {
  const location = useLocation();
  const shortUrl = location.state?.shortUrl;

  if (!shortUrl) {
    return (
      <div>
        <p>No URL found. Go back and shorten one!</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Shortened URL</h1>
      <a href={shortUrl} target="_blank" rel="noopener noreferrer">
        {shortUrl}
      </a>
      <div>
        <Link to="/">Shorten another</Link>
      </div>
    </div>
  );
}

export default Result;
