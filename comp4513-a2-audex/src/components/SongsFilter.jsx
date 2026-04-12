const SongsFilter = ({
    titleFilter, setTitleFilter,
    selectedYears, toggleYear,
    selectedArtists, toggleArtist,
    selectedGenres, toggleGenre,
    years, artists, genres,
}) => {
    return (
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
    );
};

export default SongsFilter;