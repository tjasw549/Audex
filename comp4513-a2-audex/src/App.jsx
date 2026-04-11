import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomeView from "./views/HomeView";
import ArtistsView from "./views/ArtistsView";
import BrowseSongsView from "./views/BrowseSongsView";
import GenresView from "./views/GenresView";


import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playlistName, setPlaylistName] = useState("Playlist");
  const [playlistCount, setPlaylistCount] = useState(124);

  return (
    <main className="bg-[#060810] min-h-screen text-[#ddeeff]">
      <Header
        isLoggedIn={isLoggedIn}
        playlistName={playlistName}
        playlistCount={playlistCount}
        onLogin={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
      />

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/artists" element={<ArtistsView />} />
        <Route path="/genres" element={<GenresView />} />

        <Route path="/songs" element={<BrowseSongsView />} />
        {/* fallback */}
        <Route path="*" element={<HomeView />} />
      </Routes>

      <Footer />
    </main>
  );
};

export default App;
