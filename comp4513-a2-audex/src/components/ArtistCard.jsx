const ArtistCard = (props) => {
  const isLarge = props.size === "large";

  return (
    <div
      className={`relative overflow-hidden group bg-[#090e1a] ${ 
        isLarge ? "col-span-2 row-span-2" : ""
      }`}
    >
      <img
        src={props.image}
        className="w-full h-full object-cover transition duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
      />

      <div
        className={`absolute bottom-0 w-full ${
          isLarge ? "p-6" : "p-4"
        } bg-gradient-to-t from-black/90 to-transparent`}
      >
        <div className="text-cyan-400 text-[11px] uppercase tracking-widest mb-1">
          {props.genre}
        </div>

        <div className={`${
            isLarge ? "text-3xl" : "text-xl"
        } font-['Bebas_Neue'] leading-none`}>
          {props.name}
        </div>

        <div className="text-white/40 text-xs mt-1">
          {props.songs} Songs
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;