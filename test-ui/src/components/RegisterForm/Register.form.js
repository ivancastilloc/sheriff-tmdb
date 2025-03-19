import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../../services/login.service";
import "./Register.css";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginService.register({ username, email, password });
      navigate("/login");
    } catch (err) {
      setError("Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="form__container">
      <div className="register__container">
        <form className="register__form" autoComplete="off" onSubmit={registerSubmit}>
          <h2 className="register__title">Register</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="register__input">
            <label className="register__label" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="register__input">
            <label className="register__label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="register__input">
            <label className="register__label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="register__submit" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
