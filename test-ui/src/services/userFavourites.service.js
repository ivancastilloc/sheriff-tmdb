import http from "../http-common";

class UserFavouritesService {
  getFavourites(user_id) {
    return http.get(`/users/favourites?user_id=${user_id}`);
  }

  addFavourite(user_id, content_id) {
    return http.post("/users/favourites", { user_id, content_id });
  }

  deleteFavourite(user_id, content_id) {
    return http.delete("/users/favourites", { data: { user_id, content_id } });
  }
}

export default new UserFavouritesService();
