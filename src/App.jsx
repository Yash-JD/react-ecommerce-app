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
import IsSeller from "./routes/isSeller";
import Address from "./pages/Address";
import Orders from "./pages/Orders";
import IsUser from "./routes/isUser";
import AdminProducts from "./pages/AdminProducts";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* user routes  */}
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <IsUser>
                <Products />
              </IsUser>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <IsUser>
                <ProductDetails />
              </IsUser>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <IsUser>
                <Wishlist />
              </IsUser>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <IsUser>
                <Cart />
              </IsUser>
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/address"
          element={
            <ProtectedRoute>
              <IsUser>
                <Address />
              </IsUser>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <IsUser>
                <Orders />
              </IsUser>
            </ProtectedRoute>
          }
        />

        {/* seller routes  */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <IsSeller>
                <AdminProducts />
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
