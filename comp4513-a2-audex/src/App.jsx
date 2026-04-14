import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomeView from "./views/HomeView";
import ArtistsView from "./views/ArtistsView";
import GenresView from "./views/GenresView";
import SingleGenreView from "./views/SingleGenreView";
import SingleArtistView from "./views/SingleArtistView";
import SingleSongView from "./views/SingleSongView";
import SongsView from "./views/SongsView";
import LoginView from "./views/LoginView";
import PlaylistView from "./views/PlaylistView";
import AboutView from "./views/AboutView";

import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const PROJECT = {
    name:       "Audex",
    course:     "COMP 4513 - Assignment 2",
    semester:   "Winter 2026",
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playlistName, setPlaylistName] = useState("Playlist");
  const [playlistCount, setPlaylistCount] = useState(124);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <main className="bg-[#060810] min-h-screen text-[#ddeeff]">
      <Header
        isLoggedIn={isLoggedIn}
        playlistName={playlistName}
        playlistCount={playlistCount}
        onLogout={() => setIsLoggedIn(false)}
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
        <Route path="/single-artist/:artist_id" element={<SingleArtistView />} />
        <Route path="/single-song/:song_id" element={<SingleSongView />} />
        <Route path="/genres" element={<GenresView />} />
        <Route path="/single-genre/:genre_id" element={<SingleGenreView />} />
        <Route path="/songs" element={<SongsView />} />
        <Route path="/login" element={<LoginView onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/songs/:artist_id" element={<SongsView />} />
        <Route path="/songs/:genre_id" element={<SongsView />} />
        <Route path="/songs/genre/:genre_id" element={<SongsView />} />
        <Route path="/playlists" element={<PlaylistView />} />

        {/* fallback */}
        <Route path="*" element={<HomeView />} />
      </Routes>

      <Footer onAbout={() => setAboutOpen(true)} githubUrl={PROJECT.githubRepo} />
    </main>
  );
};

export default App;
