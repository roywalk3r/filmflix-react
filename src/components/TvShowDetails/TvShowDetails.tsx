/* eslint-disable @typescript-eslint/no-explicit-any */
import TvShowApiService from "../apiService/tvShowsApiService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TvShowCast from "./Casts/tvShowCast";
import TvShowPlayer from "./TvShowPlayer/TvShowPlayer";
import RecommendedTvShows from "./RecommendedTvShows/RecommendedTvShows";
import RelatedTvShows from "./RelatedTvShows/RelatedTvShows";
import SeasonSelector from "./SeasonSelector/SeasonSelector";
// import DisqusComments from "../MovieDetails/Disqus/DisqusComments";
import DisqusComments from "./Disqus/DisqusComments";

import "./tvSowsDetail.css";

function TvShowDetails() {
  const { id } = useParams<{ id: any }>();
  const [tvShowDetailsResult, setTvShowDetailsResult] = useState<any>({});
  const [selectedSeason, setSelectedSeason] = useState<any | null>(null);
  const [selectedEpisodes, setSelectedEpisodes] = useState<number[]>([]);
  const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const updateUrl = (
    seasonNumber: number,
    episodeNumber: number | null = null
  ) => {
    const url = `/tv/${id}/#/season${seasonNumber}${
      episodeNumber ? `/episode${episodeNumber}` : ""
    }`;
    window.history.pushState({}, "", url);
  };

  const handleSeasonChange = (season: any) => {
    setSelectedSeason(season);
    setCurrentEpisodeNumber(null);
    setSelectedEpisodes([]); // Reset selected episodes when switching to a new season
    updateUrl(season.season_number);
  };

  const handleEpisodeClick = (episodeNumber: number) => {
    setSelectedEpisodes((prevSelectedEpisodes) => [
      ...prevSelectedEpisodes,
      episodeNumber,
    ]);
    setCurrentEpisodeNumber(episodeNumber);

    updateUrl(selectedSeason.season_number, episodeNumber);
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

  const vidSrcUrl = selectedSeason
    ? `https://vidsrc.xyz/embed/tv?tmdb=${tvShowDetailsResult.id}&season=${
        selectedSeason.season_number
      }&episode=${currentEpisodeNumber || ""}`
    : `https://vidsrc.xyz/embed/tv?tmdb=${tvShowDetailsResult.id}`;

  const handleVidSrcChange = (newVidSrc: string) => {
    console.log("Updated vidSrcUrl:", newVidSrc);
  };

  const handleNextEpisode = () => {
    if (selectedSeason) {
      const nextEpisodeNumber =
        currentEpisodeNumber !== null &&
        currentEpisodeNumber < selectedSeason.episode_count
          ? currentEpisodeNumber + 1
          : 1;

      handleEpisodeClick(nextEpisodeNumber);
    }
  };

  const handlePreviousEpisode = () => {
    if (selectedSeason) {
      const previousEpisodeNumber =
        currentEpisodeNumber !== null && currentEpisodeNumber > 1
          ? currentEpisodeNumber - 1
          : selectedSeason.episode_count;

      handleEpisodeClick(previousEpisodeNumber);
    }
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
            <div className="episode-navigation">
              <button
                onClick={handlePreviousEpisode}
                className="fa-solid fa-backward"
              ></button>
              <button
                onClick={handleNextEpisode}
                className="fa-solid fa-forward"
              ></button>
            </div>
          </div>

          <div className="about-movie body-container">
            <div className="heading">
              {tvShowDetailsResult.seasons &&
                tvShowDetailsResult.seasons.length > 0 && (
                  <SeasonSelector
                    seasons={tvShowDetailsResult.seasons}
                    onSeasonChange={handleSeasonChange}
                  />
                )}
            </div>

            <div className="episode-buttons">
              {selectedSeason &&
                Array.from(
                  { length: selectedSeason.episode_count },
                  (_, index) => (
                    <button
                      key={index + 1}
                      className={`episode_button ${
                        selectedEpisodes.includes(index + 1) ? "selected" : ""
                      }`}
                      onClick={() => handleEpisodeClick(index + 1)}
                    >
                      Episode {index + 1}
                    </button>
                  )
                )}
            </div>

            <div className="sypnosis">
              {selectedSeason ? (
                <img
                  src={`https://image.tmdb.org/t/p/original/${selectedSeason.poster_path}`}
                  alt={`Poster for ${selectedSeason.name}`}
                  className="img"
                />
              ) : (
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
                  <>
                    <h2>
                      {tvShowDetailsResult.name} : {selectedSeason.name}
                    </h2>
                  </>
                ) : (
                  <>
                    <h2>{tvShowDetailsResult.name}</h2>
                    <p className="tagline">{tvShowDetailsResult.tagline}</p>
                  </>
                )}
                <div className="req">
                  {selectedSeason ? (
                    <>
                      <span>
                        <i className="bx bx-calendar-alt"></i>
                        {selectedSeason.air_date &&
                          new Date(selectedSeason.air_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                            }
                          )}
                      </span>
                      <span className="age-req">
                        <i>R</i>
                      </span>
                      <span>
                        <i className="bx bx-time"></i>
                        {tvShowDetailsResult.episode_run_time}min/ep
                      </span>
                    </>
                  ) : (
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
                    </label>
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
        <DisqusComments
          pageIdentifier={`tvshow-${id}-season-${selectedSeason?.season_number}`}
          pageTitle={`Comments for ${tvShowDetailsResult.name}`}
        />{" "}
      </div>

      <div className="copyright">&#169; Godak All rights Reserved</div>
    </>
  );
}

export default TvShowDetails;
