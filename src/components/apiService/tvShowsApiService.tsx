// MovieApiService.js
import axios from "axios";

const baseurl = "https://api.themoviedb.org/3";
const apikey = "ee49cfa0ba7290f7125021125f5d7c57";

class TvShowApiService {
  //tv shows
  static tvShowsApiData(page: any, genreId: number | null = null) {
    let apiUrl = `${baseurl}/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${apikey}`;

    // If a genre is selected, add it to the API URL
    if (genreId !== null) {
      apiUrl += `&with_genres=${genreId}`;
    }

    return axios.get(apiUrl);
  }

  // static getEpisodeDetails(
  //   seriesId: any,
  //   seasonNumber: any,
  //   episodeNumber: any
  // ) {
  //   const apiUrl = `${baseurl}/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${apikey}&language=en-US`;

  //   return axios.get(apiUrl);
  // }
  static fetchGenres() {
    return axios.get(
      `${baseurl}/genre/tv/list?api_key=${apikey}&language=en-US`
    );
  }
  // getMovieDetails
  static getTvShowDetails(data: any) {
    return axios.get(`${baseurl}/tv/${data}?api_key=${apikey}`);
  }

  // getTvShowCast
  static getTvShowCast(tvId: any) {
    return axios.get(`${baseurl}/tv/${tvId}/credits?api_key=${apikey}`);
  }
  // getRelatedTvShows
  static getRelatedTvShows(id: any) {
    const url = `${baseurl}/tv/${id}/similar?api_key=${apikey}`;
    return axios.get(url);
  }

  // getRecommendedTvShows
  static getRecommendedTvShows(id: any) {
    const url = `${baseurl}/tv/${id}/recommendations?api_key=${apikey}`;
    return axios.get(url);
  }
}
export default TvShowApiService;
