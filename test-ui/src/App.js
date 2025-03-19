import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Dashboard from "./pages/Dashboard.page";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import authService from "./services/auth.service";

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
      <div className="mt-2 mr-2 ml-2">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
