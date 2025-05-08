import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { FaSearch, FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  const category = ["cloths", "luxury"];

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMensCollection, setShowMensCollection] = useState(false);
  const [showWomensCollection, setShowWomensCollection] = useState(false);
  const [showKidsCollection, setShowKidsCollection] = useState(false);

  const handleMenChange = () => {
    setShowMensCollection((prev) => !prev);
    setShowWomensCollection(false);
    setShowKidsCollection(false);
    setShowUserMenu(false);
  };

  const handleWomenChange = () => {
    setShowMensCollection(false);
    setShowWomensCollection((prev) => !prev);
    setShowKidsCollection(false);
    setShowUserMenu(false);
  };

  const handleKidChange = () => {
    setShowMensCollection(false);
    setShowWomensCollection(false);
    setShowKidsCollection((prev) => !prev);
    setShowUserMenu(false);
  };

  const handleUserMenu = () => {
    setShowMensCollection(false);
    setShowWomensCollection(false);
    setShowKidsCollection(false);
    setShowUserMenu((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between px-40 py-4 bg-white w-full h-[88px] gap-x-9">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2 w-[96px] h-[32px]">
        {/* Replace this with your actual logo */}
        <div className="flex items-center font-bold text-lg text-black">
          <span className="mr-1"></span> cyber
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-[#F5F5F5] rounded-lg px-4 py-3 w-[433px] h-[56px]">
        <FaSearch className="text-gray-500 text-lg mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent text-sm text-gray-600 placeholder-gray-500 placeholder-opacity-50 focus:outline-none w-full"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex gap-8 text-[16px] font-medium items-center whitespace-nowrap">
        {/* mens collection */}
        <div className="relative">
          <span
            className="text-black opacity-60 transition duration-200 ease-in-out hover:scale-105 hover:font-semibold cursor-pointer hover:opacity-100"
            onClick={handleMenChange}
          >
            Men
          </span>
          {showMensCollection && (
            <div className="absolute right-0 top-8 w-36 bg-white border border-gray-200 shadow-md rounded-lg py-2 z-50">
              {category.map((item, index) => (
                <button
                  key={index}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* womens collection */}
        <div className="relative">
          <span
            className="text-black opacity-60 transition duration-200 ease-in-out hover:scale-105 hover:font-semibold cursor-pointer hover:opacity-100"
            onClick={handleWomenChange}
          >
            Women
          </span>
          {showWomensCollection && (
            <div className="absolute right-0 top-8 w-36 bg-white border border-gray-200 shadow-md rounded-lg py-2 z-50">
              {category.map((item, index) => (
                <button
                  key={index}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* kids collection */}
        <div className="relative">
          <span
            className="text-black opacity-60 transition duration-200 ease-in-out hover:scale-105 hover:font-semibold cursor-pointer hover:opacity-100"
            onClick={handleKidChange}
          >
            Kid
          </span>
          {showKidsCollection && (
            <div className="absolute right-0 top-8 w-36 bg-white border border-gray-200 shadow-md rounded-lg py-2 z-50">
              {category.map((item, index) => (
                <button
                  key={index}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-6 w-[144px] h-[32px] relative">
        {/* Favorites Icon with counter */}
        <div className="relative">
          <FaRegHeart className="text-black w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            {0}
          </span>
        </div>

        {/* Cart Icon with counter */}
        <div className="relative">
          <IoCartOutline className="text-black w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            {0}
          </span>
        </div>

        {/* User Icon */}
        <div className="relative">
          <FiUser
            className="text-black w-6 h-6 cursor-pointer"
            onClick={handleUserMenu}
          />
          {showUserMenu && (
            <div className="absolute right-0 top-8 w-36 bg-white border border-gray-200 shadow-md rounded-lg py-2 z-50">
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                My Orders
              </button>
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
