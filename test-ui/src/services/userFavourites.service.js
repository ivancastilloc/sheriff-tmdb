import http from "../http-common";

class UserFavouritesService {
  getFavourites(user_id) {
    return http.get(`/users/favourites?user_id=${user_id}`);
  }

  getPaginatedFavourites(user_id, page = 1, limit = 20) {
    return http.get(`/users/favourites/paginated?user_id=${user_id}&page=${page}&limit=${limit}`);
  }

  addFavourite(user_id, content_id, title, release_date, vote_average, poster_path) {
    return http.post("/users/favourites", {
      user_id,
      content_id,
      title,
      release_date,
      vote_average,
      poster_path
    });
  }

  deleteFavourite(user_id, content_id) {
    return http.delete("/users/favourites", { data: { user_id, content_id } });
  }
}

export default new UserFavouritesService();
