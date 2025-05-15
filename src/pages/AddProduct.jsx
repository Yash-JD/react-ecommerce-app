import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await API.get("/products/categories");
        // console.log(res.data);
        setCategories(res.data.category);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
  });

  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append text fields
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append files (backend expects "imageUrl")
      files.forEach((file) => {
        formData.append("imageUrl", file);
      });

      const response = await API.post("/products", formData);
      toast.success(response.data.message, { autoClose: 2000 });
      navigate("/");
    } catch (error) {
      toast.error("Failed to submit product", {
        autoClose: 2000,
      });
      console.log(error);
    }
  };

  if (loading) {
    return <h2 className="mx-auto font-bold bg-slate-200 p-5">Loading...</h2>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6 m-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>

      <div>
        <label className="block font-medium">Product Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Price (₹)</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
          required
        >
          <option value="">Select Category</option>
          {Array.isArray(categories) &&
            categories.map((cat, index) => (
              <option key={index} value={cat.category}>
                {cat.category}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Product Images</label>
        <input
          type="file"
          name="imageUrl"
          multiple
          onChange={handleFileChange}
          className="mt-1"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
