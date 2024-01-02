import { useState, useEffect } from "react";

interface TvShowDetailsResult {
  id: number;
  backdrop_path: string | null;
  name: string;
  // Add other properties as needed
}

interface TvShowPlayerProps {
  tvShowDetailsResult: TvShowDetailsResult;
  onVidSrcChange: (newVidSrc: string) => void;
  vidSrcUrl: string; // Add this prop to receive vidSrcUrl
}

const TvShowPlayer: React.FC<TvShowPlayerProps> = ({
  tvShowDetailsResult,
  onVidSrcChange,
  vidSrcUrl, // Receive vidSrcUrl as a prop
}) => {
  const [thumbnailVisible, setThumbnailVisible] = useState(true);
  const [videoVisible, setVideoVisible] = useState(true);
  const [playButtonVisible, setPlayButtonVisible] = useState(true);

  const playMovie = () => {
    setThumbnailVisible(false);
    setVideoVisible(true);
    setPlayButtonVisible(false);
  };

  useEffect(() => {
    // Call the callback function with the updated vidSrcUrl
    onVidSrcChange(vidSrcUrl);
  }, [vidSrcUrl, onVidSrcChange]);

  return (
    <div className="movie-play">
      {/* {tvShowDetailsResult.backdrop_path && thumbnailVisible && (
        <img
          src={`https://image.tmdb.org/t/p/original/${tvShowDetailsResult.backdrop_path}`}
          alt={tvShowDetailsResult.name}
          className="movie-box-img"
          loading="lazy"
        />
      )} */}
      {videoVisible && (
        <iframe src={vidSrcUrl} allowFullScreen allow="autoplay"></iframe>
      )}
      {/* {playButtonVisible && (
        <i
          className="fa-solid fa-play play-movie-btn"
          style={{ color: "#ffffff" }}
          id="play-button"
          onClick={playMovie}
        ></i>
      )} */}
    </div>
  );
};

export default TvShowPlayer;
