import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { onLoadSetWishlistCount } from "../features/wishlistSlice";
import { onLoadSetCartCount } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlist, setWishlist] = useState(null);
  const dispatch = useDispatch();
  const wishlistCount = useSelector((state) => state.wishlistCounter.value);

  async function wishlistProducts() {
    try {
      setWishlistLoading(true);
      const result = await API.get("/wishlist");
      const result2 = await API.get("/cart");
      dispatch(onLoadSetCartCount(result2.data.data.length));
      if (result.data.wishlist.length > 0) {
        dispatch(onLoadSetWishlistCount(result.data.wishlist.length));
        setWishlist(result.data.wishlist);
      } else setWishlist(null);
      // console.log(wishlist);
      setWishlistLoading(false);
    } catch (error) {
      console.log(error);
      setWishlistLoading(false);
    }
  }

  useEffect(() => {
    wishlistProducts();
  }, [wishlistCount]);

  if (wishlistLoading) {
    return <h2 className="mx-auto font-bold bg-slate-200 p-5">Loading...</h2>;
  }

  if (!wishlist || wishlistCount == 0) {
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
    <div className="w-full h-full overflow-x-hidden overflow-y-hidden my-4">
      {/* display all products */}
      <div className="flex flex-wrap">
        {wishlist.length &&
          wishlist.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageUrls={product.imageUrls}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              isLiked={true}
            />
          ))}
      </div>
    </div>
  );
};

export default Wishlist;
