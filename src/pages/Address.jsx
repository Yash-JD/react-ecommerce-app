import React, { use, useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Address = () => {
  const [addressLoading, setAddressLoading] = useState(false);
  const [allAddresses, setAllAddresses] = useState(null);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [showSelectAddress, setShowSelectAddress] = useState(false);
  const [billingAddress, setbillingAddress] = useState(null);
  const [form, setForm] = useState({
    addressId: "",
    user_name: "",
    house_no: "",
    street_name: "",
    city: "",
    state: "",
    pincode: "",
  });
  const location = useLocation();
  const cartTotal = location.state?.total;
  const orderId = location.state?.orderId;

  const fetchAllAddress = async () => {
    try {
      setAddressLoading(true);
      const response = await API.get("/checkout/address");
      setAllAddresses(response.data.addresses);
      // console.log(response.data.addresses);
      setAddressLoading(false);
    } catch (error) {
      setAddressLoading(false);
      toast.error("Failed to get product", {
        autoClose: 2000,
      });
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/checkout/address", form);
      toast.success(response.data.message, { autoClose: 2000 });
      setForm({
        user_name: "",
        house_no: "",
        street_name: "",
        city: "",
        state: "",
        pincode: "",
      });
      setShowNewAddress(false);
      fetchAllAddress();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add address", { autoClose: 2000 });
    }
  };

  const handleEdit = async (address) => {
    try {
      setShowEditAddress(true);
      setForm({
        addressId: address.id,
        user_name: address.user_name,
        house_no: address.house_no,
        street_name: address.street_name,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.patch(
        `/checkout/address/${form.addressId}`,
        form
      );
      toast.success(response.data.message, { autoClose: 2000 });
      setForm({
        addressId: "",
        user_name: "",
        house_no: "",
        street_name: "",
        city: "",
        state: "",
        pincode: "",
      });
      setShowEditAddress(false);
      fetchAllAddress();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update address", { autoClose: 2000 });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await API.delete(`/checkout/address/${id}`);
      toast.success(response.data.message, { autoClose: 2000 });
      fetchAllAddress();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete address", { autoClose: 2000 });
    }
  };

  const handleSelectAddress = async (address) => {
    try {
      if (showSelectAddress) {
        setbillingAddress(address);
        await API.patch(`/orders/${orderId}`, { addressId: address.id });
        toast.success("Address updated successfully", { autoClose: 2000 });
        setShowSelectAddress(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update address", { autoClose: 2000 });
    }
  };

  const makePayement = async () => {};

  useEffect(() => {
    fetchAllAddress();
  }, []);

  if (addressLoading) {
    return <h2 className="mx-auto font-bold bg-slate-200 p-5">Loading...</h2>;
  }

  return (
    <div className="flex justify-center">
      {/* show all addressses */}
      {(allAddresses && !showNewAddress & !showEditAddress) ||
      showSelectAddress ? (
        <div className="w-[450px] mx-auto bg-white p-8 rounded-lg shadow-md space-y-6 m-6">
          <h2 className="text-2xl font-bold mb-4 text-center border rounded bg-gray-200 p-2">
            All Addresses
          </h2>
          {allAddresses.map((address) => (
            <div
              key={address.id}
              className={`relative border border-gray-300 p-2 bg-gray-50 rounded mb-4 ${
                showSelectAddress ? "cursor-pointer hover:border-red-500" : ""
              }`}
              onClick={() => handleSelectAddress(address)}
            >
              <p className="font-semibold">{address.user_name}</p>
              <p className="text-wrap">
                {address.house_no}, {address.street_name}
              </p>
              <p>{address.city}</p>
              <p>{address.state}</p>
              <p>{address.pincode}</p>
              {!showSelectAddress && (
                <MdModeEdit
                  className="absolute right-0 bottom-5 rounded-sm w-5 h-5 m-1 mb-3 bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => handleEdit(address)}
                />
              )}
              {!showSelectAddress && (
                <MdDelete
                  className="absolute right-0 bottom-0 rounded-sm w-5 h-5 m-1 bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => handleDelete(address.id)}
                />
              )}
            </div>
          ))}
          {/* add address button */}
          {!showNewAddress && !showEditAddress && !showSelectAddress && (
            <button
              className="bg-sky-600 text-white p-2 rounded flex mx-auto mb-4"
              onClick={() => setShowNewAddress(!showNewAddress)}
            >
              Add new address
            </button>
          )}
        </div>
      ) : (
        !showNewAddress &&
        !showEditAddress && (
          <h2 className="text-2xl font-bold mb-4 text-center mx-auto mt-4">
            No Address Found
          </h2>
        )
      )}

      {/* order summary */}
      {allAddresses &&
        !showNewAddress &&
        !showEditAddress &&
        !showSelectAddress && (
          <div className="w-[450px] h-fit mx-auto bg-white p-8 rounded-lg shadow-md m-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 p-2 w-full">
              Order Summary
            </h2>
            <div className="text-lg mb-6 w-full">
              <div className="flex justify-between mb-2">
                <h3 className="text-lg">Billing Address:</h3>
                <button
                  className="bg-green-600 text-white p-2 rounded "
                  onClick={() => setShowSelectAddress(true)}
                >
                  {!billingAddress ? "Select Address" : "Change Address"}
                </button>
              </div>
              {billingAddress && (
                <div className="relative border border-gray-300 p-2 bg-gray-50 rounded mb-4">
                  <p className="font-semibold">{billingAddress.user_name}</p>
                  <p className="text-wrap">
                    {billingAddress.house_no}, {billingAddress.street_name}
                  </p>
                  <p>{billingAddress.city}</p>
                  <p>{billingAddress.state}</p>
                  <p>{billingAddress.pincode}</p>
                </div>
              )}
            </div>

            <div className="flex justify-between text-lg mb-6 w-full px-2">
              <span>Total:</span>
              <span className="font-semibold">₹{cartTotal}</span>
            </div>
            <button
              className="w-full mt-2 py-2 border border-black rounded hover:bg-red-600 hover:text-white hover:border-none transition font-semibold"
              onClick={makePayement}
            >
              Make Payment
            </button>
          </div>
        )}

      {/* add address form */}
      {showNewAddress && (
        <div className="flex">
          <form
            onSubmit={handleSubmit}
            className="min-w-[450px] mx-auto bg-white p-8 rounded-lg shadow-md space-y-6 m-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Add New Address
            </h2>

            <div>
              <label className="block font-medium">Your Name*</label>
              <input
                type="text"
                name="user_name"
                value={form.user_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">House no</label>
              <input
                type="text"
                name="house_no"
                maxLength={4}
                value={form.house_no}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Street name</label>
              <textarea
                name="street_name"
                value={form.street_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">State</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Pincode</label>
              <input
                type="text"
                name="pincode"
                maxLength={6}
                value={form.pincode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                className="w-full bg-gray-100 text-black border-black hover:bg-gray-200 py-2 rounded transition"
                onClick={() => setShowNewAddress(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      )}

      {/* edit address form */}
      {showEditAddress && (
        <div className="flex">
          <form
            onSubmit={handleEditSubmit}
            className="min-w-[450px] mx-auto bg-white p-8 rounded-lg shadow-md space-y-6 m-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Edit Address
            </h2>

            <div>
              <label className="block font-medium">Your Name*</label>
              <input
                type="text"
                name="user_name"
                value={form.user_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">House no</label>
              <input
                type="text"
                name="house_no"
                maxLength={4}
                value={form.house_no}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Street name</label>
              <textarea
                name="street_name"
                value={form.street_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">State</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Pincode</label>
              <input
                type="text"
                name="pincode"
                maxLength={6}
                value={form.pincode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                className="w-full bg-gray-100 text-black border-black hover:bg-gray-200 py-2 rounded transition"
                onClick={() => setShowEditAddress(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Address;
