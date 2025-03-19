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

  // Retrieve tv shows
  router.get("/tv", tmdb.findAllTV);

  // Retrieve popular tv shows
  router.get("/tv/popular", tmdb.findPopularTV);

  // Search in TV Shows and Movies
  router.get("/search", tmdb.search);

  app.use('/api/tmdb', router);
};
