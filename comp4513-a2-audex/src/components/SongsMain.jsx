import { Link, useNavigate } from "react-router-dom";

const SongsMain = ({ filtered, activeFilters, clearAll, sortBy, setSortBy }) => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col">

            {/* TOP BAR */}
            <div className="border-b border-white/5 px-8 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase">
                        {filtered.length} Results
                    </span>
                    {activeFilters.map((f, i) => (
                        <button
                            key={i}
                            onClick={f.clear}
                            className="flex items-center gap-1.5 bg-[#00e5ff]/10 border border-[#00e5ff]/25 text-[#00e5ff] text-[10px] tracking-widest px-2.5 py-1 hover:bg-[#00e5ff]/20 transition-colors capitalize"
                        >
                            {f.label} ×
                        </button>
                    ))}
                    {activeFilters.length > 0 && (
                        <button
                            onClick={clearAll}
                            className="text-[10px] tracking-widest text-[#ddeeff]/30 hover:text-[#ddeeff] transition-colors uppercase"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase">Sort</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white/5 border border-white/10 text-[#ddeeff] text-xs tracking-widest px-3 py-1.5 focus:outline-none focus:border-[#00e5ff]/50"
                    >
                        <option value="title">Title</option>
                        <option value="year">Year</option>
                        <option value="artist">Artist</option>
                    </select>
                </div>
            </div>

            {/* SONGS TABLE */}
            <div className="flex-1 overflow-y-auto">
                {filtered.length === 0 ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-[#ddeeff]/20 text-sm tracking-widest uppercase">
                            No songs match your filters
                        </p>
                    </div>
                ) : (
                    <table className="w-full border-collapse">
                        <thead className="sticky top-0 bg-[#060810]">
                            <tr>
                                <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-6 border-b border-white/5 w-8"></th>
                                <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5">Title</th>
                                <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5">Artist</th>
                                <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5">Genre</th>
                                <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5">Year</th>
                                <th className="border-b border-white/5"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((song, i) => (
                                <tr
                                    key={song.song_id}
                                    onClick={() => navigate(`/single-song/${song.song_id}`)}
                                    className="group hover:bg-[#00e5ff]/[0.04] transition-colors cursor-pointer"
                                >
                                    <td className="py-3 px-6 text-[11px] text-[#ddeeff]/20">
                                        {String(i + 1).padStart(2, "0")}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-[#ddeeff] group-hover:text-[#00e5ff] transition-colors">
                                        {song.title}
                                    </td>
                                    <td className="py-3 px-4 text-sm" onClick={(e) => e.stopPropagation()}>
                                        <Link
                                            to={`/single-artist/${song.artists.artist_id}`}
                                            className="text-[#ddeeff]/50 hover:text-[#00e5ff] transition-colors"
                                        >
                                            {song.artists.artist_name}
                                        </Link>
                                    </td>
                                    <td className="py-3 px-4 text-sm" onClick={(e) => e.stopPropagation()}>
                                        <Link
                                            to={`/single-genre/${song.genres.genre_id}`}
                                            className="text-[#ddeeff]/30 hover:text-[#00e5ff] transition-colors capitalize"
                                        >
                                            {song.genres.genre_name}
                                        </Link>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-[#ddeeff]/35">{song.year}</td>
                                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
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
                )}
            </div>
        </div>
    );
};

export default SongsMain;