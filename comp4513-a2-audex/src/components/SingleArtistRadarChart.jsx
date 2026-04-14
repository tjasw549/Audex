import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const SingleArtistRadarChart = ({ averages }) => {
  if (!averages) return null;

  return (
    <div className="w-full lg:w-[500px] h-[300px] lg:h-[400px] flex-shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={[
            { metric: "Danceability", value: averages.danceability },
            { metric: "Energy", value: averages.energy },
            { metric: "Speechiness", value: averages.speechiness },
            { metric: "Acousticness", value: averages.acousticness },
            { metric: "Liveness", value: averages.liveness },
            { metric: "Valence", value: averages.valence },
          ]}
        >
          <PolarGrid stroke="rgba(221,238,255,0.1)" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{
              fill: "rgba(221,238,255,0.5)",
              fontSize: 11,
              fontFamily: "monospace",
              letterSpacing: 2,
            }}
          />
          <Radar
            dataKey="value"
            stroke="#00e5ff"
            fill="#00e5ff"
            fillOpacity={0.15}
            strokeWidth={2}
            dot={{ fill: "#00e5ff", r: 4 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SingleArtistRadarChart;