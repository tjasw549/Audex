import HomeHero from "../components/HomeHero.jsx";
import Ticker from "../components/Ticker.jsx";
import FeaturedArtists from "../components/FeaturedArtists.jsx";
import CTA from "../components/CTA.jsx";
import Genres from "../components/Genres.jsx";

const HomeView = () => {
  const artists = [
    {
      size: "large",
      artist_image_url:
        "https://images6.alphacoders.com/108/thumb-1920-1080803.jpg",
      genre: "R&B",
      artist_name: "The Weeknd",
    },
    {
      artist_image_url:
        "https://i.scdn.co/image/ab6761610000f178d8b9980db67272cb4d2c3daf",
      genre: "Alt Pop",
      artist_name: "Billie Eilish",
    },
    {
      artist_image_url:
        "https://i.scdn.co/image/3a836196bfb341f736c7fe2704fb75de53f8dfbb",
      genre: "Hip-Hop",
      artist_name: "Kendrick Lamar",
    },
  ];

  const genres = [
    "Alt Z", "Alt Pop", "ATL Hip Hop", "Boy Band", "Brostep", "Canadian Hip Hop", "Chicago Rap", "Dance Pop", 
    "DFW Rap", "Emo Rap", "Folk-Pop", "Hip-Hop", "Indie Pop", "Latin", "Melodic Rap", "Pop", "Country", "R&B",
    "K-Pop", "Modern Rock"
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
