import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginService from "../../services/login.service";
import authService from "../../services/auth.service";
import "./Login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginService.login(email, password);
      authService.setToken(response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="form__container">
      <div className="login__container">
        <form className="login__form" autoComplete="off" onSubmit={loginSubmit}>
          <h2 className="login__title">Login</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="login__input">
            <label className="login__label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login__input">
            <label className="login__label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login__submit" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
           <Link className="login__create" to="/register">Create account</Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
