import React, { useState, useEffect } from "react";
import TmdbDataService from "../services/tmdb.service";
import Carousel from "../components/Carousel/Carousel";
import userFavouritesService from "../services/userFavourites.service";
import authService from "../services/auth.service";

const Dashboard = () => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const user_id = authService.getUserId();

  useEffect(() => {
    TmdbDataService.getMovieGenres()
      .then(response => {
        setMovieGenres(response.data);
      })
      .catch(error => {
        console.error("Error al obtener generos de peliculas:", error);
      });

    TmdbDataService.getTVGenres()
      .then(response => {
        console.log(response)
        setTvGenres(response.data);
      })
      .catch(error => {
        console.error("Error al obtener generos de series:", error);
      });
      }, []);

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
      <h2>Popular Movies 🔥</h2>
      <Carousel fetchMethod={TmdbDataService.getPopularMovies} favourites={favourites} genres={movieGenres} />

      <h2>Popular TV Shows 🔥</h2>
      <Carousel fetchMethod={TmdbDataService.getPopularTVShows} favourites={favourites} genres={tvGenres}/>

      <h2>Movies 🎥</h2>
      <Carousel fetchMethod={TmdbDataService.getMovies} favourites={favourites} genres={movieGenres}/>

      <h2>TV Shows 📺</h2>
      <Carousel fetchMethod={TmdbDataService.getTVShows} favourites={favourites} genres={tvGenres}/>
    </div>
  );
};

export default Dashboard;