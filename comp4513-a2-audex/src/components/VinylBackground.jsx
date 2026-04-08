const VinylBackground = () => {
  const rings = [100,140,180,220,260,300,340,380,420,460,500,540];

  return (
    <div className="vinyl-bg">
      {rings.map((r) => (
        <div
          key={r}
          className="vinyl-groove"
          style={{ width: r, height: r }}
        />
      ))}
      <div className="vinyl-inner" />
    </div>
  );
};

export default VinylBackground;