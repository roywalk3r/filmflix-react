import MovieApiService from "../../movieApiService/movieApiService";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "../movieDetails.css";
// Initialize Swiper modules

function RecommendedMovies() {
  const { id } = useParams<{ id: any }>();
  const [recommendedMovies, setRecommendedMoviesResult] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecommendedMoviesData = async () => {
      try {
        const recommendedResponse = await MovieApiService.getRecommendedMovies(
          id
        );
        //// console.log(recommendedResponse.data, "recommendedMoviesResult#");

        setRecommendedMoviesResult(recommendedResponse.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRecommendedMoviesData();
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
          {recommendedMovies.map((r: any) => (
            <SwiperSlide key={r.id}>
              <img
                src={`https://image.tmdb.org/t/p/original/${r.poster_path}`}
                alt="image poster"
              />
              <div className="box-text">
                <Link to={`/movie/${r.id}`} className="watch-btn play-btn">
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

export default RecommendedMovies;
