import { Link } from 'react-router-dom';

const ArtistCard = (props) => {
  const isLarge = props.size === "large";
  if (!props || !props.artist_name) return null;

  return (
    <Link 
      to={`/songs/${props.artist_id}`} 
      // Move the grid span classes here to the direct child of the grid
      className={`block w-full h-full ${isLarge ? "col-span-2 row-span-2" : ""}`}
    >
      <div
        className="relative overflow-hidden group bg-[#090e1a] w-full h-full min-h-[250px]"
      >
        <img
          src={props.artist_image_url}
          // Use h-full and object-cover to let the image naturally fill the cell
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
          alt={props.artist_name}
        />

        <div
          className={`absolute bottom-0 w-full ${
            isLarge ? "p-6" : "p-4"
          } bg-gradient-to-t from-black/90 to-transparent`}
        >
          <div 
            className={`${
              isLarge ? "text-4xl" : "text-xl"
            } font-['Bebas_Neue'] leading-none text-white`}
          >
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