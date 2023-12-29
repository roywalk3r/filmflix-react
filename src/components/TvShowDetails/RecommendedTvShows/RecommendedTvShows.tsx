import TvShowApiService from "../../apiService/tvShowsApiService";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
// Initialize Swiper modules

function RecommendedTvShows() {
  const { id } = useParams<{ id: any }>();
  const [recommendedTvShows, setRecommendedTvShowsResult] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecommendedTvShowsData = async () => {
      try {
        const recommendedResponse =
          await TvShowApiService.getRecommendedTvShows(id);
        //// console.log(recommendedResponse.data, "recommendedTvShowsResult#");

        setRecommendedTvShowsResult(recommendedResponse.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRecommendedTvShowsData();
  }, [id]);

  return (
    <>
      {/* Recommended Movies */}
      <h2 className="download-title">You Might Also Like...</h2>
      <Swiper
        className="recommended_swiper"
        modules={[EffectCards]}
        grabCursor={true}
        effect="cards"
        loop={true}
      >
        <div>
          {recommendedTvShows.map((r: any) => (
            <SwiperSlide key={r.id}>
              <img
                src={`https://image.tmdb.org/t/p/original/${r.poster_path}`}
                alt="image poster"
              />
              <div className="box-text">
                <Link to={`/tv/${r.id}`} className="watch-btn play-btn">
                  <i className="bx bx-right-arrow"></i>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  );
}

export default RecommendedTvShows;
