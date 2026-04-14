import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { supabase } from "./lib/supabase";

import HomeView from "./views/HomeView.jsx";
import ArtistsView from "./views/ArtistsView.jsx";
import GenresView from "./views/GenresView.jsx";
import SingleGenreView from "./views/SingleGenreView.jsx";
import SingleArtistView from "./views/SingleArtistView.jsx";
import SingleSongView from "./views/SingleSongView.jsx";
import SongsView from "./views/SongsView.jsx";
import LoginView from "./views/LoginView.jsx";
import PlaylistView from "./views/PlaylistView.jsx";
import AboutView from "./views/AboutView.jsx";

import Header from "./components/Header";
import Footer from "./components/Footer";

const Toast = ({ message, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 right-6 z-[200] px-5 py-3 bg-[#090e1a] border border-[#00c8ff]/30 text-[#ddeeff] font-mono text-[11px] tracking-widest uppercase shadow-[0_0_20px_rgba(0,200,255,0.1)]">
      {message}
    </div>
  );
};

const PROJECT = {
  name: "Audex",
  course: "COMP 4513 - Assignment 2",
  semester: "Winter 2026",
  githubRepo: "https://github.com/tjasw549/audex",
};

const TEAM = [
  { name: "Tarun Jaswal", github: "https://github.com/tjasw549" },
  { name: "Mitchel Chanthaseng", github: "https://github.com/mitchelc-droid" },
];

const TECHNOLOGIES = [
  { name: "React v19", purpose: "UI framework" },
  { name: "Vite", purpose: "Build tool" },
  { name: "Tailwind CSS", purpose: "Styling" },
  { name: "Supabase", purpose: "Auth & playlist persistence" },
  { name: "React Router v7", purpose: "Client-side routing" },
  { name: "Recharts v3", purpose: "Song Chart" },
];

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
  const [currentPlaylistName, setCurrentPlaylistName] = useState("Playlist");
  const [playlistCount, setPlaylistCount] = useState(0);

  const showToast = (msg) => setToast(msg);

  const loadDefaultPlaylist = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("user_playlists")
      .select("id, name, user_playlist_songs(count)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data) {
      setCurrentPlaylistId(data.id);
      setCurrentPlaylistName(data.name);
      setPlaylistCount(data.user_playlist_songs?.[0]?.count ?? 0);
    }
  }, []);

  const refreshPlaylistCount = useCallback(async (id) => {
    const targetId = id ?? currentPlaylistId;
    if (!targetId) return;

    const { count } = await supabase
      .from("user_playlist_songs")
      .select("*", { count: "exact", head: true })
      .eq("playlist_id", targetId);

    setPlaylistCount(count ?? 0);
  }, [currentPlaylistId]);

  const addToPlaylist = useCallback(async (songId) => {
    if (!isLoggedIn) {
      showToast("Login to add songs to a playlist");
      return;
    }
    if (!currentPlaylistId) {
      showToast("Select a playlist first");
      return;
    }

    const { data: existing } = await supabase
      .from("user_playlist_songs")
      .select("id")
      .eq("playlist_id", currentPlaylistId)
      .eq("song_id", songId)
      .maybeSingle();

    if (existing) {
      showToast("Already in playlist");
      return;
    }

    const { error } = await supabase
      .from("user_playlist_songs")
      .insert({ playlist_id: currentPlaylistId, song_id: songId });

    if (!error) {
      refreshPlaylistCount();
      showToast("Added to playlist ✦");
    }
  }, [isLoggedIn, currentPlaylistId, refreshPlaylistCount]);

  const onPlaylistSelect = useCallback((playlist) => {
    setCurrentPlaylistId(playlist.id);
    setCurrentPlaylistName(playlist.name);
    setPlaylistCount(playlist.user_playlist_songs?.[0]?.count ?? 0);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setCurrentPlaylistId(null);
    setCurrentPlaylistName("Playlist");
    setPlaylistCount(0);
  };

  return (
    <main className="bg-[#060810] min-h-screen text-[#ddeeff]">
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      <Header
        isLoggedIn={isLoggedIn}
        playlistName={currentPlaylistName}
        playlistCount={playlistCount}
        onLogout={handleLogout}
        onAbout={() => setAboutOpen(true)}
      />

      <AboutView
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        project={PROJECT}
        team={TEAM}
        technologies={TECHNOLOGIES}
      />

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/artists" element={<ArtistsView />} />
        <Route path="/single-artist/:artist_id" element={<SingleArtistView addToPlaylist={addToPlaylist} />} />
        <Route path="/single-song/:song_id" element={<SingleSongView addToPlaylist={addToPlaylist} />} />
        <Route path="/genres" element={<GenresView />} />
        <Route path="/single-genre/:genre_id" element={<SingleGenreView addToPlaylist={addToPlaylist} />} />
        <Route path="/songs" element={<SongsView addToPlaylist={addToPlaylist} />} />
        <Route path="/songs/genre/:genre_id" element={<SongsView addToPlaylist={addToPlaylist} />} />
        <Route path="/playlists"
          element={
            <PlaylistView
              currentPlaylistId={currentPlaylistId}
              onPlaylistSelect={onPlaylistSelect}
              onCountChange={refreshPlaylistCount}
            />
          }
        />
        <Route path="/login"
          element={
            <LoginView onLogin={() => {
              setIsLoggedIn(true);
              loadDefaultPlaylist();
            }} />
          }
        />
        <Route path="*" element={<HomeView />} />
      </Routes>

      <Footer onAbout={() => setAboutOpen(true)} githubUrl={PROJECT.githubRepo} />
    </main>
  );
};

export default App;