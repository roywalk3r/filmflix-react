/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import "./searchMovie.css";
import MovieApiService from "../apiService/movieApiService";
import { Link } from "react-router-dom";

function SearchMovie() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await MovieApiService.getSearchMovie({
          movieName: searchQuery,
        });

        setSearchResults(response.data.results);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching search results.");
      } finally {
        setLoading(false);
      }
    };

    const timerId = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        fetchSearchResults();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="search-container">
        <div className="center">
          <div className="search_movie_box">
            <input
              type="search"
              id="search-input"
              placeholder="Search tv & movie here, "
              value={searchQuery}
              onChange={handleInputChange}
            />
            <i className="bx bx-search" id="search-icon"></i>
          </div>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {searchResults.length > 0 && (
          <div className="movies-content">
            {searchResults.map((item: any) => (
              <div className="movie-box" key={item.id}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  alt={`Poster for ${item.original_title || item.name}`}
                  className="movie-box-img"
                />
                <div className="box-text">
                  <h2 className="movie-title">
                    {item.original_title || item.name}
                  </h2>
                  <span className="movie-type">
                    {new Date(
                      item.release_date || item.first_air_date
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <Link
                    to={`/movie/${item.id}`} // Use a separate Link for movies
                    className="watch-btn play-btn"
                  >
                    <i className="bx bx-right-arrow"></i>
                  </Link>
                  {item.media_type === "tv" && ( // Add conditional rendering for TV shows
                    <Link
                      to={`/tv/${item.id}`} // Use a separate Link for TV shows
                      className="watch-btn play-btn"
                    >
                      <i className="bx bx-right-arrow"></i>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchMovie;
