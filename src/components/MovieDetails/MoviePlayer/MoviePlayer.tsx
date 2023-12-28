import { useState } from "react";

interface MovieDetailsResult {
  id: number;
  backdrop_path: string | null;
  original_title: string;
  // Add other properties as needed
}

interface MoviePlayerProps {
  movieDetailsResult: MovieDetailsResult;
}

const MoviePlayer: React.FC<MoviePlayerProps> = ({ movieDetailsResult }) => {
  const [thumbnailVisible, setThumbnailVisible] = useState(true);
  const [videoVisible, setVideoVisible] = useState(true);
  const [playButtonVisible, setPlayButtonVisible] = useState(true);

  const vidSrcUrl = `https://vidsrc.to/embed/movie/${movieDetailsResult.id}`;

  const playMovie = () => {
    setThumbnailVisible(false);
    setVideoVisible(true);
    setPlayButtonVisible(false);
  };

  return (
    <div className="movie-play">
      {movieDetailsResult.backdrop_path && thumbnailVisible && (
        <img
          src={`https://image.tmdb.org/t/p/original/${movieDetailsResult.backdrop_path}`}
          alt={movieDetailsResult.original_title}
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

export default MoviePlayer;
