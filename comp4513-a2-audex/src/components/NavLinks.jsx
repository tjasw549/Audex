import { NavLink } from 'react-router-dom';
import { useRef } from 'react';

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Artists", to: "/artists" },
  { label: "Genres", to: "/genres" },
  { label: "Songs", to: "/songs" },
  { label: "Playlists", to: "/playlists", requiresAuth: true },
  { label: "About", to: "/about", isDialog: true }, // 👈 mark it
];

const NavLinks = ({ isLoggedIn, mobile = false, onLinkClick }) => {
  const filtered = NAV_LINKS.filter(link => !link.requiresAuth || isLoggedIn);

  const aboutDialogRef = useRef(null);

  const openAbout = (e) => {
    e.preventDefault();
    aboutDialogRef.current?.showModal();
    onLinkClick?.();
  };

  const closeAbout = () => {
    aboutDialogRef.current?.close();
  };

  const renderLink = (link) => {
    if (link.isDialog) {
      return (
        <a
          href="#"
          onClick={openAbout}
          className="text-[11px] uppercase tracking-widest px-4 py-2 text-[#ddeeff]/50 hover:text-[#ddeeff] hover:bg-[#ddeeff]/5 transition"
        >
          {link.label}
        </a>
      );
    }

    return (
      <NavLink
        to={link.to}
        onClick={onLinkClick}
        className={({ isActive }) =>
          `text-[11px] uppercase tracking-widest px-4 py-2 rounded transition ${isActive
            ? 'text-[#00c8ff] border-b border-[#00c8ff]'
            : 'text-[#ddeeff]/50 hover:text-[#ddeeff] hover:bg-[#ddeeff]/5'
          }`
        }
      >
        {link.label}
      </NavLink>
    );
  };

  return (
    <>
      {/* NAV */}
      <ul className={`${isLoggedIn ? 'hidden lg:flex' : 'hidden md:flex'} items-center gap-1 list-none`}>
        {filtered.map(link => (
          <li key={link.label}>
            {renderLink(link)}
          </li>
        ))}
      </ul>

      {/* ABOUT DIALOG */}
      <dialog
        ref={aboutDialogRef}
        className="
    fixed
    left-1/2 top-1/2
    -translate-x-1/2 -translate-y-1/2

    w-[95vw] max-w-[900px]
    min-h-[60vh] max-h-[85vh]

    rounded-xl
    p-10

    bg-[#0b0f1a]
    text-white

    shadow-2xl
    border border-[#00c8ff]/30

    overflow-y-auto

    flex flex-col
  "
      >
        {/* Top-right X button */}
        <button
          onClick={closeAbout}
          className="
      absolute top-4 right-4
      text-white/60 hover:text-white
      text-lg
    "
        >
          ✕
        </button>

        {/* Content */}
        <div className="flex flex-col gap-6 text-left">

          {/* Title */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-wide text-[#00c8ff]">
              About Audex
            </h2>
            <p className="text-sm text-white/50 mt-1">
              A modern music discovery experience
            </p>
          </div>

          {/* Description */}
          <div className="bg-white/5 rounded-lg p-5 border border-white/10">
            <p className="text-sm leading-relaxed text-white/80">
              <span className="text-white font-medium">Audex</span> is a single-page
              music discovery and playlist management application built to explore
              artists, genres, and songs in a clean and interactive interface.
              The goal of this project is to deliver a smooth user experience while
              demonstrating modern React development practices and component-based design.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="bg-white/5 rounded-lg p-5 border border-white/10">
            <h3 className="text-sm font-semibold text-white mb-2">Tech Stack</h3>
            <ul className="text-sm text-white/70 space-y-1 list-disc list-inside">
              <li>React (Vite)</li>
              <li>React Router</li>
              <li>Tailwind CSS</li>
              <li>JavaScript (ES6+)</li>
              <li>REST API integration (if applicable)</li>
            </ul>
          </div>

          {/* Team */}
          <div className="bg-white/5 rounded-lg p-5 border border-white/10">
            <h3 className="text-sm font-semibold text-white mb-2">Team Members</h3>
            <p className="text-sm text-white/70">
              {/* Replace with actual names */}
              Group Member 1, Group Member 2
            </p>
          </div>

          {/* GitHub */}
          <div className="bg-white/5 rounded-lg p-5 border border-white/10">
            <h3 className="text-sm font-semibold text-white mb-2">GitHub Repository</h3>
            <a
              href="https://github.com/tjasw549/Audex"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#00c8ff] hover:underline break-all"
            >
              https://github.com/tjasw549/Audex
            </a>
          </div>

        </div>

        {/* Spacer pushes button down */}
        <div className="mt-auto flex justify-end pt-8">
          <button
            onClick={closeAbout}
            className="
        px-4 py-2 text-sm
        bg-[#00c8ff]
        text-black
        rounded
        hover:opacity-90
      "
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};

export default NavLinks;