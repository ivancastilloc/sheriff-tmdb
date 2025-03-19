const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken"); // Para generar tokens

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
