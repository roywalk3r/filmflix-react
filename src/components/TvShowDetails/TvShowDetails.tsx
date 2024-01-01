import TvShowApiService from "../apiService/tvShowsApiService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TvShowCast from "./Casts/tvShowCast";
import TvShowPlayer from "./TvShowPlayer/TvShowPlayer";
import RecommendedTvShows from "./RecommendedTvShows/RecommendedTvShows";
import RelatedTvShows from "./RelatedTvShows/RelatedTvShows";
import SeasonSelector from "./SeasonSelector/SeasonSelector";
import DisqusComments from "../MovieDetails/Disqus/DisqusComments";
import "./tvSowsDetail.css";
function TvShowDetails() {
  const { id } = useParams<{ id: any }>();
  const [tvShowDetailsResult, setTvShowDetailsResult] = useState<any>({});
  const [selectedSeason, setSelectedSeason] = useState<any | null>(null);
  const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState<
    number | null
  >(null);

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
  }, [id]);

  const handleSeasonChange = (season: any) => {
    setSelectedSeason(season);
  };

  const handleEpisodeClick = (episodeNumber: number) => {
    setCurrentEpisodeNumber(episodeNumber);
  };

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
  // Conditionally set vidSrcUrl based on whether a season is selected
  const vidSrcUrl = selectedSeason
    ? `https://vidsrc.to/embed/tv/${tvShowDetailsResult.id}/${
        selectedSeason.season_number
      }/${currentEpisodeNumber || ""}`
    : `https://vidsrc.to/embed/tv/${tvShowDetailsResult.id}`;

  const handleVidSrcChange = (newVidSrc: string) => {
    // Do something with the updated vidSrcUrl
    console.log("Updated vidSrcUrl:", newVidSrc);
  };
  return (
    <>
      <div className="section-container body-container">
        <div className="main-left">
          <div className="movie-play">
            <TvShowPlayer
              tvShowDetailsResult={tvShowDetailsResult}
              onVidSrcChange={handleVidSrcChange}
              vidSrcUrl={vidSrcUrl}
            />
          </div>

          <div className="about-movie body-container">
            <div className="heading">
              {/* Pass the SeasonSelector function to fetch Seasons */}
              {tvShowDetailsResult.seasons &&
                tvShowDetailsResult.seasons.length > 0 && (
                  <SeasonSelector
                    seasons={tvShowDetailsResult.seasons}
                    onSeasonChange={handleSeasonChange}
                  />
                )}
            </div>

            {/* Creating Episode Buttons From Episode Count {Api Request Results} /Selected Season */}
            <div className="episode-buttons">
              {selectedSeason &&
                Array.from(
                  { length: selectedSeason.episode_count },
                  (_, index) => (
                    <button
                      key={index + 1}
                      className="episode_button"
                      onClick={() => handleEpisodeClick(index + 1)}
                    >
                      Episode {index + 1}
                    </button>
                  )
                )}
            </div>
            <div className="sypnosis">
              {/* Check if poster_path exists before rendering image */}
              {selectedSeason ? (
                // If a season is selected, use its poster
                <img
                  src={`https://image.tmdb.org/t/p/original/${selectedSeason.poster_path}`}
                  alt={`Poster for ${selectedSeason.name}`}
                  className="img"
                />
              ) : (
                // Otherwise, use the default poster
                tvShowDetailsResult.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/original/${tvShowDetailsResult.poster_path}`}
                    alt={`Poster for ${tvShowDetailsResult.original_title}`}
                    className="img"
                  />
                )
              )}

              <div className="content">
                {selectedSeason ? (
                  // Render content for the selected season
                  <>
                    <h2>
                      {tvShowDetailsResult.name} : {selectedSeason.name}
                    </h2>
                  </>
                ) : (
                  // Render content for the default view (no selected season)
                  <>
                    <h2>{tvShowDetailsResult.name}</h2>
                    <p className="tagline">{tvShowDetailsResult.tagline}</p>
                  </>
                )}
                <div className="req">
                  {selectedSeason ? (
                    // Render content for the selected season
                    <>
                      <span>
                        <i className="bx bx-calendar-alt"></i>
                        {/* Include the release date for the selected season if available */}
                        {selectedSeason.air_date &&
                          new Date(selectedSeason.air_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                            }
                          )}
                      </span>
                      {/* Adjust the age requirement and episode run time for the selected season */}
                      <span className="age-req">
                        <i>R</i>
                      </span>
                      <span>
                        <i className="bx bx-time"></i>
                        {tvShowDetailsResult.episode_run_time}min/ep
                      </span>
                    </>
                  ) : (
                    // Render content for the default view (no selected season)
                    <>
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
                    </>
                  )}
                </div>
                {selectedSeason ? (
                  <>
                    <p>{selectedSeason.overview}</p>
                    <span id="release">
                      <i className="fa fa-calendar"></i> Release date :
                      {new Date(selectedSeason.air_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                    <div className="genres">
                      {"episode count:"}
                      {selectedSeason.episode_count}
                    </div>
                  </>
                ) : (
                  <>
                    <p>{tvShowDetailsResult.overview}</p>
                    <span id="release">
                      <i className="fa fa-calendar"></i> Release date :
                      {new Date(
                        tvShowDetailsResult.first_air_date
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </>
                )}

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
                    </label>{" "}
                  </div>
                  <p className="thought">What do you think about the movie?</p>
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
        <DisqusComments />
      </div>
      <div className="copyright">&#169; Godak All rights Reserved</div>
    </>
  );
}

export default TvShowDetails;
