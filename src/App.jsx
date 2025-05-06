import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
