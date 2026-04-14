import AboutSection from "../components/AboutSection.jsx";

const TechSection = ({ technologies }) => {
    return(
        <AboutSection title="Built With">
            <div className="flex flex-col divide-y divide-white/[0.05]">
                {technologies.map((tech) => (
                    <div key={tech.name} className="flex items-center justify-between py-2.5">
                        <div className="flex items-center gap-2.5">
                            <span className="w-1 h-1 rounded-full bg-cyan-400/50" />
                            <span className="text-[#ddeeff] text-[14px]">{tech.name}</span>
                        </div>
                        <span className="text-[12px] font-mono uppercase tracking-widest text-[#ddeeff]/25">
                            {tech.purpose}
                        </span>
                    </div>
                ))}
            </div>
        </AboutSection>
    );
}

export default TechSection;