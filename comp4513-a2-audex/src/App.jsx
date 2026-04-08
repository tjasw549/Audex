import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'; 

import HomeView from './views/HomeView'
import Header from './components/Header';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playlistCount, setPlaylistCount] = useState(124);
 
  return (
    <main className="bg-[#060810] min-h-screen text-[#ddeeff]">
      
      <Header
          isLoggedIn={isLoggedIn}
          playlistCount={playlistCount}
          onLogin={() => setIsLoggedIn(true)}
          onLogout={() => setIsLoggedIn(false)}
      />
      
      <Routes>
        <Route path="/" element={<HomeView />} />
        
        {/* fallback */}
        <Route path="*" element={<HomeView />} />
      </Routes>
    </main>
  );
}

export default App;
