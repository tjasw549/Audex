import { Link } from 'react-router-dom';

{/* Hamburger Icon created by Claude */}
const HamburgerIcon = ({ isLoggedIn, open, onToggle }) => (
  <button
    onClick={onToggle}
    className={`${isLoggedIn ? 'lg:hidden' : 'md:hidden'} flex flex-col justify-center gap-[5px] w-8 h-8 ml-1 cursor-pointer bg-transparent border-none`}
    aria-label={open ? 'Close menu' : 'Open menu'}
  >
    <span className={`block h-[1.5px] w-[18px] bg-[#ddeeff]/60 transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
    <span className={`block h-[1.5px] w-[18px] bg-[#ddeeff]/60 transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
    <span className={`block h-[1.5px] w-[18px] bg-[#ddeeff]/60 transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
  </button>
);

const HeaderRight = ({ isLoggedIn, playlistName, playlistCount, onLogin, onLogout, menuOpen, onMenuToggle, children }) => {
  return (
    <div className="flex items-center gap-3 flex-shrink-0">
      {children}

      <div className={`${isLoggedIn ? 'hidden lg:block' : 'hidden md:block'} w-px h-5 bg-[#ddeeff]/10 mx-1`} />

      {isLoggedIn && (
        <Link to="/playlists">
          <button
            className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.08em] text-[#ddeeff]/40 transition-colors duration-150 hover:text-[#ddeeff]"
            aria-label={`Current playlist — ${playlistCount} songs`}
          >
            <span className="hidden sm:inline">{playlistName}</span>
            <span className="w-5 h-5 flex items-center justify-center text-[10px] font-medium text-[#060810] bg-[#00c8ff] rounded-full shadow-[0_0_8px_rgba(0,200,255,0.4)]">
              {playlistCount}
            </span>
          </button>
        </Link>
      )}

      {isLoggedIn ? (
        <button
          className="px-5 py-2 text-[11px] font-mono font-medium uppercase tracking-widest rounded-sm transition-transform duration-200 border border-[#ddeeff]/15 text-[#ddeeff]/45 hover:text-[#ddeeff] hover:border-[#ddeeff]/40 bg-transparent"
          onClick={onLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className="px-6 py-2 text-[11px] font-mono font-medium uppercase tracking-widest rounded-sm transition-transform duration-200 bg-[#00c8ff] text-[#060810] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2px_2px_0_#1a4a6a]"
          onClick={onLogin}
        >
          Login
        </button>
      )}

      <HamburgerIcon isLoggedIn={isLoggedIn} open={menuOpen} onToggle={onMenuToggle} />
    </div>
  );
};

export default HeaderRight;