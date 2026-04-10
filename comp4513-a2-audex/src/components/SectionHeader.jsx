import { Link } from 'react-router-dom';

const SectionHeader = (props) => {
  return (
    <div className="flex justify-between items-end mb-10">
      <div>
        <div className="text-[14px] tracking-[0.18em] uppercase text-cyan-400 mb-3">
          {props.label}
        </div>

        <h2 className="font-['Bebas_Neue'] text-6xl leading-none">
          {props.title}
        </h2>
      </div>

      {props.action && (
        <Link to={props.to} className="text-[11px] tracking-widest uppercase text-white/30 border-b border-white/20 pb-1 hover:text-white transition">
          {props.action} →
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;