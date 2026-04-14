import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GenresView = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch("https://comp4513-spotify-api.vercel.app/api/genres")
      .then((res) => res.json())
      .then((data) => {
        setGenres(data);
        setLoading(false);
      });
  }, []);

  const filtered = genres.filter((g) =>
    g.genre_name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center overflow-x-hidden h-screen bg-[#060810]">
        <span className="font-['Bebas_Neue'] text-4xl tracking-[8px] text-[#00e5ff]/40 animate-pulse">
          LOADING...
        </span>
      </div>
    );
  }

  return (
    <div className="bg-[#060810] overflow-x-hidden text-[#ddeeff] min-h-screen ">
      {/* HERO */}
      <div className="relative h-[240px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#060810] to-[#0d1f1f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-right,rgba(0,229,255,0.08),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#00e5ff]/20" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          {" "}
          <div>
            <p className="text-[11px] tracking-[4px] text-[#00e5ff] uppercase mb-2">
              Browse
            </p>
            <h1 className="font-['Bebas_Neue'] text-7xl leading-none text-white">
              Genres
            </h1>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <input
              type="text"
              placeholder="Search genres..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 text-[#ddeeff] placeholder-[#ddeeff]/20 text-xs tracking-widest px-4 py-2.5 w-64 focus:outline-none focus:border-[#00e5ff]/50"
            />
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-12 py-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase">
            {filtered.length} Genres
          </span>
          <div className="flex-1 h-px bg-[#00e5ff]/15" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((genre, i) => (
            <div
              key={genre.genre_id}
              onClick={() => navigate(`/songs/genre/${genre.genre_id}`)}
              className="relative border border-white/5 p-6 hover:border-[#00e5ff]/40 hover:bg-[#00e5ff]/[0.03] transition-all cursor-pointer group overflow-hidden"
            >
              {/* background number */}
              <span className="absolute -bottom-4 -right-2 font-['Bebas_Neue'] text-8xl text-white/[0.03] group-hover:text-[#00e5ff]/[0.06] transition-colors select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <p className="text-[10px] tracking-[3px] text-[#00e5ff]/50 uppercase mb-3">
                Genre
              </p>
              <p className="font-['Bebas_Neue'] text-3xl text-white group-hover:text-[#00e5ff] transition-colors leading-tight capitalize">
                {genre.genre_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenresView;
