import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Dashboard from "./pages/Dashboard.page";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import authService from "./services/auth.service";
import Favourites from "./pages/Favourites.page";
import SearchResults from "./pages/SearchResults.page";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      {authService.isAuthenticated() && <NavBar />}
      <div className="m-3">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
