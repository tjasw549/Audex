import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const SingleArtistView = () => {
  const [artist, setArtist] = useState(null);
  const [averages, setAverages] = useState(null);
  const [loading, setLoading] = useState(true);
  const { artist_id } = useParams();
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`https://comp4513-spotify-api.vercel.app/api/artists/${artist_id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtist(data);
        setLoading(false);
      });

    fetch(
      `https://comp4513-spotify-api.vercel.app/api/artists/averages/${artist_id}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAverages(data);
      });

    fetch(
      `https://comp4513-spotify-api.vercel.app/api/songs/artist/${artist_id}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSongs(data);
      });
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
    <div className="bg-[#060810] text-[#ddeeff] w-full min-h-screen font-mono">
      {/* HERO */}
      <div className="relative h-[480px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#060810] to-[#0d1f1f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-right,rgba(0,229,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom-left,rgba(0,100,120,0.1),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#00e5ff]/20" />

        <div className="absolute bottom-0 left-0 right-0 p-12 flex items-end gap-10">
          <img
            src={artist?.artist_image_url}
            className="w-44 h-44 object-cover border-2 border-[#00e5ff] shadow-[0_0_40px_rgba(0,229,255,0.2)] flex-shrink-0"
          />
          <div>
            <p className="text-[11px] tracking-[4px] text-[#00e5ff] uppercase mb-2">
              Artist Profile
            </p>
            <h1 className="font-['Bebas_Neue'] text-7xl leading-none text-white mb-3">
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

      {/* RADAR CHART + SONGS */}
      {averages && (
        <div className="max-w-6xl mx-auto px-12 py-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase">
              Audio Profile
            </span>
            <div className="flex-1 h-px bg-[#00e5ff]/15" />
          </div>

          <div className="flex gap-12">
            {/* LEFT - Radar Chart */}
            <div className="w-[500px] h-[400px] flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={[
                    { metric: "Danceability", value: averages.danceability },
                    { metric: "Energy", value: averages.energy },
                    { metric: "Speechiness", value: averages.speechiness },
                    { metric: "Acousticness", value: averages.acousticness },
                    { metric: "Liveness", value: averages.liveness },
                    { metric: "Valence", value: averages.valence },
                  ]}
                >
                  <PolarGrid stroke="rgba(221,238,255,0.1)" />
                  <PolarAngleAxis
                    dataKey="metric"
                    tick={{
                      fill: "rgba(221,238,255,0.5)",
                      fontSize: 11,
                      fontFamily: "monospace",
                      letterSpacing: 2,
                    }}
                  />
                  <Radar
                    dataKey="value"
                    stroke="#00e5ff"
                    fill="#00e5ff"
                    fillOpacity={0.15}
                    strokeWidth={2}
                    dot={{ fill: "#00e5ff", r: 4 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* RIGHT - Songs */}
            <div className="flex-1">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-[#060810]">
                  <tr>
                    <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5 w-8"></th>
                    <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5">
                      Title
                    </th>
                    <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5">
                      Year
                    </th>
                    <th className="border-b border-white/5"></th>
                  </tr>
                </thead>
                <tbody>
                  {songs.map((song, i) => (
                    <tr
                      key={song.song_id}
                      onClick={() => navigate(`/single-song/${song.song_id}`)}
                      className="group hover:bg-[#00e5ff]/[0.04] transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4 text-[11px] text-[#ddeeff]/20">
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td className="py-3 px-4 text-sm text-[#ddeeff]">
                        {song.title}
                      </td>
                      <td className="py-3 px-4 text-sm text-[#ddeeff]/35">
                        {song.year}
                      </td>
                      <td
                        className="py-3 px-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => console.log("Add to playlist:", song)}
                          className="w-7 h-7 border border-[#00e5ff]/25 text-[#00e5ff] text-base hover:bg-[#00e5ff]/10 hover:border-[#00e5ff] transition-all flex items-center justify-center"
                        >
                          +
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleArtistView;
