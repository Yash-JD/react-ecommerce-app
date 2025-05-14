import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { onLoadSetWishlistCount } from "../features/wishlistSlice";

const Products = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();
  const [searchCategory, setSearchCategory] = useState([]);

  // fetch all products
  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await API.get("/products");
      setResponse(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // fetch all wishlist
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

  // fetch on first render only
  useEffect(() => {
    fetchProducts();
    wishlistProducts();
  }, []);

  // handle category search params
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchCategory((prev) => [...prev, value]);
    }
    // console.log(searchCategory);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      let url = "/products?category=";
      url += searchCategory.join(",");
      // Update the browser's URL without reloading the page
      // window.history.pushState(null, "", url);
      const res = await API.get(url);
      setResponse(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearchCategory([]);
    fetchProducts();
    window.history.pushState(null, "", "");
  };

  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-hidden flex px-4 my-4 gap-6">
      {/* filter section */}
      <div className="w-1/4 bg-white rounded-md shadow h-fit top-4 sticky">
        <h2 className="text-xl font-bold bg-slate-50 border-b-2 p-4">Filter</h2>
        {/* category filter */}
        <div className="mb-6 p-4">
          <h3 className="font-semibold mb-2">Category</h3>
          <div className="flex flex-col gap-2 text-sm">
            <label>
              <input
                type="checkbox"
                value="cloths"
                onChange={handleCategoryChange}
                className="mr-2"
                checked={searchCategory.includes("cloths")}
              />
              Cloths
            </label>
            <label>
              <input
                type="checkbox"
                value="luxury"
                onChange={handleCategoryChange}
                className="mr-2"
                checked={searchCategory.includes("luxury")}
              />
              Luxury
            </label>
            <label>
              <input
                type="checkbox"
                value="electronics"
                onChange={handleCategoryChange}
                className="mr-2"
                checked={searchCategory.includes("electronics")}
              />
              Electronics
            </label>
            <label>
              <input
                type="checkbox"
                value="gadgets"
                onChange={handleCategoryChange}
                className="mr-2"
                checked={searchCategory.includes("gadgets")}
              />
              Gadgets
            </label>
          </div>
        </div>
        <div className="flex">
          {/* search Button */}
          <button
            onClick={handleSearch}
            className="my-2 text-sm text-white p-2 bg-green-500 mx-auto rounded-md"
          >
            Search
          </button>
          {/* Reset Button */}
          <button
            onClick={handleResetFilters}
            className="my-2 text-sm text-white p-2 bg-blue-500  mx-auto rounded-md"
          >
            Reset Filters
          </button>
        </div>
      </div>
      {/* display all products */}
      <div className="grid grid-cols-1 gap-5 w-3/4 xl:grid-cols-2">
        {loading && wishlistLoading ? (
          <h2 className="mx-auto font-bold bg-slate-200 p-5">Loading...</h2>
        ) : response && response.products && response.products.length > 0 ? (
          //  && wishlist && wishlist.length
          response.products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageUrls={product.imageUrls}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              isLiked={wishlist.some((item) => item.id === product.id)}
            />
          ))
        ) : (
          <h2 className="mx-auto font-bold bg-slate-200 p-5">
            No Products Found
          </h2>
        )}
      </div>
    </div>
  );
};

export default Products;
