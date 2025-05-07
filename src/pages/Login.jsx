import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail, validatePassword } from "../utils/helper";
import Cookies from "js-cookie";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate email
    if (!validateEmail(form.email)) {
      return toast.error(
        "Email must contain all lowercase, no number domain and no special symbols."
      );
    }

    // validate password
    if (!validatePassword(form.password)) {
      return toast.error(
        "Password must contain atleat 8 characters with atleast one Uppercase, one lowercase, one number and one special character."
      );
    }

    setLoading(true);

    try {
      const response = await API.post("/api/auth/login", form);

      if (response.status == "200") {
        // Save token which contains user information
        Cookies.set("userToken", response.data.userData, { expires: 7 });
        navigate("/");
        return toast.success(response.data.message);
      }
      return toast.error(response.data.message);
    } catch (error) {
      return toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-300 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl px-10 py-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-black mb-8 text-center">
          Login
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
                value="admin"
                checked={form.role === "admin"}
                onChange={handleChange}
                className="mr-2 accent-black"
              />
              Admin
            </label>
          </div>
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
          className="w-full bg-black text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
