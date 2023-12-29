import TvShowApiService from "../../apiService/tvShowsApiService";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function RelatedTvShows() {
  const { id } = useParams<{ id: any }>();
  const [relatedTvShows, setRelatedTvShowsResult] = useState<any[]>([]);

  useEffect(() => {
    const fetchRelatedTvShowsData = async () => {
      try {
        const relatedResponse = await TvShowApiService.getRelatedTvShows(id);
        console.log(relatedResponse.data, "relatedTvShowsResult#");
        setRelatedTvShowsResult(relatedResponse.data.results.slice(0, 4));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRelatedTvShowsData();
  }, [id]);

  return (
    <>
      <div className="sidebar-title">
        <h2>Related</h2>
      </div>
      <div className="related-movies">
        {relatedTvShows.map((r: any) => (
          <Link to={`/movie/${r.id}`} key={r.id}>
            <div className="movie">
              <img
                src={`https://image.tmdb.org/t/p/original/${r.poster_path}`}
                alt={`poster for ${r.name}`}
              />
              <div className="movie-container">
                <small>Similar</small>
                <h4>{r.name}</h4>
                <span className="bottom-content">
                  <p>Movie</p>
                  <p>•</p>
                  <p className="fas fa-bookmark">&nbsp; {r.vote_count}</p>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default RelatedTvShows;
