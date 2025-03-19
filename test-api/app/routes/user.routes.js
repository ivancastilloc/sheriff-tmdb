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

  // Ruta para obtener todos los favoritos del usuario autenticado
  router.get("/favourites", users.getFavourites);

  // Ruta para agregar un favorito (recibe user_id y content_id en el cuerpo)
  router.post("/favourites", users.addFavourite);

  // Ruta para eliminar un favorito (recibe user_id y content_id en el cuerpo)
  router.delete("/favourites", users.deleteFavourite);

  app.use('/api/users', router);
};
