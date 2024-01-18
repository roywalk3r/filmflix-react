import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TvShowApiService from "../apiService/tvShowsApiService";
import FetchTvShowGenres from "./FetchGenres/FetchGenres";

function TvShows() {
  const [tvShowsResult, setTvShowsResult] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  useEffect(() => {
    const fetchTvShowsResultData = async () => {
      try {
        const response = await TvShowApiService.tvShowsApiData(
          currentPage,
          selectedGenre
        );
        setTvShowsResult((prevMovies) => [
          ...prevMovies,
          ...response.data.results,
        ]);
        console.log(response.data.results, "#tvShowsResult");
      } catch (error) {
        console.error("Error fetching tvShows data:", error);
      }
    };

    fetchTvShowsResultData();
  }, [currentPage, selectedGenre]);

  const handleLoadMore = () => {
    // Increment the current page when the "Load More" button is clicked
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handleGenreChange = (selectedGenreId: number) => {
    setSelectedGenre(selectedGenreId !== 0 ? selectedGenreId : null);
    setTvShowsResult([]); // Reset the moviesResult array
    setCurrentPage(1); // Reset the currentPage
  };

  return (
    <>
      <section className="movies container" id="moviesM">
        {/*  Heading   */}
        <div className="heading">
          <h2 className="heading-title">All Tv Shows</h2>
          <FetchTvShowGenres onSelectGenre={handleGenreChange} />{" "}
        </div>
        {/* Movies Content   */}
        <div className="movies-content">
          {/* Movies Box  */}
          {tvShowsResult.map((t, index) => (
            <div className="movie-box" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/original/${t.poster_path}`}
                alt={`Poster for ${t.name}`}
                className="movie-box-img"
                loading="lazy"
              />
              <div className="box-text">
                <h2 className="movie-title">{t.name}</h2>
                <span className="movie-type">
                  {new Date(t.first_air_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric", // or "2-digit" for two-digit day representation
                  })}
                </span>

                <Link
                  to={`/tv/${t.id}`}
                  key={t.id}
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

export default TvShows;
