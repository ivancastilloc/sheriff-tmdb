import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm/Register.form";
import authService from "../services/auth.service";

const RegisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate("/dashboard");
    }
  }, []);
  
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;