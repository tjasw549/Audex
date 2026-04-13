import { Link, useNavigate } from "react-router-dom";

const SongTable = ({ songs }) => {
    const navigate = useNavigate();

    return (
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
                {songs.map((song, i) => (
                    <tr 
                        key={song.song_id}
                        onClick={() => navigate(`/single-song/${song.song_id}`)}
                        className="group  hover:bg-[#00e5ff]/[0.04] transition-colors cursor-pointer"
                    >
                        <td className="text-[16px] py-3 px-6 text-[11px] text-[#ddeeff]/20">
                            {String(i + 1).padStart(2, "0")}
                        </td>
                        <td className="text-[16px] py-3 px-4 text-sm text-[#ddeeff] group-hover:text-[#00e5ff] transition-colors">
                            {song.title}
                        </td>
                        <td className="text-[16px]py-3 px-4 text-sm" onClick={(e) => e.stopPropagation()}>
                            <Link
                                to={`/single-artist/${song.artists?.artist_id}`}
                                className="text-[#ddeeff]/50 hover:text-[#00e5ff] transition-colors"
                            >
                                {song.artists?.artist_name}
                            </Link>
                        </td>
                        <td className="text-[16px] py-3 px-4 text-sm" onClick={(e) => e.stopPropagation()}>
                            <Link
                                to={`/single-genre/${song.genres?.genre_id}`}
                                className="text-[#ddeeff]/30 hover:text-[#00e5ff] transition-colors capitalize"
                            >
                                {song.genres?.genre_name}
                            </Link>
                        </td>
                        <td className="text-[16px] py-3 px-4 text-sm text-[#ddeeff]/35">{song.year}</td>
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
    );
};

export default SongTable;