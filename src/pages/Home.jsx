import React from "react";
import iphone from "../assets/homePage/Iphone.png";
import Playstation from "../assets/homePage/PlayStation.png";
import {
  FiSmartphone,
  FiWatch,
  FiCamera,
  FiHeadphones,
  FiMonitor,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className=" mt-5 mb-5">
      <div className="w-full h-full overflow-x-hidden overflow-y-hidden">
        {/* iPhone Section */}
        <div className="w-full h-96 bg-[#211C24] px-10">
          <div className="max-w-7xl mx-auto flex h-full items-center justify-around">
            <div className="text-white w-[400px] leading-10">
              <div className="font-semibold text-slate-400 mb-1">
                Pro. Beyond
              </div>
              <span className="font-thin text-6xl">IPhone 14</span>
              <span className="font-bold text-6xl ml-2">Pro</span>
              <div className="mt-4">
                <button
                  className="mt-6 px-6 py-2 border border-white rounded-md hover:bg-white hover:text-black transition"
                  onClick={() => navigate("/products")}
                >
                  Shop Now
                </button>
              </div>
            </div>
            <img src={iphone} className="h-full w-[206px]" />
          </div>
        </div>

        {/* PlayStation Section */}
        <div className="w-full h-80 bg-[#DEDEE5] px-10">
          <div className="max-w-7xl mx-auto flex h-full items-center justify-around">
            <img src={Playstation} className="h-full w-[206px] mt-7" />
            <div className="ml-10 max-w-md">
              <h1 className="text-4xl font-bold mb-4">Playstation 5</h1>
              <p className="text-gray-500 text-sm">
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                will redefine your PlayStation experience.
              </p>
              <button
                className="mt-6 px-6 py-2 border border-black rounded-md hover:bg-black hover:text-white transition"
                onClick={() => navigate("/products")}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[350px] py-14 px-32 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Browse By Category</h2>
        </div>
        <div className="flex gap-16 overflow-x-auto no-scrollbar">
          <button className="flex flex-col items-center justify-center w-36 h-36 bg-gray-100 rounded-2xl shrink-0">
            <FiSmartphone className="text-4xl mb-2"></FiSmartphone>
            <div className="text-md font-medium">Mobiles</div>
          </button>
          <button className="flex flex-col items-center justify-center w-36 h-36 bg-gray-100 rounded-2xl shrink-0">
            <FiWatch className="text-4xl mb-2"></FiWatch>
            <div className="text-md font-medium">Watches</div>
          </button>
          <button className="flex flex-col items-center justify-center w-36 h-36 bg-gray-100 rounded-2xl shrink-0">
            <FiCamera className="text-4xl mb-2"></FiCamera>
            <div className="text-md font-medium">Cameras</div>
          </button>
          <button className="flex flex-col items-center justify-center w-36 h-36 bg-gray-100 rounded-2xl shrink-0">
            <FiHeadphones className="text-4xl mb-2"></FiHeadphones>
            <div className="text-md font-medium">Headphones</div>
          </button>
          <button className="flex flex-col items-center justify-center w-36 h-36 bg-gray-100 rounded-2xl shrink-0">
            <FiMonitor className="text-4xl mb-2"></FiMonitor>
            <div className="text-md font-medium">Monitors</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
