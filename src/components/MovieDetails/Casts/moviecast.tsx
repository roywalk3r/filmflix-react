import MovieApiService from "../../movieApiService/movieApiService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./movieCast.css";

function MovieCast() {
  // Destructure the id from useParams directly
  const { id } = useParams<{ id: any }>();
  const [movieCastResult, setMovieCastResult] = useState<any>({});

  useEffect(() => {
    const fetchMovieCastResultData = async () => {
      try {
        // Get movie cast
        const castResponse = await MovieApiService.getMovieCast(id);
        //// console.log(castResponse.data, "movieCastResult#");
        setMovieCastResult(castResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovieCastResultData();
  }, [id]); // Add id as a dependency to rerun effect when id changes

  // Check if movieCastResult exists before rendering
  if (!movieCastResult || Object.keys(movieCastResult).length === 0) {
    return null; // or render a loading indicator/error message
  }

  return (
    <>
      {/* Movie Cast   */}
      <h2 className="cast-heading">Top Cast</h2>
      <div className="movie-cast">
        <div className="cast">
          {movieCastResult.cast && movieCastResult.cast.length > 0 ? (
            movieCastResult.cast.slice(0, 10).map((actor: any) => (
              <div key={actor.id} className="cast-box">
                <a
                  href={`https://www.themoviedb.org/person/${actor.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Read about ${actor.name} on MovieDB`}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                    alt={actor.name}
                    className="cast-img"
                    loading="lazy"
                  />
                </a>
                <span className="cast-title">{actor.name}</span>
              </div>
            ))
          ) : (
            <p>No cast details available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MovieCast;
