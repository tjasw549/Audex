import HomeHero from "../components/HomeHero.jsx";
import Ticker from "../components/Ticker.jsx";
import FeaturedArtists from "../components/FeaturedArtists.jsx";
import CTA from "../components/CTA.jsx";
import Genres from "../components/Genres.jsx";
import { useState, useEffect } from "react";

const HomeView = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch("https://comp4513-spotify-api.vercel.app/api/genres")
      .then((res) => res.json())
      .then((data) => {
        setGenres(data);
      });
  }, []);

  const artists = [
    {
      size: "large",
      artist_image_url:
        "https://images6.alphacoders.com/108/thumb-1920-1080803.jpg",
      genre: "R&B",
      artist_name: "The Weeknd",
      artist_id: 154,
    },
    {
      artist_image_url:
        "https://picfiles.alphacoders.com/343/thumb-1920-343737.jpg",
      genre: "Alt Pop",
      artist_name: "Billie Eilish",
      artist_id: 18,
    },
    {
      artist_image_url:
        "https://i.scdn.co/image/3a836196bfb341f736c7fe2704fb75de53f8dfbb",
      genre: "Hip-Hop",
      artist_name: "Kendrick Lamar",
      artist_id: 70,
    },
  ];

  const tickerItems = ["10,000+ Songs", "Browse by Artist", "Create Playlists"];

  return (
    <div className="bg-[#060810] text-[#ddeeff] min-h-screen overflow-hidden ">
      <HomeHero />
      <Ticker items={tickerItems} />
      <FeaturedArtists artists={artists} />
      <Genres genres={genres} />
      <CTA />
    </div>
  );
};

export default HomeView;
