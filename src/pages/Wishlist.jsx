import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { onLoadSetWishlistCount } from "../features/wishlistSlice";

const Wishlist = () => {
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();

  async function wishlistProducts() {
    try {
      setWishlistLoading(true);
      const result = await API.get("/wishlist");
      dispatch(onLoadSetWishlistCount(result.data.wishlist.length));
      setWishlist(result.data.wishlist);
      console.log(wishlist);
      setWishlistLoading(false);
    } catch (error) {
      console.log(error);
      setWishlistLoading(false);
    }
  }

  useEffect(() => {
    wishlistProducts();
  }, []);

  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-hidden my-4">
      {/* display all products */}
      <div className="flex flex-wrap">
        {wishlistLoading ? (
          <h2>Loading...</h2>
        ) : wishlist && wishlist.length ? (
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
          ))
        ) : (
          <h2 className="mx-auto font-bold bg-slate-200 p-5">
            No Wishlist Found
          </h2>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
