import { Link, useNavigate } from "react-router-dom";
import SongTable from "./SongTable.jsx";

const SongsMain = ({ filtered, activeFilters, clearAll, sortBy, setSortBy, addToPlaylist }) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col">

      {/* Top Bar */}
      <div className="border-b border-white/5 px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[16px] tracking-[3px] text-[#ddeeff]/30 uppercase">
            {filtered.length} Results
          </span>

          {activeFilters.map((f, i) => (
            <button
              key={i}
              onClick={f.clear}
              className="flex items-center gap-1.5 bg-[#00c8ff]/10 border border-[#00c8ff]/25 text-[#00c8ff] text-[12px] tracking-widest px-2.5 py-1 hover:bg-[#00c8ff]/20 transition-colors capitalize"
            >
              {f.label} x
            </button>
          ))}

          {activeFilters.length > 0 && (
            <button
              onClick={clearAll}
              className="text-[12px] tracking-widest text-[#ddeeff]/30 hover:text-[#ddeeff] transition-colors uppercase"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[12px] tracking-[3px] text-[#ddeeff]/30 uppercase">
            Sort
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#0a1628] border border-[#00c8ff]/20 text-[#ddeeff] text-[12px] tracking-widest px-3 py-1.5 focus:outline-none focus:border-[#00c8ff]/50 appearance-none cursor-pointer"
          >
            <option value="title">Title</option>
            <option value="year">Year</option>
            <option value="artist">Artist</option>
          </select>
        </div>
      </div>

      {/* Songs Table */}
      {filtered.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-[#ddeeff]/20 text-sm tracking-widest uppercase">
            No songs match your filters
          </p>
        </div>
      ) : (
        <SongTable songs={filtered} addToPlaylist={addToPlaylist} />
      )}
    </div>
  );
};

export default SongsMain;