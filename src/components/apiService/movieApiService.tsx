/* eslint-disable @typescript-eslint/no-explicit-any */
// MovieApiService.js
import axios from "axios";

const baseurl = "https://api.themoviedb.org/3";
const apikey = "ee49cfa0ba7290f7125021125f5d7c57";

class MovieApiService {
  //movies
  static moviesApiData(page: any, genreId: number | null = null) {
    let apiUrl = `${baseurl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${apikey}`;

    // If a genre is selected, add it to the API URL
    if (genreId !== null) {
      apiUrl += `&with_genres=${genreId}`;
    }

    return axios.get(apiUrl);
  }
  //fetch genre
  static fetchGenres() {
    return axios.get(
      `${baseurl}/genre/movie/list?api_key=${apikey}&language=en-US`
    );
  }
  // ba
  // animation:16
  static fetchKidsMovies(page: any) {
    return axios.get(
      `${baseurl}/discover/movie?api_key=${apikey}&with_genres=16&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
    );
  }
  // bannerApiData
  static bannerApiData() {
    return axios.get(`${baseurl}/trending/all/week?api_key=${apikey}`);
  }

  // trendingMovieApiData
  static trendingMovieApiData() {
    return axios.get(`${baseurl}/trending/movie/day?api_key=${apikey}`);
  }

  // popularMovieApiData
  static popularMovieApiData() {
    return axios.get(`${baseurl}/trending/movie/week?api_key=${apikey}`);
  }

  // getSearchMovie : changed from movie to multi to search for all
  static getSearchMovie(data: { movieName: any }) {
    return axios.get(
      `${baseurl}/search/multi?api_key=${apikey}&query=${data.movieName}`
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

  // action:28
  static fetchActionMovies() {
    return axios.get(
      `${baseurl}/discover/movie?api_key=${apikey}&with_genres=28`
    );
  }

  // adventure:12
  static fetchAdventureMovies() {
    return axios.get(
      `${baseurl}/discover/movie?api_key=${apikey}&with_genres=12`
    );
  }

  // animation:16
  static fetchAnimationMovies() {
    return axios.get(
      `${baseurl}/discover/movie?api_key=${apikey}&with_genres=16`
    );
  }

  // comedy:35
  static fetchComedyMovies() {
    return axios.get(
      `${baseurl}/discover/movie?api_key=${apikey}&with_genres=35`
    );
  }

  // documentary:99
  static fetchDocumentaryMovies() {
    return axios.get(
      `${baseurl}/discover/movie?api_key=${apikey}&with_genres=99`
    );
  }

  // science-fiction:878

  static fetchScienceFictionMovies() {
    return axios.get(
      `${baseurl}/discover/movie?api_key=${apikey}&with_genres=878`
    );
  }

  // thriller:53
  static fetchThrillerMovies() {
    return axios.get(
      `${baseurl}/discover/movie?api_key=${apikey}&with_genres=53`
    );
  }

  // thriller:27
  static fetchHorrorMovies() {
    return axios.get(
      `${baseurl}/discover/movie?api_key=${apikey}&with_genres=27`
    );
  }
  //Detail Page

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
