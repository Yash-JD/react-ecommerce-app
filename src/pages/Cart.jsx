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
  const [changeQuantity, setChangeQuantity] = useState(false);

  const fetchAllCartItems = async () => {
    try {
      setCartLoading(true);
      const res = await API.get("/cart");
      dispatch(onLoadSetCartCount(res.data.data.length));
      // console.log(res.data.data);
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

  const handleQuantity = async (value, id) => {
    try {
      setChangeQuantity((prev) => !prev);
      const res = await API.patch(`/cart/${id}`, { quantity: value });
      // console.log(res.data);
      toast.success(res.data.message, { autoClose: 2000 });
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async () => {
    // console.log(cartData);
    const res = await API.post("/orders", { products: cartData });
    const total = cartData.reduce((total, product) => {
      return parseInt(product.price) * product.quantity + total;
    }, 0);
    if (res.data.status == 400) return toast.error("Order already placed");
    else return navigate("/checkout/address", { state: { total } });
  };

  useEffect(() => {
    // fetchAllCartItems();
    wishlistProducts();
  }, []);

  useEffect(() => {
    fetchAllCartItems();
  }, [deleteLoading, changeQuantity]);

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
              <img
                src={item.imageUrls[0].image_urls}
                className="w-24 h-24 object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
            </div>
            <div className="flex-col gap-1">
              <div>Quantity: </div>
              <div className="border mt-2 flex justify-between rounded">
                <button
                  className="bg-gray-300 w-1/3 rounded-l"
                  onClick={(e) => handleQuantity(item.quantity - 1, item.id)}
                >
                  -
                </button>
                <span className="place-content-center">{item.quantity}</span>
                <button
                  className="bg-gray-300 w-1/3 rounded-r"
                  onClick={(e) => handleQuantity(item.quantity + 1, item.id)}
                >
                  +
                </button>
              </div>
              {/* <select
                // name="quantity"
                value={item.quantity}
                className="border bg-slate-50"
                onChange={(e) => handleQuantity(e.target.value, item.id)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select> */}
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
            {cartData.reduce((total, product) => {
              return parseInt(product.price) * product.quantity + total;
            }, 0)}
          </span>
        </div>

        <button
          className="w-full mt-4 py-2 border border-black rounded hover:bg-red-600 hover:text-white hover:border-none transition"
          onClick={placeOrder}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
