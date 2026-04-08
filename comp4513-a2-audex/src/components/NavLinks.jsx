import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { label: "Home",      to: "/" },
  { label: "Artists",   to: "/artists" },
  { label: "Genres",    to: "/genres" },
  { label: "Songs",     to: "/songs" },
  { label: "Playlists", to: "/playlists", requiresAuth: true },
  { label: "About",     to: "/about" },
];

const NavLinks = ({ isLoggedIn }) => {
  return (
    <ul className="flex items-center gap-4 list-none">
      {NAV_LINKS
        .filter(link => !link.requiresAuth || isLoggedIn)
        .map(link => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `text-[11px] font-mono uppercase tracking-widest px-4 py-2 rounded transition ${
                  isActive ? 'text-[#00c8ff] border-b border-[#00c8ff]' : 'text-[#ddeeff]/50 hover:text-[#ddeeff] hover:bg-[#ddeeff]/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
    </ul>
  );
};

export default NavLinks;