import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

const AdminProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/products/categories");
      if (res.data) {
        setCategories(res.data.category);
      } else {
        setCategories([]);
        toast.error("No categories found");
      }
    } catch (error) {
      setCategories([]);
      toast.error("Failed to fetch categories");
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.get("/products");
      if (response.data) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
        toast.error("No products found");
      }
    } catch (error) {
      setProducts([]);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [localStorage.getItem("userToken")]);

  const handleEdit = (product) => {
    setEditProduct(product);
    setModalOpen(true);
    setShowAddProduct(false);
  };

  const handleSaveEdit = async (updatedProduct) => {
    try {
      setLoading(true);
      const response = await API.patch(
        `/products/${updatedProduct.id}`,
        updatedProduct
      );
      if (response.data.success) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
          )
        );
        toast.success("Product updated successfully");
        setModalOpen(false);
        setEditProduct(null);
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // Add product with multiple images
  const handleSaveAdd = async (newProduct, files) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      formData.append("quantity", newProduct.quantity);
      formData.append("category", newProduct.category);
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          formData.append("imageUrl", files[i]);
        }
      }
      const response = await API.post("/products", formData);
      if (response.data.success) {
        toast.success("Product added successfully");
        setShowAddProduct(false);
        fetchProducts();
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const ProductForm = ({ initial, onClose, onSave }) => {
    const [form, setForm] = useState(
      initial || {
        name: "",
        price: "",
        description: "",
        quantity: "",
        category: "",
      }
    );
    const [files, setFiles] = useState([]);

    useEffect(() => {
      if (initial) setForm(initial);
    }, [initial]);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
      setFiles([...e.target.files]);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (
        !form.name ||
        !form.price ||
        !form.description ||
        !form.quantity ||
        !form.category ||
        (!initial && files.length === 0)
      )
        return;
      if (initial) {
        onSave({ ...initial, ...form });
      } else {
        onSave(form, files);
      }
    };

    if (loading) {
      return <h2 className="mx-auto font-bold bg-slate-200 p-5">Loading...</h2>;
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg min-w-[320px] w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4">
            {initial ? "Edit Product" : "Add Product"}
          </h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              min={1}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          {!initial && (
            <div className="mb-4">
              <label className="block mb-1 font-medium">Product Images</label>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <div className="text-xs text-gray-400 mt-1">
                You can select multiple images.
              </div>
            </div>
          )}
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  };

  const ProductCard = ({ product, onEdit }) => (
    <div className="border rounded-lg p-4 mb-4 flex items-center gap-4 bg-white shadow">
      <img
        src={
          product.imageUrls && product.imageUrls.length > 0
            ? product.imageUrls[0].image_urls
            : "/placeholder.png"
        }
        alt={product.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <div className="text-gray-700 mt-1">
          Quantity left: {product.quantity}
        </div>
        <div className="text-gray-700 mt-1">Category: {product.category}</div>
        <div className="text-gray-700 font-bold mt-1">₹{product.price}</div>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onEdit(product)}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Edit
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <button
        onClick={() => {
          setShowAddProduct(true);
          setEditProduct(null);
        }}
        className="mb-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        + Add New Product
      </button>
      {products.length === 0 ? (
        <div className="text-center text-gray-500">No products found.</div>
      ) : (
        products.map((product, index) => (
          <ProductCard key={index} product={product} onEdit={handleEdit} />
        ))
      )}
      {/* Add Product Modal */}
      {showAddProduct && (
        <ProductForm
          initial={null}
          onClose={() => setShowAddProduct(false)}
          onSave={handleSaveAdd}
        />
      )}
      {/* Edit Product Modal */}
      {modalOpen && (
        <ProductForm
          initial={editProduct}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default AdminProducts;
