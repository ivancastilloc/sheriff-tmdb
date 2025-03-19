const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const UserFavourite = db.userFavourite;

exports.create = async (req, res) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send({ message: "Todos los campos son obligatorios." });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(201).send(user);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).send({ message: error.message || "Error al crear el usuario." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Email y contraseña son requeridos." });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send({ message: "Usuario no encontrado." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: "Contraseña incorrecta." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "secreto_super_seguro", { expiresIn: "1h" });

    res.status(200).send({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error en el login." });
  }
};

exports.getFavourites = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).send({ message: "El user_id es necesario para obtener los favoritos." });
    }

    const favourites = await UserFavourite.findAll({
      where: { user_id },
      attributes: ['user_id', 'content_id']
    });

    res.status(200).send(favourites);
  } catch (error) {
    console.error("Error al obtener los favoritos:", error);
    res.status(500).send({ message: "Error al obtener los favoritos." });
  }
};

exports.getPaginatedFavourites = async (req, res) => {
  try {
    const { user_id, page = 1, limit = 20 } = req.query;

    if (!user_id) {
      return res.status(400).send({ message: "El user_id es necesario para obtener los favoritos." });
    }

    const offset = (page - 1) * limit;

    const favourites = await UserFavourite.findAndCountAll({
      where: { user_id },
      limit: parseInt(limit),
      offset: offset,
    });

    const totalPages = Math.ceil(favourites.count / limit);

    res.status(200).send({
      favourites: favourites.rows,
      total: favourites.count,
      page: parseInt(page),
      totalPages: totalPages,
    });
  } catch (error) {
    console.error("Error al obtener los favoritos:", error);
    res.status(500).send({ message: "Error al obtener los favoritos." });
  }
};

exports.addFavourite = async (req, res) => {
  try {
    const { user_id, content_id, title, release_date, vote_average, poster_path } = req.body;

    if (!user_id || !content_id) {
      return res.status(400).send({ message: "user_id y content_id son requeridos." });
    }

    await UserFavourite.create({
      user_id,
      content_id,
      title: title || null,
      release_date: release_date || null,
      vote_average: vote_average || null,
      poster_path: poster_path || null,
    });

    res.status(201).send({ message: "Favorito agregado correctamente." });
  } catch (error) {
    console.error("Error al agregar favorito:", error);
    res.status(500).send({ message: "Error al agregar el favorito." });
  }
};

exports.deleteFavourite = async (req, res) => {
  try {
    const { user_id, content_id } = req.body;

    if (!user_id || !content_id) {
      return res.status(400).send({ message: "user_id y content_id son requeridos." });
    }

    const deleted = await UserFavourite.destroy({
      where: {
        user_id,
        content_id,
      },
    });

    if (deleted === 0) {
      return res.status(404).send({ message: "Favorito no encontrado." });
    }

    res.status(200).send({ message: "Favorito eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    res.status(500).send({ message: "Error al eliminar el favorito." });
  }
};
