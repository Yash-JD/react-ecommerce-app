import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../utils/helper";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    try {
      const response = await API.post("/api/auth/login", form);

      if (response.status == "200") {
        // Save token
        localStorage.setItem("token", response.data.token);
        navigate("/");
        return toast.success(response.data.message);
      }
      return toast.error(response.data);
    } catch (error) {
      return toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label>
          <input
            type="radio"
            name="role"
            value="user"
            checked={form.role === "user"}
            onChange={handleChange}
          />
          user
        </label>

        <label>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={form.role === "seller"}
            onChange={handleChange}
          />
          seller
        </label>
        <br />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
