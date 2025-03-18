import http from "../http-common";

class TmdbDataService {
  getMovies() {
    return http.get("/tmdb/movies");
  }

  getPopularMovies() {
    return http.get("/tmdb/movies/popular");
  }

  getTVShows() {
    return http.get("/tmdb/tv");
  }

  getPopularTVShows() {
    return http.get("/tmdb/tv/popular");
  }

}

export default new TmdbDataService();