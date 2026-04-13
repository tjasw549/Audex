import { useEffect, useState } from "react";
import ArtistsHero from "../components/ArtistsHero";
import ArtistGrid from "../components/ArtistGrid";

const ArtistsView = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch("https://comp4513-spotify-api.vercel.app/api/artists")
      .then((res) => res.json())
      .then((data) => {
        setArtists(data);
        setLoading(false);
      });
  }, []);

   if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#060810]">
                <span className="font-['Bebas_Neue'] text-4xl tracking-[8px] text-[#00e5ff]/40 animate-pulse">
                    LOADING...
                </span>
            </div>
        );
    }

  return (
    <div className="bg-[#060810] text-[#ddeeff] min-h-screen font-['mono']">
      <ArtistsHero />
      <div className="border-t border-white/10 mx-12" />
        <ArtistGrid artists={artists} />
    </div>
  );
};

export default ArtistsView;