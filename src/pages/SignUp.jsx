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
      const response = await API.post("/api/auth/signup", form);

      if (response.status == "200") {
        // save server otp token in localstorage
        localStorage.setItem("serverOTPToken", response.data.otpToken);
        toast.success(response.data.message);
        return navigate("/verify-otp");
      }
      return toast.error(response.data.message);
    } catch (error) {
      return toast.error(error.response?.data?.message || "SignUp failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold underline">Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="username"
          placeholder="Enter username"
          onChange={handleChange}
          required
        />
        <br />
        <br />
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
            value="seller"
            checked={form.role === "seller"}
            onChange={handleChange}
          />
          seller
        </label>
        <br />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up.." : "SignUp"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
