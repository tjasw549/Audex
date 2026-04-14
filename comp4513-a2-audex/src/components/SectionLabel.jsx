const SectionLabel = ({ children }) => {
  return (
    <div className="text-[12px] tracking-[0.2em] uppercase text-cyan-400/60 mb-3 flex items-center gap-2">
        <span className="w-4 h-px bg-cyan-400/40" />
        {children}
    </div>
  );
}

export default SectionLabel;