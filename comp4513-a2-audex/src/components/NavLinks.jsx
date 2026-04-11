import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { label: "Home",      to: "/" },
  { label: "Artists",   to: "/artists" },
  { label: "Genres",     to: "/genres" },
  { label: "Songs",     to: "/songs" },
  { label: "Playlists", to: "/playlists", requiresAuth: true },
  { label: "About",     to: "/about" },
];

const NavLinks = ({ isLoggedIn, mobile = false, onLinkClick }) => {
  const filtered = NAV_LINKS.filter(link => !link.requiresAuth || isLoggedIn);

  if (mobile) {
    return (
      <ul className="flex flex-col list-none py-2">
        {filtered.map(link => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `block text-[11px] font-mono uppercase tracking-widest px-6 py-3 transition ${
                  isActive ? 'text-[#00c8ff]' : 'text-[#ddeeff]/50 hover:text-[#ddeeff] hover:bg-[#ddeeff]/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`${isLoggedIn ? 'hidden lg:flex' : 'hidden md:flex'} items-center gap-1 list-none`}>
      {filtered.map(link => (
        <li key={link.to}>
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              `text-[11px] font-mono uppercase tracking-widest px-4 py-2 rounded transition ${
                isActive
                  ? 'text-[#00c8ff] border-b border-[#00c8ff]'
                  : 'text-[#ddeeff]/50 hover:text-[#ddeeff] hover:bg-[#ddeeff]/5'
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