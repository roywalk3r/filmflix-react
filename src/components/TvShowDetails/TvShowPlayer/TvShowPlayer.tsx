import { useState } from "react";

interface TvShowDetailsResult {
  id: number;
  backdrop_path: string | null;
  name: string;
  // Add other properties as needed
}

interface TvShowPlayerProps {
  tvShowDetailsResult: TvShowDetailsResult;
}

const TvShowPlayer: React.FC<TvShowPlayerProps> = ({ tvShowDetailsResult }) => {
  const [thumbnailVisible, setThumbnailVisible] = useState(true);
  const [videoVisible, setVideoVisible] = useState(true);
  const [playButtonVisible, setPlayButtonVisible] = useState(true);

  const vidSrcUrl = `https://vidsrc.to/embed/tv/${tvShowDetailsResult.id}`;

  const playMovie = () => {
    setThumbnailVisible(false);
    setVideoVisible(true);
    setPlayButtonVisible(false);
  };

  return (
    <div className="movie-play">
      {tvShowDetailsResult.backdrop_path && thumbnailVisible && (
        <img
          src={`https://image.tmdb.org/t/p/original/${tvShowDetailsResult.backdrop_path}`}
          alt={tvShowDetailsResult.name}
          className="movie-box-img"
          loading="lazy"
        />
      )}
      {videoVisible && (
        <iframe src={vidSrcUrl} allowFullScreen allow="autoplay"></iframe>
      )}
      {playButtonVisible && (
        <i
          className="fa-solid fa-play play-movie-btn"
          style={{ color: "#ffffff" }}
          id="play-button"
          onClick={playMovie}
        ></i>
      )}
    </div>
  );
};

export default TvShowPlayer;
