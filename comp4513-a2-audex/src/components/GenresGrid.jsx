import { useNavigate } from "react-router-dom";

const GenresGrid = (props) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-12 py-12">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase">
          {props.filtered?.length || 0} Genres
        </span>
        <div className="flex-1 h-px bg-[#00e5ff]/15" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {props.filtered?.map((genre, i) => (
          <div
            key={genre.genre_id}
            onClick={() => navigate(`/songs/genre/${genre.genre_id}`)}
            className="relative border border-white/5 p-6 hover:border-[#00e5ff]/40 hover:bg-[#00e5ff]/[0.03] transition-all cursor-pointer group overflow-hidden"
          >
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
  );
};

export default GenresGrid;
