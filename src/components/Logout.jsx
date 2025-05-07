import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    if (status) {
      localStorage.clear("userToken");
      setStatus(false);
    } else {
      navigate("/login");
    }
  };
  return <button onClick={handleClick}>{status ? "logout" : "login"}</button>;
};

export default Logout;
