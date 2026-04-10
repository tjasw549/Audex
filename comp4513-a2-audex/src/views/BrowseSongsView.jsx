import HomeHero from "../components/HomeHero.jsx";
import Ticker from "../components/Ticker.jsx";
import FeaturedArtists from "../components/FeaturedArtists.jsx";
import CTA from "../components/CTA.jsx";
import { useEffect } from "react";

const BrowseSongsView = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const artists = [
    {
      size: "large",
      image: "https://picsum.photos/seed/1/800/1000",
      genre: "Alt Pop",
      name: "Billie Eilish",
      songs: 124,
    },
    {
      image: "https://picsum.photos/seed/2/400/500",
      genre: "Hip-Hop",
      name: "Kendrick Lamar",
      songs: 98,
    },
    {
      image: "https://picsum.photos/seed/3/400/500",
      genre: "Indie Rock",
      name: "Mitski",
      songs: 87,
    },
  ];

  const genres = ["Alt Pop", "R&B", "Pop", "Hip-Hop", "Indie"];
  const tickerItems = ["10,000+ Songs", "Browse by Artist", "Create Playlists"];

  return (
    <div className="bg-[#060810] text-[#ddeeff] min-h-screen overflow-hidden font-mono"></div>
  );
};

export default BrowseSongsView;
