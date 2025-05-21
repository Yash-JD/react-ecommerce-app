import React, { useEffect, useState } from "react";
import API from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders");
        // console.log(res.data.orderDetails);
        if (res.data.orderDetails && res.data.orderDetails.length > 0) {
          setOrders(res.data.orderDetails);
        } else {
          setEmpty(true);
        }
      } catch (error) {
        setEmpty(true);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-lg font-semibold">Loading Orders...</span>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-lg font-semibold">No orders placed yet!</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Orders</h2>
      <div className="space-y-8 mb-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 bg-gray-50 shadow-sm"
          >
            <h3 className="font-semibold mb-2">Order #{order.id}</h3>
            <div className="mt-4 mb-4">
              <span className="font-semibold">Shipping Address:</span>
              <div className="ml-2 text-sm">
                <div>{order.shipping_address.user_name}</div>
                <div>
                  {order.shipping_address.house_no},{" "}
                  {order.shipping_address.street_name}
                </div>
                <div>
                  {order.shipping_address.city}, {order.shipping_address.state}{" "}
                  - {order.shipping_address.pincode}
                </div>
              </div>
            </div>

            <div>
              <span className="font-semibold">Products Ordered:</span>
              <ul className="ml-4 mt-2 space-y-2">
                {order.products_ordered.map((product, idx) => (
                  <li key={idx} className="border-b pb-2 last:border-b-0">
                    <div className="flex justify-start gap-7">
                      <div>
                        <span className="font-semibold">Product name:</span>{" "}
                        {product.name}
                      </div>
                      <div>
                        <span className="font-semibold">Price:</span> ₹
                        {product.price}
                      </div>
                      <div>
                        <span className="font-semibold">Quantity:</span>{" "}
                        {product.quantity_ordered}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-3 mt-4">
              <span className="font-semibold">Total Amount:</span>{" "}
              <span className="text-green-700 font-bold">
                ₹{order.total_amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
