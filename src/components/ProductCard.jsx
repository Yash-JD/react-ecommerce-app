import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { PiGreaterThan, PiLessThan } from "react-icons/pi";
import {
  incrementWishlistCounter,
  decrementWishlistCounter,
} from "../features/wishlistSlice";
import { useDispatch } from "react-redux";

const ProductCard = ({ imageUrls, name, price, quantity }) => {
  const totalImages = imageUrls.length;
  const [liked, setLiked] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const dispatch = useDispatch();

  const prevImage = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev < totalImages - 1 ? prev + 1 : prev));
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
    if (liked) return dispatch(decrementWishlistCounter());
    else return dispatch(incrementWishlistCounter());
  };

  return (
    <div className="relative bg-white rounded-2xl p-4 shadow-md w-full max-w-sm mx-auto border border-gray-200 mb-6 cursor-pointer">
      {/* Heart Icon */}
      <div
        className="absolute top-5 right-5 cursor-pointer text-xl"
        onClick={handleLike}
      >
        {liked ? (
          <FaHeart className="text-red-600" />
        ) : (
          <FaRegHeart className="text-gray-400" />
        )}
      </div>

      {/* Product Images */}
      <div className="flex justify-center items-center mt-5">
        {/* Image navigation arrow  */}
        <PiGreaterThan
          className="absolute top-1/3 right-2 cursor-pointer z-50 bg-gray-300 rounded-full size-8"
          onClick={nextImage}
          disabled={currentImage === 0}
        />
        <PiLessThan
          className="absolute top-1/3 left-2 cursor-pointer z-50  bg-gray-300 rounded-full size-8"
          onClick={prevImage}
          disabled={currentImage < totalImages - 1}
        />

        <div className="w-[300px] h-[300px] relative">
          {imageUrls.length > 1 ? (
            imageUrls.map((image, index) => (
              <img
                key={index}
                src={image.image_urls}
                className={`absolute w-full h-full justify-center object-contain rounded-2xl transition-opacity duration-200 ${
                  index === currentImage ? "opacity-100" : "opacity-0"
                } `}
              />
            ))
          ) : (
            <img
              src={image.image_urls}
              alt={name}
              className="w-fit h-[300px] object-contain rounded-2xl border-2 border-slate-100 shadow-sm"
            />
          )}
        </div>
      </div>

      {/* Name */}
      <h2 className="text-center font-medium text-[16px] mt-6 px-2">{name}</h2>

      {/* Price */}
      <p className="text-center text-[24px] font-bold mt-4">${price}</p>

      {/* quantity Info */}
      <p
        className={`text-center text-sm mt-1 ${
          quantity < 5 ? "text-red-500" : "text-green-400"
        }`}
      >
        {quantity > 0 ? `${quantity} left in stock` : "Out of stock"}
      </p>

      {/* Buy Now Button */}
      <div className="flex justify-center mt-4 mb-2">
        <button
          disabled={quantity === 0}
          className={`px-6 py-3 rounded-xl text-[16px] transition font-medium ${
            quantity === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
