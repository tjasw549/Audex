const ArtistsHero = () => {
  return (
    <section className="relative h-[40vh] min-h-[280px] flex items-end px-12 pb-12 overflow-hidden">
      {/* background grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#ddeeff 1px, transparent 1px), linear-gradient(90deg, #ddeeff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* cyan glow */}
      <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-[1200px] w-full mx-auto">
        <div className="text-[13px] tracking-[0.2em] uppercase text-cyan-400 mb-4">
          — Discover
        </div>
        <h1 className="font-['Bebas_Neue'] text-[clamp(60px,10vw,120px)] leading-none">
          All{" "}
          <span
            style={{
              WebkitTextStroke: "1px #ddeeff",
              color: "transparent",
            }}
          >
            Artists
          </span>
        </h1>
        <p className="text-white/30 text-sm mt-4 tracking-widest">
          Browse by artist name
        </p>
      </div>
    </section>
  );
};

export default ArtistsHero;
