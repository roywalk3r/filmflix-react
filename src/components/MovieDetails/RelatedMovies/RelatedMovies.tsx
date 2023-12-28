import MovieApiService from "../../movieApiService/movieApiService";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./relatedMovies.css";

function RelatedMovies() {
  const { id } = useParams<{ id: any }>();
  const [relatedMovies, setRelatedMoviesResult] = useState<any[]>([]);

  useEffect(() => {
    const fetchRelatedMoviesData = async () => {
      try {
        const relatedResponse = await MovieApiService.getRelatedMovies(id);
        // console.log(relatedResponse.data, "relatedMoviesResult#");
        setRelatedMoviesResult(relatedResponse.data.results.slice(0, 4));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRelatedMoviesData();
  }, [id]);

  return (
    <>
      <div className="sidebar-title">
        <h2>Related</h2>
      </div>
      <div className="related-movies">
        {relatedMovies.map((r: any) => (
          <Link to={`/movie/${r.id}`} key={r.id}>
            <div className="movie">
              <img
                src={`https://image.tmdb.org/t/p/original/${r.poster_path}`}
                alt={`poster for ${r.original_title}`}
              />
              <div className="movie-container">
                <small>Similar</small>
                <h4>{r.original_title}</h4>
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

export default RelatedMovies;
