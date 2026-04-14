const AboutHeader = ({ project, onClose }) => {
    return(
        <div className="flex items-start justify-between px-7 pt-6 pb-4 border-b border-cyan-400/10 flex-shrink-0">
            <div>
                <div className="text-[12px] tracking-[0.2em] uppercase text-cyan-400/60 mb-2 flex items-center gap-2">
                    <span className="w-4 h-px bg-cyan-400/40" />
                    {project.course}
                </div>

                <h2 className="font-['Bebas_Neue'] text-[32px] leading-none tracking-[0.05em] text-[#ddeeff]">
                    About <span className="text-cyan-400">{project.name}</span>
                </h2>
            </div>

            <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-[#ddeeff]/30 hover:text-[#ddeeff] border border-transparent hover:border-white/10 transition-all duration-150 flex-shrink-0 mt-1 bg-transparent cursor-pointer text-lg leading-none"
            >
                x
            </button>
        </div>
    );
}

export default AboutHeader;