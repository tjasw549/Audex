import { Link } from "react-router-dom";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";

const FOOTER_LINKS = [
  { label: "Home", path: "/" },
  { label: "Artists", path: "/artists" },
  { label: "Genres", path: "/genres" },
  { label: "Songs", path: "/songs" },
  { label: "About", path: "/about" },
];

const Footer = ({ githubUrl = "https://github.com/tjasw549/Audex" }) => {
  const year = new Date().getFullYear();

  return (
    <div>
      <footer className="border-t border-[#00c8ff]/10 bg-[#0a0f1a] px-6 sm:px-10 lg:px-12 pt-10 sm:pt-12 pb-8 font-['mono']">
        <div className="max-w-[1200px] mx-auto">  
          <FooterTop />
          <FooterBottom githubUrl={githubUrl} />
        </div>
      </footer>

      {/* Accent line */}
      <div className="h-[1px] bg-gradient-to-r from-[#00c8ff]/30 to-transparent" />
    </div>
  );
}

export default Footer;
