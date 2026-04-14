import SectionHeader from "./SectionHeader.jsx";
import { Link } from 'react-router-dom';

const Genres = (props) => {
  return (
    <section className="bg-[#090e1a] py-20">
      <div className="max-w-[1200px] mx-auto px-12">
        <SectionHeader label="Browse By" title="Genres" />

        <div className="flex flex-wrap gap-2">
          {props.genres.map((g, i) => (
            <Link to="/single-genre/?{g}">
            <button
              key={i}
              className="border border-white/20 px-5 py-2 text-[11px] uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition hover:-translate-y-0.5"
            >
              {g}
            </button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Genres;