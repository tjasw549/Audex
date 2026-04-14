import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const Toast = ({ message, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-[#090e1a] border border-[#00c8ff]/30 text-[#ddeeff] font-mono text-[11px] tracking-widest uppercase shadow-[0_0_20px_rgba(0,200,255,0.1)]">
      {message}
    </div>
  );
};

const PlaylistView = ({ currentPlaylistId, onPlaylistSelect, onCountChange }) => {
  const [playlists, setPlaylists] = useState([]);
  const [activeId, setActiveId] = useState(currentPlaylistId ?? null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [songsLoading, setSongsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => setToast(msg);

  // Keeps activeId in sync if App changes currentPlaylistId
  useEffect(() => {
    if (currentPlaylistId) setActiveId(currentPlaylistId);
  }, [currentPlaylistId]);

  // Fetchs all playlists
  const fetchPlaylists = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("user_playlists")
      .select("id, name, created_at, user_playlist_songs(count)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (!error) setPlaylists(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPlaylists(); }, [fetchPlaylists]);

  // Fetchs songs for a playlist
  const fetchSongs = async (playlistId) => {
    setSongsLoading(true);
    const { data, error } = await supabase
      .from("user_playlist_songs")
      .select(`
        id,
        song_id,
        added_at,
        songs (
          song_id, title, year,
          artists ( artist_id, artist_name )
        )
      `)
      .eq("playlist_id", playlistId)
      .order("added_at", { ascending: true });

    if (!error) setPlaylistSongs(data ?? []);
    setSongsLoading(false);
  };

  const selectPlaylist = (playlist) => {
    setActiveId(playlist.id);
    fetchSongs(playlist.id);
    onPlaylistSelect?.(playlist);
  };

  // Auto-load songs for the current playlist on mount
  useEffect(() => {
    if (activeId) fetchSongs(activeId);
  }, []); 

  const addPlaylist = async () => {
    if (!newName.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("user_playlists")
      .insert({ name: newName.trim(), user_id: user.id });

    if (!error) {
      setNewName("");
      fetchPlaylists();
      showToast("Playlist created");
    }
  };

  const deletePlaylist = async (id) => {
    const { error } = await supabase
      .from("user_playlists")
      .delete()
      .eq("id", id);

    if (!error) {
      if (activeId === id) {
        setActiveId(null);
        setPlaylistSongs([]);
      }
      fetchPlaylists();
      showToast("Playlist deleted");
    }
  };

  const removeSong = async (rowId, songTitle) => {
    const { error } = await supabase
      .from("user_playlist_songs")
      .delete()
      .eq("id", rowId);

    if (!error) {
      setPlaylistSongs((prev) => prev.filter((s) => s.id !== rowId));
      fetchPlaylists();       
      onCountChange?.(activeId); 
      showToast(`Removed "${songTitle}"`);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") addPlaylist(); };

  const songCount = (p) => p.user_playlist_songs?.[0]?.count ?? 0;

  const activePlaylist = playlists.find((p) => p.id === activeId);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#060810]">
        <span className="text-[#00c8ff]/40 tracking-[6px] font-['Bebas_Neue'] text-4xl animate-pulse">
          LOADING...
        </span>
      </div>
    );
  }

  return (
    <div className="bg-[#060810] text-[#ddeeff] min-h-screen font-mono p-12">

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      <h1 className="font-['Bebas_Neue'] text-5xl mb-8 tracking-widest text-white">
        Playlists
      </h1>

      {/* Playlist list */}
      <div className="bg-white/5 border border-white/10 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm tracking-[4px] text-[#00c8ff] uppercase">Your Playlists</h2>
          <span className="text-[11px] text-white/30 tracking-widest uppercase"># Songs</span>
        </div>

        {playlists.length === 0 ? (
          <p className="text-white/40 text-sm">No playlists yet - create one below.</p>
        ) : (
          <div className="flex flex-col divide-y divide-white/[0.06]">
            {playlists.map((p) => (
              <div
                key={p.id}
                onClick={() => selectPlaylist(p)}
                className={`flex justify-between items-center py-3 group cursor-pointer transition-colors duration-150 ${
                  activeId === p.id ? "text-[#00c8ff]" : "hover:text-[#00c8ff]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-1 h-1 rounded-full transition-colors duration-150 ${
                    activeId === p.id ? "bg-[#00c8ff]" : "bg-white/20 group-hover:bg-[#00c8ff]/50"
                  }`} />
                  <span className="text-[13px]">{p.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white/40 text-[12px]">{songCount(p)}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); deletePlaylist(p.id); }}
                    className="text-white/20 hover:text-red-400 transition-colors duration-150 bg-transparent border-0 cursor-pointer text-lg leading-none px-1"
                    aria-label={`Delete ${p.name}`}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add playlist */}
      <div className="bg-white/5 border border-white/10 p-6 mb-6">
        <div className="text-[11px] tracking-[0.2em] uppercase text-[#00c8ff]/60 mb-4 flex items-center gap-2">
          <span className="w-4 h-px bg-[#00c8ff]/40" />
          New Playlist
        </div>
        <div className="flex items-center gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Playlist name..."
            className="bg-[#090e1a] border border-white/10 px-4 py-2.5 text-[#ddeeff] font-mono text-[13px] placeholder:text-white/20 focus:border-[#00c8ff]/40 focus:outline-none focus:ring-1 focus:ring-[#00c8ff]/10 transition-colors duration-150 w-64"
          />
          <button
            onClick={addPlaylist}
            disabled={!newName.trim()}
            className="border border-[#00c8ff]/40 text-[#00c8ff] px-5 py-2.5 hover:bg-[#00c8ff]/10 transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed font-mono text-[13px] cursor-pointer bg-transparent"
          >
            +
          </button>
        </div>
      </div>

      {/* Songs in selected playlist */}
      {activePlaylist && (
        <div className="bg-white/5 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[#00c8ff] tracking-[3px] uppercase text-sm flex items-center gap-2">
              <span className="w-4 h-px bg-[#00c8ff]/40" />
              {activePlaylist.name}
            </h2>
            <span className="text-[11px] text-white/30 tracking-widest uppercase">
              {songCount(activePlaylist)} songs
            </span>
          </div>

          {/* Column headers */}
          {playlistSongs.length > 0 && (
            <div className="grid grid-cols-[1fr_1fr_80px_40px] gap-4 pb-2 mb-1 border-b border-white/10">
              {["Title", "Artist", "Year", ""].map((h) => (
                <span key={h} className="text-[10px] tracking-[0.2em] uppercase text-white/30">{h}</span>
              ))}
            </div>
          )}

          {songsLoading && (
            <p className="text-white/30 text-[12px] tracking-widest uppercase py-4">Loading...</p>
          )}

          {!songsLoading && playlistSongs.length === 0 && (
            <p className="text-white/30 text-[12px] py-4">
              No songs yet. Hit + on any song to add it here.
            </p>
          )}

          {!songsLoading && playlistSongs.map((row) => {
            const song = row.songs;
            if (!song) return null;
            return (
              <div
                key={row.id}
                className="grid grid-cols-[1fr_1fr_80px_40px] gap-4 py-3 border-b border-white/[0.06] items-center hover:bg-white/[0.02] transition-colors duration-150"
              >
                <Link
                  to={`/single-song/${song.song_id}`}
                  className="text-[13px] text-[#ddeeff] hover:text-[#00c8ff] transition-colors duration-150 truncate"
                >
                  {song.title}
                </Link>

                <Link
                  to={`/single-artist/${song.artists?.artist_id}`}
                  className="text-[13px] text-white/50 hover:text-[#00c8ff] transition-colors duration-150 truncate"
                >
                  {song.artists?.artist_name}
                </Link>

                <span className="text-[13px] text-white/40">{song.year}</span>

                <button
                  onClick={() => removeSong(row.id, song.title)}
                  className="text-white/20 hover:text-red-400 transition-colors duration-150 bg-transparent border-0 cursor-pointer text-lg leading-none"
                  aria-label={`Remove ${song.title}`}
                >
                  -
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlaylistView;