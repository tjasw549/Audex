import SectionLabel from "../components/SectionLabel";

const AboutSection = ({ title, children }) => {
    return(
        <div>
            <SectionLabel>{title}</SectionLabel>
            {children}
        </div>
    );
}

export default AboutSection;