import { Link } from 'react-router-dom';

const ArtistCard = (props) => {
  const isLarge = props.size === "large";
  if (!props || !props.artist_name) return null;

  return (
    <Link to={`/songs/${props.artist_id}`} className="block">
      <div
        className={`relative overflow-hidden group bg-[#090e1a] ${isLarge ? "col-span-2 row-span-2 h-[500px]" : "h-[200px]"
          }`}
      >
        <img
          src={props.artist_image_url}
          className={`w-full object-cover transition duration-700 group-hover:scale-105 ${isLarge ? "h-[500px]" : "h-[200px]"
            }`}
        />

        <div
          className={`absolute bottom-0 w-full ${isLarge ? "p-6" : "p-4"
            } bg-gradient-to-t from-black/90 to-transparent`}
        >
          <div className={`${isLarge ? "text-3xl" : "text-sm"
            } font-['Bebas_Neue'] leading-none`}>
            {props.artist_name}
          </div>

          <div className="text-white/40 text-xs mt-1">
            {props.types?.type_name || props.genre}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;