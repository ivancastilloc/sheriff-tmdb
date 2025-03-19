import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm/Login.form";
import authService from "../services/auth.service";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
