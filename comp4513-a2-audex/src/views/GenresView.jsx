import { useState, useEffect } from "react";
// Removed useNavigate here since it's not being used in the parent
import GenresHero from "../components/GenresHero.jsx";
import GenresGrid from "../components/GenresGrid.jsx";

const GenresView = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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
    <div className="bg-[#060810] overflow-x-hidden text-[#ddeeff] min-h-screen">
      <GenresHero search={search} setSearch={setSearch} />
      <GenresGrid filtered={filtered} />
    </div>
  );
};

export default GenresView;
