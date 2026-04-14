import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="text-center py-32">
      <div className="text-[16px] tracking-[0.18em] uppercase text-cyan-400 mb-10">
        Ready?
      </div>

      <h2 className="font-['Bebas_Neue'] text-[clamp(60px,10vw,140px)] mb-10 leading-[0.9]">
        Start<br />
        <span className="text-outline">Exploring</span>
      </h2>

      <button className="inline-black bg-cyan-400 text-black px-14 py-4 uppercase tracking-wider text-sm hover:-translate-x-1 hover:-translate-y-1 transition" onClick={() => navigate('/songs')}>
        Browse All Songs 
      </button>
    </section>
  );
};

export default CTA;