import http from "../http-common";

class TmdbDataService {
  getMovies(page = 1) {
    return http.get(`/tmdb/movies?page=${page}`);
  }

  getPopularMovies(page = 1) {
    return http.get(`/tmdb/movies/popular?page=${page}`);
  }

  getMovieGenres() {
    return http.get(`/tmdb/movies/genres`);
  }

  getTVShows(page = 1) {
    return http.get(`/tmdb/tv?page=${page}`);
  }

  getPopularTVShows(page = 1) {
    return http.get(`/tmdb/tv/popular?page=${page}`);
  }

  getTVGenres() {
    return http.get(`/tmdb/tv/genres`);
  }

  search(query = "", page = 1) {
    return http.get(`/tmdb/search?query=${encodeURIComponent(query)}&page=${page}`);
  }
}

export default new TmdbDataService();