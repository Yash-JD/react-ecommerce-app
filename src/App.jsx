import "./index.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import IsSeller from "./routes/isSeller";
import Address from "./pages/Address";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/address"
          element={
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addProduct"
          element={
            <ProtectedRoute>
              <IsSeller>
                <AddProduct />
              </IsSeller>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
