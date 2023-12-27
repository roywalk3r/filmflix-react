import MovieApiService from "../movieApiService/movieApiService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./movieDetails.css";
import MovieCast from "./Casts/moviecast";
import RelatedMovies from "./RelatedMovies/RelatedMovies";
import RecommendedMovies from "./RecommendedMovies/RecommendedMovies";
import DisqusComments from "./Disqus/DisqusComments";
import MoviePlayer from "./MoviePlayer/MoviePlayer";
function MovieDetails() {
  const { id } = useParams<{ id: any }>();
  const [movieDetailsResult, setMovieDetailsResult] = useState<any>({});
  // const [movieCastResult, setMovieCastResult] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get movie details
        const detailsResponse = await MovieApiService.getMovieDetails(id);
        console.log(detailsResponse.data, "movieDetailsResult#");
        setMovieDetailsResult(detailsResponse.data);

        // // Get movie cast
        // const castResponse = await MovieApiService.getMovieCast(id);
        // console.log(castResponse.data, "movieCastResult#");
        // setMovieCastResult(castResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // Update meta tags directly in the document head
    const updateMetaTags = () => {
      document.title = `${
        movieDetailsResult.original_title || "Movie Details"
      } | FilmFlix`;

      const metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      metaDescription.content = movieDetailsResult.overview || "Movie Overview";
      document.head.appendChild(metaDescription);

      // Add other meta tags as needed
      const ogType = document.createElement("meta");
      ogType.content = "website";
      document.head.appendChild(ogType);

      const ogUrl = document.createElement("meta");
      ogUrl.content = `your_website_url/${id}`;
      document.head.appendChild(ogUrl);

      // Add more meta tags as necessary
    };

    // Call the function to update meta tags when the component mounts
    updateMetaTags();

    // Clean up function to remove added meta tags when the component unmounts
    return () => {
      document.title = "FilmFlix"; // Reset the title to a default value
      document.head
        .querySelectorAll('meta[name="description"]')
        .forEach((e) => e.remove());
      // Remove other added meta tags as necessary
    };
  }, [id]); // Make sure to include any dependencies

  return (
    <>
      <div className="section-container body-container">
        <div className="main-left">
          <div className="movie-play">
            <MoviePlayer movieDetailsResult={movieDetailsResult} />
          </div>
          <div className="about-movie body-container">
            <div className="sypnosis">
              {/* Check if poster_path exists before rendering image */}
              {movieDetailsResult.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/original/${movieDetailsResult.poster_path}`}
                  alt={`Poster for ${movieDetailsResult.original_title}`}
                  className="img"
                />
              )}
              <div className="content">
                <h2>{movieDetailsResult.original_title}</h2>
                <p className="tagline">{movieDetailsResult.tagline}</p>
                <h1>{movieDetailsResult.original_name}</h1>

                <div className="req">
                  {movieDetailsResult.release_date && (
                    <span>
                      <i className="bx bx-calendar-alt"></i>
                      {new Date(
                        movieDetailsResult.release_date
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                      })}
                    </span>
                  )}
                  <span className="age-req">
                    <i>17+</i>
                  </span>
                  <span>
                    <i className="bx bx-time"></i>
                    {movieDetailsResult.runtime}min
                  </span>
                </div>
                <p>{movieDetailsResult.overview}</p>
                <span id="release">
                  <i className="fa fa-calendar"></i> Release date :
                  {new Date(movieDetailsResult.release_date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric", // or "2-digit" for two-digit day representation
                    }
                  )}
                </span>

                <div className="rating-card">
                  <div className="rating-content">
                    <h2 className="card-heading">
                      {movieDetailsResult.vote_count}
                    </h2>
                    <span>4314 reviews</span>
                  </div>
                  <div className="stars">
                    <input type="radio" name="rating" id="star5" />
                    <label htmlFor="star5">
                      <i className="fa fa-star"></i>
                    </label>
                    <input type="radio" name="rating" id="star4" />
                    <label htmlFor="star4">
                      <i className="fa fa-star"></i>
                    </label>
                    <input type="radio" name="rating" id="star3" />
                    <label htmlFor="star3">
                      <i className="fa fa-star"></i>
                    </label>
                    <input type="radio" name="rating" id="star2" />
                    <label htmlFor="star2">
                      <i className="fa fa-star"></i>
                    </label>
                    <input type="radio" name="rating" id="star1" />
                    <label htmlFor="star1">
                      <i className="fa fa-star"></i>
                    </label>
                  </div>
                  <p className="thought">what do you think about the movie?</p>
                </div>
              </div>
            </div>
            <MovieCast />
          </div>
        </div>
        <div className="right-sidebar">
          <RelatedMovies />
          <RecommendedMovies />
        </div>
      </div>
      <div className="comment-section container">
        <h2 className="comment-head">
          <i className="bx bxs-star star"></i>
          Comment Section
        </h2>
        <DisqusComments />
      </div>
      <div className="copyright">&#169; Godak All rights Reserved</div>
    </>
  );
}

export default MovieDetails;
