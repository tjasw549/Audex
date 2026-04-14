import SectionHeader from "../components/SectionHeader.jsx";
import ArtistCard from "../components/ArtistCard.jsx";

const FeaturedArtists = (props) => {
  return (
    <section className="max-w-[1200px] mx-auto px-12 py-14">
      <SectionHeader label="Featured" title="Artists" action="View All" to="/artists" />

      <div className="grid grid-cols-3 grid-rows-2 gap-1 h-[600px]">
        {props.artists.map((artist, index) => (
          <ArtistCard 
            key={index} 
            {...artist} 
            size={index === 0 ? "large" : "small"} 
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedArtists;