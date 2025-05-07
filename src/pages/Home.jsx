import React from "react";
import Logout from "../components/Logout";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-300 flex items-center justify-center px-4">
      <h2>Home Page</h2>
      <Logout />
    </div>
  );
};

export default Home;
