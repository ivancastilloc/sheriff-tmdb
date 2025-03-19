import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      if (e.target.value.trim()) {
        navigate(`/search?query=${e.target.value.trim()}`);
      }
    }, 300);

    setTimeoutId(newTimeoutId);
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">Inicio</Link>
      <div className="navbar-nav">
        {authService.isAuthenticated() ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/favourites" className="nav-link">Favourites</Link>
            <button onClick={handleLogout} className="btn btn-link">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Logout</Link>
          </>
        )}
      </div>

      <div className="form-inline ml-auto">
        <input
          className="form-control"
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </nav>
  );
};

export default Navbar;
