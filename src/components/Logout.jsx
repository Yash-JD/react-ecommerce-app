import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    if (status) {
      Cookies.remove("userToken");
      localStorage.clear("role");
      setStatus(false);
    } else {
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-auto p-3 bg-black text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-800 transition duration-200"
    >
      {status ? "logout" : "login"}
    </button>
  );
};

export default Logout;
