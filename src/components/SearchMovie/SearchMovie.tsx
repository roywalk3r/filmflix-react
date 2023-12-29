

import { useState, useEffect } from "react";
import "./searchMovie.css";
import MovieApiService from "../movieApiService/movieApiService";
import { Link } from "react-router-dom";

function SearchMovie() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Specify the type explicitly

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        // Call the getSearchMovie method from MovieApiService
        const response = await MovieApiService.getSearchMovie({
          movieName: searchQuery,
        });

        // Handle the response data
        setSearchResults(response.data.results);
      } catch (error) {
        // Handle errors
        console.error(error);
        setError("An error occurred while fetching search results.");
      } finally {
        setLoading(false);
      }
    };

    // Implement debouncing to delay the API request
    const timerId = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        fetchSearchResults();
      } else {
        // Reset search results when the search query is empty
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
              placeholder="Search movie"
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
                  alt={`Poster for ${item.original_title}`}
                  className="movie-box-img"
                  loading="lazy"
                />
                <div className="box-text">
                  <h2 className="movie-title">{item.original_title}</h2>
                  <span className="movie-type">
                    {new Date(item.release_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <Link to={`/movie/${item.id}`} className="watch-btn play-btn">
                    <i className="bx bx-right-arrow"></i>
                  </Link>
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
