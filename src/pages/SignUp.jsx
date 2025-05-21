import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail, validatePassword } from "../utils/helper";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate email
    if (!validateEmail(form.email)) {
      return toast.error(
        "Email must contain all lowercase, no number domain and no special symbols.",
        { autoClose: 2000 }
      );
    }

    // validate password
    if (!validatePassword(form.password)) {
      return toast.error(
        "Password must contain atleat 8 characters with atleast one Uppercase, one lowercase, one number and one special character.",
        { autoClose: 2000 }
      );
    }

    setLoading(true);

    try {
      const response = await API.post("/auth/signup", form);

      if (response.status == "200") {
        // save server otp token in localstorage
        localStorage.setItem("serverOTPToken", response.data.otpToken);
        toast.success(response.data.message, { autoClose: 2000 });
        return navigate("/verify-otp");
      }
      return toast.error(response.data.message, { autoClose: 2000 });
    } catch (error) {
      return toast.error(
        error.response?.data?.message,
        { autoClose: 2000 } || "SignUp failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-300 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl px-10 py-8 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl px-10 py-8 w-full max-w-md
      border border-gray-200"
        >
          <h2 className="text-3xl font-extrabold text-black mb-8 text-center">
            Signup
          </h2>

          <div className="mb-6 p-4 bg-gray-100 rounded-lg ">
            <label className="block text-gray-800 font-medium mb-1">
              Select Role
            </label>
            <div className="flex gap-4">
              <label className="flex items-center text-gray-900 text-sm">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={form.role === "user"}
                  onChange={handleChange}
                  className="mr-2 accent-black"
                />
                User
              </label>
              <label className="flex items-center text-gray-900 text-sm">
                <input
                  type="radio"
                  name="role"
                  value="seller"
                  checked={form.role === "seller"}
                  onChange={handleChange}
                  className="mr-2 accent-black"
                />
                Seller
              </label>
            </div>
          </div>

          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <label className="block text-gray-800 font-semibold mb-2">
              Username
            </label>
            <input
              className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-600 text-sm"
              name="username"
              type="username"
              placeholder="Enter username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <label className="block text-gray-800 font-semibold mb-2">
              Email
            </label>
            <input
              className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-600 text-sm"
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <label className="block text-gray-800 font-semibold mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-600 text-sm"
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition duration-200"
          >
            {loading ? "Signing up.." : "SignUp"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
