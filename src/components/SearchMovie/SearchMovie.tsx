import { useState, useEffect } from "react";
import "./searchMovie.css";
import MovieApiService from "../movieApiService/movieApiService";
import { Link } from "react-router-dom";

function SearchMovie() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // Call the getSearchMovie method from MovieApiService
        const response = await MovieApiService.getSearchMovie({
          movieName: searchQuery,
        });

        // Handle the response data
        // console.log(response, "search result");
        setSearchResults(response.data.results);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    // Call the fetchSearchResults function when the searchQuery changes
    if (searchQuery.trim() !== "") {
      fetchSearchResults();
    } else {
      // Reset search results when the search query is empty
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleInputChange = (e: any) => {
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
        {searchResults.length > 0 && (
          <div className="movies-content">
            {searchResults.map((item: any) => (
              //   <div key={item.id} className="search-result-item">
              //     <h3>{item.title}</h3>
              //     <div className="result-item">
              //       <div className="result-image">
              //         <img
              //           src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              //         />
              //       </div>
              //     </div>
              //   </div>
              <div className="movie-box">
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
                      day: "numeric", // or "2-digit" for two-digit day representation
                    })}
                  </span>

                  <Link
                    to={`/movie/${item.id}`}
                    key={item.id}
                    className="watch-btn play-btn"
                  >
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
