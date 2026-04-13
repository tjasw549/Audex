import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const SingleGenreView = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { genre_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(`https://comp4513-spotify-api.vercel.app/api/songs/genre/${genre_id}`)
            .then((res) => res.json())
            .then((data) => {
                setSongs(data);
                setLoading(false);
            });
    }, [genre_id]);

    const genreName = songs[0]?.genres?.genre_name;

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
        <div className="bg-[#060810] text-[#ddeeff] min-h-screen font-['mono']">

            {/* HERO */}
            <div className="relative h-[300px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#060810] to-[#0d1f1f]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-right,rgba(0,229,255,0.08),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom-left,rgba(0,100,120,0.1),transparent_60%)]" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#00e5ff]/20" />

                <div className="absolute bottom-0 left-0 right-0 p-12 flex items-end justify-between">
                    <div>
                        <p className="text-[11px] tracking-[4px] text-[#00e5ff] uppercase mb-2">
                            Genre
                        </p>
                        <h1 className="font-['Bebas_Neue'] text-7xl leading-none text-white mb-3 capitalize">
                            {genreName}
                        </h1>
                        <p className="text-xs text-[#ddeeff]/40 tracking-widest uppercase">
                            {songs.length} Songs
                        </p>
                    </div>
                </div>
            </div>

            {/* SONGS */}
            <div className="max-w-6xl mx-auto px-12 py-12">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase">Songs</span>
                    <div className="flex-1 h-px bg-[#00e5ff]/15" />
                </div>

                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5 w-8"></th>
                            <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5">Title</th>
                            <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5">Artist</th>
                            <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5">Year</th>
                            <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5">BPM</th>
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
                                <td className="py-3.5 px-4 text-[11px] text-[#ddeeff]/20">
                                    {String(i + 1).padStart(2, "0")}
                                </td>
                                <td className="py-3.5 px-4 text-sm text-[#ddeeff] group-hover:text-[#00e5ff] transition-colors">
                                    {song.title}
                                </td>
                                <td className="py-3.5 px-4 text-sm" onClick={(e) => e.stopPropagation()}>
                                    <Link
                                        to={`/single-artist/${song.artists?.artist_id}`}
                                        className="text-[#ddeeff]/50 hover:text-[#00e5ff] transition-colors"
                                    >
                                        {song.artists?.artist_name}
                                    </Link>
                                </td>
                                <td className="py-3.5 px-4 text-sm text-[#ddeeff]/35">
                                    {song.year}
                                </td>
                                <td className="py-3.5 px-4 text-sm text-[#ddeeff]/35">
                                    {song.bpm}
                                </td>
                                <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
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
    );
};

export default SingleGenreView;