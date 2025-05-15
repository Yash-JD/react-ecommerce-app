import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementCartCounter,
  onLoadSetCartCount,
} from "../features/cartSlice";
import API from "../services/api";
import { MdDeleteOutline } from "react-icons/md";
import { onLoadSetWishlistCount } from "../features/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartLoading, setCartLoading] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlist, setWishlist] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const cartCounter = useSelector((state) => state.cartCounter.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAllCartItems = async () => {
    try {
      setCartLoading(true);
      const res = await API.get("/cart");
      dispatch(onLoadSetCartCount(res.data.data.length));
      setCartData(res.data.data);
      setCartLoading(false);
    } catch (error) {
      console.error("Error getting all cart items", error);
      setCartLoading(false);
    }
  };

  async function wishlistProducts() {
    try {
      setWishlistLoading(true);
      const result = await API.get("/wishlist");
      dispatch(onLoadSetWishlistCount(result.data.wishlist.length));
      setWishlist(result.data.wishlist);
      setWishlistLoading(false);
    } catch (error) {
      console.log(error);
      setWishlistLoading(false);
    }
  }

  const removeFromCart = async (id) => {
    try {
      setDeleteLoading(true);
      const response = await API.delete("/cart", { data: { productId: id } });
      dispatch(decrementCartCounter());
      // console.log(response.data.success);
      if (response.data.sucess == "true")
        toast.error(response.data.message, {
          autoClose: 2000,
        });
      else toast.success(response.data.message, { autoClose: 2000 });
      setDeleteLoading(false);
    } catch (error) {
      console.log(error);
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCartItems();
    wishlistProducts();
  }, []);

  useEffect(() => {
    fetchAllCartItems();
  }, [deleteLoading]);

  if (cartLoading && wishlistLoading && deleteLoading) {
    return <h2 className="mx-auto font-bold bg-slate-200 p-5">Loading...</h2>;
  }

  if (!cartData || cartCounter == 0) {
    return (
      <div className="flex-col">
        <h2 className="flex justify-center font-bold mx-auto p-5 m-4">
          No product data available
        </h2>
        <button
          className="flex mx-auto border shadow-sm p-4 m-5 rounded-md"
          onClick={() => navigate("/")}
        >
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-8 flex flex-col lg:flex-row gap-10">
      {/* Left: Cart Items */}
      <div className="flex-1 space-y-8">
        {cartData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-300 pb-4"
          >
            <div className="flex items-center gap-4">
              {/* {item.imageUrls.length > 0 && ( */}
              <img
                src={item.imageUrls[0].image_urls}
                className="w-24 h-24 object-contain"
              />
              {/* )} */}
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
            </div>
            <MdDeleteOutline
              className="size-7 hover:scale-125 cursor-pointer"
              onClick={() => removeFromCart(item.id)}
            />
          </div>
        ))}
      </div>

      {/* Right: Order Summary */}
      <div className="w-full h-fit max-w-md bg-white border border-gray-300 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>

        <div className="flex justify-between text-lg mb-6">
          <span>Total:</span>
          <span className="font-semibold">
            ₹
            {cartData.reduce((total, price) => {
              return total + parseInt(price.price);
            }, 0)}
          </span>
        </div>

        <button className="w-full mt-4 py-2 border border-black rounded hover:bg-red-600 hover:text-white hover:border-none transition">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
