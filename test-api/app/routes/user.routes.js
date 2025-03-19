module.exports = app => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();
  const bodyParser = require("body-parser");

  router.use(bodyParser.json());

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Crear un nuevo usuario
  router.post("/register", users.create);

  // Ruta para login
  router.post("/login", users.login);

  // Ruta para obtener todos los favoritos del usuario (solo ids)
  router.get("/favourites", users.getFavourites);

  // Ruta para obtener los favoritos paginados del usuario (con detalles)
  router.get("/favourites/paginated", users.getPaginatedFavourites);

  // Ruta para agregar un favorito
  router.post("/favourites", users.addFavourite);

  // Ruta para eliminar un favorito
  router.delete("/favourites", users.deleteFavourite);

  app.use('/api/users', router);
};
