import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const AddToPlaylistModal = ({ song, onClose }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage("Please log in to add to playlists.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_playlists")
        .select("id, name")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (!error && data) {
        setPlaylists(data);
      }
      setLoading(false);
    };

    fetchPlaylists();
  }, []);

  const addToPlaylist = async (playlistId) => {
    setMessage("Adding...");
    
    // Insert into Supabase
    const { error } = await supabase
      .from("user_playlist_songs")
      .insert({
        playlist_id: playlistId,
        song_id: song.song_id,
      });

    if (error) {
      if (error.code === '23505') { // Postgres unique violation code
        setMessage("Song is already in this playlist!");
      } else {
        setMessage("Error adding song.");
      }
      setTimeout(() => setMessage(""), 2000);
    } else {
      setMessage("Added successfully!");
      setTimeout(() => onClose(), 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#090e1a] border border-[#00e5ff]/30 p-6 w-[350px] shadow-[0_0_40px_rgba(0,229,255,0.1)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#00e5ff] tracking-[3px] uppercase text-sm font-mono">
            Add to Playlist
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            ✕
          </button>
        </div>

        <p className="text-white mb-6 text-sm truncate">
          Adding: <span className="text-[#00e5ff]">{song?.title}</span>
        </p>

        {message && (
          <p className="text-[#00e5ff] text-xs font-mono tracking-widest uppercase mb-4 text-center">
            {message}
          </p>
        )}

        {loading ? (
          <p className="text-white/40 text-xs text-center font-mono uppercase">Loading playlists...</p>
        ) : playlists.length === 0 ? (
          <p className="text-white/40 text-xs text-center font-mono">
            No playlists found. Create one in the Playlists tab first!
          </p>
        ) : (
          <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
            {playlists.map((p) => (
              <button
                key={p.id}
                onClick={() => addToPlaylist(p.id)}
                className="text-left px-4 py-3 bg-white/5 hover:bg-[#00e5ff]/10 border border-white/5 hover:border-[#00e5ff]/30 text-white text-sm transition-all font-mono"
              >
                {p.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToPlaylistModal;