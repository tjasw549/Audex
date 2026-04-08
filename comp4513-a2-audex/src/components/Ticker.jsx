import { useEffect, useRef, useState } from "react";

const Ticker = (props) => {
  const [pos, setPos] = useState(0);
  const ref = useRef(0);
  const raf = useRef(null);

  const items = props.items || [
    "10,000+ Songs",
    "Browse by Artist",
    "Create Playlists",
  ];

  useEffect(() => {
    const animate = () => {
      ref.current -= 0.4;
      if (ref.current < -1200) ref.current = 0;
      setPos(ref.current);
      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div className="border-y border-cyan-400/10 py-3 bg-[#090e1a] overflow-hidden px-10">
      <div
        className="flex gap-20 whitespace-nowrap"
        style={{ transform: `translateX(${pos}px)` }}
      >
        {[...Array(3)].flatMap((_, outerIndex) =>
          items.map((item, i) => (
            <span key={`${outerIndex}-${i}`} className="text-[11px] tracking-widest uppercase text-white/30 flex items-center gap-20">
              {item}
              <span className="text-cyan-400 text-xs">✦</span>
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default Ticker;