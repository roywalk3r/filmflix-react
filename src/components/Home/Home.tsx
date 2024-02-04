import { useEffect, useState } from "react";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import LatestMovies from "./Cards/LatestMovies/LatestMovies";
import "swiper/css/bundle";
import MovieApiService from "../apiService/movieApiService";
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
  // const progressCircle = useRef(null);
  // const progressContent = useRef(null);
  // const onAutoplayTimeLeft = (s, time, progress) => {
  //   progressCircle.current.style.setProperty('--progress', 1 - progress);
  //   progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  // };


  const [bannerResult, setBannerResult] = useState<any[]>([]);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await MovieApiService.bannerApiData();
        //// console.log(response.data, "bannerresult#");
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
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
             loop={true}
            pagination={{ clickable: true }}
            grabCursor={true}
         centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
                >
            {bannerResult.map((b, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-content-wrapper">
                  <div className="content-text">
                    <div className="banner_movie_name">
                      <h1>{b.original_title || b.name}</h1>
                    </div>
                    <div className="banner_movie_details">
                      <span className="question_mark">R</span>
                      <span className="hd">HD</span>
                      <span className="caption">CC</span>
                      <span className="release_date">
                        {new Date(
                          b.release_date || b.first_air_date
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric", // or "2-digit" for two-digit day representation
                        })}
                      </span>
                    </div>
                    <div className="banner_movie_overview">
                      <p>{b.overview}</p>
                    </div>
                    {/* Check if media_type is "movie" before rendering the link and button */}
                    {b.media_type === "movie" && (
                      <Link
                        to={`/movie/${b.id}`}
                        className="banner_movie_play_btn"
                      >
                        <i className="fas fa-play"></i>
                        <p className="banner_movie_play_text">Play now</p>
                      </Link>
                    )}
                    {/* Check if media_type is "tv" before rendering the link and button */}
                    {b.media_type === "tv" && (
                      <Link
                        to={`/tv/${b.id}`}
                        className="banner_movie_play_btn"
                      >
                        <i className="fas fa-play"></i>
                        <p className="banner_movie_play_text">Play now</p>
                      </Link>
                    )}
                  </div>
                  <div className="swiper-content-image">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${b.backdrop_path}`}
                      className=" w-100"
                      alt="Banner"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
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
