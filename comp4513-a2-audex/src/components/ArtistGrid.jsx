import ArtistCard from "./ArtistCard";

const ArtistGrid = (props) => {
  return (
    <section className="max-w-[1200px] mx-auto px-12 pt-8 pb-24">
      {/* Added auto-rows-[250px] to constrain the height of the standard cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
        {props.artists.map((artist, index) => (
          <ArtistCard key={index} {...artist} />
        ))}
      </div>
    </section>
  );
};

export default ArtistGrid;