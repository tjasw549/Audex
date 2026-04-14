import { useEffect, useRef } from "react";

import AboutHeader from "../components/AboutHeader.jsx";
import ProjectSection from "../components/ProjectSection.jsx";
import TeamSection from "../components/TeamSection.jsx";
import TechSection from "../components/TechSection.jsx";
import SourceSection from "../components/SourceSection.jsx";
import AboutFooter from "../components/AboutFooter.jsx";

const AboutView = ({ isOpen, onClose, project, team, technologies, githubIcon }) => {
  const dialogRef = useRef(null);
  const contentRef = useRef(null);
 
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();

      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;

    const outside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;

    if (outside) onClose();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

 
  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="w-full max-w-[670px] max-h-[95vh] p-0 m-auto bg-[#060810] text-[#ddeeff] border border-cyan-400/15 overflow-hidden backdrop:bg-black/60 backdrop:backdrop-blur-sm open:flex open:flex-col"
    >
      
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent flex-shrink-0" />
 
      <AboutHeader project={project} onClose={onClose} />
      <div
        ref={contentRef} 
        className="overflow-y-auto flex-1 px-7 py-6 flex flex-col gap-7"
      >
        <ProjectSection />
        <TeamSection team={team} githubIcon={githubIcon} />
        <TechSection technologies={technologies} />
        <SourceSection project={project} />
      </div>
      <AboutFooter onClose={onClose} />
 
      {/* Bottom accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent flex-shrink-0" />
    </dialog>
  );
};

export default AboutView;