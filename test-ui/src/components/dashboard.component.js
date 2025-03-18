import React from "react";
import TmdbDataService from "../services/tmdb.service";
import Carousel from "./Carousel/Carousel";

const Dashboard = () => {
  return (
    <div>
      <h2>Popular Movies</h2>
      <Carousel fetchMethod={TmdbDataService.getPopularMovies} />

      <h2>Popular TV Shows</h2>
      <Carousel fetchMethod={TmdbDataService.getPopularTVShows} />

      <h2>Movies</h2>
      <Carousel fetchMethod={TmdbDataService.getMovies} />

      <h2>TV Shows</h2>
      <Carousel fetchMethod={TmdbDataService.getTVShows} />
    </div>
  );
};

export default Dashboard;