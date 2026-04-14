import SectionLabel from "../components/SectionLabel.jsx";

const AboutSection = ({ title, children }) => {
    return(
        <div>
            <SectionLabel>{title}</SectionLabel>
            {children}
        </div>
    );
}

export default AboutSection;