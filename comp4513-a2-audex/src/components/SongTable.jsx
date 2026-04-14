import { Link, useNavigate } from "react-router-dom";

const SongTable = ({ songs, addToPlaylist }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden px-5 md:px-12 py-8">
      <table className="w-full min-w-[500px] border-collapse">
        <thead className="sticky top-0 bg-[#060810]">
          <tr>
            <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-6 border-b border-white/5 w-8" />
            <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5">Title</th>
            <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5">Artist</th>
            <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5">Genre</th>
            <th className="text-[10px] tracking-[3px] text-[#ddeeff]/30 uppercase text-left py-3 px-4 border-b border-white/5">Year</th>
            <th className="border-b border-white/5" />
          </tr>
        </thead>

        <tbody>
          {songs.map((song, i) => (
            <tr
              key={song.song_id}
              onClick={() => navigate(`/single-song/${song.song_id}`)}
              className="group hover:bg-[#00c8ff]/[0.04] transition-colors cursor-pointer"
            >
              {/* Index */}
              <td className="py-3 px-6 text-[11px] text-[#ddeeff]/20">
                {String(i + 1).padStart(2, "0")}
              </td>

              {/* Title */}
              <td className="py-3 px-4 text-sm text-[#ddeeff] group-hover:text-[#00c8ff] transition-colors">
                {song.title}
              </td>

              {/* Artist */}
              <td className="py-3 px-4 text-sm" onClick={(e) => e.stopPropagation()}>
                <Link
                  to={`/single-artist/${song.artists?.artist_id}`}
                  className="text-[#ddeeff]/50 hover:text-[#00c8ff] transition-colors"
                >
                  {song.artists?.artist_name}
                </Link>
              </td>

              {/* Genre */}
              <td className="py-3 px-4 text-sm" onClick={(e) => e.stopPropagation()}>
                <Link
                  to={`/single-genre/${song.genres?.genre_id}`}
                  className="text-[#ddeeff]/30 hover:text-[#00c8ff] transition-colors capitalize"
                >
                  {song.genres?.genre_name}
                </Link>
              </td>

              {/* Year */}
              <td className="py-3 px-4 text-sm text-[#ddeeff]/35">
                {song.year}
              </td>

              {/* Add to playlist */}
              <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => addToPlaylist(song.song_id)}
                  title="Add to current playlist"
                  className="w-7 h-7 border border-[#00c8ff]/25 text-[#00c8ff] text-base leading-none hover:bg-[#00c8ff]/10 hover:border-[#00c8ff] transition-all flex items-center justify-center relative"
                >
                  <span className="-translate-y-[2.5px]">+</span>
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