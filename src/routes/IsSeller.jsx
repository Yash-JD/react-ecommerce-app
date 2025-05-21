import React from "react";
import { Navigate } from "react-router-dom";

const IsSeller = ({ children }) => {
  const IsSeller = localStorage.getItem("role");

  if (IsSeller != "seller") {
    return <Navigate to="/products" replace />;
  }

  return children;
};

export default IsSeller;
