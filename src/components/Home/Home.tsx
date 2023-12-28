import { useEffect, useState } from "react";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay, Pagination } from "swiper/modules";
import LatestMovies from "./Cards/LatestMovies/LatestMovies";
import "swiper/css/bundle";
import MovieApiService from "../movieApiService/movieApiService";
import PopularMovies from "./Cards/PopularMovies/PopularMovies";
import ActionMovies from "./Cards/ActionMovies/ActionMovie";
import { Link } from "react-router-dom";
import DisqusComments from "../MovieDetails/Disqus/DisqusComments";
import AdventureMovies from "./Cards/AdventureMovies/AdventureMovies";
import Animations from "./Cards/Animations/Animations";
import ComedyMovies from "./Cards/ComedyMovies/ComedyMovies";
import ThrillerMovies from "./Cards/ThrillerMovies/ThrillerMovies";
import ScienceFiction from "./Cards/ScienceFiction/ScienceFiction";
import Documentary from "./Cards/Documentary/Documentary";
import HorrorMovies from "./Cards/HorrorMovies/HorrorMovies";

function Home() {
  const [bannerResult, setBannerResult] = useState<any[]>([]);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await MovieApiService.bannerApiData();
        console.log(response.data, "bannerresult#");
        setBannerResult(response.data.results.slice(0, 9));
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBannerData();
  }, []);

  return (
    <>
      <div className="Home">
        <div className="container">
          <Swiper
            modules={[Navigation, EffectFade, Autoplay, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            // navigation={{
            //   nextEl: ".swiper-button-next",
            //   prevEl: ".swiper-button-prev",
            // }}

            autoplay={{ delay: 3000, disableOnInteraction: true }}
            pagination={{ clickable: true }}
            grabCursor={true}
            effect="fade"
          >
            {bannerResult.map((b, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-content-wrapper">
                  {/* <div className="swiper-content-text">
                    <h2>{b.original_title}</h2>
                    <p>{b.overview}</p>
                  </div> */}
                  <div className="content-text">
                    <div className="banner_movie_name">
                      <h1>{b.original_title}</h1>
                    </div>
                    <div className="banner_movie_details">
                      <span className="question_mark">R</span>
                      <span className="hd">HD</span>
                      <span className="caption">CC</span>
                      <span className="release_date">
                        {new Date(b.release_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric", // or "2-digit" for two-digit day representation
                        })}
                      </span>
                    </div>
                    <div className="banner_movie_overview">
                      <p>{b.overview}</p>
                    </div>
                    <Link
                      to={`/movie/${b.id}`}
                      className="banner_movie_play_btn"
                    >
                      <i className="fas fa-play"></i>
                      <p className="banner_movie_play_text">Play now</p>
                    </Link>
                  </div>
                  <div className="swiper-content-image">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${b.backdrop_path}`}
                      className="d-block w-100"
                      alt="Banner"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
            {/* <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div> */}
          </Swiper>
        </div>
      </div>
      <LatestMovies />
      <PopularMovies />
      <ActionMovies />
      <AdventureMovies />
      <Animations />
      <ComedyMovies />
      <ThrillerMovies />
      <ScienceFiction />
      <Documentary />
      <HorrorMovies />
      <div className="comment-section container">
        <h2 className="comment-head">
          <i className="bx bxs-star star"></i>
          Comment Section
        </h2>
        <DisqusComments />
      </div>{" "}
      <div className="copyright">&#169; Godak All rights Reserved</div>
    </>
  );
}

export default Home;
