module.exports = app => {
  const tmdb = require("../controllers/tmdb.controller.js");
  var router = require("express").Router();

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

  // Retrieve movies
  router.get("/movies", tmdb.findAllMovies);

  // Retrieve popular movies
  router.get("/movies/popular", tmdb.findPopularMovies);

  // Retrieve movie genres
  router.get("/movies/genres", tmdb.findMovieGenres);

  // Retrieve tv shows
  router.get("/tv", tmdb.findAllTV);

  // Retrieve popular tv shows
  router.get("/tv/popular", tmdb.findPopularTV);

    // Retrieve TV genres
    router.get("/tv/genres", tmdb.findTVGenres);

  // Search in TV Shows and Movies
  router.get("/search", tmdb.search);

  app.use('/api/tmdb', router);
};
