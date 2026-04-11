import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const SingleArtistView = () => {
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const { artist_id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(`https://comp4513-spotify-api.vercel.app/api/artists/${artist_id}`)
            .then((res) => res.json())
            .then((data) => {
                setArtist(data);
                setLoading(false);
                console.log(data);
            });
    }, [artist_id]);

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
        <div className="bg-[#060810] text-[#ddeeff] w-full min-h-screen font-mono">

            {/* HERO */}
            <div className="relative h-[480px]  overflow-hidden">
                {/* Styled background instead of image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#060810] to-[#0d1f1f]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-right,rgba(0,229,255,0.08),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom-left,rgba(0,100,120,0.1),transparent_60%)]" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#00e5ff]/20" />

                <div className="absolute bottom-0 left-0 right-0 p-12 flex items-end gap-10">
                    <img
                        src={artist?.artist_image_url}
                        className="w-44 h-44 object-cover border-2 border-[#00e5ff] shadow-[0_0_40px_rgba(0,229,255,0.2)] flex-shrink-0"
                    />
                    <div>
                        <p className="text-[11px] tracking-[4px] text-[#00e5ff] uppercase mb-2">
                            Artist Profile
                        </p>
                        <h1 className="font-['Bebas_Neue'] text-7xl leading-none text-white mb-3">
                            {artist?.artist_name}
                        </h1>
                        <p className="text-xs text-[#ddeeff]/40 tracking-widest uppercase mb-4">
                            {artist?.types?.type_name || artist?.genre}
                        </p>
                        <p className="text-sm text-[#ddeeff]/50 leading-relaxed max-w-2xl mb-4">
                            {artist?.spotify_desc}
                        </p>

                        <a href={artist?.spotify_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#00e5ff] text-xs border-b border-[#00e5ff]/30 pb-0.5 hover:border-[#00e5ff] transition-colors"
                        >
                            {artist?.spotify_url}
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SingleArtistView;