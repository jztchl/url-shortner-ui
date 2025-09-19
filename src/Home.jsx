import {useState} from 'react';
import { shortenUrl } from './utils/apis';
import { useNavigate } from "react-router-dom";

function Home() {
const [url, setUrl] = useState('');
const [shortenedUrl, setShortenedUrl] = useState('');
const navigate = useNavigate();

const handleShorten = async () => {
  try {
    const data = await shortenUrl(url);
    setShortenedUrl(data.shortenedUrl);
    navigate("/result", { state: { shortUrl: data.short_url } });
    
  } catch (error) {
    console.error("Error shortening URL:", error);
  }}

  return (
    <div>
      <h1>Welcome to the Url Shortner Page</h1>
        <input type="text" placeholder="Enter URL" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button onClick={handleShorten}>Shorten</button>
    </div>
  );
}
export default Home;