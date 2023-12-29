import TvShowApiService from "../apiService/tvShowsApiService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TvShowCast from "./Casts/tvShowCast";
import TvShowPlayer from "./TvShowPlayer/TvShowPlayer";
import RecommendedTvShows from "./RecommendedTvShows/RecommendedTvShows";
import RelatedTvShows from "./RelatedTvShows/RelatedTvShows";
// import DisqusComments from "./Disqus/DisqusComments";
function TvShowDetails() {
  const { id } = useParams<{ id: any }>();
  const [tvShowDetailsResult, setTvShowDetailsResult] = useState<any>({});
  const displayGenres = () => {
    return tvShowDetailsResult.genres?.map((genre: any) => (
      <span key={genre.id}>{genre.name}</span>
    ));
  };
  const displayProductionCompanies = () => {
    return tvShowDetailsResult.production_companies?.map(
      (production_company: any) => (
        <span key={production_company.id}>{production_company.name}</span>
      )
    );
  };
  const displayProductionCountries = () => {
    return tvShowDetailsResult.production_countries?.map(
      (production_country: any) => (
        <span key={production_country.id}>{production_country.name}</span>
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get movie details
        const detailsResponse = await TvShowApiService.getTvShowDetails(id);
        console.log(detailsResponse.data, "tvShowDetailsResult#");
        setTvShowDetailsResult(detailsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // Update meta tags directly in the document head
    const updateMetaTags = () => {
      document.title = `${tvShowDetailsResult.name}`;

      const metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      metaDescription.content =
        tvShowDetailsResult.overview || "Movie Overview";
      document.head.appendChild(metaDescription);

      // Add other meta tags as needed
      const ogType = document.createElement("meta");
      ogType.content = "website";
      document.head.appendChild(ogType);

      const ogUrl = document.createElement("meta");
      ogUrl.content = `https://filmflix-r.netlify.app/tv/${id}`;
      document.head.appendChild(ogUrl);
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
  }, [id, tvShowDetailsResult]);

  return (
    <>
      <div className="section-container body-container">
        <div className="main-left">
          <div className="movie-play">
            <TvShowPlayer tvShowDetailsResult={tvShowDetailsResult} />
          </div>
          <div className="about-movie body-container">
            <div className="sypnosis">
              {/* Check if poster_path exists before rendering image */}
              {tvShowDetailsResult.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/original/${tvShowDetailsResult.poster_path}`}
                  alt={`Poster for ${tvShowDetailsResult.original_title}`}
                  className="img"
                />
              )}
              <div className="content">
                <h2>{tvShowDetailsResult.name}</h2>
                <p className="tagline">{tvShowDetailsResult.tagline}</p>

                <div className="req">
                  {tvShowDetailsResult.first_air_date && (
                    <span>
                      <i className="bx bx-calendar-alt"></i>
                      {new Date(
                        tvShowDetailsResult.first_air_date
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
                    {tvShowDetailsResult.episode_run_time}min/ep
                  </span>
                </div>
                <p>{tvShowDetailsResult.overview}</p>
                <span id="release">
                  <i className="fa fa-calendar"></i> Release date :
                  {new Date(
                    tvShowDetailsResult.first_air_date
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric", // or "2-digit" for two-digit day representation
                  })}
                </span>
                <div className="genres">
                  {"Genres:"}
                  {displayGenres()}
                </div>

                <div className="genres">
                  {"Companies:"}
                  {displayProductionCompanies()}
                </div>
                <div className="genres">
                  {"Countries:"}
                  {displayProductionCountries()}
                </div>
                {tvShowDetailsResult.seasons &&
                  tvShowDetailsResult.seasons.length > 0 && (
                    <div>
                      <h2>Seasons:</h2>
                      <ul>
                        {tvShowDetailsResult.seasons
                          .slice(1, 2)
                          .map((season: any) => (
                            <li key={season.id}>
                              <h3>{season.name}</h3>
                              <p>Air Date: {season.air_date}</p>
                              <p>Episode Count: {season.episode_count}</p>
                              {/* <p>Episode Count: {season.episode_count}</p> */}
                              <p>Overview: {season.overview}</p>
                              {/* Add more details as needed */}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                <div className="rating-card">
                  <div className="rating-content">
                    <h2 className="card-heading">
                      {tvShowDetailsResult.vote_average}/10
                    </h2>
                    <span>{tvShowDetailsResult.vote_count}</span>
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
            <TvShowCast />
          </div>
        </div>
        <div className="right-sidebar">
          <RelatedTvShows />
          <RecommendedTvShows />
        </div>
      </div>
      <div className="comment-section container">
        <h2 className="comment-head">
          <i className="bx bxs-star star"></i>
          Comment Section
        </h2>
        {/* <DisqusComments /> */}
      </div>
      <div className="copyright">&#169; Godak All rights Reserved</div>
    </>
  );
}

export default TvShowDetails;
