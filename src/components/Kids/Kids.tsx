/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import MovieApiService from "../apiService/movieApiService";
import { Link } from "react-router-dom";
import "./kids.css";
function Kids() {
  const [kidsResult, setKidsResult] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMoviesResultData = async () => {
      try {
        const response = await MovieApiService.fetchKidsMovies(currentPage);
        setKidsResult((prevMovies) => [
          ...prevMovies,
          ...response.data.results,
        ]);
        // console.log(response.data.results, "#kidsResult");
      } catch (error) {
        console.error("Error fetching kids data:", error);
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
      <section className="movies container kids" id="movies">
        {/*  Heading   */}
        <div className="heading">
          <h2 className="heading-title">Kids Section</h2>
        </div>
        {/* Movies Content   */}

        <div className="movies-content">
          {/* Movies Box  */}
          {kidsResult.map((k, index) => (
            <div className="movie-box" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/original/${k.poster_path}`}
                alt={`Poster for ${k.original_title}`}
                className="movie-box-img"
              />
              <div className="box-text">
                <h2 className="movie-title">{k.original_title}</h2>
                <span className="movie-type">
                  {new Date(k.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric", // or "2-digit" for two-digit day representation
                  })}
                </span>

                <Link
                  to={`/movie/${k.id}`}
                  key={k.id}
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

export default Kids;
