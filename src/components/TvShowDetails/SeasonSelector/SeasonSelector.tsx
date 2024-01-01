import React from "react";
import "./seasonSelector.css";
interface SeasonSelectorProps {
  seasons: any[];
  onSeasonChange: (season: any) => void;
}

const SeasonSelector: React.FC<SeasonSelectorProps> = ({
  seasons,
  onSeasonChange,
}) => {
  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSeasonId = parseInt(event.target.value);
    const selectedSeason = seasons.find(
      (season) => season.id === selectedSeasonId
    );

    if (selectedSeason) {
      onSeasonChange(selectedSeason);
    }
  };

  return (
    <div>
      <select
        name="seasons"
        id="seasons"
        className="seasonSelector"
        onChange={handleSeasonChange}
      >
        <option value="" disabled defaultValue="">
          Select Season
        </option>
        {seasons.map((season) => (
          <>
            <option key={season.id} value={season.id}>
              {season.name}
            </option>
          </>
        ))}
      </select>
    </div>
  );
};

export default SeasonSelector;
