import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddToPlaylistModal from "./AddToPlaylistModal"; 

const SongTable = ({ songs }) => {
  const navigate = useNavigate();
  const [songToAdd, setSongToAdd] = useState(null);

  return (
    <div className="w-full pb-8">
      {songToAdd && (
        <AddToPlaylistModal 
          song={songToAdd} 
          onClose={() => setSongToAdd(null)} 
        />
      )}

      <table className="w-full table-auto border-collapse">
        <thead className="sticky top-0 bg-[#060810] z-10">
          <tr>
            <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-2 md:px-6 border-b border-white/5 w-8 md:w-12"></th>
            <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-2 md:px-4 border-b border-white/5">
              Title
            </th>
            <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-2 md:px-4 border-b border-white/5">
              Artist
            </th>
            <th className="hidden md:table-cell text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5">
              Genre
            </th>
            <th className="hidden md:table-cell text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5 w-20">
              Year
            </th>
            <th className="border-b border-white/5 w-12 md:w-16"></th>
          </tr>
        </thead>
        <tbody>
          {songs?.map((song, i) => (
            <tr
              key={song.song_id}
              onClick={() => navigate(`/single-song/${song.song_id}`)}
              className="group hover:bg-[#00e5ff]/[0.04] transition-colors cursor-pointer"
            >
              <td className="py-3 px-2 md:px-6 text-[11px] text-[#ddeeff]/20">
                {String(i + 1).padStart(2, "0")}
              </td>
              
              <td className="py-3 px-2 md:px-4 text-sm text-[#ddeeff] group-hover:text-[#00e5ff] transition-colors max-w-[120px] truncate">
                {song.title}
              </td>
              
              <td
                className="py-3 px-2 md:px-4 text-sm max-w-[100px] truncate"
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  to={`/single-artist/${song.artists?.artist_id}`}
                  className="text-[#ddeeff]/50 hover:text-[#00e5ff] transition-colors"
                >
                  {song.artists?.artist_name}
                </Link>
              </td>
              
              <td
                className="hidden md:table-cell py-3 px-4 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  to={`/single-genre/${song.genres?.genre_id}`}
                  className="text-[#ddeeff]/30 hover:text-[#00e5ff] transition-colors capitalize"
                >
                  {song.genres?.genre_name}
                </Link>
              </td>
              
              <td className="hidden md:table-cell py-3 px-4 text-sm text-[#ddeeff]/35">
                {song.year}
              </td>
              
              {/* Center the button inside its protected column */}
              <td className="py-3 px-2 md:px-4 text-center" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setSongToAdd(song)}
                  className="w-7 h-7 border border-[#00e5ff]/25 text-[#00e5ff] text-base hover:bg-[#00e5ff]/10 hover:border-[#00e5ff] transition-all flex items-center justify-center mx-auto"
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongTable;