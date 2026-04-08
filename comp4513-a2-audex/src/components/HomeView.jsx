import { useState, useEffect, useRef } from "react";

export default function HomeView() {
  const [tickerPos, setTickerPos] = useState(0);
  const tickerRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      tickerRef.current -= 0.4;
      if (tickerRef.current < -1200) tickerRef.current = 0;
      setTickerPos(tickerRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="bg-[#060810] text-[#ddeeff] min-h-screen overflow-hidden font-mono">

      {/* HERO */}
      <section className="relative flex items-center pt-20 pb-14 overflow-hidden">

        {/* Vinyl */}
        <div className="vinyl-bg">
          {[100,140,180,220,260,300,340,380,420,460,500,540].map((r) => (
            <div
              key={r}
              className="vinyl-groove"
              style={{ width: r, height: r }}
            />
          ))}
          <div className="vinyl-inner" />
        </div>

        <div className="max-w-[1200px] mx-auto px-12 w-full relative z-10">

          <div className="text-[11px] tracking-[0.2em] uppercase text-cyan-400 mb-8 flex items-center gap-3">
            <span className="w-10 h-px bg-cyan-400"></span>
            Music Discovery Platform
          </div>

          <h1 className="font-['Bebas_Neue'] text-[clamp(80px,14vw,200px)] leading-[0.9]">
            Every<br />
            <span className="text-outline">Song</span><br />
            <span className="text-cyan-400 drop-shadow-[0_0_40px_rgba(0,200,255,0.3)]">Ever.</span>
          </h1>

          <div className="h-px bg-white/10 my-10"></div>

          <div className="flex flex-wrap justify-between items-end gap-8">

            <div className="max-w-[400px]">
              <p className="font-serif italic text-[20px] text-white/50 mb-8 leading-relaxed">
                Browse thousands of tracks. Filter by artist, genre, year. Build playlists that last.
              </p>

              <div className="flex gap-3">
                <button className="bg-cyan-400 text-black px-9 py-3 uppercase tracking-wider text-sm font-medium hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#1a4a6a] transition">
                  Explore Songs
                </button>

                <button className="border border-white/25 px-9 py-3 uppercase tracking-wider text-sm hover:bg-white/5 transition">
                  View Artists
                </button>
              </div>
            </div>

            <div className="flex gap-8">
              {["10K+","500+","30+"].map((num, i) => (
                <div key={i} className="border-l border-white/10 pl-6">
                  <div className="font-['Bebas_Neue'] text-5xl text-cyan-400">{num}</div>
                  <div className="text-[11px] uppercase tracking-widest opacity-40 mt-1">
                    {["Songs","Artists","Genres"][i]}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="border-y border-cyan-400/10 py-3 bg-[#090e1a] overflow-hidden px-10">
        <div
          className="flex gap-20 whitespace-nowrap"
          style={{ transform: `translateX(${tickerPos}px)` }}
        >
          {[...Array(3)].flatMap((_, outerIndex) =>
            ["10,000+ Songs","Browse by Artist","Create Playlists"].map((item, i) => (
              <span
                key={`${outerIndex}-${i}`}
                className="text-[11px] tracking-widest uppercase text-white/30 flex items-center gap-20"
              >
                {item}
                <span className="text-cyan-400 text-xs">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* FEATURED */}
      <section className="max-w-[1200px] mx-auto px-12 py-14">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="text-[14px] tracking-[0.2em] uppercase text-cyan-400 mb-3">
              Featured
            </div>
            <h2 className="font-['Bebas_Neue'] text-6xl leading-none">
              Artists
            </h2>
          </div>

          <a href="#" className="text-[11px] tracking-widest uppercase text-white/30 border-b border-white/20 pb-1 hover:text-white transition">
            View All →
          </a>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {[1,2,3].map((i) => (
            <div key={i} className="relative overflow-hidden group bg-[#090e1a]">
              <img
                src={`https://picsum.photos/seed/${i}/400/500`}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              <div className="absolute bottom-0 w-full p-5 bg-gradient-to-t from-black/90 to-transparent">
                <div className="text-cyan-400 text-xs uppercase tracking-widest">Genre</div>
                <div className="text-2xl font-['Bebas_Neue']">Artist</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GENRES */}
      <section className="bg-[#090e1a] py-20">
        <div className="max-w-[1200px] mx-auto px-12">
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="text-[14px] tracking-[0.18em] uppercase text-cyan-400 mb-3">
                Browse By
              </div>
              <h2 className="font-['Bebas_Neue'] text-6xl leading-none">
                Genres
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Alt Pop","R&B","Pop","Hip-Hop","Indie"].map((g) => (
              <button
                key={g}
                className="border border-white/20 px-5 py-2 text-[11px] uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition hover:-translate-y-0.5"              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-32">
        <div className="text-[16px] tracking-[0.18em] uppercase text-cyan-400 mb-10">
          Ready?
        </div>

        <h2 className="font-['Bebas_Neue'] text-[clamp(60px,10vw,140px)] mb-10 leading-[0.9]">
          Start<br />
          <span className="text-outline">Exploring</span>
        </h2>

        <button className="bg-cyan-400 text-black px-14 py-4 uppercase tracking-wider text-sm hover:-translate-x-1 hover:-translate-y-1 transition">
          Browse All Songs
        </button>
      </section>
    </div>
  );
}