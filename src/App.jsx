import "./index.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import SignUp from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
