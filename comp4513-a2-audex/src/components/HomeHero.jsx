import VinylBackground from "../components/VinylBackground.jsx";
import { useNavigate } from 'react-router-dom';

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex items-center pt-20 pb-14 overflow-hidden">
      <VinylBackground />

      <div className="max-w-[1200px] mx-auto px-12 w-full relative z-10">
        <div className="text-[11px] tracking-[0.2em] uppercase text-cyan-400 mb-8 flex items-center gap-3">
          <span className="w-10 h-px bg-cyan-400"></span>
          Music Discovery Platform
        </div>

        <h1 className="font-['Bebas_Neue'] text-[clamp(80px,14vw,200px)] leading-[0.9]">
          Every<br />
          <span className="text-outline">Song</span><br />
          <span className="text-cyan-400 drop-shadow-[0_0_40px_rgba(0,200,255,0.3)]">Ever</span>
        </h1>

        <div className="h-px bg-white/10 my-10"></div>

        <div className="flex flex-wrap justify-between items-end gap-8">
          <div className="max-w-[400px]">
            <p className="font-['serif'] italic text-[20px] text-white/50 mb-8 leading-relaxed">
              Browse thousands of tracks. Filter by artist, genre, year. Build playlists that last.            
            </p>

            <div className="flex gap-3">
              <button className="bg-cyan-400 text-black px-9 py-3 uppercase tracking-wider text-sm font-medium hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#1a4a6a] transition" onClick={() => navigate('/songs')}>
                Explore Songs
              </button>
              <button className="border border-white/25 px-9 py-3 uppercase tracking-wider text-sm hover:bg-white/5 transition" onClick={() => navigate('/artists')}>
                View Artists
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {[
              { num: "10K+", label: "Songs" },
              { num: "500+", label: "Artists" },
              { num: "30+", label: "Genres" },
            ].map((item) => (
              <div key={item.label} className="border-l border-white/10 pl-6">
                <div className="font-['Bebas_Neue'] text-5xl text-cyan-400">{item.num}</div>
                <div className="text-[11px] uppercase tracking-widest opacity-40 mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;