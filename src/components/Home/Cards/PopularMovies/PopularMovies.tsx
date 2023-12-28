import "./popularMovies.css";
import { useEffect, useState } from "react";

import MovieApiService from "../../../movieApiService/movieApiService";
import { Link } from "react-router-dom";

function PopularMovies() {
  const [popularMoviesResult, setPopularMoviesResult] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopularMoviesResultData = async () => {
      try {
        const response = await MovieApiService.popularMovieApiData();
        console.log(response.data, "popularMoviesResult#");
        setPopularMoviesResult(response.data.results.slice(0, 12));
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchPopularMoviesResultData();
  }, []);

  return (
    <>
      <section className="movies container" id="movies">
        {/*  Heading   */}
        <div className="heading">
          <h2 className="heading-title">Popular Movies</h2>
        </div>
        {/* Movies Content   */}
        <div className="movies-content">
          {/* Movies Box  */}
          {popularMoviesResult.map((p) => (
            <div className="movie-box">
              <img
                src={`https://image.tmdb.org/t/p/original/${p.poster_path}`}
                alt={`Poster for ${p.original_title}`}
                className="movie-box-img"
                loading="lazy"
              />
              <div className="box-text">
                <h2 className="movie-title">{p.original_title}</h2>
                <span className="movie-type">
                  {new Date(p.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric", // or "2-digit" for two-digit day representation
                  })}
                </span>

                <Link
                  to={`/movie/${p.id}`}
                  key={p.id}
                  className="watch-btn play-btn"
                >
                  <i className="bx bx-right-arrow"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default PopularMovies;
