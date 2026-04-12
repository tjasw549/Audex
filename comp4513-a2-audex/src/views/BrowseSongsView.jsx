import HomeHero from "../components/HomeHero.jsx";
import Ticker from "../components/Ticker.jsx";
import FeaturedArtists from "../components/FeaturedArtists.jsx";
import CTA from "../components/CTA.jsx";
import { useEffect } from "react";

const BrowseSongsView = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#060810] text-[#ddeeff] min-h-screen overflow-hidden font-mono"></div>
  );
};

export default BrowseSongsView;
