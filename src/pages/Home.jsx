import React from "react";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <h2>Home Page</h2>
      <Logout />
    </div>
  );
};

export default Home;
