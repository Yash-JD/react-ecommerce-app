import React, { useState } from "react";
import { FaSearch, FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const wishlistCounter = useSelector((state) => state.wishlistCounter.value);
  const cartCounter = useSelector((state) => state.cartCounter.value);
  const role = localStorage.getItem("role");

  // handle login & logout
  const navigate = useNavigate();

  const handleUserActive = () => {
    Cookies.remove("userToken");
    setShowUserMenu(false);
    toast.success("logged out successfully.", { autoClose: 2000 });
    return navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-40 py-4 bg-gray-200 w-full h-[88px] gap-x-9">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2 h-[32px]">
        {/* logo */}
        <div className="flex items-center font-bold text-lg text-black">
          <button onClick={() => navigate("/")}>E-Shop</button>
        </div>
      </div>

      {/* Search Bar */}
      {/* <div className="flex items-center bg-[#F5F5F5] rounded-lg px-4 py-3 w-[433px] h-[56px]">
        <FaSearch className="text-gray-500 text-lg mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent text-sm text-gray-600 placeholder-gray-500 placeholder-opacity-50 focus:outline-none w-full"
        />
      </div> */}

      {role == "seller" ? (
        <div className="flex items-center gap-6 w-[144px] h-[32px] relative ">
          <span
            className=" text-black opacity-60 transition duration-200 ease-in-out hover:scale-105 hover:font-semibold cursor-pointer hover:opacity-100"
            onClick={() => navigate("/admin/products")}
          >
            My Products
          </span>
          {/* User Icon */}
          <div className="relative">
            <FiUser
              className="text-black w-6 h-6 cursor-pointer hover:cursor-pointer hover:scale-110"
              onClick={() => setShowUserMenu((prev) => !prev)}
              // onMouseEnter={handleUserMenu}
              // onMouseLeave={handleUserMenu}
            />
            {showUserMenu && (
              <div className="absolute right-0 top-8 w-36 bg-white border border-gray-200 shadow-md rounded-lg py-2 z-50">
                <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                  My Orders
                </button>
                <button
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={handleUserActive}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Navigation Links */}
          <div className="flex gap-8 text-[16px] font-medium items-center whitespace-nowrap">
            {/* mens collection */}
            <div className="relative">
              <button
                className="text-black opacity-60 transition duration-200 ease-in-out hover:scale-105 hover:font-semibold cursor-pointer hover:opacity-100"
                onClick={() => navigate("/products")}
              >
                Men
              </button>
            </div>

            {/* womens collection */}
            <div className="relative">
              <button
                className="text-black opacity-60 transition duration-200 ease-in-out hover:scale-105 hover:font-semibold cursor-pointer hover:opacity-100"
                onClick={() => navigate("/products")}
              >
                Women
              </button>
            </div>

            {/* kids collection */}
            <div className="relative">
              <button
                className="text-black opacity-60 transition duration-200 ease-in-out hover:scale-105 hover:font-semibold cursor-pointer hover:opacity-100"
                onClick={() => navigate("/products")}
              >
                Kid
              </button>
            </div>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-6 w-[144px] h-[32px] relative ">
            {/* Favorites Icon with counter */}
            <div className="relative">
              <FaRegHeart
                className="text-black w-5 h-5 hover:cursor-pointer hover:scale-110"
                onClick={() => navigate("/wishlist")}
              />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistCounter}
              </span>
            </div>

            {/* Cart Icon with counter */}
            <div className="relative">
              <IoCartOutline
                className="text-black w-6 h-6 hover:cursor-pointer hover:scale-110"
                onClick={() => navigate("/cart")}
              />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCounter}
              </span>
            </div>

            {/* User Icon */}
            <div className="relative">
              <FiUser
                className="text-black w-6 h-6 cursor-pointer hover:cursor-pointer hover:scale-110"
                onClick={() => setShowUserMenu((prev) => !prev)}
                // onMouseEnter={handleUserMenu}
                // onMouseLeave={handleUserMenu}
              />
              {showUserMenu && (
                <div className="absolute right-0 top-8 w-36 bg-white border border-gray-200 shadow-md rounded-lg py-2 z-50">
                  <button
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      setShowUserMenu((prev) => !prev);
                      navigate("/orders");
                    }}
                  >
                    My Orders
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={handleUserActive}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
