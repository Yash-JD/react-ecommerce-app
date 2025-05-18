import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiStorefrontLight } from "react-icons/pi";
import { MdOutlineVerified } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  decrementWishlistCounter,
  incrementWishlistCounter,
  onLoadSetWishlistCount,
} from "../features/wishlistSlice";
import {
  incrementCartCounter,
  onLoadSetCartCount,
} from "../features/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [mainImage, setMainImage] = useState(0);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistLoading2, setWishlistLoading2] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [addToCart, setAddToCart] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [fetchCartLoading, setFetchCartLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/products/${id}`);
      // console.log(res.data.product[0]);
      setResponse(res.data.product[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const checkInWishlist = async () => {
    try {
      setWishlistLoading(true);
      const res2 = await API.get(`/wishlist`);
      dispatch(onLoadSetWishlistCount(res2.data.wishlist.length));
      const res = await API.get(`wishlist/${id}`);
      setInWishlist(res.data.success);
      setWishlistLoading(false);
    } catch (error) {
      console.log(error);
      setWishlistLoading(false);
    }
  };

  const handleWishlist = async (id) => {
    try {
      if (inWishlist) {
        setWishlistLoading2(true);
        const result = await API.delete("/wishlist", {
          data: { productId: id },
        });
        dispatch(decrementWishlistCounter());
        console.log(result.data.success);
        if (result.data.sucess == "true")
          toast.error(result.data.message, {
            autoClose: 2000,
          });
        else toast.success(result.data.message, { autoClose: 2000 });
      } else {
        const result = await API.post("/wishlist", { productId: id });
        dispatch(incrementWishlistCounter());
        if (result.data.sucess == "true")
          toast.error(result.data.message, {
            autoClose: 2000,
          });
        else toast.success(result.data.message, { autoClose: 2000 });
      }
      setInWishlist((prev) => !prev);
      setWishlistLoading2(false);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      setWishlistLoading2(false);
    }
  };

  const handleClick = () => {
    if (addToCart) {
      handleAddToCart();
    } else {
      navigate("/cart");
    }
  };

  const handleAddToCart = async () => {
    try {
      if (addToCart) {
        setCartLoading(true);
        // check if product is already in cart
        // const res = await API.get(`/cart/${id}`);
        // if (res.data.success) {
        //   return setAddToCart(false);
        // }
        const result = await API.post("/cart", { productId: id });
        // if (
        //   result.data.status == 400 &&
        //   result.data.message == "Product already exists in cart."
        // )
        // console.log(result.data);
        toast.error(result.data.message);
        dispatch(incrementCartCounter());
        setAddToCart(false);
        if (result.data.sucess == "true")
          toast.error(result.data.message, {
            autoClose: 2000,
          });
        else toast.success(result.data.message, { autoClose: 2000 });
        setCartLoading(false);
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error adding to cart", error);
      setCartLoading(false);
    }
  };

  const fetchAllCartItems = async () => {
    try {
      setFetchCartLoading(true);
      const res = await API.get("/cart");
      // console.log(res.data.data.length);
      dispatch(onLoadSetCartCount(res.data.data.length));
      // console.log(res.data.data.includes((item) => (item.id = id)));
      if (res.data.data.includes((item) => (item.id = id))) {
        setAddToCart(false);
      }
      setFetchCartLoading(false);
    } catch (error) {
      console.error("Error getting all cart items", error);
      setFetchCartLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
    checkInWishlist();
    // handleAddToCart();
    fetchAllCartItems();
  }, []);

  if (
    loading &&
    wishlistLoading &&
    wishlistLoading2 &&
    cartLoading &&
    fetchCartLoading
  ) {
    return <h2 className="mx-auto font-bold bg-slate-200 p-5">Loading...</h2>;
  }

  // Return early if response is null
  if (!response) {
    return (
      <h2 className="mx-auto font-bold bg-slate-200 p-5">
        No product data available
      </h2>
    );
  }

  return (
    <div className="p-20 flex gap-5 mx-auto h-[calc(100vh-110pxpx)] justify-center overflow-y-auto">
      <div className=" h-fit w-full flex justify-between p-5">
        <div className="content-center w-1/6 ">
          {response.imageUrls.length > 0 &&
            response.imageUrls.map((img, index) => (
              <img
                key={index}
                src={img.image_urls}
                onClick={() => setMainImage(index)}
                className={`m-4 hover:cursor-pointer hover:scale-110 rounded-md ${
                  index === mainImage ? "opacity-100" : "opacity-40"
                }`}
              />
            ))}
        </div>
        <div className="content-center w-3/4 h-fit">
          <img
            src={response.imageUrls[mainImage].image_urls}
            className="w-full rounded-md"
          />
        </div>
      </div>

      <div className="h-auto w-full bg-slate-100 rounded-xl">
        {/* Product Details (on top) */}
        <div className="p-5">
          <h1 className="text-2xl font-semibold mb-2">{response.name}</h1>
          <p className="text-xl text-green-600 font-bold mb-2">
            ₹{response.price}
          </p>
          <p className="text-gray-700 mb-4">{response.description}</p>
          <div className="text-sm text-gray-500">
            <span className="font-semibold">Category:</span> {response.category}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex my-4 mx-4 py-7 justify-around gap-4">
          <button
            className={`p-4 w-1/2 border border-black rounded-md ${
              inWishlist
                ? "hover:bg-red-500 hover:border-re hover:text-white transition"
                : "hover:bg-red-50 transition"
            } `}
            onClick={() => handleWishlist(id)}
          >
            {inWishlist ? "Remove from wishlist" : " Add to Wishlist"}
          </button>
          <button
            className={`p-4 w-1/2 border border-black bg-black text-white rounded-md hover:bg-white hover:text-black transition hover:cursor-pointer"
            } `}
            // disabled={!addToCart}
            onClick={handleClick}
          >
            {addToCart ? "Add to Cart" : "Go to Cart"}
          </button>
        </div>

        {/* Feature Icons */}
        <div className="h-10 flex gap-5 px-4 items-center justify-around">
          <div className="flex gap-2 items-center">
            <CiDeliveryTruck className="w-6 h-6" />
            <span className="text-sm">Free Delivery</span>
          </div>

          <div className="flex gap-2 items-center">
            <PiStorefrontLight className="w-6 h-6" />
            <p
              className={`text-sm ${
                response.quantity < 5 ? "text-red-500" : "text-green-400"
              }`}
            >
              {response.quantity > 0
                ? `${response.quantity} left in stock`
                : "Out of stock"}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <MdOutlineVerified className="w-6 h-6" />
            <span className="text-sm">Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
