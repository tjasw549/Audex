import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const SongsView = () => {
    const [songs, setSongs] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [titleFilter, setTitleFilter] = useState("");
    const [selectedYears, setSelectedYears] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [sortBy, setSortBy] = useState("title");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://comp4513-spotify-api.vercel.app/api/songs")
            .then((res) => res.json())
            .then((data) => {
                setSongs(data);
                setFiltered(data);
                setLoading(false);
            });
    }, []);

    // Derive unique filter options
    const years = [...new Set(songs.map((s) => s.year))].sort();
    const artists = [...new Map(songs.map((s) => [s.artists.artist_id, s.artists])).values()]
        .sort((a, b) => a.artist_name.localeCompare(b.artist_name));
    const genres = [...new Map(songs.map((s) => [s.genres.genre_id, s.genres])).values()]
        .sort((a, b) => a.genre_name.localeCompare(b.genre_name));

    useEffect(() => {
        let result = [...songs];

        if (titleFilter) result = result.filter((s) => s.title.toLowerCase().includes(titleFilter.toLowerCase()));
        if (selectedYears.length) result = result.filter((s) => selectedYears.includes(s.year));
        if (selectedArtists.length) result = result.filter((s) => selectedArtists.includes(s.artists.artist_id));
        if (selectedGenres.length) result = result.filter((s) => selectedGenres.includes(s.genres.genre_id));

        result.sort((a, b) => {
            if (sortBy === "title") return a.title.localeCompare(b.title);
            if (sortBy === "year") return b.year - a.year;
            if (sortBy === "artist") return a.artists.artist_name.localeCompare(b.artists.artist_name);
            return 0;
        });

        setFiltered(result);
    }, [titleFilter, selectedYears, selectedArtists, selectedGenres, sortBy, songs]);

    const toggleYear = (year) => setSelectedYears((prev) => prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]);
    const toggleArtist = (id) => setSelectedArtists((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);
    const toggleGenre = (id) => setSelectedGenres((prev) => prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]);

    const clearAll = () => {
        setTitleFilter("");
        setSelectedYears([]);
        setSelectedArtists([]);
        setSelectedGenres([]);
    };

    const activeFilters = [
        ...(titleFilter ? [{ label: titleFilter, clear: () => setTitleFilter("") }] : []),
        ...selectedYears.map((y) => ({ label: y, clear: () => toggleYear(y) })),
        ...selectedArtists.map((id) => ({ label: artists.find((a) => a.artist_id === id)?.artist_name, clear: () => toggleArtist(id) })),
        ...selectedGenres.map((id) => ({ label: genres.find((g) => g.genre_id === id)?.genre_name, clear: () => toggleGenre(id) })),
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#060810]">
                <span className="font-['Bebas_Neue'] text-4xl tracking-[8px] text-[#00e5ff]/40 animate-pulse">LOADING...</span>
            </div>
        );
    }

    return (
        <div className="bg-[#060810] text-[#ddeeff] min-h-screen font-mono flex">

            {/* SIDEBAR */}
            <div className="w-72 flex-shrink-0 border-r border-white/5 p-6 overflow-y-auto h-screen sticky top-0">
                <p className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase mb-6">Filters</p>

                {/* Title */}
                <div className="mb-6">
                    <p className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase mb-3">Title</p>
                    <input
                        type="text"
                        placeholder="Search title..."
                        value={titleFilter}
                        onChange={(e) => setTitleFilter(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-[#ddeeff] placeholder-[#ddeeff]/20 text-xs tracking-widest px-3 py-2 focus:outline-none focus:border-[#00e5ff]/50"
                    />
                </div>

                {/* Years */}
                <div className="mb-6">
                    <p className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase mb-3">Year</p>
                    <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                        {years.map((year) => (
                            <label key={year} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedYears.includes(year)}
                                    onChange={() => toggleYear(year)}
                                    className="accent-[#00e5ff]"
                                />
                                <span className={`text-xs ${selectedYears.includes(year) ? "text-[#00e5ff]" : "text-[#ddeeff]/40"} group-hover:text-[#ddeeff] transition-colors`}>
                                    {year}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Artists */}
                <div className="mb-6">
                    <p className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase mb-3">Artist</p>
                    <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                        {artists.map((artist) => (
                            <label key={artist.artist_id} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedArtists.includes(artist.artist_id)}
                                    onChange={() => toggleArtist(artist.artist_id)}
                                    className="accent-[#00e5ff]"
                                />
                                <span className={`text-xs ${selectedArtists.includes(artist.artist_id) ? "text-[#00e5ff]" : "text-[#ddeeff]/40"} group-hover:text-[#ddeeff] transition-colors`}>
                                    {artist.artist_name}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Genres */}
                <div className="mb-6">
                    <p className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase mb-3">Genre</p>
                    <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                        {genres.map((genre) => (
                            <label key={genre.genre_id} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedGenres.includes(genre.genre_id)}
                                    onChange={() => toggleGenre(genre.genre_id)}
                                    className="accent-[#00e5ff]"
                                />
                                <span className={`text-xs ${selectedGenres.includes(genre.genre_id) ? "text-[#00e5ff]" : "text-[#ddeeff]/40"} group-hover:text-[#ddeeff] transition-colors`}>
                                    {genre.genre_name}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* MAIN */}
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
                            <p className="text-[#ddeeff]/20 text-sm tracking-widest uppercase">No songs match your filters</p>
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
        </div>
    );
};

export default SongsView;