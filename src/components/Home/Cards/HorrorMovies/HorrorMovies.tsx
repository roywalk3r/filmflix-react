import { useEffect, useState } from "react";

import MovieApiService from "../../../movieApiService/movieApiService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
function HorrorMovies() {
  const [horrorMoviesResult, setHorrorMoviesResult] = useState<any[]>([]);

  useEffect(() => {
    const fetchHorrorMoviesResultData = async () => {
      try {
        const response = await MovieApiService.fetchHorrorMovies();
        setHorrorMoviesResult(response.data.results.slice(0, 12));
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchHorrorMoviesResultData();
  }, []);

  return (
    <>
      <section className="popular container">
        {/* Heading   */}
        <div className="heading">
          <h2 className="heading-title">Horror Movies</h2>
          <div className="swiper-btn">
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
        <div className="popular-content ">
          <Swiper
            modules={[Navigation, EffectFade, Autoplay, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              280: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              510: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              758: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              900: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            autoplay={{ delay: 3000, disableOnInteraction: true }}
            // pagination={{ clickable: true }}
            grabCursor={true}
            // effect="fade"
          >
            {horrorMoviesResult.map((c, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-slide">
                  <div className="movie-box">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${c.poster_path}`}
                      alt="{ t.original_title }"
                      className="movie-box-img w-100"
                    />
                    <div className="box-text">
                      <h2 className="movie-title">{c.original_title}</h2>
                      <span className="movie-type">
                        {new Date(c.release_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric", // or "2-digit" for two-digit day representation
                        })}
                      </span>
                      <Link
                        to={`/movie/${c.id}`}
                        key={c.id}
                        className="watch-btn play-btn"
                      >
                        <i className="bx bx-right-arrow"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default HorrorMovies;
