import { Link } from 'react-router-dom'; 
import Logo from '../components/Logo.jsx';
import NavLinks from '../components/NavLinks.jsx';
import HeaderRight from '../components/HeaderRight.jsx';

const Header = (props) => {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center justify-between px-12 bg-[#060810]/70 backdrop-blur-md border-b border-[#00c8ff]/10">
        <Logo />
        <NavLinks isLoggedIn={props.isLoggedIn} />
        <HeaderRight 
          isLoggedIn={props.isLoggedIn}
          playlistCount={props.playlistCount}
          onLogin={props.onLogin}
          onLogout={props.onLogout}
        />
      </header>

      {/* Spacer so page content doesn't go under the header */}
      <div className="h-[68px] flex-shrink-0" aria-hidden="true" />
    </div>
  );
}

export default Header;
