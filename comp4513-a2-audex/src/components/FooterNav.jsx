import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  { label: "Home", path: "/" },
  { label: "Artists", path: "/artists" },
  { label: "Genres", path: "/genres" },
  { label: "Songs", path: "/songs" },
  { label: "About", path: "/about" },
];

const FooterNav = ({ onAbout }) => {
  return (
    <nav aria-label="Footer navigation">
      <ul className="flex flex-wrap gap-x-3 gap-y-2">
        {FOOTER_LINKS.map((link, i) => (
          <li key={link.path} className="flex items-center gap-2">

            {link.label === "About" ? (
              <button
                onClick={onAbout}
                className="text-[10px] sm:text-[11px] tracking-widest uppercase text-[#ddeeff]/40 hover:text-[#00c8ff] transition-colors duration-150"
              >
                {link.label}
              </button>
            ) : (
              <Link
                to={link.path}
                className="text-[10px] sm:text-[11px] tracking-widest uppercase text-[#ddeeff]/40 hover:text-[#00c8ff] transition-colors duration-150"
              >
                {link.label}
              </Link>
            )}

            {i < FOOTER_LINKS.length - 1 && (
              <span className="hidden sm:inline text-[#ddeeff]/20 text-[11px]">
                |
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default FooterNav;