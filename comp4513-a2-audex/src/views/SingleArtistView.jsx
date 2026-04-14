import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleArtistRadarChart from "../components/SingleArtistRadarChart";
import SongTable from "../components/SongTable"; 

const SingleArtist = () => {
  const [artist, setArtist] = useState(null);
  const [averages, setAverages] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { artist_id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`https://comp4513-spotify-api.vercel.app/api/artists/${artist_id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtist(data);
        setLoading(false);
      });

    fetch(`https://comp4513-spotify-api.vercel.app/api/artists/averages/${artist_id}`)
      .then((res) => res.json())
      .then((data) => setAverages(data));

    fetch(`https://comp4513-spotify-api.vercel.app/api/songs/artist/${artist_id}`)
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, [artist_id]);

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
    <div className="bg-[#060810] overflow-x-hidden text-[#ddeeff] w-full min-h-screen">
      {/* HERO SECTION */}
      <div className="relative h-[480px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#060810] to-[#0d1f1f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-right,rgba(0,229,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom-left,rgba(0,100,120,0.1),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#00e5ff]/20" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10 text-center md:text-left">
          <img
            src={artist?.artist_image_url}
            className="w-44 h-44 object-cover border-2 border-[#00e5ff] shadow-[0_0_40px_rgba(0,229,255,0.2)] flex-shrink-0"
            alt={artist?.artist_name}
          />
          <div>
            <p className="text-[11px] tracking-[4px] text-[#00e5ff] uppercase mb-2">
              Artist Profile
            </p>
            <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl leading-none text-white mb-3">
              {artist?.artist_name}
            </h1>
            <p className="text-xs text-[#ddeeff]/40 tracking-widest uppercase mb-4">
              {artist?.types?.type_name || artist?.genre}
            </p>
            <p className="text-sm text-[#ddeeff]/50 leading-relaxed max-w-4xl mb-4">
              {artist?.spotify_desc}
            </p>
            <a
              href={artist?.spotify_url}
              target="_blank"
              rel="noreferrer"
              className="text-[#00e5ff] text-xs border-b border-[#00e5ff]/30 pb-0.5 hover:border-[#00e5ff] transition-colors"
            >
              Check this Artist out on Spotify!
            </a>
          </div>
        </div>
      </div>

      {/* CHARTS AND TABLE CONTENT */}
      {averages && (
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase">
              Audio Profile
            </span>
            <div className="flex-1 h-px bg-[#00e5ff]/15" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* LEFT - Radar Chart */}
            <SingleArtistRadarChart averages={averages} />

            {/* RIGHT - Your specific generic SongTable */}
            <div className="flex-1 overflow-hidden">
               <SongTable songs={songs} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleArtist;