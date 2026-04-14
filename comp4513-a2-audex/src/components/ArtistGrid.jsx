import ArtistCard from "./ArtistCard.jsx";

const ArtistGrid = (props) => {
  return (
    <section className="max-w-[1200px] mx-auto px-12 pt-8 pb-24">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {props.artists.map((artist, index) => (
          <ArtistCard key={index} {...artist} />
        ))}
      </div>
    </section>
  );
};

export default ArtistGrid;
