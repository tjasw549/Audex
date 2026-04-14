import AboutSection from "../components/AboutSection.jsx";
import GitHubIcon from "./GitHubIcon.jsx";

const SourceSection = ({ project }) => {
    return(
        <AboutSection title="Source Code">
            <a
                href={project.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-cyan-400/20 text-[12px] font-mono uppercase tracking-widest text-cyan-400/70 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors duration-150 no-underline"
            >
                <GitHubIcon />
                {project.githubRepo.replace(project.githubRepo, "View on Github")}
            </a>
        </AboutSection>
    );
}

export default SourceSection;