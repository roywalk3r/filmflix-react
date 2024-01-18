import "./movies.css";
import { useEffect, useState } from "react";
import MovieApiService from "../apiService/movieApiService";
import { Link } from "react-router-dom";
import FetchGenres from "./FetchGenres/FetchGenres";

function Movies() {
  const [moviesResult, setMoviesResult] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<any | null>(null);

  useEffect(() => {
    const fetchMoviesResultData = async () => {
      try {
        const response = await MovieApiService.moviesApiData(
          currentPage,
          selectedGenre
        );
        setMoviesResult((prevMovies) => [
          ...prevMovies,
          ...response.data.results,
        ]);
        // console.log(response.data.results, "#moviesResult");
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchMoviesResultData();
  }, [currentPage, selectedGenre]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handleGenreChange = (selectedGenreId: number) => {
    setSelectedGenre(selectedGenreId !== 0 ? selectedGenreId : null);
    setMoviesResult([]); // Reset the moviesResult array
    setCurrentPage(1); // Reset the currentPage
  };

  return (
    <>
      <section className="movies container" id="moviesM">
        {/*  Heading   */}
        <div className="heading">
          <h2 className="heading-title">All Movies</h2>
          {/* Pass the handleGenreChange function to FetchGenres */}
          <FetchGenres onSelectGenre={handleGenreChange} />{" "}
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
