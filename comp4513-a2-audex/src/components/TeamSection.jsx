import AboutSection from "../components/AboutSection.jsx";
import GitHubIcon from "./GitHubIcon.jsx";

const TeamSection = ({ team }) => {
    return(
        <AboutSection title="Team">
            <div className="flex flex-col gap-2">
                {team.map((member) => (
                    <a
                        key={member.name}
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 border border-white/8 bg-[#090e1a]/60 hover:border-cyan-400/20 transition-colors duration-150 no-underline group"
                    >
                        <span className="text-[#ddeeff] text-[14px] group-hover:text-cyan-400 transition-colors duration-150">
                            {member.name}
                        </span>
                        <span className="flex items-center gap-1.5 text-[12px] font-mono uppercase tracking-widest text-[#ddeeff]/25 group-hover:text-cyan-400/60 transition-colors duration-150">
                            <GitHubIcon />
                            GitHub
                        </span>
                    </a>
                ))}
            </div>
        </AboutSection>
    );
}

export default TeamSection;