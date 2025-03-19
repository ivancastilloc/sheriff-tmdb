import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to="/">Inicio</Link>
      {authService.isAuthenticated() ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/favourites">Favourites</Link>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/register">Registrarse</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
