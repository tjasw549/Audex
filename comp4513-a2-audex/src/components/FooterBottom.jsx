import GitHubIcon from "./GitHubIcon.jsx";

const FooterBottom = ({ githubUrl }) => {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-6 gap-4">
      
      <p className="text-[10px] sm:text-[11px] tracking-wide text-[#ddeeff]/20 text-center sm:text-left">
        © {year} Audex - COMP 4513 Assignment 2
      </p>

      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center sm:justify-end gap-2 text-[10px] sm:text-[11px] tracking-widest uppercase text-[#ddeeff]/30 hover:text-[#00c8ff] transition-colors duration-150"
      >
        <GitHubIcon />
        GitHub
      </a>
    </div>
  );
}

export default FooterBottom;