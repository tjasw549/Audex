import { useState } from 'react';
import Logo from '../components/Logo.jsx';
import NavLinks from '../components/NavLinks.jsx';
import HeaderRight from '../components/HeaderRight.jsx';

const Header = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center justify-between px-12 max-md:px-4 bg-[#0a0f1a]/70 backdrop-blur-md border-b border-[#00c8ff]/10">
        <Logo />
        <HeaderRight
          isLoggedIn={props.isLoggedIn}
          playlistName={props.playlistName}
          playlistCount={props.playlistCount}
          onLogout={props.onLogout}
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen(prev => !prev)}
        >
          <NavLinks 
            isLoggedIn={props.isLoggedIn}
            onAbout={props.onAbout}
          />
        </HeaderRight>
      </header>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="fixed top-[68px] left-0 right-0 z-40 bg-[#0a0f1a]/95 border-b border-[#00c8ff]/10 md:hidden">
          <NavLinks isLoggedIn={props.isLoggedIn} mobile onLinkClick={() => setMenuOpen(false)} />
        </div>
      )}

      <div className="h-[68px] flex-shrink-0" aria-hidden="true" />
    </div>
  );
};

export default Header;