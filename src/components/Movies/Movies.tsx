import "./movies.css";
import { useEffect, useState } from "react";
import MovieApiService from "../apiService/movieApiService";
import { Link } from "react-router-dom";

function Movies() {
  const [moviesResult, setMoviesResult] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMoviesResultData = async () => {
      try {
        const response = await MovieApiService.moviesApiData(currentPage);
        setMoviesResult((prevMovies) => [
          ...prevMovies,
          ...response.data.results,
        ]);
        console.log(response.data.results, "#moviesResult");
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchMoviesResultData();
  }, [currentPage]);

  const handleLoadMore = () => {
    // Increment the current page when the "Load More" button is clicked
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <section className="movies container" id="movies">
        {/*  Heading   */}
        <div className="heading">
          <h2 className="heading-title">All Movies</h2>
        </div>
        {/* Movies Content   */}
        <div className="movies-content">
          {/* Movies Box  */}
          {moviesResult.map((m, index) => (
            <div className="movie-box" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/original/${m.poster_path}`}
                alt={`Poster for ${m.original_title}`}
                className="movie-box-img"
                loading="lazy"
              />
              <div className="box-text">
                <h2 className="movie-title">{m.original_title}</h2>
                <span className="movie-type">
                  {new Date(m.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric", // or "2-digit" for two-digit day representation
                  })}
                </span>

                <Link
                  to={`/movie/${m.id}`}
                  key={m.id}
                  className="watch-btn play-btn"
                >
                  <i className="bx bx-right-arrow"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="load-more-container">
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      </section>
    </>
  );
}

export default Movies;
