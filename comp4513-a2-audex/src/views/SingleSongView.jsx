import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const SingleSongView = () => {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const { song_id } = useParams();
  const [relatedSongs, setRelatedSongs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`https://comp4513-spotify-api.vercel.app/api/songs/${song_id}`)
      .then((res) => res.json())
      .then((data) => {
        setSong(data);
        setLoading(false);

        // fetch related songs INSIDE the first fetch callback
        // so we have access to the song data without a dependency
        fetch(`https://comp4513-spotify-api.vercel.app/api/songs`)
          .then((res) => res.json())
          .then((allSongs) => {
            const related = allSongs
              .filter(
                (s) =>
                  s.song_id !== parseInt(song_id) &&
                  (s.artists?.artist_id === data.artists?.artist_id ||
                    s.genres?.genre_id === data.genres?.genre_id),
              )
              .slice(0, 4);
            setRelatedSongs(related);
          });
      });
  }, [song_id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#060810]">
        <span className="font-['Bebas_Neue'] text-4xl tracking-[8px] text-[#00e5ff]/40 animate-pulse">
          LOADING...
        </span>
      </div>
    );
  }

  const radarData = [
    { metric: "Danceability", value: song.danceability },
    { metric: "Energy", value: song.energy },
    { metric: "Speechiness", value: song.speechiness },
    { metric: "Acousticness", value: song.acousticness },
    { metric: "Liveness", value: song.liveness },
    { metric: "Valence", value: song.valence },
  ];

  return (
    <div className="bg-[#060810] text-[#ddeeff] min-h-screen overflow-x-hidden">
      {/* HERO */}
      <div className="relative h-[300px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#060810] to-[#0d1f1f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-right,rgba(0,229,255,0.08),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#00e5ff]/20" />

        <div className="absolute bottom-0 left-0 right-0 p-12">
          <p className="text-[11px] tracking-[4px] text-[#00e5ff] uppercase mb-2">
            Song
          </p>
          <h1 className="font-['Bebas_Neue'] text-7xl leading-none text-white mb-3">
            {song.title}
          </h1>
          <div className="flex items-center gap-6 text-xs text-[#ddeeff]/40 tracking-widest uppercase">
            <Link
              to={`/single-artist/${song.artists?.artist_id}`}
              className="hover:text-[#00e5ff] transition-colors"
            >
              {song.artists?.artist_name}
            </Link>
            <span className="text-[#00e5ff]/30">|</span>
            <span>{song.year}</span>
            <span className="text-[#00e5ff]/30">|</span>
            <span>{song.genres?.genre_name}</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-5 md:px-12 py-8 md:py-12 flex flex-col lg:flex-row gap-10 lg:gap-16">
        {" "}
        {/* LEFT - Stats + Button */}
        <div className="w-64 flex-shrink-0 w-full lg:w-64 flex-shrink-0">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase">
              Details
            </span>
            <div className="flex-1 h-px bg-[#00e5ff]/15 " />
          </div>

          <div className="space-y-4 mb-10 ">
            {[
              { label: "BPM", value: song.bpm },
              { label: "Popularity", value: song.popularity },
              { label: "Loudness", value: `${song.loudness} dB` },
              {
                label: "Duration",
                value: `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, "0")}`,
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className=" flex justify-between border-b border-white/5 pb-3"
              >
                <span className="text-xs text-[#ddeeff]/30 tracking-widest uppercase">
                  {label}
                </span>
                <span className="text-sm text-[#ddeeff]">{value}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => console.log("Add to playlist:", song)}
            className="w-full py-3 border border-[#00e5ff]/40 text-[#00e5ff] text-xs tracking-[3px] uppercase hover:bg-[#00e5ff]/10 hover:border-[#00e5ff] transition-all"
          >
            + Add to Playlist
          </button>
        </div>
        {/* RIGHT - Radar Chart */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase">
              Audio Profile
            </span>
            <div className="flex-1 h-px bg-[#00e5ff]/15" />
          </div>

          <div className="w-full h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
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
        </div>
      </div>

      {/* RELATED SONGS */}
      {relatedSongs.length > 0 && (
        <div className="max-w-6xl mx-auto px-12 pb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase">
              Related Songs
            </span>
            <div className="flex-1 h-px bg-[#00e5ff]/15" />
          </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">            {relatedSongs.map((s) => (
              <div
                key={s.song_id}
                onClick={() => navigate(`/single-song/${s.song_id}`)}
                className="border border-white/5 p-5 hover:border-[#00e5ff]/30 hover:bg-[#00e5ff]/[0.03] transition-all cursor-pointer group"
              >
                <p className="text-[10px] tracking-[3px] text-[#00e5ff]/60 uppercase mb-2">
                  {s.genres?.genre_name}
                </p>
                <p className="font-['Bebas_Neue'] text-xl text-white group-hover:text-[#00e5ff] transition-colors leading-tight mb-3">
                  {s.title}
                </p>
                <p className="text-xs text-[#ddeeff]/40">
                  {s.artists?.artist_name}
                </p>
                <p className="text-xs text-[#ddeeff]/25 mt-1">{s.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleSongView;
