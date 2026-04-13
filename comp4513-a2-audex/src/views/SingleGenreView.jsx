import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SongTable from "../components/SongTable";


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
        <div className="bg-[#060810] text-[#ddeeff] min-h-screen ">

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
            <SongTable songs={songs} />


        </div>
    );
};

export default SingleGenreView;