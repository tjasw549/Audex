import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SongsFilter from "../components/SongsFilter";
import SongsMain from "../components/SongsMain";

const SongsView = () => {
    const [songs, setSongs] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [titleFilter, setTitleFilter] = useState("");
    const [selectedYears, setSelectedYears] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [sortBy, setSortBy] = useState("title");
    const { artist_id } = useParams();
    const { genre_id } = useParams();


    useEffect(() => {
        window.scrollTo(0, 0);

        if (artist_id) {
            setSelectedArtists([Number(artist_id)]);
        }

        if (genre_id) {
            setSelectedGenres([Number(genre_id)]);
        }

        fetch("https://comp4513-spotify-api.vercel.app/api/songs")
            .then((res) => res.json())
            .then((data) => {
                setSongs(data);
                setFiltered(data);
                setLoading(false);
            });
    }, []);

    const years = [...new Set(songs.map((s) => s.year))].sort();
    const artists = [...new Map(songs.map((s) => [s.artists.artist_id, s.artists])).values()]
        .sort((a, b) => a.artist_name.localeCompare(b.artist_name));
    const genres = [...new Map(songs.map((s) => [s.genres.genre_id, s.genres])).values()]
        .sort((a, b) => a.genre_name.localeCompare(b.genre_name));

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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#060810]">
                <span className="font-['Bebas_Neue'] text-4xl tracking-[8px] text-[#00e5ff]/40 animate-pulse">LOADING...</span>
            </div>
        );
    }

    return (
        <div className="bg-[#060810] text-[#ddeeff] min-h-screen font-['mono'] flex">
            <SongsFilter
                titleFilter={titleFilter}
                setTitleFilter={setTitleFilter}
                selectedYears={selectedYears}
                toggleYear={toggleYear}
                selectedArtists={selectedArtists}
                toggleArtist={toggleArtist}
                selectedGenres={selectedGenres}
                toggleGenre={toggleGenre}
                years={years}
                artists={artists}
                genres={genres}
            />
            <SongsMain
                filtered={filtered}
                activeFilters={activeFilters}
                clearAll={clearAll}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
        </div>
    );
};

export default SongsView;