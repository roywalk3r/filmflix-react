import { useState, useEffect } from "react";
// Define a type or interface for the season object
interface Season {
  id: number;
  // Add other properties based on your actual API response
  vote_count: number;
}

interface EpisodeListProps {
  selectedSeason: Season;
}

function EpisodeList({ selectedSeason }: EpisodeListProps) {
  const [episodeButtons, setEpisodeButtons] = useState<number[]>([]);

  useEffect(() => {
    // Generate episode buttons based on vote_count
    const generateEpisodeButtons = () => {
      const buttons = Array.from(
        { length: selectedSeason.vote_count },
        (_, index) => index + 1
      );
      setEpisodeButtons(buttons);
    };

    generateEpisodeButtons();
  }, [selectedSeason]);

  const handleEpisodeButtonClick = (episodeNumber: number) => {
    // Handle button click, e.g., set selected episode or navigate to episode details
    console.log("Selected Episode:", episodeNumber);
  };

  return (
    <div>
      <h2>Episodes:</h2>
      <div className="episode-buttons">
        {episodeButtons.map((episodeNumber) => (
          <button
            key={episodeNumber}
            onClick={() => handleEpisodeButtonClick(episodeNumber)}
          >
            Episode {episodeNumber}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EpisodeList;
