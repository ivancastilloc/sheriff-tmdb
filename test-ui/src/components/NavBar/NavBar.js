import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaRegUserCircle } from "react-icons/fa";
import authService from "../../services/auth.service";
import "./NavBar.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState({ username: "", email: "" });
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser({
        username: currentUser.username,
        email: currentUser.email,
      });
    }
  }, []);

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

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className="navbar__container">
      <div className="navbar__content--left">
        <Link to="/" className="navbar__brand">TMDB</Link>
        <div className="navbar__links">
            <>
              <Link to="/dashboard" className="navbar__link">Dashboard</Link>
              <Link to="/favourites" className="navbar__link">Favourites</Link>
            </>
        </div>
      </div>

      <div className="navbar__content--right">
        <input
          className="form-control"
          type="search"
          placeholder="Search... 🔍"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={toggleUserMenu} className="user_btn"> <FaRegUserCircle /> </button>

        {isUserMenuOpen && (
          <div className="user_menu">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}

        <button onClick={handleLogout} className="logout_btn"><FaSignOutAlt /></button>
      </div>
    </nav>
  );
};

export default Navbar;
