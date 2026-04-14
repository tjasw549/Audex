const GenresHero = (props) => {
  return (
    <div className="relative h-[240px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#060810] to-[#0d1f1f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-right,rgba(0,229,255,0.08),transparent_60%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#00e5ff]/20" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[4px] text-[#00e5ff] uppercase mb-2">
            Browse
          </p>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl leading-none text-white">
            Genres
          </h1>
        </div>
        <div className="flex items-center gap-3 mb-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search genres..."
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 text-[#ddeeff] placeholder-[#ddeeff]/20 text-xs tracking-widest px-4 py-2.5 w-full md:w-64 focus:outline-none focus:border-[#00e5ff]/50"
          />
        </div>
      </div>
    </div>
  );
};

export default GenresHero;
