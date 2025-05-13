import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serverOTPToken = localStorage.getItem("serverOTPToken");
      if (!serverOTPToken) return toast.error("OTP expired");

      const response = await API.post("/auth/verify-otp", {
        otp,
        serverOTPToken,
      });

      if (response.status == "201") {
        localStorage.clear("serverOTPToken");
        toast.success(response.data.message);
        return navigate("/login");
      }
      return toast.error(response.data.message);
    } catch (error) {
      return toast.error(
        error.response?.data?.message || "OTP verification failed"
      );
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
          Enter OTP
        </h2>

        <input
          className="mb-6 p-4 bg-gray-100 rounded-lg w-full border-none rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-600 text-sm"
          name="otp"
          type="text"
          placeholder="Enter OTP"
          onChange={(e) => {
            setOtp(e.target.value);
          }}
          maxLength="6"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
