import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch all products
  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await API.get("/api/products");
      setResponse(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // fetch on first render only
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      {/* display all products */}
      <div className="flex flex-wrap">
        {loading ? (
          <h2>Loading...</h2>
        ) : response && response.products && response.products.length > 0 ? (
          response.products.map((product) => (
            <ProductCard
              key={product.id}
              imageUrls={product.imageUrls}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))
        ) : (
          <h2>No Products Found</h2>
        )}
      </div>
    </div>
  );
};

export default Products;
