import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlaylistView = () => {
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
  const [newName, setNewName] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------------------
  // Load songs (API)
  // ---------------------------
  useEffect(() => {
    fetch("https://comp4513-spotify-api.vercel.app/api/songs")
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
        setLoading(false);
      });
  }, []);

  // ---------------------------
  // Helpers
  // ---------------------------
  const currentPlaylist = playlists.find(
    (p) => p.id === currentPlaylistId
  );

  const getPlaylistSongs = (playlist) => {
    return songs.filter((s) =>
      playlist.songIds.includes(s.song_id)
    );
  };

  // ---------------------------
  // Create playlist
  // ---------------------------
  const addPlaylist = () => {
    if (!newName.trim()) return;

    const newPlaylist = {
      id: Date.now(),
      name: newName,
      songIds: []
    };

    setPlaylists([...playlists, newPlaylist]);
    setNewName("");
  };

  // ---------------------------
  // Delete playlist
  // ---------------------------
  const deletePlaylist = (id) => {
    setPlaylists(playlists.filter((p) => p.id !== id));

    if (currentPlaylistId === id) {
      setCurrentPlaylistId(null);
    }
  };

  // ---------------------------
  // Add / remove songs
  // ---------------------------
  const removeSongFromPlaylist = (songId) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === currentPlaylistId
          ? {
              ...p,
              songIds: p.songIds.filter((id) => id !== songId),
            }
          : p
      )
    );

    // 👉 toast hook point
    console.log("Removed song from playlist");
  };

  // ---------------------------
  // UI
  // ---------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#060810]">
        <span className="text-[#00e5ff]/40 tracking-[6px] font-['Bebas_Neue'] text-4xl animate-pulse">
          LOADING...
        </span>
      </div>
    );
  }

  return (
    <div className="bg-[#060810] text-[#ddeeff] min-h-screen font-mono p-12">

      {/* HEADER */}
      <h1 className="font-['Bebas_Neue'] text-5xl mb-8 tracking-widest text-white">
        Playlists
      </h1>

      {/* PLAYLISTS LIST */}
      <div className="bg-white/5 border border-white/10 p-6 mb-8">
        <h2 className="text-sm tracking-[4px] text-[#00e5ff] mb-4 uppercase">
          Your Playlists
        </h2>

        {playlists.length === 0 && (
          <p className="text-white/40 text-sm">No playlists yet</p>
        )}

        {playlists.map((p) => (
          <div
            key={p.id}
            className="flex justify-between items-center py-2 border-b border-white/10"
          >
            <div
              onClick={() => setCurrentPlaylistId(p.id)}
              className="cursor-pointer hover:text-[#00e5ff]"
            >
              <span className="font-bold">{p.name}</span>{" "}
              <span className="text-white/40 text-sm">
                ({p.songIds.length})
              </span>
            </div>

            <button
              onClick={() => deletePlaylist(p.id)}
              className="text-red-400 hover:text-red-300"
            >
              -
            </button>
          </div>
        ))}
      </div>

      {/* ADD PLAYLIST */}
      <div className="bg-white/5 border border-white/10 p-6 mb-8 flex items-center gap-4">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Playlist name..."
          className="bg-black/40 border border-white/10 px-4 py-2 text-white w-64"
        />

        <button
          onClick={addPlaylist}
          className="text-[#00e5ff] border border-[#00e5ff]/40 px-4 py-2 hover:bg-[#00e5ff]/10"
        >
          +
        </button>
      </div>

      {/* SONGS IN PLAYLIST */}
      {currentPlaylist && (
        <div className="bg-white/5 border border-white/10 p-6">
          <h2 className="text-[#00e5ff] mb-4 tracking-[3px] uppercase text-sm">
            {currentPlaylist.name}
          </h2>

          {getPlaylistSongs(currentPlaylist).map((song) => (
            <div
              key={song.song_id}
              className="flex justify-between items-center py-2 border-b border-white/10"
            >
              {/* TITLE → SONG VIEW */}
              <Link
                to={`/songs/${song.song_id}`}
                className="hover:text-[#00e5ff]"
              >
                {song.title}
              </Link>

              {/* ARTIST → ARTIST VIEW */}
              <Link
                to={`/artists/${song.artists.artist_id}`}
                className="text-white/60 hover:text-[#00e5ff]"
              >
                {song.artists.artist_name}
              </Link>

              <span className="text-white/40">{song.year}</span>

              <button
                onClick={() => removeSongFromPlaylist(song.song_id)}
                className="text-red-400 hover:text-red-300"
              >
                -
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistView;