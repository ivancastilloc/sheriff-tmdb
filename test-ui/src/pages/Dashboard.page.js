import React, { useState, useEffect } from "react";
import TmdbDataService from "../services/tmdb.service";
import Carousel from "../components/Carousel/Carousel";
import userFavouritesService from "../services/userFavourites.service";
import authService from "../services/auth.service";

const Dashboard = () => {
  const [favourites, setFavourites] = useState([]);
  const user_id = authService.getUserId();

  useEffect(() => {
    if (user_id) {
      userFavouritesService.getFavourites(user_id)
        .then(response => {
          setFavourites(response.data);
        })
        .catch(error => {
          console.error("Error al obtener favoritos:", error);
        });
    } else {
      console.error("Usuario no autenticado, no se pudo obtener el user_id.");
    }
  }, [user_id]);

  return (
    <div>
      <h2>Popular Movies</h2>
      <Carousel fetchMethod={TmdbDataService.getPopularMovies} favourites={favourites} />

      <h2>Popular TV Shows</h2>
      <Carousel fetchMethod={TmdbDataService.getPopularTVShows} favourites={favourites}/>

      <h2>Movies</h2>
      <Carousel fetchMethod={TmdbDataService.getMovies} favourites={favourites}/>

      <h2>TV Shows</h2>
      <Carousel fetchMethod={TmdbDataService.getTVShows} favourites={favourites}/>
    </div>
  );
};

export default Dashboard;