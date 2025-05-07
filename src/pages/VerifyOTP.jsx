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

      const response = await API.post("/api/auth/verify-otp", {
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
    <div>
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="otp"
          type="text"
          placeholder="Enter OTP"
          onChange={(e) => {
            setOtp(e.target.value);
          }}
          maxLength="6"
          required
        />
        <span> </span>
        <button type="submit" disabled={loading}>
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
