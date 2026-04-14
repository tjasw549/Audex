import AboutSection from "../components/AboutSection.jsx";

const ProjectSection = () => {
    return(
        <AboutSection title="The Project">
            <p className="text-[#ddeeff]/55 text-[14px] leading-relaxed">
                Audex is a single-page music discovery app built with React and Vite.
                Browse 10,000+ songs, explore artists and genres, view audio analytics,
                and build playlists that persist across sessions.
            </p>
        </AboutSection>
    );
}

export default ProjectSection;