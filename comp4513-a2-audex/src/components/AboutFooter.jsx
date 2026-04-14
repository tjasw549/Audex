const AboutFooter = ({ onClose }) => {
    return(
        <div className="flex justify-end px-7 py-4 border-t border-cyan-400/10 flex-shrink-0 bg-[#060810]">
            <button
                onClick={onClose}
                className="px-8 py-2.5 font-mono text-[12px] tracking-[0.1em] uppercase bg-cyan-400 text-[#060810] font-medium hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#1a4a6a] transition-all duration-200 cursor-pointer border-0"
            >
                Close
            </button>
        </div>
    );
}

export default AboutFooter;