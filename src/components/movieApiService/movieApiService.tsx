// MovieApiService.js
import axios from "axios";

const baseurl = "https://api.themoviedb.org/3";
const apikey = "ee49cfa0ba7290f7125021125f5d7c57";

class MovieApiService {
  // bannerApiData
  static bannerApiData() {
    return axios.get(`${baseurl}/trending/movie/week?api_key=${apikey}`);
  }

  // trendingMovieApiData
  static trendingMovieApiData() {
    return axios.get(`${baseurl}/trending/movie/day?api_key=${apikey}`);
  }

  // popularMovieApiData
  static popularMovieApiData() {
    return axios.get(`${baseurl}/trending/movie/week?api_key=${apikey}`);
  }

  // getSearchMovie
  static getSearchMovie(data: { movieName: any }) {
    return axios.get(
      `${baseurl}/search/movie?api_key=${apikey}&query=${data.movieName}`
    );
  }

  // getMovieDetails
  static getMovieDetails(data: any) {
    return axios.get(`${baseurl}/movie/${data}?api_key=${apikey}`);
  }

  // getBackdropImage
  static getBackdropImage(data: any) {
    return axios.get(`${baseurl}/movie/${data}?api_key=${apikey}`);
  }

  // getMovieVideo
  static getMovieVideo(data: any) {
    return axios.get(`${baseurl}/movie/${data}/videos?api_key=${apikey}`);
  }

  // getMovieCast
  static getMovieCast(movieId: any) {
    return axios.get(`${baseurl}/movie/${movieId}/credits?api_key=${apikey}`);
  }

  // action
  static fetchActionMovies() {
    return axios.get(
      `${baseurl}/discover/movie?api_key=${apikey}&with_genres=28`
    );
  }

  // adventure
  static fetchAdventureMovies() {
    return axios.get(
      `${baseurl}/discover/movie?api_key=${apikey}&with_genres=12`
    );
  }

  // ... (similar methods for other movie genres)

  // getRelatedMovies
  static getRelatedMovies(id: any) {
    const url = `${baseurl}/movie/${id}/similar?api_key=${apikey}`;
    return axios.get(url);
  }

  // getRecommendedMovies
  static getRecommendedMovies(id: any) {
    const url = `${baseurl}/movie/${id}/recommendations?api_key=${apikey}`;
    return axios.get(url);
  }
}

export default MovieApiService;
