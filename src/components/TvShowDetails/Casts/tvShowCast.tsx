/* eslint-disable @typescript-eslint/no-explicit-any */
import TvShowApiService from "../../apiService/tvShowsApiService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TvShowCast() {
  // Destructure the id from useParams directly
  const { id } = useParams<{ id: any }>();
  const [tvShowCastResult, setTvShowCastResult] = useState<any>({});

  useEffect(() => {
    const fetchTvShowCastResultData = async () => {
      try {
        // Get movie cast
        const castResponse = await TvShowApiService.getTvShowCast(id);
        console.log(castResponse.data, "tvShowCastResult#");
        setTvShowCastResult(castResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTvShowCastResultData();
  }, [id]); // Add id as a dependency to rerun effect when id changes

  // Check if tvShowCastResult exists before rendering
  if (!tvShowCastResult || Object.keys(tvShowCastResult).length === 0) {
    return null; // or render a loading indicator/error message
  }

  return (
    <>
      {/* Movie Cast   */}
      <h2 className="cast-heading">Top Cast</h2>
      <div className="movie-cast">
        <div className="cast">
          {tvShowCastResult.cast && tvShowCastResult.cast.length > 0 ? (
            tvShowCastResult.cast.slice(0, 10).map((actor: any) => (
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

export default TvShowCast;
