import React from "react";
import { Navigate } from "react-router-dom";

const IsUser = ({ children }) => {
  const IsUser = localStorage.getItem("role");

  if (IsUser != "user") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default IsUser;
